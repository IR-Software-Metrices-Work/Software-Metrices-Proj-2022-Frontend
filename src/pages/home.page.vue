<template>
    <div class="lg:mx-80 lg:my-6 lg:px-3">
        <input type="text" v-model="query" placeholder="Search repository" class="input input-bordered mx-3" />
        <select class="select select-bordered" v-model="language">
            <option disabled selected>Pick Language</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
        </select>
        <button class="btn btn-square btn-primary text-base-100 mx-3 px-10" @click="search">Search</button>
        <p class="px-3">word : {{query}} | language : {{language}}</p>
    </div>
    <div class="grid grid-cols-2 gap-4 lg:mx-80 lg:my-6 lg:px-3">
        <RepoBox
            v-for="repo in result"
            :key="repo.id"
            :owner="repo.owner.login"
            :reponame="repo.name"
            :description="repo.description"
            :avatar="repo.owner.avatar_url"
            :full_url="repo.html_url"
        />
    </div>
</template>

<script setup>
import githUbClient from '@/service/githubClient';
import RepoBox from '@/components/repobox.vue';
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