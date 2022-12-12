import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HeaderComponent } from './components/common/header/header.component';
import { LandmarkCardComponent } from './components/landmark-card/landmark-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandmarkPageComponent } from './pages/landmark-page/landmark-page.component';
import { AdminDashboardPageComponent } from './pages/admin/admin-dashboard-page/admin-dashboard-page.component';
import { AdminLandmarkPageComponent } from './pages/admin/admin-landmark-page/admin-landmark-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { LandmarkGridComponent } from './components/landmark-grid/landmark-grid.component';
import { ImageUploadComponent } from './components/forms/image-upload/image-upload.component';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LandmarkCardComponent,
    LandmarkPageComponent,
    AdminDashboardPageComponent,
    AdminLandmarkPageComponent,
    NotFoundPageComponent,
    SigninComponent,
    LandmarkGridComponent,
    ImageUploadComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
