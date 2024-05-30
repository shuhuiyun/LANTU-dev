<template>
  <div class="row align-items-center d-flex flex-column">
    <div
      class="col-12 fs-3 py-4 fw-bold border-bottom text-primary text-center"
    >
      訂單查詢
    </div>
    <div class="col-auto px-5" style="padding-top: 10%">
      <VForm v-slot="{ errors }" ref="observer" @submit="search(email)">
        <div class="input-group">
          <!-- <input
              v-model="email"
              type="text"
              class="form-control"
              placeholder="輸入信箱"
              aria-label="輸入信箱"
              aria-describedby="button-addon2"
            /> -->
          <VField
            name="信箱"
            class="form-control"
            id="inputEmail"
            type="email"
            v-model="email"
            :class="{ 'is-invalid': errors['信箱'] }"
            rules="email|required"
          />

          <button
            class="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
            style="border-radius: 0 50rem 50rem 0"
          >
            查詢
          </button>
          <ErrorMessage ref="error" name="信箱" class="invalid-feedback p-0" />
        </div>
        <!-- <div class="text-danger p-2 fs-7" v-if="!emailCheck && !errors['信箱']">
          未查詢到該訂單，請嘗試在輸入一次。
        </div> -->
      </VForm>
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
  inject: ['emitter', '$httpMessageState'],

  methods: {
    search(email) {
      const [...order] = this.orders;

      const orderCheck = order.find((item) => item.user.email === email);

      if (orderCheck) {
        this.$router.push(`/ordertrack/search/${email}`);
      } else {
        this.emailCheck = false;

        this.$refs.observer.resetForm();
        this.emitter.emit('push-message', {
          style: 'danger',
          title: '查無訂單',
          content: '未查詢到該訂單，請嘗試在輸入一次。',
        });
      }
    },

    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/orders/?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.orders = res.data.orders;

          this.pagination = res.data.pagination;
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得訂單失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
