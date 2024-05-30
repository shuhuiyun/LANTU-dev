<!-- eslint-disable max-len -->
<template>
  <LoadingSpinner :active="isLoading"></LoadingSpinner>
  <div class="container my-5 bg-white mx-auto">
    <div class="row g-5 d-flex flex-md-row flex-column mx-2">
      <ul class="p-0 col col-lg-2 bg-white pb-4 userCard__menu">
        <li>
          <a
            href="#"
            :class="isActive == -1 ? 'active' : ''"
            class="d-block py-2 fs-6 px-3 text-start link-underline-opacity-0 link-underline"
            @click.prevent="getProducts(1)"
            ><i class="bi bi-bag me-3"></i>全部商品</a
          >
        </li>
        <li v-for="(item, index) in menu" :key="item.title">
          <a
            href="#"
            :class="index == isActive ? 'active' : ''"
            class="d-block py-2 fs-6 px-3 text-start link-underline-opacity-0 link-underline"
            @click.prevent="categoryProducts(item.title, index)"
            ><i class="me-3" :class="item.iconClass"></i>{{ item.title }}</a
          >
        </li>
      </ul>

      <div class="col-md-9 col col-lg-9">
        <div class="row row-cols-1 row-cols-lg-3 row-cols-md-2 gx-4">
          <!-- 商品 -->
          <div
            class="col user-board__products mb-4"
            v-for="item in tempProducts"
            :key="item.id"
          >
            <a aria-label="img" href="#" @click.prevent="getProduct(item.id)">
              <img
                :src="item.imageUrl"
                v-if="item.imageUrl"
                class="col-12 border"
                style="aspect-ratio: 1/1; object-fit: cover"
                :alt="item.title"
              />
              <img
                v-else
                src="../../assets/images/no-image.png"
                class="col-12 border"
                style="aspect-ratio: 1/1; object-fit: cover"
                alt="提示:此商品沒有圖片"
              />
            </a>
            <div class="p-2">
              <div
                class="col text-start fs-5 text-dark lh-sm my-2 fw-bold text-truncate"
              >
                <a
                  href="#"
                  class="link-offset-1 text-dark link-underline-dark link-underline-opacity-0 link-underline-opacity-75-hover"
                  @click.prevent="getProduct(item.id)"
                >
                  {{ item.title }}</a
                >
              </div>

              <div class="row">
                <div class="col text-start text-danger fs-5">
                  {{ `$${item.price}`
                  }}<span
                    class="fs-7 ms-1 text-decoration-line-through"
                    style="color: rgb(37, 37, 43, 0.5)"
                    >{{ `$${item.origin_price}` }}</span
                  >
                </div>
                <div class="col-auto ms-auto my-auto">
                  <button
                    type="button"
                    style="min-height: 31px; min-width: 60px"
                    class="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center"
                    :disabled="status.loadingItem == item.id"
                    @click="addcart(item.id)"
                  >
                    <div
                      v-if="status.loadingItem == item.id"
                      class="ms-1 spinner-grow spinner-grow-sm"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <span v-else> 購買 </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PageNavigation
          v-if="paginationOpen"
          @emit-page="getProducts"
          :pages="pagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/user';

import PageNavigation from '@/components/PageNavigation.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProducts: [],
      totalProducts: [],
      paginationOpen: true,
      isLoading: false,
      isActive: 0,
      menu: [
        { title: '手帳/日誌', iconClass: 'bi bi-book' },
        { title: '筆記本', iconClass: 'bi bi-journals' },
        { title: '便條紙', iconClass: 'bi bi-card-text' },
        { title: '信封信紙/卡片', iconClass: 'bi bi-envelope-open' },
      ],
    };
  },
  components: {
    PageNavigation,
  },
  computed: {
    ...mapState(userStore, ['status']),
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    ...mapActions(userStore, ['addcart']),

    getProducts(page = 1) {
      this.isActive = -1;
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/products/?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.totalProducts = [];
          for (let i = 1; i <= res.data.pagination.total_pages; i += 1) {
            this.getTotalProducts(i);
          }
          this.products = res.data.products;
          this.tempProducts = this.products;
          this.paginationOpen = true;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得商品失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
        });
    },
    getTotalProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/products/?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.totalProducts.push(...res.data.products);
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得商品失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
        });
    },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },

    categoryProducts(sort, index) {
      this.isActive = index;
      console.log(this.isActive, index);

      this.tempProducts = [];
      this.paginationOpen = false;
      this.totalProducts.forEach((item) => {
        if (item.category === sort) {
          this.tempProducts.push(item);
        }
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
