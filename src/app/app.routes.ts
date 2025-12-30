import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'inicio-sesion',
    loadComponent: () => import('./pages/auth/inicio-sesion/inicio-sesion')
      .then(m => m.InicioSesion),
    title: 'Inicio Sesión'
  },
  {
    path: 'zona-area',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/operaciones/zona-area/zona-area')
      .then(m => m.ZonaArea),
    title: 'Zona - Área'
  },
  {
    path: 'registro',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/operaciones/registro/registro')
      .then(m => m.Registro),
    title: 'Registro'
  },
  {
    path: 'zona-area-edificio-depto',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/capturas/zona-area-edificio-depto/zona-area-edificio-depto')
      .then(m => m.ZonaAreaEdificioDepto),
    title: 'Zona - Área - Edificio - Depto'
  },
  {
    path: 'resultados-lecturas',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/capturas/resultados-lecturas/resultados-lecturas')
      .then(m => m.ResultadosLecturas),
    title: 'Resultados Lecturas'
  },
  {
    path: 'captura-lecturas',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/capturas/captura-lecturas/captura-lecturas')
      .then(m => m.CapturaLecturas),
    title: 'Captura de lecturas'
  },
  {
    path: '',
    redirectTo: '/inicio-sesion',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/inicio-sesion'
  }
];
