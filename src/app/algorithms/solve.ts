// function uniloop(array) {
//     for(let i = 0; i < array.length ; i++)
//     {
//         find(i,[i])
//         function find(i, stack)
//         {
//             for(let j = i + 1; j < array.length; j++)
//             {
//                 const cur = [...stack, j]
//                 console.log(cur)
//                 find(j, cur)
//             }
//         }
//     }
// }
export default function solve(items, max)
{
    console.clear();
    let calls = 0

    const non_zero_cost = []
    const zero_cost = []

    for(const item of items)
    {
        if(item.cost == 0)
        {
            zero_cost.push(item)
        }
        else
        {
            non_zero_cost.push(item)
        }
    }

    if(non_zero_cost.reduce((previous, current) => previous+current.cost,0) <= max) return {selected:items,calls:items.length}

    const best = {
        value: -Infinity,
        items: [],
    }

    find()
    function find(i = -1, stack = [], cost = 0, value = 0)
    {
        calls++
        for(let j = i + 1; j < non_zero_cost.length; j++)
        {
            const current_cost = cost + non_zero_cost[j].cost
            if(current_cost <= max)
            {
                const current_value = value + non_zero_cost[j].value
                const current_items = [...stack, j]
                if(current_value > best.value)
                {
                    best.value = current_value
                    best.items = current_items
                }
                find(j, current_items, current_cost , current_value)
            }
        }
    }
    best.items = best.items.map(i => items[i])
    
    return {selected:[...zero_cost,...best.items], calls:calls+items.length};
}