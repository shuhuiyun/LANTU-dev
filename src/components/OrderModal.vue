<template>
  <div
    class="modal fade"
    ref="modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">訂單細節</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body container">
          <div class="row">
            <div class="col-6" v-if="tempOrder.user">
              <h4>用戶資料</h4>
              <table class="table">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-6">
              <div class="row">
                <div class="col-12">
                  <h4>訂單細節</h4>
                  <table class="table">
                    <tbody>
                      <tr>
                        <th style="width: 100px">訂單編號</th>
                        <td>{{ tempOrder.id }}</td>
                      </tr>
                      <tr>
                        <th>下單時間</th>
                        <td>{{ $filters.date(tempOrder.create_at) }}</td>
                      </tr>
                      <tr>
                        <th>付款時間</th>
                        <td>
                          <span v-if="tempOrder.paid_date">
                            {{ $filters.date(tempOrder.paid_date) }}
                          </span>
                          <span v-else>時間不正確</span>
                        </td>
                      </tr>
                      <tr>
                        <th>付款狀態</th>
                        <td>
                          <strong v-if="tempOrder.is_paid" class="text-success"
                            >已付款</strong
                          >
                          <span v-else class="text-muted">尚未付款</span>
                        </td>
                      </tr>
                      <tr>
                        <th>總金額</th>
                        <td>
                          {{ $filters.currency(tempOrder.total) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-12">
                  <h4>選購商品</h4>
                  <table class="table">
                    <thead>
                      <tr></tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in tempOrder.products" :key="item.id">
                        <th>
                          {{ item.product.title }}
                        </th>
                        <td>{{ item.qty }} / {{ item.product.unit }}</td>
                        <td class="text-end">
                          {{ $filters.currency(item.final_total) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modal from '@/mixin/ModalMixins';

export default {
  props: {
    order: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    order() {
      this.tempOrder = this.order;
    },
  },
  data() {
    return {
      modal: {},
      tempOrder: {},
    };
  },
  methods: {},
  mixins: [modal],
};
</script>
