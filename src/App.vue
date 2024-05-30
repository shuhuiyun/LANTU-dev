<template>
  <div
    class="d-flex flex-column content pt-5 pt-md-0 bgA"
    :class="{
      articles__bg: $route.meta.bgImage,
      articles__bg2: $route.meta.bgImage2,
    }"
    :style="`background-color: ${$route.meta.backgroundColor || '#ffffff'};
    `"
  >
    <MainNavbar
      :cartBtn="$route.meta.cartButton"
      :menuBtn="$route.meta.menuButton"
      :homeLogo="$route.meta.logo"
    ></MainNavbar>
    <router-view />
    <MainFooter v-if="Footer == undefined ? true : Footer"></MainFooter>
    <ToastMessages />
  </div>
</template>

<style lang="scss">
@import './assets/all.css';
</style>
<script>
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';
import MainFooter from '@/components/MainFooter.vue';
import MainNavbar from '@/components/MainNavbar.vue';

export default {
  data() {
    return {
      Footer: true,
      buttonActive: {
        menuButton: true,
        cartButton: true,
        homeLogo: true,
      },
    };
  },
  components: {
    MainFooter,
    MainNavbar,
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
  updated() {
    this.Footer = this.$route.meta.footer;
  },
  created() {
    this.Footer = this.$route.meta.footer;
  },
};
</script>
