<!-- eslint-disable max-len -->
<template>
  <footer class="container-fluid py-5 bg-dark px-0">
    <!-- 跑馬燈 -->
    <div class="footer__marquee mb-5">
      <div>
        <span class="mx-5">
          <img
            src="../assets/images/footer_logo_marguee.svg"
            class="img-fluid"
            alt="LANTU LTD(藍圖印刷Logo)"
          />
        </span>
        <span class="mx-5">
          <img
            src="../assets/images/footer_logo_marguee.svg"
            class="img-fluid"
            alt="LANTU LTD(藍圖印刷Logo)"
          />
        </span>
      </div>
    </div>
    <!-- 內容 -->
    <div class="row flex-row-reverse justify-content-around px-0 mx-0">
      <div class="col-xl-4 col-lg-5 col light__content">
        <menuContent></menuContent>
      </div>

      <div class="footer__info py-4 col-md-4 text-start">
        <img
          src="../assets/images/footer_logo_white.png"
          class="object-fit-cover mb-4"
          alt="LANTU(藍圖印刷Logo)"
        />

        <p class="text-white text-start h5 fw-bold fw-bold">藍圖創意印刷</p>
        <p class="text-white text-start mb-0">
          上午09:00-下午17:00 <br />臺中市北區四五六路78號<br />
        </p>
        <a href="tel:+886-2-22349876"  class="link-light link-underline-opacity-0">02-2234-9876</a>
        <ul class="d-flex ps-0 mt-3">
          <li>
            <a href="" class="icon-buttom position-relative" aria-label="Line"
              ><i
                class="bi bi-line text-white position-absolute top-50 start-50 translate-middle"
              ></i
            ></a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              class="icon-buttom position-relative"
              aria-label="FB"
              ><i
                class="bi bi-facebook text-white position-absolute top-50 start-50 translate-middle"
              ></i
            ></a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              class="icon-buttom position-relative"
              aria-label="Ins"
              ><i
                class="bi bi-instagram text-white position-absolute top-50 start-50 translate-middle"
              ></i
            ></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="text-white-50 fs-7 text-center">
      此網站僅為練習使用，並無任何商業用途 |
      <span>
        <router-link
          to="/login"
          class="text-white-50 link-offset-3-hover link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"
        >
          管理員登入</router-link
        >
      </span>
    </div>
  </footer>
</template>

<script>
import menuContent from '@/components/MenuContent.vue';

export default {
  data() {
    return {};
  },
  components: {
    menuContent,
  },
};
</script>
