import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/frontend/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '首頁 - 藍圖印刷',
    },
  },
  {
    path: '/about',
    name: 'about',

    component: () => import('../views/frontend/AboutView.vue'),
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
    component: () => import('../views/backend/UserLogin.vue'),
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
    component: () => import('../views/backend/DashBoard.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/backend/ProductsList.vue'),
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('../views/backend/OrderList.vue'),
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('../views/backend/CouponsList.vue'),
      },
      {
        path: 'articles',
        name: 'articles',
        component: () => import('../views/backend/ArticlesList.vue'),
      },
    ],
  },
  {
    path: '/article',
    component: () => import('../views/frontend/ArticlesBoard.vue'),
    meta: {
      bgImage: true,
      backgroundColor: '#f3f3f6',
      title: '最新消息 - 藍圖印刷',
    },
    children: [
      {
        path: 'news',
        component: () => import('../views/frontend/ArticlesNews.vue'),
      },
      {
        path: 'search_tag',
        component: () => import('../views/frontend/ArticlesTag.vue'),
      },
      {
        path: 'new/:newId',
        component: () => import('../views/frontend/ArticlesNew.vue'),
      },
    ],
  },
  {
    path: '/ordertrack',
    component: () => import('../views/frontend/OrderTrack.vue'),
    meta: {
      bgImage: false,
      bgImage2: true,
      backgroundColor: '#f3f3f6',
      title: '查詢訂單 - 藍圖印刷',
    },
    children: [
      {
        path: 'search',
        component: () => import('../views/frontend/TrackOrder.vue'),
      },
      {
        path: 'search/:ordermail',
        component: () => import('../views/frontend/TrackUser.vue'),
      },
    ],
  },
  {
    path: '/user',
    component: () => import('../views/frontend/UserBoard.vue'),
    meta: {
      title: '精選商品 - 藍圖印刷',
    },
    children: [
      {
        path: 'cart',
        component: () => import('../views/frontend/UserCart.vue'),
      },
      {
        path: 'product/:productId',
        component: () => import('../views/frontend/UserProduct.vue'),
      },
    ],
  },
  {
    path: '/order',
    component: () => import('../views/frontend/OrderBoard.vue'),
    meta: {
      cartButton: false,
      backgroundColor: '#f3f3f6',
      title: '購物車 - 藍圖印刷',
    },
    children: [
      {
        path: 'cart',
        component: () => import('../views/frontend/OrderCart.vue'),
      },
      {
        path: 'info',
        component: () => import('../views/frontend/OrderInfo.vue'),
      },
      {
        path: 'confirm',
        component: () => import('../views/frontend/OrderConfirm.vue'),
      },
      {
        path: 'finish',
        component: () => import('../views/frontend/OrderFinish.vue'),
      },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
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
