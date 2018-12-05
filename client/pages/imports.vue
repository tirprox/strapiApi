<template>
    <section class="container-fluid border-bottom pl-5 pr-5 pb-4 pt-4">
      <div class="row align-items-center">


        <div class="col-md-12">
          <h6>WP All Import</h6>
          <a href="#" class="btn btn-primary" @click="importAssortment()">Assortment DW New</a>
        </div>

      </div>
    </section>
</template>

<script>
  //import strapi from '~/plugins/strapi-client'

  import axios from 'axios'

  export default {
    data() {
      return {


      }
    },
    methods: {

      importAssortment() {

        axios.get('https://new.dreamwhite.ru/wp-cron.php?import_key=b504KBpDIN&import_id=1&action=trigger')
          .then(function (response) {
            console.log(response)
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });

      },

    },
    computed: {

    }
  }

</script>
