<template>
  <div class="article container-fluid">
    <div class="row">
      <div class="main__contain col-11 bg-white ms-auto">
        <router-view></router-view>
      </div>
    </div>
    <div class="bg-primary bg-opacity-75 info row">
      <div class="col">
        <div class="row justify-content-center">
          <div class="col-auto px-5 d-none d-md-block">
            <img
              src="../assets/images/article_info_picture.jpg"
              class="img-fluid"
              alt="設計樣本和印刷品，包括精裝本書籍、一本淺藍色便條紙，以及手帳攤開展示在桌面上，呈現專業現代設計風格。"
            />
          </div>
          <div class="col-auto text-white fw-bold d-flex flex-column justify-content-center">
            <div class="row d-flex flex-column align-items-center ">
              <div class="col">
                <p class="mb-0">
                  關於印刷、設計專案
                  <br />
                  若有相關問題歡迎與我們聯繫
                </p>

              </div>
              <div class="col">
                <a href="tel:+886-2-22349876"
                class="link-light link-underline-opacity-0 fs-2">
                <span><i class="bi bi-telephone-fill me-3"></i></span
                  >02-2234-9876</a>

              </div>
              <div class="col">
                <button type="button" class="btn btn-light text-primary fs-7 mt-3">
                  <a
                    href="mailto:lantu@gmail.com"
                    class="link-offset-2 link-underline link-underline-opacity-0"
                  >
                    <span
                      ><i
                        class="bi bi-envelope-fill fs-6 me-2 align-baseline"
                      ></i></span
                    >線上詢價
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
