<template>
  <div class="row align-items-center d-flex flex-column">
    <div
      class="col-12 fs-3 py-4 fw-bold border-bottom text-primary text-center"
    >
      訂單查詢
    </div>
    <div class="col-auto px-5" style="padding-top: 10%">
      <div class="input-group">
        <div class="input-group">
          <input
            v-model="email"
            type="text"
            class="form-control"
            placeholder="輸入信箱"
            aria-label="輸入信箱"
            aria-describedby="button-addon2"
          />

          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            @click.prevent="search(email)"
          >
            查詢
          </button>
        </div>
        <div class="text-danger p-2 fs-7" v-if="!emailCheck">
          未查詢到該訂單，請嘗試在輸入一次。
        </div>
      </div>
      <ol class="track__ol fs-7 mt-3" style="padding-bottom: 20%">
        <li>請於訂購完成後三天內付款，否則訂單將被取消。</li>
        <li>
          如在購買過程中或收到商品後有任何問題，歡迎隨時聯繫我們，我們將儘快回覆。
        </li>
        <li>
          在庫存充足的情況下，我們保證在付款完成後三天內發貨。如您訂購的商品庫存不足，我們將盡快以電子郵件通知您。
        </li>
        <li>目前僅提供國內服務，無法處理海外訂單。</li>
      </ol>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      emailCheck: true,
      order: [],
      tempUser: {},
    };
  },
  watch: {},
  methods: {
    search(email) {
      const [...order] = this.orders;

      const orderCheck = order.find((item) => item.user.email === email);

      if (orderCheck) {
        this.$router.push(`/ordertrack/search/${email}`);
      } else {
        this.emailCheck = false;
        this.email = '';
      }
    },

    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/orders/?page=${page}`;
      this.$http.get(api).then((res) => {
        this.orders = res.data.orders;

        this.pagination = res.data.pagination;
      }).catch((error) => {
        console.error('錯誤:', error);
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
