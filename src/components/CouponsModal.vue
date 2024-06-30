<template>
  <div
    class="modal fade"
    ref="modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">新增折價券</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body container">
          <div class="row">
            <div class="col-12">
              <div class="input-group mb-3">
                <label for="title" class="form-label text-start col"
                  >標題
                  <input
                    v-model="tempCoupons.title"
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                  />
                </label>
              </div>
              <div class="input-group mb-3">
                <label for="percent" class="form-label text-start col"
                  >折扣
                  <input
                    v-model="tempCoupons.percent"
                    type="number"
                    class="form-control"
                    id="percent"
                    placeholder="請輸入折扣"
                  />
                </label>
              </div>
              <div class="input-group mb-3">
                <label for="due_date" class="form-label text-start col"
                  >到期日

                  <input
                    v-model="due_date"
                    type="date"
                    class="form-control"
                    id="due_date"
                  />
                </label>
              </div>
              <div class="input-group mb-3">
                <label for="code" class="form-label text-start col"
                  >內容
                  <input
                    v-model="tempCoupons.code"
                    type="text"
                    class="form-control"
                    id="code"
                    placeholder="請輸入內容"
                  />
                </label>
              </div>

              <div class="mb-3">
                <div class="form-check text-start">
                  <label class="form-check-label" for="is_enabled"
                    ><input
                      v-model="tempCoupons.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-order', tempCoupons)"
          >
            上傳
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modal from '@/mixin/ModalMixins';

export default {
  props: {
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    coupon() {
      this.tempCoupons = this.coupon;
      const dateAndTime = new Date(this.tempCoupons.due_date * 1000)
        .toISOString()
        .split('T');
      [this.due_date] = dateAndTime;
    },
    due_date() {
      this.tempCoupons.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  data() {
    return {
      modal: {},
      tempCoupons: {},
      due_date: '',
    };
  },
  mixins: [modal],
};
</script>
