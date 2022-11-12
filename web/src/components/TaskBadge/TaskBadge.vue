<template>
  <div
    class="category d-flex align-items-center"
    :style="`background-color: ${hexToRgbA(color,0.4)}`"
  >
    <span class="category_dot" :style="`background-color: ${color}`"></span>
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script>

export default {

  props: {
    color: {
      type: String,
      default: "teal"
    }
  },

  methods: {
      hexToRgbA(hex,opacity){
      let c;
      if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
          c= hex.substring(1).split('');
          if(c.length== 3){
              c= [c[0], c[0], c[1], c[1], c[2], c[2]];
          }
          c= '0x'+c.join('');
          return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+ opacity +')';
      }
      throw new Error('Bad Hex');
    }
  }
};
</script>

<style scoped>
.category{
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-size:.75rem;
  height: 1.5rem;
  font-weight: 600;
  border-radius: 9999px;
}

.category_dot{
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.25rem;
  border-radius: 9999px;
}
</style>