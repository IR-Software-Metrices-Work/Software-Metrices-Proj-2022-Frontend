<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">{{header}}</h1>
        <!-- Searchbar Start -->
        <input type="text" v-model="input" placeholder="Search..."/>
        <button class="btn" type="submit">Search</button>
        <div class="item object" v-for="object in filteredList()" :key="object">
          <p>{{ object }}</p>
        </div>
        <div class="notfound" v-if="input&&!filteredList().length">
          <p>No result found!</p>
        </div>
        <!-- Searchbar End -->
        <p class="py-6 text-md">
          This template using a Vue3 + VueUse + Vite + TailwindCSS + DaisyUI
        </p>
        <p class="py-6 text-md">
          {{ now }}
        </p>
        <button class="btn btn-ghost">
          <a class="link link-primary" href="https://daisyui.com/">
            learn more on daisy ui
          </a>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNow } from "@vueuse/core";
import { ref } from "vue";

const now = useNow()

const props = defineProps({
  header: String
})

let input = ref("");
const objects = ["javascript","c++"];
function filteredList() {
  return objects.filter((object) => 
    object.toLowerCase().includes(input.value.toLowerCase()));
}
</script>

<style>
input {
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("src/assets/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
.item {
  width: 350px;
  margin: 0 auto 10px auto;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
.object {
  background-color: white;
  cursor: pointer;
}
.notfound{
  background-color: tomato;
}
</style>