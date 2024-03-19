import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";
// import Settings from "@/views/admin/Settings.vue";
// import Tables from "@/views/admin/Tables.vue";
// import Maps from "@/views/admin/Maps.vue";
import Users from "@/views/admin/Users.vue";
import Stores from "@/views/admin/Stores.vue";
import Mapping from "@/views/admin/Mapping.vue";
import Products from "@/views/admin/Products.vue";
import Orders from "@/views/admin/Orders.vue";
import BrickMortarOrder from "@/views/admin/BrickMortarOrder.vue";

// views for Auth layout

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts

// import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
import Index from "@/views/Index.vue";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'

// routes

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
  { path: "/:pathMatch(.*)*", redirect: "/" },
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

createApp(App).use(router).mount("#app");
