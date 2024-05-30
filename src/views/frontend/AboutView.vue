<template>
  <div class="container-fluid">
    <!-- First Content -->
    <div class="row position-relative bg-light">
      <div class="col-auto d-none d-md-block about__img-first">
        <img
          src="../../assets/images/about_img01.png"
          class="img-fluid"
          alt="會議室"
        />
      </div>
      <div class="col-auto about__board bg-white" style="width: 92%">
        <div class="about__content">
          <p>堅持卓越和創新的精神</p>
          <hr class="border border-info border-1 opacity-100" />
          <h2 class="text-primary fw-bold text-nowrap">藍圖創意的起源</h2>
          <p class="lh-base">
            印刷依然是一種極富魅力的藝術形式，結合了技術、創造力和品質。在我們的印刷公司，我們將這種藝術精神與現代技術相結合，為客戶提供優質的印刷產品和服務。
          </p>
          <div class="col-auto d-md-none about__img-first--md">
            <img
              src="../../assets/images/about_img01.png"
              alt="一群員工在現代會議室開會，展示專業協作的工作環境。"
            />
          </div>
        </div>
      </div>
      <div class="col-auto bg-light" style="width: 8%"></div>
    </div>

    <!-- Second Content -->
    <div class="row position-relative bg-white">
      <div class="col-auto d-none d-md-block about__img-second">
        <img
          src="../../assets/images/menu-img.jpg"
          class="img-fluid"
          alt="設計樣本和印刷品，包括一張藍色卡片，展示在開放的雜誌上，背景為淺灰色大理石桌面，呈現專業現代設計風格。"
        />
      </div>
      <div class="col-auto bg-white" style="width: 8%"></div>
      <div class="col-auto about__board-second bg-light" style="width: 92%">
        <div class="about__content">
          <p>優質印刷，匠心創造</p>
          <hr class="border border-info border-1 opacity-100" />
          <h2 class="text-primary fw-bold text-nowrap">我們的藍圖創意</h2>
          <p class="lh-base">
            在大學期間，兩位創辦人對印刷藝術和設計充滿熱情。
            畢業後，他們各自積累了豐富的工作經驗，但始終對創業有著強烈的渴望。他們深知市場對於個性化印刷的需求，因此決定攜手合作，創立了藍圖創意印刷公司。<br />
            在公司成立初期，他們選擇了一個小型工作室作為起點，
            並投入了最先進的印刷設備和技術。一位負責設計和客戶溝通，另一位負責生產和管理。兩人攜手合作，克服各種挑戰，不斷追求卓越和創新。
            透過他們的努力和才華，藍圖創意逐漸贏得了客戶的信任和支持。
            我們的創意設計和優質印刷品贏得了口碑，吸引了越來越多的客戶。
            如今，藍圖創意已經成為一家知名的印刷公司，擁有一個穩定的客戶群體，並持續擴大業務範圍，開拓新的市場。
          </p>
          <div class="col-auto about__img-second--md">
            <img
              src="../../assets/images/about-img02.png"
              class="img-fluid"
              alt="藍圖印刷三大核心：印刷品質、客製化服務、合作能力"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Third Content -->
    <div class="row position-relative bg-light">
      <div class="col-auto about__board-third bg-white" style="width: 92%">
        <div class="about__content-third">
          <p>精密操作與專業技能</p>
          <hr class="border border-info border-1 opacity-100" />
          <h2 class="text-primary fw-bold text-nowrap mb-4">藍圖工作人員</h2>
          <div class="row row-cols-1 row-cols-lg-2 g-5">
            <div class="col" v-for="(item) in personnel" :key="`${item.job}${item.name}`">
              <div class="row personnel d-flex flex-column flex-md-row">
                <div class="col-md-4 col">
                  <img
                    :src="require(`@/assets/images/${item.img}.jpg`)"
                    style="object-fit: cover; aspect-ratio: 1 / 1"
                    class="img-fluid"
                    :alt="`${item.job}-${item.name}`"
                  />
                </div>
                <div class="col-md-8 col personnel__content">
                  <p class="mb-0 text-primary d-none d-lg-block">
                    {{ item.job }}
                  </p>
                  <p class="fs-4 fw-bold text-primary mb-0">
                    {{ item.name
                    }}<span class="fs-6 fw-none ms-2 d-lg-none">{{
                      item.job
                    }}</span>
                  </p>
                  <hr
                    class="border border-info border-1 opacity-100 personnel__hr my-2"
                  />
                  <p>
                    {{ item.content }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-auto bg-light" style="width: 8%"></div>
    </div>
    <!-- Articles Content -->
    <div class="row about__article text-white">
      <div class="row m-0 p-0 d-flex flex-column flex-lg-row">
        <div class="col d-lg-none">
          <p class="fs-5 fw-bold">您可以閱讀文章更了解我們</p>
          <p>
            無論您需要印刷的是名片、 宣傳單張還是海報，
            我們都能夠確保每一份作品都達到最優質的標準。
          </p>
        </div>
        <div class="col d-flex justify-content-center align-items-start">
          <router-link
            to="/article/new/-Ny5tuAqU4V3J2NZFror"
            class="link-light"
          >
            <div class="article__img">
              <img
                src="../../assets/images/home_img_02.jpg"
                alt="大型工業打印機正在打印彩色標籤，背景為工廠環境，展示出高精度的印刷技術。"
              />
              <div>
                <p class="fs-7 mb-0">關於藍圖創意印刷流程與解說</p>
                <p class="fs-5 fw-bold mb-0">線上解說會</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col d-none d-lg-block" style="padding: 8% 2%">
          <div class="row justify-content-center">
            <div class="col-auto">
              <div class="row-cols-1">
                <div class="col">
                  <p class="mb-0 article__sub-title">
                    <span></span>您可以閱讀文章更了解我們
                  </p>
                </div>
                <div class="col article__title">Articles</div>
              </div>
            </div>
            <div class="col-12">
              <p class="text-center">
                無論您需要印刷的是名片、<br />
                宣傳單張還是海報，<br />
                我們都能夠確保每一份作品都達到最優質的標準。
              </p>
            </div>
          </div>
        </div>

        <div class="col d-flex justify-content-center align-items-end">
          <router-link
            to="/article/new/-Ny5wyAFadSf1p6S1E1s"
            class="link-light"
          >
            <div class="article__img">
              <img
                src="../../assets/images/home_img_04.jpg"
                alt="設計工作區展示色彩樣本、平板電腦上的色彩設計圖、和蘋果電腦，背景為現代辦公桌。"
              />
              <div>
                <p class="fs-7 mb-0">看印教學與印刷人員交流</p>
                <p class="fs-5 fw-bold mb-0">現場看印</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      personnel: [
        {
          img: 'about_personnel01',
          name: '陳小華',
          job: '專案總管理',
          content:
            '負責有效地規劃、執行和監控專案，以確保項目按時、按預算和按品質要求完成。',
        },
        {
          img: 'about_personnel02',
          name: '王美麗',
          job: '設計部門',
          content:
            '將文字、圖像和其他視覺元素組合在一起，創造出具有視覺吸引力和易讀性的印刷品或數位媒體。',
        },
        {
          img: 'about_personnel04',
          name: '黃小玲',
          job: '裝訂部門',
          content:
            '將印刷品進行後續處理，包括剪裁、折疊、裝訂和裝箱，確保最終產品符合設計要求並準時交付給客戶',
        },
        {
          img: 'about_personnel03',
          name: '黃阿奇',
          job: '印刷部門',
          content:
            '具備操作印刷機器的技能，負責監控印刷過程，調整機器設置以確保印刷品質，並管理印刷設備的保養和維修。',
        },
      ],
    };
  },
};
</script>
