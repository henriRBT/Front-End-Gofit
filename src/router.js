//import vue router
import { createRouter, createWebHistory } from "vue-router";
//define a routes
const routes = [
      {
        path: "/",
        name: "dashboard",
        component: () => import("@/components/DashboardLogin.vue"),
      },

      {
        path: "/admin",
        name: "admin.index",
        component: () => import("@/Admin/DashboardAdmin.vue"),
        children: [
          {
            path: "/Instruktur",
            name: "instruktur.index",
            component: () => import("@/Instruktur/indexPage.vue"),
          },
    
          {
            path: "/Instruktur/create",
            name: "instruktur.create",
            component: () => import('@/Instruktur/createPage.vue'),
          },

          {
            path: "/Instruktur/update",
            name: "instruktur.update",
            component: () => import('@/Instruktur/editPage.vue'),
          },
        ],
      },

    {
        path: "/manager",
        name: "manager.index",
        component: () => import("@/Manager/DashboardManager.vue"),
        children: [
            {
              path: "/JadwalIndex",
              name: "umum.index",
              component: () => import("@/Umum/indexPage.vue"),
            },

            {
                path: "/JadwalCreate",
                name: "umum.create",
                component: () => import("@/Umum/createPage.vue"),
            },

            {
                path: "/JadwalUpdate",
                name: "umum.update",
                component: () => import("@/Umum/editPage.vue"),
            },

            {
              path: "/HarianIndex",
              name: "harian.index",
              component: () => import("@/Harian/indexPage.vue"),
            },
            {
              path: "/IzinInstrukturIndex",
              name: "izin.index",
              component: () => import("@/izin/indexPage.vue"),
            },
            {
              path: "/IzinInstrukturIndex",
              name: "izin.update",
              component: () => import("@/izin/editPage.vue"),
            },
        ],
    },

      {
        path: "/kasir",
        name: "kasir.index",
        component: () => import("@/Kasir/DashboardKasir.vue"),
        children: [
          {
            path: "/AktivasiIndex",
            name: "aktivasi.index",
            component: () => import("@/Aktivasi/indexPage.vue"),
          },
          {
            path: "/AktivasiCreate",
            name: "aktivasi.create",
            component: () => import("@/Aktivasi/createPage.vue"),
          },

          {
            path: "/DepositIndex",
            name: "depositKelas.index",
            component: () => import("@/depositKelas/indexPage.vue"),
          },
          {
            path: "/DepositCreate",
            name: "depositKelas.create",
            component: () => import("@/depositKelas/createPage.vue"),
          },

          {
            path: "/PresensiKelasIndex",
            name: "presensi.index",
            component: () => import("@/PresensiKelas/indexPage.vue"),
          },
          {
            path: "/MemberIndex",
            name: "member.index",
            component: () => import("@/Member/indexPage.vue"),
          },

          {
            path: "/MemberCreate",
            name: "member.create",
            component: () => import("@/Member/createPage.vue"),
          },

          {
            path: "/MemberUpdate",
            name: "member.update",
            component: () => import("@/Member/editPage.vue"),
          },
          {
            path: "/ResetIndex",
            name: "reset.index",
            component: () => import("@/ResetPassword/indexPage.vue"),
          },
        ],
      },
];
//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // config routes
});
export default router;
