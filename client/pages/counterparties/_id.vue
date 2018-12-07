<template>
  <div>
    <section class="container-fluid pl-5 pr-5 pb-4 pt-4">
      <div class="row">

      </div>
    </section>

  </div>

</template>

<script>
  let VueEditor
  if (process.browser) {
    VueEditor = require('vue2-editor').VueEditor
  }

  import strapi from '~/plugins/strapi-client'
  export default {

    data() {
      return {

      }
    },

    components: {VueEditor},




  }
</script>


