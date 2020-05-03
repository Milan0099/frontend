import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/_guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./view/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./view/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./view/admin/admin.module').then(m => m.AdminModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
