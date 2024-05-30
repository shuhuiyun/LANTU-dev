<template>
  <LoadingSpinner :active="isLoading"></LoadingSpinner>

  <div class="g-5 products-list__content">
    <div class="row mt-5 border-bottom border-primary pb-4 border-1">
      <div class="col-6 text-start h3 fw-bold m-0 text-dark">顧客訂單</div>

      <div class="col-6 text-end">
        <button
          type="button"
          class="btn btn-danger"
          @click.prevent="delorder()"
        >
          刪除全部訂單
        </button>
      </div>
    </div>

    <table class="table mt-2 table-borderless">
      <thead>
        <tr class="table-light">
          <th width="50 ">購買時間</th>
          <th width="100 ">訂單編號</th>
          <th width="120">Email</th>
          <th width="350">購買款項</th>
          <th width="120">應付金額</th>
          <th width="100">是否付款</th>

          <th width="120"></th>
        </tr>
      </thead>
      <tbody class="tr-style">
        <tr v-for="item in orders" :key="item.id">
          <td class="py-2">{{ $filters.date(item.create_at) }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.user.email }}</td>
          <td class="text-right">
            <ul class="list-unstyled">
              <li v-for="product in item.products" :key="product.product.id">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ $filters.currency(item.total) }}</td>
          <td>
            <span class="text-success" v-if="item.is_paid">已付款</span>
            <span class="text-muted" v-else>未付款</span>
          </td>

          <td class="pe-3">
            <button
              type="button"
              class="product__button edit"
              @click="openModal(item)"
            >
              <i class="bi bi-eye-fill"></i>
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
  <div class="fs-2" v-if="!orders">目前還沒有訂單。</div>
  <OrderModal
    @update-product="updateProduct"
    :order="tempProduct"
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
import OrderModal from '@/components/OrderModal.vue';
import DelModal from '@/components/DelModal.vue';
import PageNavigation from '@/components/PageNavigation.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      title: '訂單',
      isLoading: false,
    };
  },
  components: {
    OrderModal,
    DelModal,
    PageNavigation,
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    delorder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/orders/all`;
      this.$http
        .delete(api)
        .then(() => {})
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得訂單失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
        });
    },
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/orders/?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.orders = res.data.orders;
          console.log(this.orders);
          this.pagination = res.data.pagination;
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得訂單失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
        });
    },
    openModal(item) {
      this.tempProduct = { ...item };

      const producComponent = this.$refs.productModal;
      producComponent.showModal();
    },

    openDelModal(item) {
      this.tempProduct = { ...item };
      const delProducComponent = this.$refs.delProductModal;
      delProducComponent.showModal();
    },
    delProduct(item) {
      const delProducComponent = this.$refs.delProductModal;
      this.tempProduct = item;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/order/${item.id}`;
      this.$http
        .delete(api, this.tempProduct)
        .then(() => {
          delProducComponent.hideModal();
          this.getProducts();
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得訂單失敗',
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
