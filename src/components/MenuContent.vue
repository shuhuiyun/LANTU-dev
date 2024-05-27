<template>
  <div class="col order-md-last">
    <ul class="ps-0">
      <li
        class="border-line py-4 pe-3"
        v-for="(item, index) in titleItem"
        :key="index"
      >
        <a
          :data-bs-dismiss="menuModal"
          @click.prevent="[link(item.link), $emit('hide-modal', hideModal)]"
          href="#"
          class="row link-underline link-underline-opacity-0 linkHover"
          ><div class="col-1 title-color fw-bolder me-md-4 me-lg-5">
            {{ `0${index + 1}` }}
          </div>
          <div class="col text-start">
            <div class="h5 fw-bolder title-color">
              {{ item.title }}
            </div>
            <div class="subtitle-color fs-7 text-hide">{{ item.subtitle }}</div>
          </div>
          <div
            class="col-auto arrow-color text-center align-content-center bg-link"
          >
            <i class="bi bi-arrow-right-short fs-3"></i></div
        ></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: '',

      hideModal: true,
      titleItem: [
        {
          title: '關於藍圖創意印刷',
          subtitle: '了解我們的品牌故事與發展歷程',
          link: '/about',
        },
        {
          title: '最新消息與專案故事',
          subtitle: '擁有最新的技術，完成精美印刷品',
          link: '/article/news',
        },
        {
          title: '印刷小物線上購買',
          subtitle: '筆記本、桌曆、小手冊、多項商品',
          link: '/user/cart',
        },
        {
          title: '想要查詢訂購清單',
          subtitle: '提供信箱可查詢詳細訂單內容',
          link: '/ordertrack/search',
        },
      ],
    };
  },
  inject: ['menuModal'],
  watch: {
    propModal() {
      this.modal = this.propModal;
    },
  },
  methods: {
    link(item) {
      this.$router.push(`${item}`);
    },
  },
};
</script>
