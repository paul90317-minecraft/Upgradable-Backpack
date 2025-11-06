import { custom_data } from "./custom_data"
import { assets } from "./assets"
import { datapack } from 'mcfn.ts'

export const item_modifiers = {
    consume_one: datapack.item_modifier({
        "function": "minecraft:set_count",
        "count": -1,
        "add": true
    }),
    upgrade_to_medium: datapack.item_modifier({
        "function": "minecraft:set_components",
        "components": {
            "minecraft:custom_data": custom_data.medium_backpack,
            "minecraft:item_model": assets.item_models.medium_backpack,
            "minecraft:equippable": {
                "slot": "chest",
                "asset_id": assets.equipments.medium_backpack
            }
        }
    }),
    upgrade_to_large: datapack.item_modifier({
        "function": "minecraft:set_components",
        "components": {
            "minecraft:custom_data": custom_data.large_backpack,
            "minecraft:item_model": assets.item_models.large_backpack,
            "minecraft:equippable": {
                "slot": "chest",
                "asset_id": assets.equipments.large_backpack
            }
        }
    })
}