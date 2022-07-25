import { APP_BASE_HREF } from '@angular/common';
import { NgModule, ViewChild } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { NoticeSearchComponent } from './noticing/components/notice-search/notice-search.component';
import { GeneralprocessingComponent } from './Pages/generalprocessing/generalprocessing.component';
import { HomeComponent } from './shared/Components/home/home.component';
import { AuthGuard } from './shared/Components/login/auth.guard';
import { LoginComponent } from './shared/Components/login/login.component';

const routes: Routes = [
  {
    path: 'admin',

    data: { title: 'Administration' },

    loadChildren: () => import('./Pages/admin.module').then(m => m.AdminModule)
    , canActivate : [AuthGuard]
  },
  {
    path: 'gp',
    data: { title: 'General Processing', breadcrumb: 'GP' },
    loadChildren: () => import('./general-processing/general-processing.module').then(m => m.GeneralProcessingModule)
    , canActivate : [AuthGuard]
  },
  {
    path: 'court',
    data: {title: 'Court', breadcrumb: 'Court'},
   loadChildren: () => import('./court/court.module').then(m => m.CourtModule)
  },
  {
    path: 'notice',
    data: {title: 'Notice', breadcrumb: 'Notice'},
   loadChildren: () => import('./noticing/noticing.module').then(m => m.NoticingModule)
  },
  // { path: '', redirectTo: 'gp', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  // { path: '', component: GeneralprocessingComponent, pathMatch: 'full' },

  { path:'home', component:HomeComponent },
  // { path:'**', redirectTo:'login', pathMatch: 'full'},
  { path:'', redirectTo:'login', pathMatch: 'full'},
];
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};
@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  // providers: [{ provide: APP_BASE_HREF, useValue: '/' }],

  exports: [RouterModule]
})
export class AppRoutingModule { }
