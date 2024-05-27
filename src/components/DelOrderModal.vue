<template>
  <div class="modal" ref="modal" tabindex="-1" style="margin-top: 8%">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">刪除折價券</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            確定要刪除
            <span class="fw-bold" v-text="order.title"></span> 這項折價券嗎？
          </p>
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
            class="btn btn-danger"
            @click.prevent="$emit('del-order', order)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modal from '@/mixin/ModalMixins';

export default {
  data() {
    return {
      title: '',
    };
  },
  props: ['order'],

  mixins: [modal],
};
</script>
