<template>
  <LoadingSpinner :active="isLoading"></LoadingSpinner>

  <div class="g-5 products-list__content">
    <div class="row mt-5 border-bottom border-primary pb-4 border-1">
      <div class="col-6 text-start h3 fw-bold m-0 text-dark">折價券</div>

      <div class="col-6 text-end">
        <button
          type="button"
          class="btn btn-primary"
          @click.prevent="openModal(true)"
        >
          新增折價券
        </button>
      </div>
    </div>

    <table class="table mt-2 table-borderless">
      <thead>
        <tr class="table-light">
          <th width="120 ">名稱</th>
          <th width="100">折扣百分比</th>
          <th width="120">到期日</th>
          <th width="120">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody class="tr-style">
        <tr v-for="item in coupons" :key="item.id">
          <td class="py-2">{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td class="text-right">{{ $filters.date(item.due_date) }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td class="pe-3">
            <button
              type="button"
              class="product__button edit"
              @click.prevent="openModal(false, item)"
            >
              <i class="bi bi-pen-fill"></i>
            </button>

            <button
              type="button"
              class="product__button del"
              @click.prevent="openDelModal(item)"
            >
              <i class="bi bi-trash-fill"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination @emit-page="getProducts" :pages="pagination"></Pagination>
  </div>

  <CunponsModal
    @update-order="updateOrder"
    :coupon="tempOrder"
    ref="OrderModal"
  ></CunponsModal>
  <DelOrderModal
    :product="tempOrder"
    :title="title"
    @del-product="delOrder"
    ref="delOrderModal"
  ></DelOrderModal>
</template>

<script>
import CunponsModal from '../components/CouponsModal.vue';
import DelOrderModal from '../components/DelModal.vue';
import Pagination from '../components/PageNavigation.vue';

export default {
  data() {
    return {
      title: '優惠券',
      coupons: [],
      pagination: {},
      tempOrder: {},
      isNew: false,
      isLoading: false,
    };
  },
  components: {
    CunponsModal,
    DelOrderModal,
    Pagination,
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/coupons/?page=${page}`;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        this.coupons = res.data.coupons;
        this.pagination = res.data.pagination;
      }).catch((error) => {
        console.error('錯誤:', error);
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempOrder = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempOrder = { ...item };
      }

      this.isNew = isNew;
      const orderComponent = this.$refs.OrderModal;
      orderComponent.showModal();
    },
    updateOrder(item) {
      this.tempOrder = item;
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/coupon`;
      let httpMethod = 'post';
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/coupon/${item.id}`;
        httpMethod = 'put';
      }
      const OrderComponent = this.$refs.OrderModal;
      this.$http[httpMethod](api, { data: this.tempOrder }).then((res) => {
        if (res.data.success) {
          this.getProducts();
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功',
          }).catch((error) => {
            console.error('錯誤:', error);
          });
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: res.data.message.join('、'),
          });
        }

        OrderComponent.hideModal();
      });
    },
    openDelModal(item) {
      this.tempOrder = { ...item };
      const delProducComponent = this.$refs.delOrderModal;
      delProducComponent.showModal();
    },
    delOrder(item) {
      const delOrderComponent = this.$refs.delOrderModal;
      this.tempOrder = item;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/coupon/${item.id}`;
      this.$http.delete(api, this.tempOrder).then(() => {
        delOrderComponent.hideModal();
        this.getProducts();
      }).catch((error) => {
        console.error('錯誤:', error);
      });
    },
  },

  created() {
    this.getProducts();
  },
};
</script>
