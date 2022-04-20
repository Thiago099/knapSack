export default function solve(items, max)
{
    if(items.reduce((previous, current) => previous + current.cost, 0) < max) return {selected:items,calls:0}
    let current_limit = max
    let current_items = [...items].filter(item => item.cost != 0)
    let selected_items = []
    let calls = 0
    while(true)
    {
        let best = {
            weight: -Infinity,
            item: null
        }
        current_items = current_items.filter(item => item.cost <= current_limit)
        for(const subject of current_items)
        {
            // how good is this item?
            let weight = find_weight([subject], subject.cost, subject.value)
            
            function find_weight(items, cost, value)
            {
                calls++
                let weight = value
                const costs = []
                const values = []
                for(const item of current_items)
                {
                    if(!items.includes(item))
                    {
                        if(item.cost > current_limit - cost)
                        {
                            // subtracts every eliminated item
                            weight -= item.value
                            costs.push(item)
                        }
                        else
                        {
                            values.push(item)
                        }
                    }
                }
                // adds the best case value scenario
                if(values.length > 0)
                {
                    let best_weight = -Infinity
                    for(const value of values)
                    {
                        const current_weight = find_weight([...items, ...costs, value], cost + value.cost, value.value)
                        if(current_weight > best_weight)
                        best_weight = current_weight
                    }
                    weight += best_weight
                }
                return weight 
            }
            // finds the best item
            if(weight > best.weight)
            {
                best.item = subject
                best.weight = weight
            }
        }
        if(best.item)
        {
            current_items = current_items.filter(item => item != best.item)
            selected_items.push(best.item)
            current_limit -= best.item.cost
        }
        else break
    }
    return {selected:[...items.filter(item => item.cost == 0),...selected_items], calls}
}