<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-11 col-md-8 col-lg-5">
        <div
          class="row row-cols-7 justify-content-between align-items-center pt-5 pb-3"
          style="position: relative"
        >
          <div
            v-for="item in stepBtn"
            :key="item.title"
            class="col-auto p-0 step__button"
            :class="{ active: step == item.step }"
          >
            <div
              class="icon step__icon rounded-circle"
              :class="{ finish__icon: step > item.step }"
            >
              <i v-if="step > item.step" class="bi bi-check2 text-primary"></i>
              <i v-else :class="`${item.icon} text-white`"></i>
            </div>

            <p class="mt-2 text-dark fw-bold fs-7">{{ item.title }}</p>
          </div>

          <div
            class="progress step__line"
            role="progressbar"
            aria-label="Example 1px high"
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
            style="height: 5px"
          >
            <div
              class="progress-bar"
              :style="{ width: `${(100 / 3) * (step - 1)}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-4 rounded-bottom-0">
      <router-view @userdata="userdata" :userdata="data" />
    </div>
  </div>

</template>
<script>
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      data: {},
      stepBtn: [
        { title: '購物車', icon: 'bi bi-cart-check', step: 1 },
        { title: '填寫資料', icon: 'bi bi-person', step: 2 },
        { title: '確認訂單', icon: 'bi bi-credit-card-2-front', step: 3 },
        { title: '完成訂單', icon: 'bi bi-check2-circle', step: 4 },
      ],
      step: 1,
      to: ['/order/cart', '/order/info', '/order/confirm', '/order/finish'],
    };
  },

  methods: {
    userdata(item) {
      this.data = item;
    },
    route(to) {
      this.to.forEach((item, index) => {
        if (to === item) {
          this.step = index + 1;
        }
      });
    },
  },
  provide() {
    return {
      emitter,
    };
  },
  updated() {
    this.route(this.$route.path);
  },
};
</script>
