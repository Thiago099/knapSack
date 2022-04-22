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
Array.prototype.groupBy = function(key) {
    return this.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

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

    if(non_zero_cost.reduce((previous, current) => previous + current.cost,0) <= max) return {selected:items,calls:items.length}


    const grouped = non_zero_cost.groupBy('cost')
    const length = []
    const keys = Object.keys(grouped)
    for(const group of keys)
    {
        grouped[group] = grouped[group].sort((a,b) => {
            calls++
            return b.value - a.value
        })
    }

    let best = {
        value: -Infinity,
        items: []
    }
    
    find()

    function find(i = 0, stack = [], cost = 0, value = 0)
    {
        for(let j = i; j < keys.length; j++)
        {
            const current_stack = [...stack, j]
            if(expand(current_stack.map(item => grouped[keys[item]])))
                find(j + 1, current_stack)
        }
    }
    
    function expand(stack)
    {
        if(stack.length == 0) return true
        const max_len = stack.map(item => item.length)
        console.log(max_len)
        const divisor = [1]
        let length = 0

        for(let i = 0; i < max_len.length; i++)
        {
            length = max_len[i] * divisor[i]
            divisor.push(length)
        }
        const possibilities = []
        for(let i = 0; i < length; i++)
        {
            const line = []
            for(let k = 0; k < max_len.length; k++)
                line.push(Math.trunc((i / divisor[k]) % max_len[k] + 1))
            possibilities.push(line)
        }
        let keep_branch = false
        for(const possibility of possibilities)
        {
            calls++
            let total_value = 0
            let total_cost = 0
            let overflow = false
            let total_items = []
            for(let i = 0; i < possibility.length; i++)
            {
                for(let k = 0; k < possibility[i]; k++)
                {
                    const current = stack[i][k]
                    total_cost += current.cost
                    if(total_cost > max) 
                    {
                        overflow = true
                        break
                    }
                    total_items.push(current)
                    total_value += current.value
                }
                if(overflow) break
            }
            if(!overflow)
            {
                keep_branch = true
                if(total_value > best.value)
                {
                    best = {
                        value: total_value,
                        items: total_items
                    }
                }
            }
        }
        return keep_branch
    }
    
    return {selected:[...zero_cost,...best.items], calls};
}