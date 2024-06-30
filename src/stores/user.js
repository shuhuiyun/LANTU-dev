import axios from 'axios';

import { defineStore } from 'pinia';

export default defineStore('User Store', {
  state: () => ({
    product: [],
    status: { loadingItem: '' },
  }),

  getters: {
    getQty(state) {
      let qty = 0;
      state.product.forEach((item) => {
        qty += item.qty;
      });
      return qty;
    },
  },

  actions: {
    addcart(id = '', num = 1) {
      this.status.loadingItem = id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/cart`;
      const cart = { product_id: id, qty: num };
      axios
        .post(api, { data: cart })
        .then(() => {
          this.status.loadingItem = '';
          this.getProducts();
        })
        .catch((error) => {
          console.error('錯誤:', error);
        });
    },
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/cart`;
      axios
        .get(api)
        .then((res) => {
          this.product = res.data.data.carts;
        })
        .catch((error) => {
          console.error('錯誤:', error);
        });
    },
  },
});
