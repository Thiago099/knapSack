export default function solve(items, max)
{
    let current_limit = max
    let current_items = [...items]
    let selected_items = []
    current_items.map(item => item.weight = item.value - item.cost)
    while(true)
    {
        let best = {
            weight: -Infinity,
            item: null
        }
        current_items = current_items.filter(item => item.cost <= current_limit)
        for(const subject of current_items)
        {
            let weight = subject.value
            
            for(const item of current_items)
            {
                if(item != subject)
                {
                    if(item.cost > current_limit - subject.cost)
                    {
                        weight -= item.value
                    }
                    else
                    {
                        weight += item.value
                    }
                }
            }
            if(weight == best.weight)
            {
                if(subject.weight > best.item.weight)
                {
                    best.item = subject
                }
            }
            else if(weight > best.weight)
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
    return selected_items
}