<!-- eslint-disable max-len -->
<template>
  <LoadingSpinner :active="isLoading"></LoadingSpinner>
  <div class="container my-5 bg-white mx-auto">
    <div class="row g-5 d-flex flex-md-row flex-column mx-2">
      <div class="col-md-3 col col-lg-3 bg-light user-board__menu">
        <div class="col fs-5 fw-bold text-dark py-3 text-center">產品分類</div>

        <ul class="p-0 col bg-white pt-2 pb-4">
          <li class="border-bottom border-1">
            <a
              href="#"
              class="d-block py-2 fs-7 px-3 text-start link-underline-opacity-0 link-underline link-dark"
              @click.prevent="getProducts(1)"
              >全部商品</a
            >
          </li>
          <li class="border-bottom border-1">
            <a
              href="#"
              class="d-block py-2 fs-7 px-3 text-start link-underline-opacity-0 link-underline link-dark"
              @click.prevent="categoryProducts('手帳/日誌')"
              >手帳/日誌</a
            >
          </li>
          <li class="border-bottom border-1">
            <a
              href="#"
              class="d-block py-2 fs-7 px-3 text-start link-underline-opacity-0 link-underline link-dark"
              @click.prevent="categoryProducts('筆記本')"
              >筆記本</a
            >
          </li>
          <li class="border-bottom border-1">
            <a
              href="#"
              class="d-block py-2 fs-7 px-3 text-start link-underline-opacity-0 link-underline link-dark"
              @click.prevent="categoryProducts('便條紙')"
              >便條紙</a
            >
          </li>
          <li class="border-bottom border-1">
            <a
              href="#"
              class="d-block py-2 fs-7 px-3 text-start link-underline-opacity-0 link-underline link-dark"
              @click.prevent="categoryProducts('信封信紙/卡片')"
              >信封信紙/卡片</a
            >
          </li>
        </ul>
      </div>
      <div class="col-md-9 col col-lg-9">
        <div class="row row-cols-1 row-cols-lg-3 row-cols-md-2 gx-4">
          <!-- 商品 -->
          <div
            class="col user-board__products mb-4"
            v-for="item in tempProducts"
            :key="item.id"
          >
            <a
              aria-label="img"
              href="#"
              @click.prevent="getProduct(item.id)"
              style=""
            >
              <img
                :src="item.imageUrl"
                v-if="item.imageUrl"
                class="col-12 border"
                style="aspect-ratio: 1/1; object-fit: cover"
                :alt="item.title"
              />
              <img
                v-else
                src="../assets/images/no-image.png"
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
                    @click.prevent="addcart(item.id)"
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
        <Pagination
          v-if="paginationOpen"
          @emit-page="getProducts"
          :pages="pagination"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/user';
import Pagination from '../components/PageNavigation.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProducts: [],
      totalProducts: [],
      paginationOpen: true,
      isLoading: false,
    };
  },
  components: {
    Pagination,
  },
  computed: {
    ...mapState(userStore, ['status']),
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    ...mapActions(userStore, ['addcart']),

    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/products/?page=${page}`;
      this.$http.get(api).then((res) => {
        this.totalProducts = [];
        for (let i = 1; i <= res.data.pagination.total_pages; i += 1) {
          this.getTotalProducts(i);
        }
        this.products = res.data.products;
        this.tempProducts = this.products;
        this.paginationOpen = true;
        this.pagination = res.data.pagination;
        this.isLoading = false;
      }).catch((error) => {
        console.error('錯誤:', error);
      });
    },
    getTotalProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/products/?page=${page}`;
      this.$http.get(api).then((res) => {
        this.totalProducts.push(...res.data.products);
      }).catch((error) => {
        console.error('錯誤:', error);
      });
    },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
    categoryProducts(sort) {
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
