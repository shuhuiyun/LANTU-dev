<template>
  <div
    class="toast align-items-center"
    role="alert"
    ref="toast"
    aria-live="assertive"
    aria-atomic="true"
    v-if="!msg.content"
  >
    <div class="d-flex">
      <div class="toast-body">
        <span
          :class="`bg-${msg.style}`"
          class="align-middle p-2 rounded me-2 d-inline-block"
        ></span
        >{{ msg.title }}
      </div>
      <button
        type="button"
        class="btn-close me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
  <!-- 失敗訊息 -->
  <div
    class="toast"
    ref="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    v-else
  >
    <div class="toast-header">
      <strong class="me-auto"
        ><span
          :class="`bg-${msg.style}`"
          class="align-middle p-2 rounded me-2 d-inline-block"
        ></span
        >{{ msg.title }}</strong
      >

      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div class="toast-body">
      {{ msg.content }}
    </div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast';

export default {
  props: ['msg'],
  mounted() {
    const toastEl = this.$refs.toast;
    const toast = new Toast(toastEl, { delay: 6000 });
    toast.show();
  },
};
</script>
