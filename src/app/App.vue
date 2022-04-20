<script setup lang="ts">

import {items, max, add, remove, update, total, save_file, load_file, clear} from './script'

</script>
<style scoped>

@import './style.less';

</style>

<template>
<div class="container">
  <div class="row">
    <div class="row item">
      <div class="form-group col-4">
        <label for="cost" class="cost title">Max:</label>
        <input type="number" id="cost" class="form-control cost" v-model="max" @input="update()"/>
      </div>
      <div class="form-group col-3">
        <label for="cost" class="value title">Total:</label>
        <input type="number" id="cost" class="form-control value" :value="total" disabled/>
      </div>
      <div class="form-group col-5 row">
      <label for="" style="margin-bottom:6px">&nbsp;</label>
        <div class="btn-group">
            <button class="btn btn-warning" @click="load_file">Load <i class="fa fa-download"></i></button>
            <button class="btn btn-info" @click="save_file">Save <i class="fa fa-floppy-o"></i></button>
            <button class="btn btn-primary" @click="update">Update <i class="fa fa-rotate-left"></i></button>
            <button class="btn btn-danger" @click="clear">Clear <i class="fa fa-times"></i></button>
        </div>
      </div>
    </div>
    <div v-for="(item, index) in items" :key="item" class="row item" :class="{'selected':item.selected}">
      <div class="form-group col-4">
        <label for="cost" class="cost title">Cost:</label>
        <input type="number" id="cost" class="form-control cost" v-model="item.cost" @input="update()"/>
      </div>
      <div class="form-group col-4">
        <label for="value" class="value title">Value:</label>
        <input type="number" id="value" class="form-control value" v-model="item.value" @input="update()"/>
      </div>
      <div class="form-group col-4 row" style="vertical-align:middle">
        <label for="" style="margin-bottom:6px">&nbsp;</label>
        <div class="btn-group">
            <button class="btn btn-danger" @click="remove(index)">Remove <i class="fa fa-trash"></i></button>
            <button class="btn btn-success" @click="add(index + 1)">Add <i class="fa fa-plus"></i></button>
        </div>
      </div>
    </div>
    <div class="row">
        <div v-if="items.length == 0">
          <button class="btn btn-success" @click="add(items.length)"><i class="fa fa-plus"></i></button>
        </div>
      </div>
  </div>
</div>
</template>
