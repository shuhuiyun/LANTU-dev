<template>
  <router-view></router-view>
  <ToastMessages></ToastMessages>
</template>
<script>
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  components: {
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
};
</script>
