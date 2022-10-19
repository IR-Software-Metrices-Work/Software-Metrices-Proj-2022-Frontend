<template>
    <div class="lg:mx-80 lg:my-6 lg:px-3">
        <p class="text-primary text-3xl py-3">{{ owner }}<span>/</span>{{ repo }} <span class="text-secondary text-sm">{{projectSize()}}</span></p>
        <p class="text-primary text-xl py-3">Repository Summary</p>
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <!-- head -->
                <thead>
                    <tr>
                        <th></th>
                        <th>Topic</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <td>Document Comprehensibility</td>
                        <td>{{ documentCop() }}</td>
                    </tr>
                    <tr>
                        <th>2</th>
                        <td>Build Resuability</td>
                        <td>{{ buildResuablity() }}</td>
                    </tr>
                    <tr>
                        <th>3</th>
                        <td>Team Activeness</td>
                        <td>{{ teamActiveness() }}</td>
                    </tr>
                    <tr>
                        <th>4</th>
                        <td>Code Comprehensibility</td>
                        <td>WIP</td>
                    </tr>
                    <tr>
                        <th>5</th>
                        <td>Code Reusability</td>
                        <td>WIP</td>
                    </tr>
                    <tr>
                        <th>6</th>
                        <td>Test Quality</td>
                        <td>WIP</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="collapse">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">
                <span class="text-primary">Show Repository Details</span>
            </div>
            <div class="collapse-content">
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
                                <td>{{dayjs().diff(updateAt,'day')}} day</td>
                            </tr>
                            <tr>
                                <th>12</th>
                                <td>linesOfCode</td>
                                <td>{{LOC}}</td>
                            </tr>
                            <tr>
                                <th>13</th>
                                <td>has MarkDown</td>
                                <td>{{hasMarkdown}}</td>
                            </tr>
                            <tr>
                                <th>14</th>
                                <td>has DockerFile</td>
                                <td>{{hasDockerFile}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
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
const LOC = ref(0);
const hasMarkdown = ref(false);
const hasDockerFile = ref(false);
const hasXML = ref(false);
const hasGradle = ref(false);
const hasJson = ref(false);

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

    const res2 = await githubClient.getLOCData(props.owner, props.repo);
    for (let i = 0; i < res2.data.length; i++) {
        if (res2.data[i].language == "Java") {
            LOC.value = res2.data[i].linesOfCode;
        }
        if (res2.data[i].language == "C#") {
            LOC.value = res2.data[i].linesOfCode;
        }
        if (res2.data[i].language == "Markdown") {
            hasMarkdown.value = true;
        }
        if (res2.data[i].language == "Dockerfile") {
            hasDockerFile.value = true;
        }
        if(res2.data[i].language == "XML"){
            hasXML.value = true;
        }
        if(res2.data[i].language == "Gradle"){
            hasGradle.value = true;
        }
        if(res2.data[i].language == "JSON"){
            hasJson.value = true;
        }
    }
})

const teamActiveness = () => {
    let dayUpdate = dayjs().diff(updateAt.value, 'day');
    if (dayUpdate <= 4) {
        return "Very Active";
    }
    if (dayUpdate > 4 && dayUpdate <= 10) {
        return "Active";
    }
    if (dayUpdate > 10 && dayUpdate <= 20) {
        return "Not Active";
    }
    return "Abandon";
}

const buildResuablity = () => {
    if (hasDockerFile.value && (hasXML.value || hasGradle.value || hasJson.value) ) {
        return "High";
    }
    if(hasDockerFile.value){
        return "Medium";
    }
    if(hasXML.value || hasGradle.value || hasJson.value){
        return "Medium";
    }
    return "Low";
}

const documentCop = () => {
    if (hasMarkdown.value && hasWiki.value) {
        return "High";
    }
    return "Low";
}

const projectSize = () => {
    if (size <= 1500) {
        return "Very Small Project";
    } else if (size > 1500 && size <= 5500) {
        return "Small Project";
    } else if (size > 5500 && size <= 25000) {
        return "Medium Project";
    } else if (size > 25000 && size <= 55000) {
        return "Large Project";
    } else if (size > 55000 && size <= 100000) {
        return "Very Large Project";
    } 
    return "Huge Project";
}

const cocomo = () => {
}

const basicModel = () => {

}

const intermediateModel = () => {

}


</script>