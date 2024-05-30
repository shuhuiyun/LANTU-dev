import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('User Store', {
  state: () => ({
    products: [],
    pagination: {},
    tempProducts: [],
    totalProducts: [],
    paginationOpen: true,
    isLoading: false,
  }),

  getters: {},

  actions: {
    getProducts(page = 1) {
      this.isActive = -1;
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/products/?page=${page}`;
      axios
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
        .catch((error) => {
          console.error('錯誤:', error);
        });
    },
    getTotalProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/products/?page=${page}`;
      axios
        .get(api)
        .then((res) => {
          this.totalProducts.push(...res.data.products);
          this.swiperTemp();
        })
        .catch((error) => {
          console.error('錯誤:', error);
        });
    },
    swiperTemp() {
      console.log(this.totalProducts, this.products);
    },
  },
});
