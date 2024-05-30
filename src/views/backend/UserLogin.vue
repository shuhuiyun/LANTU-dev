<template>
  <div class="container fluid-height row mx-auto pt-5">
    <form @submit.prevent="signIn">
      <div class="row bg-white rounded-4 col-md-7 col-lg-5 mx-auto">
        <div class="login__contain">
          <div class="col">
            <h1 class="fs-1 text-primary mb-5 text-center">Login</h1>
            <div class="mb-2 px-5">
              <input
                class="form-control mb-3"
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                id="inputEmail"
                v-model="user.username"
              />
            </div>
            <div class="mb-2 px-5">
              <input
                class="form-control"
                type="password"
                placeholder="Password"
                aria-label="Password"
                id="inputPassword"
                v-model="user.password"
              />
            </div>
          </div>
          <div class="text-center mt-4 row">
            <button
              class="btn btn-primary fs-6 col-4 mx-auto mt-5"
              type="submit"
            >
              登入
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },

  inject: ['emitter', '$httpMessageState'],
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http
        .post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            console.log(res);
            const { token, expired } = res.data;
            document.cookie = `userToken=${token}; expires=${new Date(
              expired,
            )};`;
            this.$router.push('dashboard/products');
          }
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '登入失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
        });
    },
  },
};
</script>
