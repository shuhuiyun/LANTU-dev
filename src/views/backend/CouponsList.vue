<template>
  <LoadingSpinner :active="isLoading" />

  <div class="g-5 products-list__content">
    <div class="row mt-5 border-bottom border-primary pb-4 border-1">
      <div class="col-6 text-start h3 fw-bold m-0 text-dark">折價券</div>

      <div class="col-6 text-end">
        <button type="button" class="btn btn-primary" @click="openModal(true)">
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

  <CunponsModal
    @update-order="updateOrder"
    :coupon="tempOrder"
    ref="OrderModal"
  />
  <DelModal
    :product="tempOrder"
    :title="title"
    @del-product="delOrder"
    ref="delOrderModal"
  />
</template>

<script>
import CunponsModal from '@/components/CouponsModal.vue';
import DelModal from '@/components/DelModal.vue';
import PageNavigation from '@/components/PageNavigation.vue';

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
    DelModal,
    PageNavigation,
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/coupons/?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得優惠券失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
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

      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/coupon/${item.id}`;
        httpMethod = 'put';
      }
      const OrderComponent = this.$refs.OrderModal;
      this.$http[httpMethod](api, { data: this.tempOrder })
        .then((res) => {
          if (res.data.success) {
            this.getProducts();
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功',
            });
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗',
              content: res.data.message.join('、'),
            });
          }

          OrderComponent.hideModal();
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
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
      this.$http
        .delete(api, this.tempOrder)
        .then(() => {
          delOrderComponent.hideModal();
          this.getProducts();
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得優惠券失敗',
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
