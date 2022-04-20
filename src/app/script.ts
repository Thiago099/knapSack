import { ref } from 'vue'
import solve from './algorithms/solve'
const data = JSON.parse(window.localStorage.getItem('data')) || {items:[], max:0}

export const items = ref(data.items)
export const max = ref(data.max)

solve(items.value, max.value)

export function add(index:number)
{
    items.value.splice(index, 0, {
        cost: 0,
        value: 0,
        selected: false
    })
    solve(items.value, max.value)
}

export  function remove(index:number)
{
    items.value.splice(index,1)
    solve(items.value, max.value)
}