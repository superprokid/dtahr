<template>
    <div class="d-flex client_side">
        <Drawer></Drawer>
        <Header></Header>
        <router-view  style="padding-top: 60px"></router-view>
    </div>
</template>

<script src="./ClientSide.js"></script>
<style>
    .client_side{
        width: 100%;
        height: 100%;
    }
</style>