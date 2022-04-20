<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, computed } from 'vue'
interface item{
  cost : number
  value : number
  selected: boolean
}
interface best{
  weight: number
  item: item
}
const data = JSON.parse(window.localStorage.getItem('data')) || {items:[], max:0}
const items = ref(data.items)
const max = ref(data.max)
update()

function add(index:number)
{
  items.value.splice(index,0,{
    cost:0,
    value:0,
    selected:false
  })
  update()
}

function remove(index:number)
{
  items.value.splice(index,1)
  update()
}
function update()
{
  console.clear()

  let current_limit = max.value
  let current_items = [...items.value] as item[]
  current_items.map(item => item.selected = false)
  while(true)
  {
      
      let best : best = {
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
  window.localStorage.setItem('data',JSON.stringify({items:items.value,max:max.value}))
}
</script>
<style scoped>
.selected{
  border: 1px solid green;
}
.item{
  padding: 10px;
  padding-bottom:20px;
  border-radius: 10px;
  margin: 10px;
}
</style>

<template>
<div class="container" style="margin-top:80px">
  <div class="row">
    <div class="form-group col-10"  style="margin-left:20px;">
      <label for="cost">Max:</label>
      <input type="number" id="cost" class="form-control" v-model="max" @input="update"/>
    </div>
    <div v-for="(item, index) in items" :key="item" class="row item" :class="{'selected':item.selected}">
      <div class="form-group col-5">
        <label for="cost">Cost:</label>
        <input type="number" id="cost" class="form-control" v-model="item.cost" @input="update"/>
      </div>
      <div class="form-group col-5">
        <label for="value">Value:</label>
        <input type="number" id="value" class="form-control" v-model="item.value" @input="update"/>
      </div>
      <div class="form-group col-2" style="vertical-align:middle">
        <div class="row">
          <label for="">&nbsp;</label>
          <div class="col-6"> 
            <button class="btn btn-danger" @click="remove(index)">Remove</button>
          </div>
          <div class="col-6">
            <button class="btn btn-success" @click="add(index + 1)">Add</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top:10px;margin:10px">
        <div v-if="items.length == 0">
          <button class="btn btn-success" @click="add(items.length)">Add</button>
        </div>
      </div>
  </div>
</div>
</template>

<style>

</style>
