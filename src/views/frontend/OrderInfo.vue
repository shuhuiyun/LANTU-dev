<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="container pt-5 pb-4">
    <VForm
      v-slot="{ errors, validate }"
      class="row g-3 justify-content-center Info__content"
      @submit="onSubmit"
    >
      <!-- 表單填寫 -->
      <div class="row border-bottom pb-4 justify-content-center">
        <div class="row justify-content-center order__padding">
          <div class="col-12 col-md-6 mb-md-4">
            <label for="inputName" class="form-label w-100 Info__label" >
              <p class="text-nowrap me-2 mt-2 mb-0">
                姓名<span class="text-danger">*</span>
              </p>

              <div class="row w-100 m-0 p-0">
                <VField
                  name="姓名"
                  class="form-control w-100"
                  id="inputName"
                  type="text"
                  v-model="data.user.name"
                  :class="{ 'is-invalid': errors['姓名'] }"
                  rules="required"
                />
                <ErrorMessage name="姓名" class="invalid-feedback p-0" /></div
            ></label>
          </div>
          <div class="col-12 col-md-6 mb-md-4">
            <label for="inputTel" class="form-label w-100 Info__label"
              ><p class="text-nowrap me-2 mt-2 mb-0">
                電話<span class="text-danger">*</span>
              </p>
              <div class="row w-100 m-0 p-0">
                <VField
                  name="電話"
                  class="form-control w-100"
                  id="inputTel"
                  type="tel"
                  :class="{ 'is-invalid': errors['電話'] }"
                  v-model="data.user.tel"
                  rules="required"
                />
                <ErrorMessage name="電話" class="invalid-feedback p-0" /></div
            ></label>
            <ErrorMessage name="email" class="invalid-feedback" />
          </div>
          <div class="col-12 mb-md-4">
            <label for="inputEmail" class="form-label w-100 Info__label"
              ><p class="text-nowrap me-2 mt-2 mb-0">
                信箱<span class="text-danger">*</span>
              </p>
              <div class="row w-100 m-0 p-0">
                <VField
                  name="信箱"
                  class="form-control w-100"
                  id="inputEmail"
                  type="email"
                  v-model="data.user.email"
                  :class="{ 'is-invalid': errors['信箱'] }"
                  rules="email|required"
                />
                <ErrorMessage name="信箱" class="invalid-feedback p-0" />
              </div>
            </label>
          </div>
          <div class="col-12 mb-md-4">
            <label for="inputAddress" class="form-label Info__label d-flex"
              ><p class="text-nowrap me-2 mt-2 mb-0">
                地址<span class="text-danger">*</span>
              </p>
              <div class="row w-100 m-0 p-0">
                <VField
                  name="地址"
                  class="form-control w-100"
                  id="inputAddress"
                  type="text"
                  v-model="data.user.address"
                  :class="{ 'is-invalid': errors['地址'] }"
                  rules="required"
                />
                <ErrorMessage name="地址" class="invalid-feedback p-0" />
              </div>
            </label>
          </div>

          <div class="col-12 d-flex Info__label mb-md-4">
            <p class="text-nowrap me-2 m-0 mt-2">
              取貨<span class="text-danger">*</span>
            </p>
            <div class="row d-flex flex-row">
              <div class="col-12 d-flex">
                <div class="form-check me-3 col-auto">
                  <label class="form-check-label" for="Radio1">
                    宅配
                    <VField
                      class="form-check-input"
                      type="radio"
                      v-model="data.pick"
                      value="宅配"
                      name="取貨"
                      :class="{ 'is-invalid': errors['取貨'] }"
                      rules="required"
                      id="Radio1"
                  /></label>
                </div>
                <div class="form-check me-3 col-auto">
                  <label class="form-check-label" for="Radio2">
                    超商取貨
                    <VField
                      class="form-check-input"
                      type="radio"
                      value="超商取貨"
                      v-model="data.pick"
                      name="取貨"
                      :class="{ 'is-invalid': errors['取貨'] }"
                      rules="required"
                      id="Radio2"
                  /></label>
                </div>
                <div class="form-check me-3 col-auto">
                  <label class="form-check-label" for="Radio3">
                    本店自取
                    <VField
                      class="form-check-input"
                      type="radio"
                      value="本店自取"
                      v-model="data.pick"
                      name="取貨"
                      :class="{ 'is-invalid': errors['取貨'] }"
                      rules="required"
                      id="Radio3"
                  /></label>
                </div>
              </div>
              <error-message
                class="invalid-feedback d-block mt-0 mb-1"
                name="取貨"
              />
            </div>
          </div>
          <div class="col-12 d-flex Info__label mb-md-4">
            <p class="text-nowrap me-2 m-0 mt-2">
              付款<span class="text-danger">*</span>
            </p>
            <div class="row d-flex flex-row">
              <div class="col-12 d-flex">
                <div class="form-check me-3 col-auto">
                  <label class="form-check-label" for="Radio4">
                    ATM匯款
                    <VField
                      class="form-check-input"
                      type="radio"
                      value="ATM匯款"
                      v-model="data.send"
                      name="付款"
                      :class="{ 'is-invalid': errors['付款'] }"
                      rules="required"
                      id="Radio4"
                  /></label>
                </div>
                <div class="form-check me-3 col-auto">
                  <label class="form-check-label" for="Radio5">
                    信用卡
                    <VField
                      class="form-check-input"
                      type="radio"
                      value="信用卡"
                      v-model="data.send"
                      name="付款"
                      :class="{ 'is-invalid': errors['付款'] }"
                      rules="required"
                      id="Radio5"
                  /></label>
                </div>
                <div class="form-check me-3 col-auto">
                  <label class="form-check-label" for="Radio6">
                    貨到付款
                    <VField
                      class="form-check-input"
                      type="radio"
                      value="貨到付款"
                      v-model="data.send"
                      name="付款"
                      :class="{ 'is-invalid': errors['付款'] }"
                      rules="required"
                      id="Radio6"
                  /></label>
                </div>
              </div>
              <error-message
                class="invalid-feedback d-block mt-0 mb-1"
                name="付款"
              />
            </div>
          </div>
          <div class="col-12 mb-md-4">
            <label
              for="textarea"
              class="form-label align-items-start w-100 Info__label"
              ><p class="text-nowrap me-2 m-0 pt-md-2 mt-2">
                留言<span class="text-danger opacity-0">*</span>
              </p>
              <textarea
                style="resize: none"
                class="form-control"
                id="textarea"
                v-model="data.message"
                rows="3"
              ></textarea>
            </label>
          </div>
        </div>
      </div>

      <!-- 金額總計 -->
      <div
        class="row py-4 px-0 justify-content-end flex-column align-items-end"
      >
        <div
          class="col-10 col-md-6 col-lg-6 border-bottom order__padding-right"
        >
          <div class="row">
            <div class="row py-3">
              <div class="col-7 text-start ps-5">小計</div>
              <div class="col-5 pe-3 text-end">{{ `NT$${total.total}` }}</div>
            </div>
            <div class="row pb-3 text-primary">
              <div class="col-7 text-start ps-5">優惠券</div>
              <div class="col-5 pe-3 text-end text-nowrap">
                {{ `-NT$${total.total - total.final_total}` }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-10 col-md-6 col-lg-6 order__padding-right">
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
      <div class="row justify-content-between mt-4 order__padding">
        <button
          @click="$router.push('/order/cart')"
          type="button"
          class="col-auto col-lg-auto btn btn-outline-primary order__btn"
        >
          上一步
        </button>
        <button
          class="col-auto col-lg-auto btn btn-primary order__btn"
          @click="validate"
          type="submit"
        >
          下一步
        </button>
      </div>
    </VForm>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: {},
      isNew: true,
      data: { user: {} },
    };
  },
  props: ['userdata'],
  inject: ['emitter', '$httpMessageState'],
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/cart`;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.total.final_total = res.data.data.final_total;
          this.total.total = res.data.data.total;
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得訂單失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
        });
    },
    onSubmit() {
      this.$emit('userdata', this.data);

      this.$router.push('/order/confirm');
    },
    getPropData(item = 0) {
      if (item) {
        this.data = this.userdata;
      }
    },
  },

  created() {
    this.getProducts();
    this.getPropData(this.userdata.user);
  },
};
</script>
