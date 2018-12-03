<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom pl-5 pr-5 pt-3 pb-3">
      <nuxt-link tag="a" class="navbar-brand text-secondary" to="/" exact>
        DreamWhite CMS</nuxt-link>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li v-if="username">
            <a href="#" class="nav-link">
              Привет, {{ username }}
            </a>
          </li>
          <li v-if="username">
            <a href="#" class="nav-link" @click="logout">
              Выйти
            </a>
          </li>
          <li v-if="!username">
            <nuxt-link v-if="!username" tag="a" class="nav-link" to="/signin" exact>
              Войти
            </nuxt-link>
          </li>
         <!-- <li v-if="!username">
            <router-link v-if="!username" tag="a" class="nav-link" to="/signup" exact>
              Регистрация
            </router-link>
          </li>-->
        </ul>
      </div>
  </nav>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    computed: {
      username() {
        return this.$store.getters['auth/username']
      }
    },
    methods: {
      ...mapMutations({
        logout: 'auth/logout'
      })
    }
  }
</script>
