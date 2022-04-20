import { ref, computed } from 'vue'
import solve from './algorithms/solve'

const data = JSON.parse(window.localStorage.getItem('data')) || {items:[], max:0}

export const items = ref(data.items)
export const max = ref(data.max)

export function add(index:number)
{
    items.value.splice(index, 0, {
        cost: 0,
        value: 0,
        selected: false
    })
    update()
}

export function remove(index:number)
{
    items.value.splice(index,1)
    update()
}

export function update()
{
    const selected = solve(items.value, max.value)
    items.value.map(item => item.selected = false)
    selected.map(item => item.selected = true)
    window.localStorage.setItem('data',JSON.stringify({ items: items.value, max: max.value }))
}

export const total = computed(() => 
    items
        .filter(item => item.selected)
        .reduce((previous, current) => previous + current.value,0)
)