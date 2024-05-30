<template>
  <LoadingSpinner :active="isLoading"></LoadingSpinner>

  <div class="g-5 products-list__content">
    <div class="row mt-5 border-bottom border-primary pb-4 border-1">
      <div class="col-6 text-start h3 fw-bold m-0 text-dark">文章管理</div>

      <div class="col-6 text-end">
        <button type="button" class="btn btn-primary" @click="openModal(true)">
          新增文章
        </button>
      </div>
    </div>

    <table class="table mt-2 table-borderless">
      <thead>
        <tr class="table-light">
          <th width="120 ">建立時間</th>
          <th width="100">文章標題</th>
          <th width="120">作者</th>
          <th width="120">公開</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody class="tr-style">
        <tr v-for="item in products" :key="item.id">
          <td class="py-2">{{ $filters.date(item.create_at) }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.author }}</td>
          <td>
            <span class="text-success" v-if="item.isPublic">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td class="pe-3">
            <button
              type="button"
              class="product__button edit"
              @click="openModal(false, item)"
            >
              <i class="bi bi-pen-fill"></i>
            </button>

            <button
              type="button"
              class="product__button del"
              @click="openDelModal(item)"
            >
              <i class="bi bi-trash-fill"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <PageNavigation
      @emit-page="getProducts"
      :pages="pagination"
    />
  </div>

  <ArticlesModal
    @update-product="updateProduct"
    :product="tempProduct"
    :content="tempContent"
    ref="productModal"
  />
  <DelModal
    :product="tempProduct"
    :title="title"
    @del-product="delProduct"
    ref="delProductModal"
  />
</template>

<script>
import ArticlesModal from '@/components/ArticlesModal.vue';
import DelModal from '@/components/DelModal.vue';
import PageNavigation from '@/components/PageNavigation.vue';

export default {
  data() {
    return {
      tempContent: '',
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      title: '文章',
      isLoading: false,
    };
  },
  components: {
    ArticlesModal,
    DelModal,
    PageNavigation,
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/articles/?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.articles;
          this.pagination = res.data.pagination;
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得文章失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
        });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {
          create_at: new Date().getTime() / 1000,
        };
      } else {
        this.tempProduct = { ...item };

        // 獲取文章內容
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/article/${item.id}`;
        this.$http
          .get(api)
          .then((res) => {
            this.tempProduct.content = res.data.article.content;
          })
          .catch(() => {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '取得文章失敗',
              content: '抱歉，出現系統問題，請聯絡我們！',
            });
          });
      }
      this.isNew = isNew;
      const producComponent = this.$refs.productModal;
      producComponent.showModal();
    },
    updateProduct(item) {
      this.tempProduct = item;

      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/article`;
      let httpMethod = 'post';
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/article/${item.id}`;
        httpMethod = 'put';
      }
      const producComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((response) => {
          this.$httpMessageState(response, '更新文章狀態');
          this.getProducts();
          producComponent.hideModal();
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得文章失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
        });
    },
    openDelModal(item) {
      this.tempProduct = { ...item };
      const delProducComponent = this.$refs.delProductModal;
      delProducComponent.showModal();
    },
    delProduct(item) {
      const delProducComponent = this.$refs.delProductModal;
      this.tempProduct = item;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/article/${item.id}`;
      this.$http
        .delete(api, this.tempProduct)
        .then(() => {
          delProducComponent.hideModal();
          this.getProducts();
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得文章失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
