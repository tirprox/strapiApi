<template>
  <div>
    <section class="container-fluid pl-5 pr-5 pb-4 pt-4">
      <div class="row">
        <div class="col-md-6 ">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-white p-0 pb-4 border-bottom">
              <li class="breadcrumb-item" aria-current="page"><nuxt-link class="" to="/article-list" tag="a">Список артикулов</nuxt-link></li>
              <li class="breadcrumb-item" aria-current="page"><nuxt-link class="" :to="{ name: 'articles-id', params: { id: article._id}}" tag="a">{{article.name}}</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{product.name}}</li>
            </ol>
          </nav>
          <h6>Название</h6>
          <b-form-input v-model="product.name"
                        type="text"
                        placeholder="Название товара"
                        class="mb-3"></b-form-input>
          <div class="description-header d-flex flex-row align-items-baseline">
            <h6 class="pr-3">Описание</h6>
            <b-form-checkbox class="ml-auto" id="uniqueDescription" v-model="product.uniqueDescription" @change="checkBoxChecked">
              Заменить описание артикула
            </b-form-checkbox>
          </div>


          <no-ssr placeholder="Редактор загружается...">
            <vue-editor
              class="mb-3"
              v-model="product.description">
            </vue-editor>
          </no-ssr>


          <div class="buttons d-flex flex-row mb-3 justify-content-end">
            <button class="btn btn-primary mr-2" @click="update()">Обновить</button>
            <nuxt-link class="btn btn-secondary " :to="{ name: 'articles-id', params: { id: article._id}}" tag="a">Назад</nuxt-link>
          </div>



          <b-alert variant="success"
                   fade
                   dismissible
                   :show="successAlert"
                   @dismissed="successAlert=false">
            Товар обновлен!
          </b-alert>

          <b-alert variant="danger"
                   fade
                   dismissible
                   :show="errorAlert"
                   @dismissed="errorAlert=false">
            Произошла ошибка! Ничего не работает!
          </b-alert>

          <h6 class="mb-3">Предпросмотр описания на сайт:</h6>
          <div class="card-text mb-4" v-html="aggregateDescription"></div>

          <h6 class="mb-3">ID в Моем Складе</h6>
          <b-form-input v-model="product.msid"
                        class="mb-3"
                        disabled
                        type="text"
                        placeholder="MS ID"></b-form-input>


        </div>

        <div class="col-md-6">
          <div id="image-wrapper">
            <img  :src='image' class="img-fluid rounded mx-auto d-block" alt="Card image cap">

          </div>
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

  import strapi from '~/plugins/strapi-client'
  export default {

    data() {
      return {
        successAlert: false,
        errorAlert: false,
        noDescription: false,
        uniqueDescription: false,
        palette: null
      }
    },
    async asyncData(context) {
      return await strapi.request('post', '/graphql', {
        data: {
          query: `query {
              product(id: "${context.params.id}") {
              _id
               msid
               name
               description
               uniqueDescription
               primaryPhoto
               article {
                _id
                name
                description
              }
              }
            }

          `
        }
      })
    },
    components: {VueEditor},
    methods: {

      checkBoxChecked(isChecked) {
        this.product.uniqueDescription = isChecked
        this.update()
      },
      async update() {

        try {
          await strapi.updateEntry('products', this.id, {
            name: this.product.name,
            description: this.product.description,
            uniqueDescription: this.product.uniqueDescription,
          })
          this.successAlert = true
          setTimeout(() => {
            this.successAlert = false
          }, 2000)
        } catch (err) {
          this.errorAlert = true
        }
      },

      getPalette() {
        Vibrant.from(this.product.primaryPhoto).getPalette((err, palette) => {
          this.palette = palette

          let appWrap = document.getElementById("app-wrap")

          appWrap.style.backgroundColor = this.palette.Muted.getHex()
          appWrap.style.color = this.palette.Muted.getBodyTextColor()

          //console.log(this.palette)
        })

      }

    },


    computed: {

      id() {
        return this.data.product._id
      },
      product() {
        return this.data.product
      },

      article() {
        return this.data.product.article
      },

      image() {

        return this.product.primaryPhoto !== "" ? this.product.primaryPhoto : "https://via.placeholder.com/275x412"
      },



      aggregateDescription(){
        if (this.product.uniqueDescription) {
          return this.product.description

        }
        else {
          return this.article.description + '<br>' + this.product.description

        }
      }
    },
  }
</script>


