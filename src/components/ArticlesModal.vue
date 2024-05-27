<!-- eslint-disable max-len -->
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
          <h1 class="modal-title fs-5" id="exampleModalLabel">新增文章</h1>
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
                    v-model="tempProduct.image"
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
                  @click.prevent="uploadFile"
                >
                  新增圖片
                </button>
              </div>
              <div class="mb-3 input-group">
                <input
                  type="url"
                  class="form-control form-control"
                  :value="tempProduct.image"
                />
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click.prevent="delImage()"
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
                    <label for="author" class="form-label text-start col"
                      >作者
                      <input
                        v-model="tempProduct.author"
                        type="text"
                        class="form-control"
                        id="author"
                        placeholder="請輸入作者"
                      />
                    </label>
                  </div>
                </div>
                <div class="col-6">
                  <label for="author" class="form-label text-start col"
                    >時間
                    <input
                      v-model="date"
                      type="text"
                      class="form-control"
                      id="author"
                      disabled
                    />
                  </label>
                </div>
              </div>

              <div class="input-group mb-3">
                <Ckeditor
                  :editor="editor"
                  v-model="tempProduct.content"
                ></Ckeditor>
              </div>

              <div class="input-group mb-3">
                <label for="tag" class="form-label text-start col"
                  >標籤
                  <div class="row ps-3">
                    <div
                      v-for="(item, index) in tempProduct.tag"
                      :key="index"
                      class="col-auto bg-light border-1 border rounded-pill ps-3 m-1"
                    >
                      {{ item }}
                      <button
                        type="button"
                        class="btn btn-sm border-0 pe-0"
                        @click.prevent="delTag(index)"
                      >
                        <i class="bi bi-x-lg px-0"></i>
                      </button>
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="tag"
                      ref="tagInput"
                      placeholder="請輸入標籤"
                      aria-label="tag"
                      aria-describedby="button-addon2"
                    />
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                      @click.prevent="addTags"
                    >
                      確認
                    </button>
                  </div>
                </label>
              </div>
              <div class="mb-3">
                <div class="form-check text-start">
                  <label class="form-check-label" for="isPublic"
                    ><input
                      v-model="tempProduct.isPublic"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="true"
                      :false-value="false"
                      id="isPublic"
                    />
                    是否公開
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
            @click.prevent="$emit('update-product', tempProduct)"
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
    content: {},
  },

  watch: {
    product() {
      this.tempProduct = this.product;
      if (this.tempProduct.image) {
        this.image = this.tempProduct.image;
      } else {
        this.image = '';
      }
      if (this.tempProduct.tag) {
        this.tag = this.tempProduct.tag;
      } else {
        this.tag = [];
      }

      this.tempProduct.image = this.image;
      // 轉換時間格式為YYYY-MM-DD
      const dateAndTime = new Date(this.tempProduct.create_at * 1000)
        .toISOString()
        .split('T');
      [this.date] = dateAndTime;
    },
    content() {
      this.tempProduct.content = this.content;
    },
  },
  data() {
    return {
      tempArticle: {},
      editor: ClassicEditor,
      modal: {},
      tempProduct: {},
      image: '',
      date: '',
      tag: [],
      data: {},
    };
  },
  components: {
    Ckeditor: CKEditor.component,
  },
  methods: {
    delTag(item) {
      this.tempProduct.tag.splice(item, 1);
    },
    addTags() {
      if (this.tag.length <= 5) {
        const uploadedTag = this.$refs.tagInput.value;
        this.tag.push(uploadedTag);
        this.tempProduct.tag = this.tag;
      }
      this.$refs.tagInput.value = '';
    },
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0];

      const formData = new FormData();

      formData.append('file-to-upload', uploadedFile);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/upload`;
      this.$http.post(api, formData).then((res) => {
        if (res.data.success) {
          this.tempProduct.image = res.data.imageUrl;
          this.$refs.fileInput.value = '';
        }
      }).catch((error) => {
        console.error('錯誤:', error);
      });
    },

    delImage() {
      this.tempProduct.image = '';
    },
  },

  mixins: [modal],
};
</script>
