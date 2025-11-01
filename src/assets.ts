import { resourcepack } from '@paul90317/mcfn.ts'

const models = {
    small_backpack: resourcepack.model({
        "parent": "minecraft:item/generated",
        "textures": {
            "layer0": resourcepack.texture.item('./res/item/small_backpack.png'),
            "layer1": resourcepack.texture.item('./res/item/small_backpack_overlay.png')
        },
        "display": {
            "fixed": {
                "translation": [0, 0, -32],
                "scale": [1.4, 1.4, 2]
            }
        }
    }),
    medium_backpack: resourcepack.model({
        "parent": "minecraft:item/generated",
        "textures": {
            "layer0": resourcepack.texture.item('./res/item/medium_backpack.png'),
            "layer1": resourcepack.texture.item('./res/item/medium_backpack_overlay.png')
        }, 
        "display": {
            "fixed": {
                "translation": [0, 0, -32],
                "scale": [1.4, 1.4, 2]
            }
        }
    }),
    large_backpack: resourcepack.model({
        "parent": "minecraft:item/generated",
        "textures": {
            "layer0": resourcepack.texture.item('./res/item/large_backpack.png'),
            "layer1": resourcepack.texture.item('./res/item/large_backpack_overlay.png')
        },
        "display": {
            "fixed": {
                "translation": [0, 0, -32],
                "scale": [1.4, 1.4, 2]
            }
        }
    }),
    upgrader: resourcepack.model({
        "parent": "minecraft:item/generated",
        "textures": {
            "layer0": resourcepack.texture.item('./res/item/upgrader.png'),
        }
    }),
    block: resourcepack.model({
        "parent": "minecraft:item/generated",
        "textures": {
            "layer0": resourcepack.texture.item('./res/ui/block.png'),
        },
        "display": {
            "gui": {
                "scale": [1.125, 1.125, 1]
            }
        }
    }),
    close: resourcepack.model({
        "parent": "minecraft:item/generated",
        "textures": {
            "layer0": resourcepack.texture.item('./res/ui/close.png'),
        },
        "display": {
            "gui": {
                "scale": [1.125, 1.125, 1]
            }
        }
    })
}

const item_models = {
    small_backpack: resourcepack.item({
        model: {
            "type": "minecraft:model",
            "model": models.small_backpack,
            "tints": [
                {
                    "type": "minecraft:dye",
                    "default": -6265536
                }
            ]
        }
    }),
    medium_backpack: resourcepack.item({
        model: {
            "type": "minecraft:model",
            "model": models.medium_backpack,
            "tints": [
                {
                    "type": "minecraft:dye",
                    "default": -6265536
                }
            ]
        }
    }),
    large_backpack: resourcepack.item({
        model: {
            "type": "minecraft:model",
            "model": models.large_backpack,
            "tints": [
                {
                    "type": "minecraft:dye",
                    "default": -6265536
                }
            ]
        }
    }),
    upgrader: resourcepack.item({
        model: {
            type: 'minecraft:model',
            model: models.upgrader
        }
    }),
    block: resourcepack.item({
        model: {
            type: 'minecraft:model',
            model: models.block
        }
    }),
    close: resourcepack.item({
        model: {
            type: 'minecraft:model',
            model: models.close
        }
    })
}

const equipments = {
    small_backpack: resourcepack.equipment({
        "layers": {
            "humanoid": [
                {
                    "dyeable": {
                        "color_when_undyed": -6265536
                    },
                    "texture": resourcepack.texture.humanoid('./res/equipment/small_backpack.png')
                },
                {
                    "texture": resourcepack.texture.humanoid('./res/equipment/small_backpack_overlay.png')
                }
            ]
        }
    }),
    medium_backpack: resourcepack.equipment({
        "layers": {
            "humanoid": [
                {
                    "dyeable": {
                        "color_when_undyed": -6265536
                    },
                    "texture": resourcepack.texture.humanoid('./res/equipment/medium_backpack.png')
                },
                {
                    "texture": resourcepack.texture.humanoid('./res/equipment/medium_backpack_overlay.png')
                }
            ]
        }
    }),
    large_backpack: resourcepack.equipment({
        "layers": {
            "humanoid": [
                {
                    "dyeable": {
                        "color_when_undyed": -6265536
                    },
                    "texture": resourcepack.texture.humanoid('./res/equipment/large_backpack.png')
                },
                {
                    "texture": resourcepack.texture.humanoid('./res/equipment/large_backpack_overlay.png')
                }
            ]
        }
    })
}

export const assets = {
    item_models,
    equipments
}