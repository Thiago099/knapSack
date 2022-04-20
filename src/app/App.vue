<script setup lang="ts">

import {items, max, add, remove, update} from './script'

</script>
<style scoped>

@import './style.less';

</style>

<template>
<div class="container" style="margin-top:80px">
  <div class="row">
    <div class="form-group col-10"  style="margin-left:20px;">
      <label for="cost">Max:</label>
      <input type="number" id="cost" class="form-control" v-model="max" @input="update()"/>
    </div>
    <div v-for="(item, index) in items" :key="item" class="row item" :class="{'selected':item.selected}">
      <div class="form-group col-5">
        <label for="cost">Cost:</label>
        <input type="number" id="cost" class="form-control" v-model="item.cost" @input="update()"/>
      </div>
      <div class="form-group col-5">
        <label for="value">Value:</label>
        <input type="number" id="value" class="form-control" v-model="item.value" @input="update()"/>
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
