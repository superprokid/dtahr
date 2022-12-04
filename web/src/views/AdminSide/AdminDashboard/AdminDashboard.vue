<!-- eslint-disable -->
<template>
    <div class="d-flex justify-center " style="width: 100%; height: 100%; ">
        <v-container>
            <v-progress-circular :rotate="-90" :size="100" :width="15" :value="value" color="primary">
                {{ value }}
            </v-progress-circular>
        </v-container>

    </div>


</template>

<script src="./AdminDashboard.js"></script>

<style scoped>
.v-progress-circular {
    margin: 1rem;
}
</style>