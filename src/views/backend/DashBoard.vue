<template>
  <div class="container-fluid">
    <div class="row pt-5 fluid-height">
      <div class="col-2 bg-secondary p-0 products-list__menu">
        <ul class="nav flex-column h-100">
          <li class="nav-item">
            <router-link
              to="products"
              class="text-start py-3 nav-link link-light"
              href="#"
              ><i class="me-3 bi bi-basket"></i>商品列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="order"
              class="text-start py-3 nav-link link-light"
              href="#"
              ><i class="me-3 bi bi-people"></i>顧客訂單</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="coupons"
              class="text-start py-3 nav-link link-light"
              href="#"
              ><i class="me-3 bi bi-ticket-perforated"></i>折價券</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="articles"
              class="text-start py-3 nav-link link-light"
              href="#"
              ><i class="me-3 bi bi-pencil-square"></i>文章管理</router-link
            >
          </li>
          <li class="nav-item logout-button">
            <a class="text-start py-3 nav-link link-light" href="#"
              ><i class="me-3 bi bi-box-arrow-left"></i>登出</a
            >
          </li>
        </ul>
      </div>
      <div class="col-10 g-5 products-list__content">
        <router-view />
      </div>
    </div>
  </div>
  <ToastMessages />
</template>

<script>
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';

export default {

  provide() {
    return {
      emitter,
    };
  },
  components: {
    ToastMessages,
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    this.$http.defaults.headers.common.Authorization = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http
      .post(api, this.user)
      .then((res) => {
        if (!res.data.success) {
          this.$router.push('login');
        }
      })
      .catch((res) => {
        this.emitter.emit('push-message', {
          style: 'danger',
          title: '登入失敗',
          content: res.data.message.join('、'),
        });
      });
  },
};
</script>
