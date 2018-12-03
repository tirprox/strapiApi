<template>
  <div class="card h-100  border-light" :style="colorize">
    <nuxt-link :to="{ name: 'products-id', params: {id: product.id}}" tag="a">
      <img class="card-img-top" :src='photo' alt="Card image cap">
    </nuxt-link>
    <div class="card-body">
      <nuxt-link :to="{ name: 'products-id', params: {id: product.id}}" tag="a">

        <h6 class="card-title text-white">{{ product.name }}</h6>
      </nuxt-link>

      <p class="card-text text-white">{{product.description!=='' ? 'Есть описание' : 'Нет описания'}}</p>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProductCard',
    data() {
      return {
        colorMap: {
          "черный": "#181D23",
          "серый": "#58575c",
          "графит":"#3d3d3d",
          "розовый":"#A0628E",
          "зеленый":"#004645",
          "синий":"#263763",
          "бежевый":"#AE8C8E",
          "сиреневый":"#DCBEE4",
          "коричневый":"#974C2A",
          "фиолетовый":"#642675",
          "красный":"#BA0A1C",
          "бирюзовый":"#98D8E1",
          "марсала":"#620D23",
          "винный":"#5E0444",
          "голубой":"#6574a6",
          "хаки":"#535750",
          "желтый":"#F1B516",
          "болотный":"#534C3A",
        },
      };
    },
    props: {
      product: Object
    },
    methods: {

    },
    computed: {
      photo() {
        return this.product.primaryPhoto !== '' ? this.product.primaryPhoto : "https://via.placeholder.com/275x412"
      },
      colorize() {
        let scan = this.product.name.toLowerCase()
        let isColorful = false
        let style = '';
        for (let key in this.colorMap) {
          if (scan.includes(key)) {
            if (!isColorful) isColorful = true;
            style = 'backgroundColor: ' + this.colorMap[key]
          }

        }
        if (!isColorful) style = 'backgroundColor: ' + this.colorMap["черный"]
        return style
      }
    }
  };
</script>

<style scoped>

</style>