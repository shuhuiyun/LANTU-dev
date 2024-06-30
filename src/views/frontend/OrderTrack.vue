<template>
  <div class="container">
    <div class="row">
      <div class="main__contain bg-white rounded-top-5" style="margin-top: 10%">
        <router-view />
      </div>
    </div>
  </div>

</template>
<script>
import emitter from '@/methods/emitter';

export default {

  provide() {
    return {
      emitter,
    };
  },
};
</script>
