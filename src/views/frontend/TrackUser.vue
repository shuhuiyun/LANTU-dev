<template>
  <div class="row align-items-center d-flex flex-column">
    <div
      class="col-12 fs-3 py-4 fw-bold border-bottom text-primary text-center"
    >
      訂單查詢
    </div>
  </div>
  <!-- 測試 -->
  <button type="button" class="accordion-button accordion-item p-3">
    <span class="d-none d-md-block">訂單編號</span><span>購買日期</span
    ><span>總金額</span><span>訂單狀態</span
    ><span style="width: 20px; height: 20px"></span>
  </button>
  <div class="accordion accordion-flush" id="accordionFlushExample">
    <div
      class="accordion-item"
      v-for="(item, index) in tempOrder"
      :key="item.id"
    >
      <h2 class="accordion-header" :id="`flush-headingOne${index}`">
        <button
          class="accordion-button collapsed shadow-none"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#flush-collapse${index}`"
          aria-expanded="false"
          :aria-controls="`flush-collapse${index}`"
        >
          <span class="d-none d-md-block">{{ item.id }}</span
          ><span>{{ $filters.date(item.create_at) }}</span
          ><span>{{ item.total }}</span
          ><span
            class="fw-bold"
            :class="{
              'text-danger': !item.is_paid,
              'text-success': item.is_paid,
            }"
            >{{ item.is_paid ? '已付款' : '未付款' }}</span
          >
        </button>
      </h2>
      <div
        :id="`flush-collapse${index}`"
        class="accordion-collapse collapse"
        :aria-labelledby="`flush-heading${index}`"
        data-bs-parent="#accordionFlushExample"
      >
        <div class="accordion-body bg-light">
          <div class="hstack gap-3 mb-3" v-if="!item.is_paid">
            <div class="text-danger fw-bold fs-4">尚未付款</div>
            <div class="vr"></div>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="pay(item.id)"
            >
              前往付款
            </button>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <h4 class="mb-4 text-gray">寄送資訊</h4>
              <p>
                <span class="me-5 text-gray">姓名</span>{{ item.user.name }}
              </p>
              <p>
                <span class="me-5 text-gray">信箱</span>{{ item.user.email }}
              </p>
              <p>
                <span class="me-5 text-gray">地址</span>{{ item.user.address }}
              </p>
            </div>
            <div class="col-lg-6">
              <h4 class="text-gray mb-4">購物明細</h4>
              <div
                class="row border-bottom m-0 p-3"
                v-for="product in item.products"
                :key="product.id"
              >
                <div class="col-3">
                  <img
                    class="w-100 border rounded"
                    :src="product.product.imageUrl"
                    :alt="product.product.title"
                  />
                </div>
                <div class="col-6 justify-content-center d-flex flex-column">
                  <p class="m-0">{{ product.product.title }}</p>
                  <p class="text-gray m-0">
                    {{ `$${product.product.price} ` }}
                    <span><i class="bi bi-x"></i></span>
                    {{ ` ${product.qty} ${product.product.unit}` }}
                  </p>
                </div>
                <div
                  class="col-3 d-flex justify-content-end align-items-center"
                >
                  {{ `$${product.total}` }}
                </div>
              </div>
              <div class="row border-bottom m-0 p-3">
                <div class="row d-flex justify-content-end p-0 m-0">
                  <div class="col">小計</div>
                  <div class="col text-end">
                    {{ `NT$${addTotal(item.products)}` }}
                  </div>
                </div>
                <div class="row d-flex justify-content-end p-0 m-0">
                  <div class="col">優惠券</div>
                  <div class="col text-end text-primary">
                    {{ `-NT$${coupon(item.products)}` }}
                  </div>
                </div>
              </div>
              <div class="row m-0 p-3">
                <div class="row d-flex justify-content-end p-0 m-0">
                  <h4 class="text-end">
                    {{ `NT$${item.total}` }}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 測試 -->
</template>
<script>
import Collapse from 'bootstrap/js/dist/collapse';

export default {
  data() {
    return {
      show: false,
      tempOrder: [],
    };
  },
  methods: {
    pay(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/pay/${id}`;
      this.$http
        .post(api)
        .then(() => {
          this.getOrders(this.$route.params.ordermail);
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得商品失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
        });
    },
    addTotal(Arr) {
      let total = 0;
      const newArr = Object.values(Arr);

      newArr.forEach((item) => {
        total += item.total;
      });
      return total;
    },
    coupon(Arr) {
      let finaltotal = 0;
      const newArr = Object.values(Arr);

      newArr.forEach((item) => {
        finaltotal += item.total - item.final_total;
      });

      return finaltotal;
    },
    getOrders(email, page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/orders/?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.orders = res.data.orders;

          const Arr = this.orders.filter((item) => item.user.email === email);
          this.tempOrder = Arr;

          this.pagination = res.data.pagination;
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得商品失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
        });
    },
    open() {},
  },
  created() {
    this.getOrders(this.$route.params.ordermail);
  },
  mounted() {
    const collapseElementList = [].slice.call(
      document.querySelectorAll('.collapse'),
    );
    this.collapseList = collapseElementList.map(
      (collapseEl) => new Collapse(collapseEl, {
        toggle: false,
      }),
    );
  },
};
</script>
