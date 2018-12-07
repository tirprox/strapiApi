<template>
  <section class="container-fluid border-bottom pl-5 pr-5 pb-4 pt-4">
    <div class="row align-items-center">
      <div class="col-md-12">
        <table class="table  table-striped  table-bordered  ">
          <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">MS id</th>
            <th scope="col">Телефон</th>
            <th scope="col">Email</th>
          </tr>
          </thead>
          <tbody>
          <tr >
            <td><input v-model="queryName" type="text" class="form-control" placeholder="Фильтр..."></td>
            <td><input v-model="queryMSID" type="text" class="form-control" placeholder="Фильтр..."></td>
            <td><input v-model="queryPhone" type="text" class="form-control" placeholder="Фильтр..."></td>
            <td><input v-model="queryEmail" type="text" class="form-control" placeholder="Фильтр..."></td>

          </tr>

          <tr  v-for="counterparty in filteredList" :key="counterparty.id" >
            <td><nuxt-link :to="{ name: 'counterparties-id', params: { id: counterparty.id}}" class="" tag="a">{{ counterparty.name }}</nuxt-link></td>
            <td>{{counterparty.msid}}</td>
            <td>{{counterparty.phone}}</td>
            <td>{{counterparty.email}}</td>

          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
  import strapi from '~/plugins/strapi-client';


  export default {
    data() {
      return {
        queryName: '',
        queryMSID: '',
        queryPhone: '',
        queryEmail: '',

      };
    },
    async asyncData(context) {
      context.store.commit('counterparties/emptyList');
      const response = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            counterparties {
              _id
              msid
              name
              phone
              email
            }
           }
          `
        }
      });
      response.data.counterparties.forEach(counterparty => {
        context.store.commit('counterparties/add', {
          id: counterparty.id || counterparty._id,
          ...counterparty
        });
      });

      return response;
    },
    computed: {
      filteredList() {
        let result = this.counterparties

        if (this.queryName !== '') {
          result = result.filter(counterparty => {
            return counterparty.name.toLowerCase().includes(this.queryName.toLowerCase());
          });
        }
        if (this.queryEmail !== '') {
          result = result.filter(counterparty => {
            return counterparty.email.toLowerCase().includes(this.queryEmail.toLowerCase());
          });
        }
        if (this.queryPhone !== '') {
          result = result.filter(counterparty => {
            let phone = counterparty.phone.replace(/[ -]/g, "");
            return phone.includes(this.queryPhone);
          });
        }
        if (this.queryMSID !== '') {
          result = result.filter(counterparty => {
            return counterparty.msid.includes(this.queryMSID);
          });
        }

        return result
      },
      counterparties() {
          return this.$store.getters['counterparties/list']
      }
    },

  };

</script>
