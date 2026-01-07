import { Routes } from '@angular/router';
import {HomeComponent} from './features/authentication/components/home/home.component/home.component';
import {SignInComponent} from './features/authentication/components/sign-in/sign-in.component/sign-in.component';
import {SignUpComponent} from './features/authentication/components/sign-up/sign-up.component/sign-up.component';
import {authGuard} from './core/guards/auth-guard';
import {
  UserListComponent
} from './features/authentication/components/user-list/user-list.component/user-list.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },

  // 1. MUEVE ESTO AQUÍ ARRIBA (Antes de los comodines)
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [authGuard]
  },

  // 2. EL COMODÍN SIEMPRE VA AL FINAL ABSOLUTO
  // (Borré el duplicado que tenías en medio)
  { path: '**', redirectTo: 'login' }
];
