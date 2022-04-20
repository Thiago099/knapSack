export default function solve(items, max)
{
    let current_limit = max
    let current_items = [...items]
    current_items.map(item => item.selected = false)
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
            if(subject.value > best.item.value)
            {
                best.item = subject
            }
            }
            else
            if(weight > best.weight)
            {
                best.item = subject
                best.weight = weight
            }
        }
        if(best.item)
        {
            current_items = current_items.filter(item => item != best.item)
            best.item.selected = true
            current_limit -= best.item.cost
        }
        else break
    }
    window.localStorage.setItem('data',JSON.stringify({items:items,max:max}))
}