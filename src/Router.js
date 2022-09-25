import React from "react";
import { Outlet, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Main from "./templates/layout/main";
import MyPageLayout from "./templates/layout/mypage";
import MyPage from "./pages/mypage";
import AdminHome from "./pages/admin/AdminHome";
import AdminService from "./pages/admin/AdminService";
import AdminReservation from "./pages/admin/AdminReservation";
import AdminUser from "./pages/admin/AdminUser";
import AdminHeader from "./templates/layout/admin/header";
import AdminStaff from "./pages/admin/AdminStaff";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AuthGuard from "./templates/layout/admin/authguard";

const Admin = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SnackbarProvider maxSnack={5}>
        <AuthGuard />
        <AdminHeader />
        <Outlet />
      </SnackbarProvider>
    </LocalizationProvider>
  )
}

export default function Router() {
  const router = [
    {
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
    {
      path: '/admin',
      element: <Admin />,
      children: [
        {
          path: "",
          element: <AdminHome />,
        },
        {
          path: "users",
          element: <AdminUser />,
        },
        {
          path: "services",
          element: <AdminService />,
        },
        {
          path: "bookings",
          element: <AdminReservation />,
        },
        {
          path: "staffs",
          element: <AdminStaff />,
        },
      ],
    },
    {
      path: "/my-page",
      element: <MyPageLayout />,
      children: [
        {
          path: "",
          element: <MyPage />
        }
      ]
    }
  ];

  return useRoutes(router);
}
