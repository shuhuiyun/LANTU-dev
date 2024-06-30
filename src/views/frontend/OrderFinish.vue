<template>
  <div>
    <div class="container order-finish">
      <div
        class="d-flex flex-column justify-content-center align-items-center pt-2 pb-3"
      >
        <div class="order__icon mb-4">
          <i class="bi bi-check2-circle fs-1 text-white"></i>
        </div>
        <h3 class="pt-3 pb-5 text-dark fw-bold">訂單完成</h3>
        <p class="px-2 w-100 text-center">
          感謝您的購買，您可以透過 Email 查詢訂單。
        </p>
        <p class="pb-5 px-2 w-100 text-center">
          尚未結帳的訂單，請於隔日 23:59 前付款完成，超過時限將取消訂單。
        </p>
        <button
          type="button"
          class="btn btn-primary px-5"
          @click="$router.push('/user/cart')"
        >
          再來逛逛
        </button>
      </div>
    </div>
  </div>
</template>
