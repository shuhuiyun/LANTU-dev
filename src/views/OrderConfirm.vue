<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="container pb-4 pt-5">
    <div class="row order__padding">
      <div class="col-lg-6">
        <h4 class="mb-4 text-gray">寄送資訊</h4>
        <p><span class="me-5 text-gray">姓名</span>{{ userdata.user.name }}</p>
        <p><span class="me-5 text-gray">信箱</span>{{ userdata.user.email }}</p>
        <p>
          <span class="me-5 text-gray">地址</span>{{ userdata.user.address }}
        </p>
        <p><span class="me-5 text-gray">取貨</span>{{ userdata.pick }}</p>
        <p><span class="me-5 text-gray">付款</span>{{ userdata.send }}</p>
      </div>
      <div class="col-lg-6">
        <h4 class="text-gray mb-4">購物明細</h4>
        <div
          class="row border-bottom m-0 p-3"
          v-for="item in product"
          :key="item.id"
        >
          <div class="col-3">
            <img
              class="w-100 border rounded"
              :src="item.product.imageUrl"
              :alt="item.product.title"
            />
          </div>
          <div class="col-6 justify-content-center d-flex flex-column">
            <p class="m-0">{{ item.product.title }}</p>
            <p class="text-gray m-0">
              {{ `$${item.product.price} ` }}
              <span><i class="bi bi-x"></i></span>
              {{ ` ${item.qty} ${item.product.unit}` }}
            </p>
          </div>
          <div class="col-3 d-flex justify-content-end align-items-center">
            {{ `$${item.total}` }}
          </div>
        </div>
        <div class="row border-bottom m-0 p-3">
          <div class="row d-flex justify-content-end p-0 m-0">
            <div class="col">小計</div>
            <div class="col text-end">{{ `NT$${total.total}` }}</div>
          </div>
          <div class="row d-flex justify-content-end p-0 m-0">
            <div class="col">優惠券</div>
            <div class="col text-end text-primary">
              {{ `-NT$${total.total - total.final_total}` }}
            </div>
          </div>
        </div>
        <div class="row m-0 p-3">
          <div class="row d-flex justify-content-end p-0 m-0">
            <h4 class="text-end">
              {{ `NT$${total.final_total}` }}
            </h4>
          </div>
        </div>
      </div>
    </div>
    <!-- 按鈕 -->
    <div class="row justify-content-between order__padding mt-4">
      <button
        type="button"
        @click.prevent="$router.push('/order/info')"
        class="col-auto col-lg-auto btn btn-outline-primary order__btn"
      >
        上一步
      </button>
      <button
        type="button"
        class="col-auto col-lg-auto btn btn-primary order__btn"
        @click.prevent="finishOrder"
      >
        送出訂單
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userdata'],

  data() {
    return {
      item: {},
      product: [],
      total: {},
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/cart`;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        this.product = res.data.data.carts;
        this.total.final_total = res.data.data.final_total;
        this.total.total = res.data.data.total;
      }).catch((error) => {
        console.error('錯誤:', error);
      });
    },
    finishOrder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/order`;
      const order = {
        user: {
          name: this.userdata.user.name,
          email: this.userdata.user.email,
          tel: this.userdata.user.tel,
          address: this.userdata.user.address,
        },
        message: this.userdata.message,
      };

      this.$http.post(api, { data: order }).then(() => {
        this.$router.push('/order/finish');
      }).catch((error) => {
        console.error('錯誤:', error);
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
