<template>
  <!-- Modal -->

  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content bg-secondary">
        <div class="modal-header border-0">
          <button
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
            class="ms-auto modal-menu__btn shadow btn btn-light text-primary fw-bold"
          >
            <span></span>CLOSE
          </button>
        </div>
        <div class="modal-body row light__content">
          <div class="col-6 contain-img">
            <img
              src="../assets/images/menu-img.jpg"
              alt="設計樣本和印刷品，包括一張藍色卡片，展示在開放的雜誌上，背景為淺灰色大理石桌面，呈現專業現代設計風格。"
            />
          </div>
          <menuContent class="col-auto mx-auto"></menuContent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modal from '@/mixin/ModalMixins';
import menuContent from '@/components/MenuContent.vue';

export default {
  components: {
    menuContent,
  },
  data() {
    return {
      modal: {},
      title: '',
    };
  },
  methods: {},
  mixins: [modal],
};
</script>
