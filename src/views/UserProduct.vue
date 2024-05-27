<template>
  <LoadingSpinner :active="isLoading"></LoadingSpinner>
  <div class="container">
    <div class="row my-5 justify-content-center">
      <!-- 商品圖 -->
      <div class="col-12 col-md-6 mb-4">
        <div
          class="mb-4 border-1 border-dark-subtle border"
          style="border-radius: 1.5rem; object-fit: cover"
        >
          <img
            class="w-100"
            v-if="!mainImage"
            style="border-radius: 1.5rem"
            :src="product.imageUrl"
            alt="商品圖片"
          />
          <img
            class="w-100"
            style="border-radius: 1.5rem"
            v-else
            :src="mainImage"
            alt="商品圖片"
          />
        </div>
        <div class="row row-cols-3 gx-4">
          <div
            class="col"
            v-for="(item, index) in product.imagesUrl"
            :key="`圖片${index}`"
          >
            <div
              class="border-1 border-dark-subtle border"
              style="border-radius: 1.5rem; height: 100%"
            >
              <a
                href="https://www.facebook.com/"
                target="_blank"
                class="icon-buttom"
                aria-label="按鈕"
                @click.prevent="changeImage(item)"
              >
                <img
                  class="w-100 h-100"
                  style="border-radius: 1.5rem; object-fit: contain"
                  :src="item"
                  :alt="`${product.title}${index + 1}`"
              /></a>
            </div>
          </div>
        </div>
      </div>
      <!-- 商品資訊 -->
      <div class="col-12 ps-md-5 col-md-5 text-start">
        <p class="mt-3">
          <span
            class="text-primary border border-1 rounded-2 border-primary p-1 fs-7"
            >{{ product.category }}</span
          >
        </p>
        <p class="h3 fw-bold text-dark">{{ product.title }}</p>
        <p class="text-danger fs-3">
          NT${{ product.price
          }}<span
            class="text-decoration-line-through fs-6 ms-2 text-dark text-opacity-50"
            >NT${{ product.origin_price }}</span
          >
        </p>
        <div class="d-flex align-items-center my-5">
          <p class="my-0 me-5 fw-bold">數量</p>
          <div>
            <button
              type="button"
              class="btn btn-light rounded-0 px-3"
              :disabled="!productNum"
              aria-label="dash"
              @click.prevent="subNum"
            >
              <i class="bi bi-dash-lg"></i></button
            ><span class="mx-4 fw-bold fs-5">{{ productNum }}</span>
            <button
              type="button"
              class="btn btn-light rounded-0 px-3"
              :disabled="productNum == 10"
              aria-label="dash"
              @click.prevent="addNum"
            >
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
        <div class="col-12 col-lg-7">
          <button
            type="button"
            style="min-height: 48px"
            class="btn btn-lg btn-primary w-100 d-flex align-items-center justify-content-center"
            @click.prevent="addcart(product.id, productNum)"
            :disabled="status.loadingItem == product.id"
          >
            <div
              class="spinner-grow text-light spinner-grow-sm ms-2"
              v-if="status.loadingItem == product.id"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            <span v-else> <i class="bi bi-cart2 me-2"></i>加入購物車</span>
          </button>
        </div>
        <p class="mt-5 fs-5 fw-bold">【規格】</p>
        <p ref="content" class="px-2" v-html="product.description"></p>
        <p class="mt-5 fs-5 fw-bold">【商品特色】</p>
        <p ref="content" class="px-2" v-html="product.content"></p>
      </div>
      <div class="my-5 col-11 justify-content-center">
        <ul class="text-start ps-4" style="list-style-type: disc">
          <li>
            為確保您有良好的購物體驗，請注意商品照片和實品可能存在色差，因受光線和螢幕設置影響。在下單前，請確認您能接受這一點，謝謝。
          </li>
          <li>訂單成立後，我們會在三個工作日內（不含假日）備貨並寄出商品。</li>
          <li>
            請注意，出貨時僅包含筆記本的本體（封面和內頁），不包括照片中的配件，如名片夾、筆、手機等其他商品。
          </li>
          <li>
            我們已進行介紙測試，確保其能夠改善鋼筆書寫時在一般紙張上的暈染情況。然而，由於不同墨水和筆尖的組合，實際效果仍可能有所不同。
            特別是對於易刮傷紙張的沾水筆尖，最終效果可能因筆尖和墨水的不同組合而有所不同
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/user';

export default {
  data() {
    return {
      productNum: 1,
      mainImage: '',
      ProductID: '',
      product: [],
    };
  },
  computed: {
    ...mapState(userStore, ['status']),
  },
  methods: {
    ...mapActions(userStore, ['addcart']),
    getProduct() {
      this.isLoading = true;
      const id = this.ProductID;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/product/${id}`;
      this.$http.get(api).then((res) => {
        this.product = res.data.product;
        this.isLoading = false;
      }).catch((error) => {
        console.error('錯誤:', error);
      });
    },
    addNum() {
      if (this.productNum < 10) {
        this.productNum += 1;
      }
    },
    subNum() {
      if (this.productNum > 0) {
        this.productNum -= 1;
      }
    },
    changeImage(item) {
      this.mainImage = item;
    },
  },
  created() {
    this.productNum = 1;
    this.ProductID = this.$route.params.productId;
    this.getProduct();
  },
};
</script>
