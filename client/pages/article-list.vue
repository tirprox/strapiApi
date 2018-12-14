<template>
  <div>
    <section class="container-fluid border-bottom pl-5 pr-5 pb-4 pt-4">
      <div class="row align-items-center">
        <div class="col-md-2 offset-md-4">
            <input v-model="query" type="text" class="form-control" placeholder="Фильтр...">
        </div>
        <div class="col-md-4">
          <b-form-checkbox id="checkbox1" v-model="noDescription">
            Без описания
          </b-form-checkbox>
          <b-form-checkbox id="checkbox2" v-model="asList">
            Список
          </b-form-checkbox>
        </div>
        <div class="col-md-1">

        </div>
      </div>
    </section>

    <section v-if="filteredList.length > 0 & !asList" class="container-fluid bg-light border-bottom pl-5 pr-5">
      <div class="row  pt-5 pb-5">
        <p v-if="!filteredList.length">No results :(</p>
        <div  v-for="article in filteredList" :key="article.id"  class="col-md-2 mb-4">
          <nuxt-link :to="{ name: 'articles-id', params: { id: article.id}}" class="btn btn-secondary w-100" tag="a">
            <span class="">{{ article.name }} [{{article.products.length}}]</span>

          </nuxt-link>
        </div>
      </div>
    </section>

    <section v-if="filteredList.length > 0 & asList" class="container  border-bottom pl-5 pr-5">
      <div class="row  pt-4 pb-3">

        <p v-if="!filteredList.length">No results :(</p>
        <table class="table  table-striped  table-bordered  ">
          <thead>
          <tr>
            <th scope="col">Артикул</th>
            <th scope="col">Описание</th>
            <th scope="col">Количество</th>
          </tr>
          </thead>
          <tbody>
          <tr  v-for="article in filteredList" :key="article.id" >
            <td><nuxt-link :to="{ name: 'articles-id', params: { id: article.id}}" class="btn btn-secondary w-100" tag="a">{{ article.name }}</nuxt-link></td>
            <td v-html="article.description"><div ></div></td>
            <td>{{article.products.length}}</td>

          </tr>
          </tbody>
        </table>


      </div>
    </section>
  </div>

</template>

<script>
  import strapi from '~/plugins/strapi-client'

  export default {
    data() {
      return {
        query: '',
        noDescription: false,
        asList: false
      }
    },
    async asyncData(context) {
      context.store.commit('articles/emptyList')
      const response = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            articles (limit: 500) {
            _id
              name
              description
              products {
                _id
              }

            }
          }
          `
        }
      })
      response.data.articles.forEach(article => {
        context.store.commit('articles/add', {
          id: article.id || article._id,
          ...article
        })
      })
      return response

    },

    computed: {

      filteredList() {
        return this.articles.filter(article => {

          return article.name.toLowerCase().includes(this.query.toLowerCase())
        })
      },


      articles() {
        if (this.noDescription) {
          return this.$store.getters['articles/noDescription']
        }
        else {
          return this.$store.getters['articles/list']
        }
      }
    },

  }
</script>
