import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardPageComponent } from './pages/admin/admin-dashboard-page/admin-dashboard-page.component';
import { AdminLandmarkPageComponent } from './pages/admin/admin-landmark-page/admin-landmark-page.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { HomeComponent } from './pages/home/home.component';
import { LandmarkPageComponent } from './pages/landmark-page/landmark-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'landmark/:id', component: LandmarkPageComponent },
  { path: 'auth/signin', component: SigninComponent },
  {
    path: 'admin/dashboard',
    component: AdminDashboardPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin/dashboard/landmark/:id',
    component: AdminLandmarkPageComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
