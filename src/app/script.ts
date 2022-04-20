import { ref } from 'vue'
import update from './algorithms/solve'
const data = JSON.parse(window.localStorage.getItem('data')) || {items:[], max:0}

export const items = ref(data.items)
export const max = ref(data.max)

update(items.value, max.value)

export function add(index:number)
{
    items.value.splice(index, 0, {
        cost: 0,
        value: 0,
        selected: false
    })
    update(items.value, max.value)
}

export  function remove(index:number)
{
    items.value.splice(index,1)
    update(items.value, max.value)
}