scoreboard players set @s backpack.only 0
execute at @e[type=item,distance=..1.2] run scoreboard players add @s backpack.only 1
execute if entity @a[scores={backpack.sneak=1..},distance=..5] if score @s backpack.only matches 1 if block ~ ~ ~ #backpack:air run function backpack:place