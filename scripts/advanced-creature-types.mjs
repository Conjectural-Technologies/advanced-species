function creatureTypes(data) {
  if (!data?.value) return [];
  // A primary-type update from another module must not leave stale additional types active.
  return [...new Set(data.values?.includes(data.value) ? data.values : [data.value])];
}

function extendCreatureType(field) {
  const { ArrayField, StringField } = foundry.data.fields;
  field.extendFields({
    values: new ArrayField(new StringField({ blank: false }), { initial: [] })
  });
}

function configuredCreatureType(editor) {
  return foundry.utils.getProperty(editor.document.system._source, editor.options.keyPath);
}

function registerTypeEditor() {
  const prototype = dnd5e.applications.shared.CreatureTypeConfig.prototype;
  const processFormData = prototype._processFormData;
  prototype._processFormData = function(event, form, formData) {
    const data = processFormData.call(this, event, form, formData);
    const inputs = form.querySelectorAll('input[data-advanced-creature-type]');
    if (!inputs.length) return data;

    const values = Array.from(inputs).filter(input => input.checked).map(input => input.value);
    const path = `system.${this.options.keyPath}`;
    const current = configuredCreatureType(this)?.value;
    foundry.utils.setProperty(data, `${path}.values`, values);
    foundry.utils.setProperty(data, `${path}.value`, values.includes(current) ? current : (values[0] ?? ""));
    delete data.advancedCreatureTypes;
    return data;
  };

  const renderHTML = prototype._renderHTML;
  prototype._renderHTML = async function(context, options) {
    const result = await renderHTML.call(this, context, options);
    const root = result.config;
    if (!root) return result;
    root.classList.add("advanced-creature-types");

    // Finish the detached content before Foundry inserts and measures the window.
    const selected = new Set(creatureTypes(configuredCreatureType(this)));
    for (const input of root.querySelectorAll(`input[type="radio"][name="system.${this.options.keyPath}.value"]`)) {
      input.type = "checkbox";
      input.name = `advancedCreatureTypes.${input.value}`;
      input.dataset.advancedCreatureType = "";
      input.checked = selected.has(input.value);
    }
    return result;
  };
}

function registerTypeLabels() {
  const ActorClass = dnd5e.documents.Actor5e;
  const formatCreatureType = ActorClass.formatCreatureType;
  ActorClass.formatCreatureType = function(data) {
    const types = creatureTypes(data);
    if (types.length < 2) return formatCreatureType.call(this, data);
    const labels = types.map(value => {
      if (value === "custom") return data.custom;
      const config = CONFIG.DND5E.creatureTypes[value];
      return config ? game.i18n.localize(data.swarm ? config.plural : config.label) : value;
    });
    return formatCreatureType.call(this, {
      ...data,
      value: "custom",
      custom: game.i18n.getListFormatter({ type: "conjunction" }).format(labels)
    });
  };
}

Hooks.once("init", () => {
  CONFIG.DND5E.creatureTypes.object = {
    label: "ADVANCEDCREATURETYPES.CreatureObject",
    plural: "ADVANCEDCREATURETYPES.CreatureObjectPl",
    icon: "icons/svg/item-bag.svg"
  };
  registerTypeEditor();
  registerTypeLabels();
});

// Wait for other modules' init registrations, but run before world actors are constructed.
Hooks.once("i18nInit", () => {
  for (const type of ["character", "npc"]) {
    const BaseModel = CONFIG.Actor.dataModels[type];
    CONFIG.Actor.dataModels[type] = class ObjectTypeData extends BaseModel {
      static defineSchema() {
        const schema = super.defineSchema();
        if (type === "npc") extendCreatureType(schema.details.fields.type);
        return schema;
      }

      get creatureTypes() {
        return new Set(creatureTypes(this.details?.type));
      }

      get isObject() {
        return this.creatureTypes.has("object") || (super.isObject ?? false);
      }

      get isCreature() {
        if (!super.isCreature) return false;
        const types = this.creatureTypes;
        return !(types.size === 1 && types.has("object"));
      }
    };
  }

  const BaseSpecies = CONFIG.Item.dataModels.race;
  CONFIG.Item.dataModels.race = class MultipleTypeSpeciesData extends BaseSpecies {
    static defineSchema() {
      const schema = super.defineSchema();
      extendCreatureType(schema.type);
      return schema;
    }
  };
});
