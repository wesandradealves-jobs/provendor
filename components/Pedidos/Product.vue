<template>
  <div class="card-produto mt-3" style="height: 430px;">
    <el-carousel height="390px" :autoplay="false" indicator-position="outside">
      <el-carousel-item v-for="(item, index) in row.order_items" :key="index">
        <div
          class="mb-3 d-flex align-items-center"
          style="border-bottom: 1px solid #60a99e; text-transform: uppercase;"
        >
          <i class="ni ni-fat-delete"></i>
          <p class="font-weight-600 ml-1 text-sm">
            {{ item.name }}
          </p>
        </div>
        <div class="mb-3">
          <p v-if="item.quantity < 1">
            <strong>Quantidade:</strong>
            <span class="badge badge-green-brand">
              {{ item.quantity }} unidade
              {{ row.price | formatPrice }}
            </span>
          </p>
          <p v-else>
            <strong>Quantidade:</strong>
            <span class="badge badge-green-brand">
              {{ item.quantity }} unidades
              {{ row.price | formatPrice }}
            </span>
          </p>
        </div>
        <div class="d-flex align-items-center flex-column">
          <div class="d-flex">
            <img
              class="avatar image-produto"
              style="min-height: 210px; min-width: 210px;"
              alt="Image placeholder"
              :src="item.picture"
            />
          </div>
          <div
            class="d-flex flex-row mt-4 justify-content-between flex-wrap"
            style="width: 100%;"
          >
            <div class="d-flex flex-column">
              <div class="justify-content-center">
                <p class="text-center">
                  <strong>Código</strong>
                </p>
              </div>
              <div class="justify-content-center">
                <span class="badge badge-green-brand">{{
                  item.marketplace_code
                }}</span>
              </div>
            </div>
            <div class="flex-column">
              <div class="justify-content-center">
                <p class="text-center">
                  <strong>SKU</strong>
                </p>
              </div>
              <span class="badge badge-green-brand">{{ item.sku }}</span>
            </div>
            <div class="flex-column">
              <div class="justify-content-center">
                <p class="text-center">
                  <strong>Localização</strong>
                </p>
              </div>
              <div class="d-flex justify-content-center">
                <span class="badge badge-green-brand">{{ item.location }}</span>
              </div>
            </div>
            <div class="flex-column">
              <div class="justify-content-center">
                <p class="text-center">
                  <strong>Variação</strong>
                </p>
              </div>
              <div class="d-flex justify-content-center">
                <span class="badge badge-green-brand">{{
                  item.variation.cor
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { Carousel, CarouselItem } from 'element-ui'
export default {
  name: 'PedidoProduto',
  components: {
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem
  },
  props: {
    row: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
p {
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
  line-height: 1.5rem;
}

strong {
  font-weight: 600;
}

.badge-green-brand {
  color: #041f25;
  font-size: 0.8em;
  /* text-transform: lowercase; */
}
</style>
