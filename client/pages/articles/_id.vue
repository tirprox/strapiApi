<template>
<div>
  <section class="container-fluid  border-bottom pl-5 pr-5 pb-4 pt-4">
    <div class="row">
      <div class="col-md-6 ">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-white p-0 m-0">
            <li class="breadcrumb-item" aria-current="page"><nuxt-link class="" to="/article-list" tag="a">Список артикулов</nuxt-link></li>
            <li class="breadcrumb-item active" aria-current="page">{{ name }}</li>
          </ol>
        </nav>
      </div>
    </div>
  </section>
  <section class="container-fluid border-bottom pl-5 pr-5 pb-4 pt-4">
    <div class="row">
      <div class="col-md-6">
        <no-ssr placeholder="Loading Your Editor...">
          <vue-editor
            v-model="data.article.description">
          </vue-editor>
        </no-ssr>

      </div>

      <div class="col-md-6">
        <button class="btn btn-primary mb-3" @click="update()">Обновить</button>
        <nuxt-link class="btn btn-secondary mb-3" to="/article-list" tag="a">Назад</nuxt-link>
        <b-alert variant="success"
                 fade
                 dismissible
                 :show="successAlert"
                 @dismissed="successAlert=false">
          Описание обновлено!
        </b-alert>

        <b-alert variant="danger"
                 fade
                 dismissible
                 :show="errorAlert"
                 @dismissed="errorAlert=false">
          Произошла ошибка! Ничего не работает!
        </b-alert>

      </div>

    </div>
  </section>
  <section  class="container-fluid bg-white border-bottom pl-5 pr-5 pt-2 pb-2">
    <div class="row d-flex align-items-baseline">
      <div class="col-md-4">
        <span>Товаров: {{productCount}}</span>
      </div>
      <div class="col-md-2">
        <input v-model="query" type="text" class="form-control" placeholder="Фильтр...">
      </div>
      <div class="col-md-6">
        <b-form-checkbox id="noDescription" v-model="noDescription">
          Без описания
        </b-form-checkbox>
        <b-form-checkbox id="uniqueDescription" v-model="uniqueDescription">
          Уникальные описания
        </b-form-checkbox>
      </div>
    </div>
  </section>
  <section v-if="filteredList.length" class="container-fluid bg-light border-bottom pl-5 pr-5">

    <div class="row pt-4 pb-4">
      <div  v-for="product in filteredList" :key="product.id" class="col-md-2 mb-4">
        <ProductCard :product="product"></ProductCard>
      </div>
    </div>
  </section>
</div>

</template>

<script>
  let VueEditor
  if (process.browser) {
    VueEditor = require('vue2-editor').VueEditor
  }

  import ProductCard from '~/components/ProductCard.vue'
  import strapi from '~/plugins/strapi-client'

  export default {

    components: {
      VueEditor,
      ProductCard
    },
    data() {
      return {
        query: '',
        successAlert: false,
        errorAlert: false,

        noDescription: false,
        uniqueDescription: false,
      }
    },

    async asyncData(context) {
      context.store.commit('products/emptyList')
      const response = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            article(id: "${context.params.id}") {
              name
              description
              products {
              _id
               msid
               name
               description
               uniqueDescription
               primaryPhoto
              }
            }
          }
          `
        }
      })
      response.data.article.products.forEach(product => {
        context.store.commit('products/add', {
          id: product.id || product._id,
          ...product
        })
      })

      return response
    },

    methods: {
      async update() {
        try {
          await strapi.updateEntry('articles', this.id, {
            description: this.data.article.description,
          })
          this.successAlert = true
          setTimeout(() => {this.successAlert = false}, 2000)
        } catch (err) {
          this.errorAlert =  true
        }
      },
    },

    computed: {


      id() {
        return this.$route.params.id
      },
      name() {
        return this.data.article.name
      },
      description() {
        return this.data.article.description
      },

      productCount() {
        return this.products.length
      },

      filteredList() {
        return this.products.filter(product => {
          return product.name.toLowerCase().includes(this.query.toLowerCase())
        })
      },


      products() {
        if (this.noDescription && this.uniqueDescription) {
          return this.$store.getters['products/noAndUniqueDescription']
        }
        else if (this.noDescription) {
          return this.$store.getters['products/noDescription']
        }
        else if (this.uniqueDescription) {
          return this.$store.getters['products/uniqueDescription']
        }
        else {
          return this.$store.getters['products/list']
        }

      }
    },
  }
</script>

<style>
  .card-text p {
    margin-bottom: 0
  }

  /* Transitions using the page hook */


</style>
