<template>
  <div class="modal" ref="modal" tabindex="-1" style="margin-top: 8%">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ `刪除${title}` }}</h5>
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
            <span class="fw-bold" v-text="product.title || product.id"></span>
            {{ `這項${title}嗎？` }}
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
            @click.prevent="$emit('del-product', product)"
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
      Mtitle: '',
    };
  },
  props: ['product', 'title'],

  mixins: [modal],
};
</script>
