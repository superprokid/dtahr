<template>
    <div id="project-page">
        <v-app style="background-color: whitesmoke !important">
            <v-container>
                <v-row class="page-title">
                    PROJECTS
                </v-row>
                <v-row class="card-project-container my-5" v-for="(project, index) in listProjects" :key="index" @click="redirect(project)">
                    <div style="width: fit-content">
                        <v-icon color="#154c79">
                            mdi-application-brackets
                        </v-icon>
                    </div>
                    <div class="card-project-name">{{ project.project_name }}</div>
                </v-row>
            </v-container>
        </v-app>
    </div>
</template>
  
  
<script src="./Project.js">
</script>
  
<style scoped>
#project-page {
    height: 100vh;
    width: 100%;
    overflow: auto;
    background-color: whitesmoke;
}

.page-title {
    font-size: large;
    color: #448aff;
    font-weight: bold;
    margin: 10px 0px;
}

.card-project-container {
    background: white;
    border: 1px solid #154c79;
    color: #154c79;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.card-project-container:hover {
    background: #dcdee0;
    cursor: pointer;
}

.card-project-container .card-project-name {
    max-width: 200px;
    font-size: 18px;
    font-weight: 500;
}
</style>
  