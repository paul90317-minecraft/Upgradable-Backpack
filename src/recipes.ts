import { datapack, TEXT } from '@paul90317/mcfn.ts'
import { custom_data } from './custom_data'
import { assets } from './assets'

datapack.recipe({
    data: {
        "type": "minecraft:crafting_shaped",
        "category": "equipment",
        "group": "backpack",
        "key": {
            "a": "#minecraft:wool",
            "b": "minecraft:leather",
            "c": "minecraft:barrel"
        },
        "pattern": [
            "aba",
            "bcb",
            "aba"
        ],
        "result": {
            "components": {
                "minecraft:custom_data": custom_data.small_backpack,
                "minecraft:custom_name": {
                    text: "Backpack",
                    italic: false
                } as TEXT,
                "minecraft:attribute_modifiers": [
                    {
                    "type": "minecraft:armor",
                    "id": "armor",
                    "amount": 0,
                    "operation": "add_value",
                    "display": {
                        "type": "hidden"
                    }
                    }
                ],
                "minecraft:tooltip_display": {
                    "hidden_components": [
                        "minecraft:unbreakable"
                    ]
                },
                "minecraft:item_model": assets.item_models.small_backpack,
                "minecraft:equippable": {
                    "slot": "chest",
                    "asset_id": assets.equipments.small_backpack
                }
            },
            "count": 1,
            "id": "minecraft:leather_chestplate"
        }
    }
})

datapack.recipe({
    data: {
        "type": "minecraft:crafting_shaped",
        "category": "misc",
        "group": "backpack_upgrader",
        "key": {
            "a": "#minecraft:wool",
            "b": "minecraft:leather"
        },
        "pattern": [
            "aba",
            "b b",
            "aba"
        ],
        "result": {
            "components": {
                "minecraft:custom_data": custom_data.upgrader,
                "minecraft:custom_name": {
                    text: "Backpack Upgrader",
                    italic: false
                } as TEXT,
                "minecraft:item_model": assets.item_models.upgrader
            },
            "count": 1,
            "id": "minecraft:leather"
        }
    }
})