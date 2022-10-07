<template>
    <div class="lg:mx-80 lg:my-6 lg:px-3">
        <input type="text" v-model="query" placeholder="Search repository" class="input input-bordered mx-3" />
        <select class="select select-bordered" v-model="language">
            <option disabled selected>Pick Language</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
        </select>
        <button class="btn btn-square mx-3 px-10" @click="search">Search</button>
        <p class="px-3">word : {{query}} | language : {{language}}</p>
    </div>
    <div class="lg:mx-80 lg:my-6 lg:px-3">
        <p v-for="item in result">
            {{item.owner.login}}/{{item.name}}
            <a class="text-primary" :href=item.html_url target="_blank">link</a>
            <router-link class="text-secondary" :to='{name:"Repo",params:{owner:item.owner.login,repo:item.name}}' > Details</router-link>
        </p>
    </div>
</template>

<script setup>
import githUbClient from '@/service/githubClient';
import { ref } from 'vue';

const result = ref([]);
const query = ref("");
const language = ref("");

const search = async () => {
    if(query.value == ""){
        alert("Please input query");
        return;
    }
    if(language.value == ""){
        alert("Please select language");
        return;
    }
    const res = await githUbClient.searchRepositories(query.value,language.value)
    result.value = res.data.items;
}
</script>