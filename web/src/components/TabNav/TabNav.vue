<template>
  <div>
    <md-tabs md-alignment="left">
      <md-tab
        v-for="(value, index) in tabItems"
        :key="index"
        :md-label="value.tabName"
      >
        <component :is="value.tabContent"></component>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  props: ["tabItems"],
  name: "TabNav",
};
</script>
