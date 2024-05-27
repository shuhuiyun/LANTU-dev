<template>
  <div class="toast-container p-3" style="position: fixed; top: 65px; right: 0">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg"></Toast>
  </div>
</template>

<script>
import Toast from '@/components/ToastItem.vue';

export default {
  data() {
    return {
      messages: [],
    };
  },
  components: { Toast },
  inject: ['emitter'],
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style, title, content } = message;
      this.messages.push({ style, title, content });
    });
  },
};
</script>
