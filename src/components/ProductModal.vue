<!-- eslint-disable vuejs-accessibility/label-has-for -->
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
          <h1 class="modal-title fs-5" id="exampleModalLabel">新增產品</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body container">
          <div class="row">
            <div class="col-sm-4">
              <div class="input-group mb-3">
                <label for="img-url" class="form-label text-start col"
                  >輸入圖片網址
                  <input
                    v-model="tempProduct.imgUrl"
                    type="text"
                    class="form-control"
                    id="img-url"
                    placeholder="請輸入圖片連結"
                  />
                </label>
              </div>
              <div class="input-group mb-3">
                <label class="form-label text-start col" for="img-file">
                  或 上傳圖片
                  <input
                    type="file"
                    class="form-control"
                    id="img-file"
                    ref="fileInput"
                  />
                </label>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-outline-primary d-block w-100 mb-5"
                  :disabled="imagesUrl.length == 3"
                  @click.prevent="uploadFile"
                >
                  新增圖片
                </button>
              </div>

              <div
                class="mb-3 input-group"
                v-for="(item, index) in tempProduct.imagesUrl"
                :key="index"
              >
                <input
                  type="url"
                  class="form-control form-control"
                  :value="tempProduct.imagesUrl[index]"
                />
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="delImage(index)"
                >
                  移除
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="input-group mb-3">
                <label for="title" class="form-label text-start col"
                  >標題
                  <input
                    v-model="tempProduct.title"
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                  />
                </label>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="input-group mb-3">
                    <label for="category" class="form-label text-start col"
                      >分類<select
                        ref="groupSelect"
                        id="category"
                        v-model="tempProduct.category"
                        class="form-select"
                      >
                        <option value="選擇分類項目" selected disabled>
                          選擇分類項目
                        </option>
                        <option
                          v-for="item in category"
                          :key="item"
                          :value="item"
                        >
                          {{ item }}
                        </option>
                      </select></label
                    >
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-group mb-3">
                    <label for="unit" class="form-label text-start col"
                      >單位
                      <input
                        v-model="tempProduct.unit"
                        type="text"
                        class="form-control"
                        id="unit"
                        placeholder="請輸入單位"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="input-group mb-3">
                    <label for="origin_price" class="form-label text-start col"
                      >原價
                      <input
                        v-model="tempProduct.origin_price"
                        type="number"
                        class="form-control"
                        id="origin_price"
                        placeholder="請輸入原價"
                      />
                    </label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-group mb-3">
                    <label for="price" class="form-label text-start col"
                      >售價
                      <input
                        v-model="tempProduct.price"
                        type="number"
                        class="form-control"
                        id="price"
                        placeholder="請輸入售價"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <label for="description" class="form-label text-start col"
                  >規格
                </label>
                <div class="input-group mb-3">
                  <Ckeditor
                    :editor="editor"
                    v-model="tempProduct.description"/>
                </div>
              </div>
              <div class="input-group mb-3">
                <label for="content" class="form-label text-start col"
                  >商品特色
                </label>
                <div class="input-group mb-3">
                  <Ckeditor
                    :editor="editor"
                    v-model="tempProduct.content"/>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check text-start">
                  <label class="form-check-label" for="is_enabled"
                    ><input
                      v-model="tempProduct.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    是否啟用
                  </label>
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
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-product', tempProduct, imagesUrl)"
          >
            上傳
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modal from '@/mixin/ModalMixins';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  watch: {
    product() {
      this.tempProduct = this.product;
      if (this.tempProduct.imagesUrl) {
        this.imagesUrl = this.tempProduct.imagesUrl;
      } else {
        this.imagesUrl = [];
      }
      this.tempProduct.imagesUrl = this.imagesUrl;
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      category: ['手帳/日誌', '筆記本', '便條紙', '信封信紙/卡片'],
      modal: {},
      tempProduct: {},
      imagesUrl: [],
    };
  },
  components: {
    Ckeditor: CKEditor.component,
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0];

      const formData = new FormData();

      formData.append('file-to-upload', uploadedFile);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/upload`;
      this.$http
        .post(api, formData)
        .then((res) => {
          if (res.data.success) {
            this.imagesUrl.push(res.data.imageUrl);
            this.firstImage(this.imagesUrl[0]);
            this.$refs.fileInput.value = '';
          }
        })
        .catch(() => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '取得商品失敗',
            content: '抱歉，出現系統問題，請聯絡我們！',
          });
        });
    },
    firstImage(item = '') {
      this.tempProduct.imageUrl = item;
    },
    delImage(item) {
      this.imagesUrl.splice(item, 1);
      this.firstImage(this.imagesUrl[0]);
    },
  },

  mixins: [modal],
};
</script>
