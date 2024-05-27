<template>
  <div class="home container-fluid">
    <!-- logo -->
    <div class="logo position-relative">
      <img
        src="../assets/images/logo.svg"
        class="w-100 px-5 d-none d-md-block z-3"
        alt="LANTU LTD(藍圖印刷Logo)"
      />
      <img
        src="../assets/images/logo-sm.svg"
        class="w-100 px-2 d-md-none position-relative z-3"
        alt="LANTU(藍圖印刷Logo)"
      />
    </div>
    <!-- main -->

    <div class="row" style="height: 700px">
      <div class="col-auto home__image-main ps-0">
        <img
          src="../assets/images/menu-img.jpg"
          class="img-fluid"
          alt="設計樣本和印刷品，包括一張藍色卡片，展示在開放的雜誌上，背景為淺灰色大理石桌面，呈現專業現代設計風格。"
        />
      </div>
      <div class="col d-none d-md-flex primary__content home__content">
        <menuContent></menuContent>
      </div>
      <div
        class="col-auto d-none d-md-block home__image-secondary"
        style="width: 17%"
      >
        <img
          src="../assets/images/home_img_02.jpg"
          class="img-fluid"
          alt="大型工業打印機正在打印彩色標籤，背景為工廠環境，展示出高精度的印刷技術。"
        />
      </div>
    </div>

    <!-- Services -->
    <div class="row">
      <div class="d-flex bg-light pe-0">
        <div class="bg-light" style="width: 8%"></div>
        <div class="home__services" style="background-color: white; width: 92%">
          <p class="text-primary fs-6 mb-0 fw-bold">服務流程</p>
          <p class="text-primary fw-bold services__title">Services</p>
          <p class="fs-7 text-black-50 mb-4">
            我們將從數據出發，提供從印刷服務策略制定到方案設計與執行的全方位市場營銷支援。
          </p>

          <ul class="d-flex row row-cols-2 row-cols-md-2 row-cols-lg-4 p-0">
            <li class="col" v-for="item in serviclesList" :key="item.title">
              <div class="text-center position-relative">
                <img
                  :src="require(`@/assets/images/${item.img}.jpg`)"
                  style="object-fit: cover; aspect-ratio: 1 / 1"
                  class="img-fluid rounded-circle mb-3"
                  :alt="item.title"
                />
              </div>
              <p class="fs-7 text-primary m-0 text-center d-none d-md-block">
                {{ item.engTitle }}
              </p>
              <p class="fs-5 fw-bold text-center">{{ item.title }}</p>
              <p class="text-left text__content">
                {{ item.content }}
              </p>
            </li>
          </ul>
          <div class="row d-flex justify-content-center">
            <button type="button" class="btn btn-primary text-center col-auto">
              <a
                href="mailto:lantu@gmail.com"
                class="text-light link-offset-2 link-underline link-underline-opacity-0"
              >
                立即前往並聯繫我們
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Articles -->
    <div class="row">
      <div class="d-flex bg-white px-0 position-relative">
        <div class="articles__image-left ps-0">
          <img
            src="../assets/images/home_img_03.jpg"
            class="img-fluid"
            alt="
一張滿版印刷的深藍色漸層海報與各式專業現代設計風格海報，以及供客戶選擇特別色的標準樣本，展示於桌面上。"
          />
        </div>
        <div class="articles__image-right ps-0">
          <img
            src="../assets/images/article_info_bg.jpg"
            class="img-fluid"
            alt="有水彩暈染風格的精裝書籍，標題與封面側邊含有精緻的燙金技術。"
          />
        </div>
        <div class="bg-light home__articles" style="width: 92%">
          <p
            class="articles_title d-none d-md-block"
            style="writing-mode: vertical-lr"
          >
            <span class="fs-6 fw-bold">最新消息<span></span> </span>
            Articles
          </p>
          <div class="row">
            <div class="col-auto w-100 col-md-7">
              <ul>
                <div class="d-md-none">
                  <p class="text-primary fs-6 mb-0 fw-bold">最新消息</p>
                  <p class="text-primary fw-bold" style="font-size: 2rem">
                    Articles
                  </p>
                </div>
                <li
                  v-for="(item, index) in tempAriticles"
                  :key="item.id"
                  class="py-4"
                >
                  <div class="row d-flex flex-column">
                    <div class="col">
                      <div class="row">
                        <div class="col-4">
                          <router-link :to="`/article/new/${item.id}`">
                            <img
                              :src="item.image"
                              class="img-fluid rounded-4"
                              :alt="item.title"
                              style="aspect-ratio: 1 / 1; object-fit: cover"
                            />
                          </router-link>
                        </div>
                        <div class="col-8">
                          <div class="row d-flex flex-column">
                            <div class="col">
                              <div class="row">
                                <div
                                  class="col-auto mb-3 p-0 me-3"
                                  v-for="(tag, index) in item.tag"
                                  :key="`${tag}${index+1}`"
                                >
                                  <router-link
                                    class="fs-7 fw-bold articles_tag"
                                    to="/article/search_tag"
                                    @click.prevent="searchTag(tag)"
                                  >
                                    {{ `#${tag}` }}</router-link
                                  >
                                </div>
                              </div>
                            </div>
                            <router-link :to="`/article/new/${item.id}`">
                              <div class="col fs-4 fw-bold text-primary">
                                {{ item.title }}
                              </div>
                              <div
                                class="col articles_content"
                                v-html="articleContentArr[index]"
                              ></div>
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col text-end mt-3">
                      <router-link
                        :to="`/article/new/${item.id}`"
                        class="fs-7 article__link"
                        aria-label="moreBtn"
                        >查看完整文章</router-link
                      >
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="" style="background-color: white; width: 8%"></div>
      </div>
    </div>

    <!-- Shooping -->
    <div class="row position-relative">
      <div class="shopping_title">
        <p class="d-none d-md-block" style="writing-mode: vertical-lr">
          <span class="fs-6 fw-bold">印刷小物<span></span> </span>
          Shopping
        </p>
        <button type="button" class="shopping_button d-none d-md-block">
          <i class="bi bi-arrow-right-short"></i>
          <span class="shoppimg__btn--line"></span>
          <span></span>
        </button>
      </div>

      <div class="shopping">
        <p
          class="text-primary fs-7 ms-5 d-none d-md-block"
          style="margin-top: 107px"
        >
          探索無盡的印刷驚喜，盡在我們的線上商店。
          <br />
          桌曆上的每一張圖片，都是生活中的一道風景線。
        </p>
        <div class="shopping__img">
          <img
            src="../assets/images/home_shopping.jpg"
            class="img-fluid"
            alt="設計樣本和印刷品，色彩明亮、現代簡約風格的書籍和雜誌展示，突顯我們專業的設計風格及印刷技術。"
          />
        </div>
        <div class="d-md-none p-4">
          <p class="text-primary fs-6 mb-0 fw-bold">印刷小物</p>
          <p class="text-primary fw-bold" style="font-size: 2rem">Shopping</p>
          <p>
            現在，只需在線上購買我們的印刷品，輸入指定的優惠碼「LANTU50」，即可享五折優惠。
          </p>
          <router-link to="/user/cart">
            <button type="button" class="btn btn-primary" role="link">
              前往購買
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- New -->
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

<script>
import { mapState, mapActions } from 'pinia';
import articlesList from '@/stores/articles';
import menuContent from '@/components/MenuContent.vue';

export default {
  data() {
    return {
      content: [],
      tempAriticles: [],
      serviclesList: [
        {
          title: '專人服務',
          engTitle: 'Personalized Service',
          img: 'services_01',
          content:
            '無論您有任何問題或需求，我們的專人服務團隊將全天候為您提供支持和協助。',
        },
        {
          title: '排版設計',
          engTitle: 'Layout Design',
          img: 'services_02',
          content:
            '排版設計團隊專注於創造引人注目且具有吸引力的設計，以確保您的印刷品在視覺上脫穎而出。',
        },
        {
          title: '校稿試色',
          engTitle: 'Color Matching',
          img: 'services_03',
          content:
            '仔細檢查每一個細節，並使用最先進的校色技術，確保最終印刷品與您的預期完全一致。',
        },
        {
          title: '包裝配送',
          engTitle: 'Packaging & Delivery',
          img: 'services_04',
          content:
            '選擇最適合的運輸方式，以確保您的印刷品在時間和狀態上都完美無瑕地到達。',
        },
      ],
    };
  },
  watch: {
    articles() {
      this.tempAriticles = this.articles.slice(0, 3);
    },
    content() {
      this.tempAriticles.content = this.content;
    },
  },
  computed: {
    ...mapState(articlesList, ['articles', 'articleContentArr']),
  },
  methods: {
    ...mapActions(articlesList, [
      'getArticleList',
      'getContentArr',
      'searchTag',
    ]),
  },

  components: {
    menuContent,
  },
  created() {
    this.getArticleList();
  },
};
</script>
