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
    const ids = []
    for(const id in items) ids.push(id)

    for(let i = 0; i < items.length ; i++)
    {
        find(i,[i], items[i].cost, items[i].value)
        function find(i, stack, cost, value)
        {
            for(let j = i + 1; j < items.length; j++)
            {
                console.log(cost, value)
                find(j, [...stack, j], cost + items[j].cost, value + items[j].value)
            }
        }
    }
    
    return {selected:items, calls};
}