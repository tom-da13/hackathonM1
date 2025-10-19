import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'tab2',
    loadComponent: () => import('./tab2/tab2.page').then((m) => m.Tab2Page),
  },
  {
    path: '',
    redirectTo: 'tab2',
    pathMatch: 'full'
  },
];
