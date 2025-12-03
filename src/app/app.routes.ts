import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'detalle-tarea/:id',
    loadComponent: () => import('./pages/detalle-tarea/detalle-tarea.page').then( m => m.DetalleTareaPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then( m => m.AboutPage)
  },
];
