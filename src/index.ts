import { block, coord, Data, data, datapack, execute, ITEM, Item, item, kill, mcfn, minecraft, nbt, NBTBase, ret, sel, Slot, summon, tag, ITEM_SLOTS, SELECTORS, TEXT, resourcepack, ItemModel, item_models } from '@paul90317/mcfn.ts'
import { assets } from './assets'
import { custom_data } from './custom_data'
import { item_modifiers } from './item_modifiers'
import './recipes'

function get_items(item_: Data) {
    return item_.at('components')
    .at('minecraft:custom_data')
    .at('upgradable_backpack')
    .at('Items')
}

function item_slot_matches (slot: number, custom_data_: NBTBase){
    return block('barrel', {}, nbt.compound({
        Items: nbt.list([nbt.compound({
            Slot: nbt.byte(slot),
            components: nbt.compound({
                'minecraft:custom_data': custom_data_
            })
        })])
    })).matches(coord('~ ~ ~'))
}

function select_custom_data (x: SELECTORS, custom_data_: NBTBase){
    return sel(x, {
        nbt: nbt.compound({
            Item: nbt.compound({
                components: nbt.compound({
                    'minecraft:custom_data': custom_data_
                })
            })
        })
    })
}

function backpack_slot_matches (custom_data_: NBTBase){
    return select_custom_data('@s', custom_data_)
}

function exit() {
    const backpack_item_data = data.entity(sel('@s')).at('Item')
    get_items(backpack_item_data).set(data.block(coord('~ ~ ~')).at('Items'))
    
    keeper.drop(keeper.backpack_slot, item('air'))
    kill(sel('@s'))
    block('air').set(coord('~ ~ ~'), 'replace')
}

const keeper = {
    item_block: item('black_stained_glass_pane', {
        custom_data: custom_data.ui,
        tooltip_display: nbt.compound({
            hide_tooltip: nbt.byte(1)
        }),
        item_model: nbt.string(assets.item_models.block)
    }),
    button_exit: item('barrier', {
        custom_data: custom_data.ui,
        item_name: nbt.text({
            text: "Exit",
            color: 'red',
            italic: false
        }),
        item_model: nbt.string(assets.item_models.close)
    }),
    backpack_slot: item.slot(sel('@s'), 'container.0'),
    get_item_slot(slot: number) {
        return item.slot(coord('~ ~ ~'), `container.${slot}` as ITEM_SLOTS)
    },
    drop(item_slot: Slot, replace: Item) {
        const dropped_nbt = nbt.compound({
            Item: nbt.compound({
                id: nbt.string('minecraft:dirt'),
                count: 1
            }),
            Motion: nbt.list([nbt.double(0), nbt.double(0.2), nbt.double(0)]),
            Tags: nbt.list([
                nbt.string(backpack_tag)
            ])
        })
        summon('item', coord('~ ~ ~'), dropped_nbt)
        item.slot(sel('@e', {
            type: 'item',
            sort: 'nearest',
            limit: 1,
            nbt: dropped_nbt
        }), 'container.0').replace.from(item_slot)
        item_slot.replace.with(replace)
    },
    block(slot: number) {
        const item_slot = this.get_item_slot(slot)
        execute.unless(item_slot_matches(slot, custom_data.ui)).run(()=>{
            this.drop(item_slot, this.item_block)
        })
    },
    slot(slot: number) {
        const item_slot = this.get_item_slot(slot)
        
        execute.if(item_slot_matches(slot, custom_data.upgrader)).run(()=>ret(()=>{
            execute.if(backpack_slot_matches(custom_data.small_backpack)).run(()=>ret(()=>{
                item_slot.modify(item_modifiers.consume_one)
                this.backpack_slot.modify(item_modifiers.upgrade_to_medium)
            }), true)
            execute.if(backpack_slot_matches(custom_data.medium_backpack)).run(()=>ret(()=>{
                item_slot.modify(item_modifiers.consume_one)
                this.backpack_slot.modify(item_modifiers.upgrade_to_large)
            }), true)
        }), true)
        execute.if(item_slot_matches(slot, custom_data.backpack)).run(()=>
            this.drop(item_slot, item('air')))
        execute.if(item_slot_matches(slot, custom_data.ui)).run(()=>
            item_slot.replace.with(item('air')), true)
    },
    exit(slot: number) {
        const item_slot = this.get_item_slot(slot)
        execute.unless(item_slot_matches(slot, custom_data.ui)).run(()=>{
            this.drop(item_slot, this.button_exit)
            
            exit()
        })
    }
}

const backpack_tag = tag()

minecraft.tick(()=>{
    execute
        .as(sel('@e', {
            type: 'item_frame',
            tags: [backpack_tag]
        }))
        .at(sel('@s'))
        .run(()=>{
            execute.unless(block('barrel').matches(coord('~ ~ ~'))).run(()=>ret(()=>{
                kill(sel('@e', {
                    type: 'item',
                    nbt: nbt.compound({
                        Item: nbt.compound({
                            count: nbt.int(1),
                            id: nbt.string('minecraft:barrel')
                        })
                    }),
                    limit: 1,
                    sort: 'nearest',
                    distance: {upper: 1}
                }))
                exit()
            }), true)

            execute.if(backpack_slot_matches(custom_data.small_backpack)).run(()=>{
                for(let i = 0; i < 9; ++i) {
                    keeper.block(i)
                }
                for(let i = 9; i < 18; ++i) {
                    keeper.slot(i)
                }
                for(let i = 18; i < 26; ++i) {
                    keeper.block(i)
                }
            })
            execute.if(backpack_slot_matches(custom_data.medium_backpack)).run(()=>{
                for(let i = 0; i < 18; ++i) {
                    keeper.slot(i)
                }
                for(let i = 18; i < 26; ++i) {
                    keeper.block(i)
                }
            })
            execute.if(backpack_slot_matches(custom_data.large_backpack)).run(()=>{
                for(let i = 0; i < 26; ++i) {
                    keeper.slot(i)
                }
            })
            keeper.exit(26)
        })

    execute
        .as(sel('@e', {
            type: 'item',
            nbt: nbt.compound({
                OnGround: nbt.byte(1)
            }),
            excl_tags: [backpack_tag]
        }))
        .at(sel('@s'))
        .if(backpack_slot_matches(custom_data.backpack))
        .run(()=>
            execute.if(block('#air').matches(coord('~ ~ ~'))).run(()=>{
            summon('item_frame', coord('~ ~ ~'), nbt.compound({
                Facing: nbt.byte(1),
                Fixed: nbt.byte(1),
                Invisible: nbt.byte(1),
                Invulnerable: nbt.byte(1),
                Tags: nbt.list([
                    nbt.string(backpack_tag)
                ])
            }))
            const entity = data.entity(sel('@e', {
                tags: [backpack_tag],
                limit: 1,
                sort: 'nearest'
            })).at('Item')
            const dropped = data.entity(sel('@s')).at('Item')
            block('barrel', {facing: 'up'}).set(coord('~ ~ ~'), 'replace')

            entity.set(dropped)
            
            get_items(entity).remove()
            
            data.block(coord('~ ~ ~')).at('CustomName').set(
                dropped.at('components').at('minecraft:custom_name'))
            data.block(coord('~ ~ ~')).at('Items').set(get_items(dropped))
            keeper.get_item_slot(26).replace.with(keeper.button_exit)
            kill(sel('@s'))
        }))
    
    item('*', {
        custom_data: nbt.compound({
            upgradable_backpack: nbt.compound({
                type: nbt.string('ui')
            })
        })
    }).clear(sel('@a'))
    
    kill(select_custom_data('@e', custom_data.ui))
})