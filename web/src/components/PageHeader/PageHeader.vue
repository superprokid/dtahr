
<script src="./PageHeader.js" ></script>
<style src="./PageHeader.css"></style>

<template>
  <div>
    <header class="page-header">
      <img id="page-header-logo" :src="logoUrl" alt="Hachi-X" />
      <span>{{ pageHeaderContent }}</span>
    </header>
  </div>
</template>
