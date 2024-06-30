<template>
  <LoadingSpinner :active="isLoading" />

  <div class="g-5 products-list__content">
    <div class="row mt-5 border-bottom border-primary pb-4 border-1">
      <div class="col-6 text-start h3 fw-bold m-0 text-dark">商品列表</div>

      <div class="col-6 text-end">
        <button type="button" class="btn btn-primary" @click="openModal(true)">
          新增產品
        </button>
      </div>
    </div>

    <table class="table mt-2 table-borderless">
      <thead>
        <tr class="table-light">
          <th width="120 ">分類</th>
          <th width="200">商品</th>
          <th width="120">定價</th>
          <th width="120">售價</th>
          <th width="100">上架</th>
          <th width="150"></th>
        </tr>
      </thead>
      <tbody class="tr-style">
        <tr v-for="item in products" :key="item.id">
          <td class="py-2">{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ $filters.currency(item.origin_price) }}</td>
          <td class="text-right">{{ $filters.currency(item.price) }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>

          <td class="pe-3 text-center">
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
    <PageNavigation @emit-page="getProducts" :pages="pagination" />
  </div>

  <ProductModal
    @update-product="updateProduct"
    :product="tempProduct"
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
import ProductModal from '@/components/ProductModal.vue';
import DelModal from '@/components/DelModal.vue';
import PageNavigation from '@/components/PageNavigation.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      title: '商品',
      isLoading: false,
    };
  },
  components: {
    ProductModal,
    DelModal,
    PageNavigation,
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/products/?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得商品失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
        });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      const producComponent = this.$refs.productModal;
      producComponent.showModal();
    },
    updateProduct(item) {
      this.tempProduct = item;
      this.tempProduct.is_paid = false;
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/product`;
      let httpMethod = 'post';

      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      const producComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((response) => {
          this.$httpMessageState(response, '更新商品狀態');
          this.getProducts();
          producComponent.hideModal();
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得商品失敗',
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
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/product/${item.id}`;
      this.$http
        .delete(api, this.tempProduct)
        .then(() => {
          delProducComponent.hideModal();
          this.getProducts();
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得商品失敗',
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
