<template>
  <!-- 手機版navbar -->
  <nav class="bg-light row p-2 pe-3 nav--sm d-md-none" style="z-index: 1000">
    <div class="col me-auto text-start my-auto">
      <a
        class="navbar-brand d-flex align-content-center"
        href="#"
        v-if="homeLogo == undefined ? true : homeLogo"
      >
        <h1 class="align-content-center m-0 nav__logo--sm">LAN-TU</h1>
      </a>
    </div>
    <!-- <a href="https://www.instagram.com/"
    target="_blank" class="icon-buttom position-relative"
    aria-label="Ins">
    <i class="bi bi-instagram text-white
    position-absolute top-50 start-50 translate-middle"></i></a> -->
    <div
      class="col-auto p-1"
      style="min-width: 45px"
      v-if="cartBtn == undefined ? true : cartBtn"
    >
      <a href="#" class="d-block h-100 position-relative"
      @click.prevent="$router.push('/order/cart')"
      aria-label="cart"
        ><i class="bi bi-cart2 fs-4 text-primary position-relative"
          ><span class="badges mobile text-center" v-if="getQty">{{
            getQty
          }}</span></i
        ></a
      >
    </div>
    <div
      class="col-auto p-1"
      v-if="menuBtn == undefined ? true : menuBtn"
      style="min-width: 45px"
    >
      <a href="#" class="d-block h-100 position-relative"
      aria-label="menu" @click.prevent="$refs.menuModal.showModal()"
        ><i class="bi bi-list fs-4 text-primary
        position-absolute top-50 start-50 translate-middle"></i
      ></a>
    </div>
  </nav>
  <nav class="p-4 d-none d-md-block">
    <div class="container-fluid">
      <div class="row p-0">
        <div class="col-7 col-md-4 p-0 me-auto">
          <a
            class="navbar-brand d-flex align-content-center"
            href="#"
            v-if="homeLogo == undefined ? true : homeLogo"
          >
            <h1 class="align-content-center m-0 nav__logo--lg">LAN-TU</h1>
          </a>
        </div>

        <div class="col-auto p-0">
          <button
            type="button"
            class="btn btn-light fw-bold text-primary m-0 shadow nav__shop-button"
            style="z-index: 100"
            @click="$router.push('/order/cart')"
            v-if="cartBtn == undefined ? true : cartBtn"
          >
            <span class="icon"><i class="bi bi-cart2 fs-5"></i></span>
            購物車<span class="badges" v-if="getQty">{{ getQty }}</span>
          </button>
          <button
            type="button"
            class="btn btn-primary m-0 shadow nav__menu-button"
            v-if="menuBtn == undefined ? true : menuBtn"
            @click="$refs.menuModal.showModal()"
            style="z-index: 100"
          >
            <span></span>MENU
          </button>
        </div>
      </div>
    </div>
  </nav>
  <MenuModal ref="menuModal" @hide-modal="hideModal"></MenuModal>
</template>
<script>
import MenuModal from '@/components/MenuModal.vue';
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/user';

export default {
  data() {
    return {
      qty: 0,
      menuModal: {},
    };
  },
  computed: {
    ...mapState(userStore, ['product', 'getQty']),
  },
  props: ['cartBtn', 'menuBtn', 'homeLogo'],
  components: {
    MenuModal,
  },
  provide: {
    menuModal: 'modal',
  },
  methods: {
    ...mapActions(userStore, ['getProducts']),
  },
  updated() {
    this.isLoading = true;
    this.getProducts();
  },
  created() {
    this.getProducts();
  },
};
</script>
