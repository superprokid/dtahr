<template>
    <div class="d-flex client_side">
        <div style="width: 10%;height:100%;background-color: aqua;">
        123012983120938213
        </div>
        <router-view></router-view>
    </div>
</template>
  
<script>
export default {
    name: 'ClientSide',
};
</script>



<script src="./ClientSide.js"></script>
<style>
    .client_side{
        width: 100%;
        height: 100%;
    }
</style>