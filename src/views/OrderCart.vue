<!-- eslint-disable max-len -->
<template>
  <LoadingSpinner :active="isLoading"></LoadingSpinner>
  <div class="container pb-4" v-if="product[0]">
    <div class="row d-none d-lg-flex py-4 border-bottom order__padding">
      <div class="col-1 p-0">商品</div>
      <div class="col-3"></div>
      <div class="col-2 text-center">單價</div>
      <div class="col-2 text-center">數量</div>
      <div class="col-2 text-center">總價</div>
      <div class="col-2"></div>
    </div>
    <div
      class="row order__padding py-4 border-bottom border-1 align-items-center"
      v-for="item in product"
      :key="item.product.id"
    >
      <div class="col-lg-1 col-2 p-0">
        <div>
          <img
            :src="item.product.imageUrl"
            class="w-100 border rounded"
            :alt="item.product.title"
          />
        </div>
      </div>
      <div class="col-lg-3 col-2 d-none d-lg-flex">
        <div>
          <div class="d-flex">
            {{ item.product.title }}
          </div>
          <div></div>
        </div>
      </div>
      <div class="col-lg-2 d-none d-lg-block text-center">
        {{ `$${item.product.price}` }}
      </div>
      <div class="col-lg-2 col-6 text-center order-cart__num-btn">
        <div class="text-start text-truncate d-lg-none mb-2 mb-3 fs-lg-6">
          {{ item.product.title }}
        </div>
        <div class="d-flex justify-content-start justify-content-lg-center">
          <a
            href="#"
            class="rounded-start-circle"
            aria-label="sub"
            @click.prevent="changeProduct(item.product_id, -1)"
            ><i class="bi bi-dash"></i
          ></a>
          <input
            class="order-cart__num border-0 text-center"
            @change="updateProducts(item, Number($event.target.value))"
            :value="item.qty"
          />
          <a
            href="#"
            class="rounded-end-circle"
            aria-label="add"
            @click.prevent="changeProduct(item.product_id, 1)"
            ><i class="bi bi-plus"></i
          ></a>
        </div>
      </div>
      <div class="col-lg-2 col-2 p-0 text-center">{{ `$${item.total}` }}</div>
      <div class="col-lg-2 col-2 p-0 text-end">
        <a
          href="#"
          @click.prevent="delProduct(item.id)"
          class="order-cart__del-btn"
          aria-label="del"
          ><i class="bi bi-x-lg"></i
        ></a>
      </div>
    </div>
    <div
      class="row py-4 order__padding-left justify-content-between flex-column flex-lg-row align-items-end align-items-lg-start"
    >
      <!-- 優惠券輸入 -->
      <div class="col-10 p-4 p-lg-0 col-md-6 col-lg-4 mb-3">
        <div class="input-group mb-3">
          <input
            v-model="coupon_code"
            type="text"
            class="form-control"
            placeholder="輸入優惠券"
            aria-label="輸入優惠券"
            aria-describedby="button-addon2"
          />
          <button
            class="btn btn-primary"
            type="button"
            id="button-addon2"
            @click.prevent="addCouponCode"
          >
            送出
          </button>
        </div>
      </div>
      <!-- 金額總計 -->
      <div class="col-10 col-md-6 order__padding-right border-bottom">
        <div class="row">
          <div class="row py-3">
            <div class="col-7 text-start ps-5">小計</div>
            <div class="col-5 pe-3 text-end">{{ `NT$${total.total}` }}</div>
          </div>
          <div class="row pb-3 text-primary">
            <div class="col-7 text-start ps-5">優惠券</div>
            <div
              class="col-5 pe-3 text-end text-nowrap"
              v-if="{ isCouponCode }"
            >
              {{ `-NT$${total.total - total.final_total}` }}
            </div>
            <div class="col-5 pe-3 text-end text-nowrap" v-else>
              {{ `-NT$0` }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 text-end fs-4 mt-3 order__padding-right">
        <div class="row">
          <div class="row pb-3 text-dark">
            <div class="col-12 text-end fs-4 mt-3">
              {{ `NT$${total.final_total}` }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 按鈕 -->
    <div class="row justify-content-between order__padding mt-4">
      <button
        type="button"
        @click.prevent="$router.push('/user/cart')"
        class="col-auto col-lg-auto btn btn-outline-primary order__btn"
      >
        繼續購物
      </button>
      <button
        type="button"
        class="col-auto col-lg-auto btn btn-primary order__btn"
        @click.prevent="$router.push('/order/info')"
      >
        下一步
      </button>
    </div>
  </div>

  <!-- 無商品畫面 -->
  <div class="container cart-none" v-else>
    <div
      class="d-flex flex-column justify-content-center align-items-center pt-2 pb-3"
    >
      <div class="cart-none__icon mb-4">
        <i class="bi bi-cart-x fs-1 text-white"></i>
      </div>
      <h3 class="pt-3 pb-5 text-dark fw-bold">購物車內尚無商品</h3>
      <button
        type="button"
        class="btn btn-primary px-5"
        @click.prevent="$router.push('/user/cart')"
      >
        前往購物
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: [],
      total: {},
      isLoading: false,
      isNew: false,
      coupon_code: '',
      isCouponCode: false,
    };
  },
  inject: ['emitter'],
  methods: {
    addCouponCode() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/coupon`;
      const cart = { code: this.coupon_code };
      this.$http.post(api, { data: cart }).then(() => {
        this.isCouponCode = true;
        this.getProducts();
      }).catch((error) => {
        console.error('錯誤:', error);
      });
    },
    changeProduct(id, num) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/cart`;
      const cart = { product_id: id, qty: num };
      this.$http.post(api, { data: cart }).then(() => {
        this.getProducts();
      }).catch((error) => {
        console.error('錯誤:', error);
      });
    },
    delProduct(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/cart/${id}`;
      this.$http.delete(api).then(() => {
        this.getProducts();
      }).catch((error) => {
        console.error('錯誤:', error);
      });
    },
    updateProducts(item, num) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/cart/${item.id}`;
      const cart = { product_id: item.product_id, qty: num };
      this.$http.put(api, { data: cart }).then(() => {
        this.getProducts();
      }).catch((error) => {
        console.error('錯誤:', error);
      });
    },
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
  },
  created() {
    this.isLoading = true;
    this.getProducts();
  },
};
</script>
