# Advanced Species

**Release:** 2.0.0.

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
- If another module changes the primary type without updating the additional types, stale additional types are ignored until they include the new primary.

### Object creature type
- Adds **Object** as a selectable creature type, with its own icon.
- An actor whose only type is Object is not treated as a creature.

### Icons
- About 70 bundled SVG icons used by the compendium content.
