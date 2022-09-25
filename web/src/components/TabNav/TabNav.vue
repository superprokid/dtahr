<template>
  <div>
    <md-tabs md-alignment="left">
      <md-tab
        v-for="(value, index) in tabItems"
        :key="index"
        :md-label="value.tabName"
      >
        <component :is="value.tabContent" style="overflow-y: auto; height: 85vh; padding-top: 0;" :tabData="tabData"></component>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  props: ["tabItems", "tabData"],
  name: "TabNav",
};
</script>
