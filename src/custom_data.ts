import { nbt } from '@paul90317/mcfn.ts'

export const custom_data = {
    ui: nbt.compound({
        upgradable_backpack: nbt.compound({
            type: nbt.string('ui')
        })
    }),
    backpack: nbt.compound({
        upgradable_backpack: nbt.compound({
            type: nbt.string('backpack')
        })
    }),
    small_backpack: nbt.compound({
        upgradable_backpack: nbt.compound({
            type: nbt.string('backpack'),
            size: nbt.string('small')
        })
    }),
    medium_backpack: nbt.compound({
        upgradable_backpack: nbt.compound({
            type: nbt.string('backpack'),
            size: nbt.string('medium')
        })
    }),
    large_backpack: nbt.compound({
        upgradable_backpack: nbt.compound({
            type: nbt.string('backpack'),
            size: nbt.string('large')
        })
    }),
    upgrader: nbt.compound({
        upgradable_backpack: nbt.compound({
            type: nbt.string('upgrader')
        })
    })
}