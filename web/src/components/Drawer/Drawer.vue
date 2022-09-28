<template>
    <v-navigation-drawer id="my-drawer" permanent :src="''">
        <v-list dense nav>
            <v-list-item v-for="item in items" :key="item.id" link @click="redirect(item)" :class="item.id === currentTab ? 'drawer-item-active' : 'drawer-item'">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content style="margin-left: 10px">
                    <v-list-item-title >{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script src="./Drawer.js">

</script>

<style src="./Drawer.css" scoped>

</style>