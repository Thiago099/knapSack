<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, computed } from 'vue'

const itens = ref([] as object[])

function add()
{
  itens.value.push({
    cost:0,
    value:0,
  })
}

</script>

<template>
<div class="container" style="margin-top:80px">
  <div class="row">
    <div v-for="item in itens" :key="item" class="row">
      <div class="form-group col-5">
        <label for="cost">Cost:</label>
        <input type="number" id="cost" class="form-control" v-model="item.cost"/>
      </div>
      <div class="form-group col-5">
        <label for="value">Value:</label>
        <input type="number" id="value" class="form-control" v-model="item.value"/>
      </div>
      <div class="form-group col-2" style="vertical-align:middle">
        <div class="row">
          <label for="">&nbsp;</label>
          <div class="col-6">
            <button class="btn btn-danger" @click="calculate">Remove</button>
          </div>
          <div class="col-6">
            <button class="btn btn-success" @click="add">Add</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top:10px">
        <div v-if="itens.length==0">
          <button class="btn btn-success" @click="add">Add</button>
        </div>
      </div>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Cost</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>cost</td>
            <td>value</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<style>

</style>
