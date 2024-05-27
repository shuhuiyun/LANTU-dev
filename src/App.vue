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
    <Navbar
      :cartBtn="this.$route.meta.cartButton"
      :menuBtn="this.$route.meta.menuButton"
      :homeLogo="this.$route.meta.logo"
    ></Navbar>
    <router-view />
    <Footer v-if="Footer == undefined ? true : Footer"></Footer>
  </div>
</template>

<style lang="scss">
@import './assets/all.css';
</style>
<script>
import Footer from '@/components/MainFooter.vue';
import Navbar from '@/components/MainNavbar.vue';

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
    Footer,
    Navbar,
  },

  updated() {
    this.Footer = this.$route.meta.footer;
  },
  created() {
    this.Footer = this.$route.meta.footer;
  },
};
</script>
