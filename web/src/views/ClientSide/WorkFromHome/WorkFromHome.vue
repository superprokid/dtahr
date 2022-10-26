<template>
    <div class="wfh-main-container">
        <TabNav v-if="tabItems" :tabItems="tabItems" :tabData="tabData"/>
    </div>
</template>

<script src="./WorkFromHome.js"></script>

<style scoped>
.wfh-main-container {
    background-color: whitesmoke;
    padding: 1.5%;
    height: 100vh;
    width: 100vw;
  }
</style>