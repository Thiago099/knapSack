import { ref, computed } from 'vue'
import solve from './algorithms/solve'

const data = JSON.parse(window.localStorage.getItem('data')) || {items:[], max:0}

export const items = ref(data.items)
export const max = ref(data.max)

export function add(index : number)
{
    items.value.splice(index, 0, {
        cost: 0,
        value: 0,
        selected: false
    })
    update()
}

export function remove(index : number)
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
    items.value
        .filter(item => item.selected)
        .reduce((previous, current) => previous + current.value, 0)
)

export function save_file()
{
    const data = max.value + '\n' + items.value.map(item => `${item.cost} ${item.value}`).join('\n')
    const blob = new Blob([data], {type: 'text/plain'})
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'data.txt'
    link.click()
    link.remove()
}

export function load_file()
{
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = (event : any) => {
        const file = (event.target as HTMLInputElement) .files[0]
        const reader = new FileReader()
        reader.onload = (event) => {
            const data = (reader.result as string) .split('\n')
            max.value = parseInt(data[0])
            items.value = data.slice(1).map(line => {
                const [cost, value] = line.split(' ')
                return {
                    cost: parseInt(cost),
                    value: parseInt(value),
                    selected: false
                }
            })
            update()
        }
        reader.readAsText(file)
    }
    input.click()
    input.remove()
}