import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./components/dashboard/dashboard.component").then((mod) => mod.DashboardComponent)
    },
    {
        path: "login",
        loadComponent: () => import("./components/login/login.component").then((mod) => mod.LoginComponent)
    }
];
