import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      logo: false,
      title: '首頁 - 藍圖印刷',
    },
  },
  {
    path: '/about',
    name: 'about',

    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      backgroundColor: '#f3f3f6',
      footer: false,
      menuButton: false,
      cartButton: false,
      title: '登入 - 藍圖印刷',
    },
    component: () => import('../views/UserLogin.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      backgroundColor: '#f3f3f6',
      footer: false,
      menuButton: false,
      cartButton: false,
      title: '後台管理 - 藍圖印刷',
    },
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/ProductsList.vue'),
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('../views/OrderList.vue'),
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('../views/CouponsList.vue'),
      },
      {
        path: 'articles',
        name: 'articles',
        component: () => import('../views/ArticlesList.vue'),
      },
    ],
  },
  {
    path: '/article',
    component: () => import('../views/ArticlesBoard.vue'),
    meta: {
      bgImage: true,
      backgroundColor: '#f3f3f6',
      title: '最新消息 - 藍圖印刷',
    },
    children: [
      {
        path: 'news',
        component: () => import('../views/ArticlesNews.vue'),
      },
      {
        path: 'search_tag',
        component: () => import('../views/ArticlesTag.vue'),
      },
      {
        path: 'new/:newId',
        component: () => import('../views/ArticlesNew.vue'),
      },
    ],
  },
  {
    path: '/ordertrack',
    component: () => import('../views/OrderTrack.vue'),
    meta: {
      bgImage: false,
      bgImage2: true,
      backgroundColor: '#f3f3f6',
      title: '查詢訂單 - 藍圖印刷',
    },
    children: [
      {
        path: 'search',
        component: () => import('../views/TrackOrder.vue'),
      },
      {
        path: 'search/:ordermail',
        component: () => import('../views/TrackUser.vue'),
      },
    ],
  },
  {
    path: '/user',
    component: () => import('../views/UserBoard.vue'),
    meta: {
      title: '精選商品 - 藍圖印刷',
    },
    children: [
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue'),
      },
      {
        path: 'product/:productId',
        component: () => import('../views/UserProduct.vue'),
      },
    ],
  },
  {
    path: '/order',
    component: () => import('../views/OrderBoard.vue'),
    meta: {
      cartButton: false,
      backgroundColor: '#f3f3f6',
      title: '購物車 - 藍圖印刷',
    },
    children: [
      {
        path: 'cart',
        component: () => import('../views/OrderCart.vue'),
      },
      {
        path: 'info',
        component: () => import('../views/OrderInfo.vue'),
      },
      {
        path: 'confirm',
        component: () => import('../views/OrderConfirm.vue'),
      },
      {
        path: 'finish',
        component: () => import('../views/OrderFinish.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
export default router;
