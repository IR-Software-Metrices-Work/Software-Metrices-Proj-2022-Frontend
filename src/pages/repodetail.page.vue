<template>
    <div class="lg:mx-80 lg:my-6 lg:px-3">
        <p class="text-primary text-3xl py-3">{{ owner }}<span>/</span>{{ repo }}</p>
        <div class="overflow-x-auto">
            <table class="table w-full">
                <!-- head -->
                <thead>
                    <tr>
                        <th></th>
                        <th>Topic</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <td>repository name</td>
                        <td>{{repoName}}</td>
                    </tr>
                    <tr>
                        <th>2</th>
                        <td>repo Description</td>
                        <td>{{repoDescription}}</td>
                    </tr>
                    <tr>
                        <th>3</th>
                        <td>Star</td>
                        <td>{{repoStar}}</td>
                    </tr>
                    <tr>
                        <th>4</th>
                        <td>is repository archived</td>
                        <td>{{isArchive}}</td>
                    </tr>
                    <tr>
                        <th>5</th>
                        <td>repository size</td>
                        <td>{{size}}</td>
                    </tr>
                    <tr>
                        <th>6</th>
                        <td>has wiki</td>
                        <td>{{hasWiki}}</td>
                    </tr>
                    <tr>
                        <th>7</th>
                        <td>has project</td>
                        <td>{{hasProject}}</td>
                    </tr>
                    <tr>
                        <th>8</th>
                        <td>has issues</td>
                        <td>{{hasIssues}}</td>
                    </tr>
                    <tr>
                        <th>9</th>
                        <td>create At</td>
                        <td>{{dayjs(createdAt).format("DD MMMM YYYY")}}</td>
                    </tr>
                    <tr>
                        <th>10</th>
                        <td>update At</td>
                        <td>{{dayjs(updateAt).format("DD MMMM YYYY")}}</td>
                    </tr>
                    <tr>
                        <th>11</th>
                        <td>last update</td>
                        <td>{{dayjs().subtract(createdAt)}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import githubClient from '@/service/githubClient';
import dayjs from 'dayjs';
const props = defineProps({
    owner: {
        type: String,
        default: "oat431",
    },
    repo: {
        type: String,
        default: "oat431"
    }
})

const repoName = ref("");
const repoDescription = ref("");
const repoStar = ref(0);
const isArchive = ref(false);
const size = ref(0);
const hasWiki = ref(false);
const hasProject = ref(false);
const hasIssues = ref(false);
const createdAt = ref("");
const updateAt = ref("");

onMounted(async () => {
    const res = await githubClient.getRepository(props.owner, props.repo);
    repoName.value = res.data.name;
    repoDescription.value = res.data.description;
    repoStar.value = res.data.stargazers_count;
    isArchive.value = res.data.archived;
    size.value = res.data.size;
    hasWiki.value = res.data.has_wiki;
    hasProject.value = res.data.has_projects;
    hasIssues.value = res.data.has_issues;
    createdAt.value = res.data.created_at;
    updateAt.value = res.data.updated_at;

})

</script>