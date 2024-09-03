import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import App from "@/App.vue";
import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import Users from "@/views/admin/Users.vue";
import Stores from "@/views/admin/Stores.vue";
import Mapping from "@/views/admin/Mapping.vue";
import Products from "@/views/admin/Products.vue";
import Orders from "@/views/admin/Orders.vue";
import BrickMortarOrder from "@/views/admin/BrickMortarOrder.vue";
import FetchProducts from "@/views/admin/FetchProducts.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Profile from "@/views/Profile.vue";
import Index from "@/views/Index.vue";
import Category from "@/views/admin/Category.vue";
import store from './store';

const routes = [
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        component: Dashboard,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/admin/users",
        component: Users,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/admin/stores",
        component: Stores,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/admin/mapping",
        component: Mapping,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/admin/products",
        component: Products,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/admin/orders",
        component: Orders,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/admin/brick-mortar-order",
        component: BrickMortarOrder,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/admin/category",
        component: Category,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/admin/add-category",
        component: Category,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/admin/edit-category/:name",
        component: Category,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/admin/connect-product-category",
        component: Category,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/admin/fetch-products",
        component: FetchProducts,
        meta: {
          requiresAuth: true
        }
      },
      // {
      //   path: "/admin/settings",
      //   component: Settings,
      // },
      // {
      //   path: "/admin/tables",
      //   component: Tables,
      // },
      // {
      //   path: "/admin/maps",
      //   component: Maps,
      // },
    ],
  },
  {
    path: "/",
    redirect: "/login",
    component: Auth,
    children: [
      {
        path: "/login",
        component: Login,
      },
      {
        path: "/register",
        component: Register,
      },
    ],
  },
  // {
  //   path: "/landing",
  //   component: Landing,
  // },
  {
    path: "/profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/",
    component: Index,
  },
  {path: "/:pathMatch(.*)*", redirect: "/"},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

createApp(App).use(store).use(router).mount("#app");
