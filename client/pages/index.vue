<template>
  <div>
    <section class="container-fluid border-bottom pl-5 pr-5 pb-4 pt-4">
      <div class="row align-items-center">
        <div class="col-md-12">
          <nuxt-link tag="a" class="btn btn-primary" to="/article-list" exact>
            Товары
          </nuxt-link>
          <nuxt-link tag="a" class="btn btn-primary" to="/counterparty-list" exact>
            Контрагенты
          </nuxt-link>
          <nuxt-link tag="a" class="btn btn-primary" to="/tags" exact>
            Метки
          </nuxt-link>
        </div>

      </div>

    </section>

    <section class="container-fluid border-bottom pl-5 pr-5 pb-4 pt-4">
      <div class="row align-items-center">
        <div class="col-md-12">
          <nuxt-link tag="a" class="btn btn-primary" to="/imports" exact>
            Управление импортом
          </nuxt-link>
        </div>
      </div>
    </section>




  </div>
</template>


<script>
  export default {
    data() {
      return {
      }
    },
  }
</script>
