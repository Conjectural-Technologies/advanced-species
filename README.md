# Advanced Species

Adds multiple creature types to D&D 5e in Foundry VTT v14, along with a compendium of species traits, creature features, actors and reference material.

**Requirements:** Foundry VTT v14 and the D&D 5e system 6.0.6 or newer. The module adds no settings.

## Installation

In Foundry's **Add-on Modules** tab choose **Install Module** and paste this manifest URL:

```
https://github.com/Conjectural-Technologies/advanced-species/releases/latest/download/module.json
```

## Features

### Multiple creature types
- Characters, NPCs and species can have more than one creature type, such as *Fey and Humanoid*.
- The creature type editor changes from radio buttons to checkboxes, while still keeping one primary type. If the primary type is unchecked, the first remaining selection becomes primary.
- Custom types are supported, and multiple types are shown as a localised list in actor labels.
- Species carry the same multi-type data, so a species can grant several types.
- Actors expose a `creatureTypes` set for macros and other modules.

### Object creature type
- Adds **Object** as a selectable creature type, with its own icon.
- An actor whose only type is Object is not treated as a creature.

### Compendium content
Four compendium packs are provided. Players have Observer access and assistants have Owner access. Pack contents are binary databases, so the descriptions below are general.

| Pack | Contents |
|---|---|
| **Items** (largest) | Species, traits and creature features, such as breath weapons, lycanthropy and other species abilities. |
| **Actors** | Transformation forms such as were-creatures and ooze forms. |
| **Active Effects** | A small set of reusable effects. |
| **Journals** | A reference journal, including a guide to dropping enchantments onto item chat cards. |

### Icons
- About 70 bundled SVG icons used by the compendium content.
