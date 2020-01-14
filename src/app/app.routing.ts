import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {PagesComponent} from './pages/pages.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

import {AuthGuard} from './services/auth/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent, children: [
            {path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
            {
                path: 'register-lostpet',
                canActivate: [AuthGuard],
                loadChildren: () => import('./pages/register-lostpet/register-lostpet.module').then(m => m.RegisterLostPetModule)
            },
            {
                path: 'register-foundpet',
                canActivate: [AuthGuard],
                loadChildren: () => import('./pages/register-foundpet/register-foundpet.module').then(m => m.RegisterFoundPetModule)
            },
            {
                path: 'pets',
                canActivate: [AuthGuard],
                loadChildren: () => import('./pages/properties/properties.module').then(m => m.PropertiesModule)
            },
            {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
            {path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)},
        ]
    },
    {path: '**', component: NotFoundComponent}
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes, {
    //  preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
    // useHash: true
});
