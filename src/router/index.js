import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import PublicTemplate from "@/components/PublicTemplate.vue";
import CalendarView from "@/views/CalendarView.vue";
import AppointmentDetail from "@/views/AppointmentDetail";
import ClientsView from "@/views/ClientView.vue";
import ClientDetail from "@/views/ClientDetail.vue";
import ProfileView from "@/views/ProfileView.vue";
import VerificationView from "@/views/VerificationView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: PublicTemplate,
    meta: {
      requiresAuth: false,
      roles: ["1", "2"],
    },
  },
  {
    path: "/verification",
    name: "verification",
    component: VerificationView,
    meta: {
      requiresAuth: false,
      roles: ["1", "2"],
    },
  },
  {
    path: "/calendar",
    name: "calendar",
    component: CalendarView,
    meta: {
      requiresAuth: true,
      roles: ["1", "2"],
    },
  },
  {
    path: "/appointment/:appointment_id",
    name: "appointment_detail",
    component: AppointmentDetail,
    meta: {
      requiresAuth: true,
      roles: ["1", "2"],
    },
  },
  {
    path: "/clients",
    name: "clients",
    component: ClientsView,
    meta: {
      requiresAuth: true,
      roles: ["2"],
    },
  },
  {
    path: "/clients/:client_id",
    name: "client_detail",
    component: ClientDetail,
    meta: {
      requiresAuth: true,
      roles: ["2"],
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: {
      requiresAuth: true,
      roles: ["1", "2"],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  let user = store.state.authModule.currentUser;
  // Verifies if user is authenticated
  if (user === null) {
    if (to.name == "verification") {
      next();
      return;
    } else {
      await store.dispatch("authModule/autoLogin");
      let user_after_autoLogin = store.state.authModule.currentUser;
      if (user_after_autoLogin == null && to.name != "login") {
        if (to.meta.requiresAuth == false) {
          next();
          return;
        } else {
          next({ name: "login" });
          return;
        }
      }
    }
  }

  const u = store.state.authModule.currentUser;
  if (u != null) {
    // Verify if user has acccess to route
    const user_role = u.user_role;
    if (to.meta.roles == null || to.meta.roles == undefined) {
      next();
      return;
    } else if (to.name == "login") {
      next({ name: "calendar" });
      return;
    } else if (to.meta.roles.includes(user_role)) {
      next();
      return;
    } else {
      next({ name: "calendar" });
      return;
    }
  }

  next();
});

export default router;
