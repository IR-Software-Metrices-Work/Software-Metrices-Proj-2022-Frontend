<template>
    <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img :src="avatar" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">
                {{ owner }}<span>/</span>{{ reponame }}
            </h2>
            <p>{{description}}</p>
            <div class="card-actions justify-end">
                <div class="badge badge-outline p-3">
                    <a class="text-primary text-xl" :href=full_url target="_blank">GitHub</a>
                </div>
                <div class="badge badge-outline p-3">
                    <router-link class="text-secondary text-xl" :to='{name:"Repo",params:{owner:owner,repo:reponame}}' >Details</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    avatar: {
        type: String,
        default: "",
    },
    reponame: {
        type: String,
        default: ""
    },
    owner : {
        type: String,
        default: "",
    },
    description : {
        type: String,
        default: "",
    },
    full_url : {
        type: String,
        default: "",
    },
})
</script>