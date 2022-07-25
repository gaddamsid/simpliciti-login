import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularmaterialModule } from './angular-material/angular-material.module';
import { SidenavComponent } from './shared/Components/sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './shared/Components/header/header.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { I18nModule } from './i18n/i18n.module';
import { GeneralprocessingComponent } from './Pages/generalprocessing/generalprocessing.component';
import { LoginComponent } from './shared/Components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgSelectModule } from '@ng-select/ng-select';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { MessageService } from './shared/services/message.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { authInterceptorProviders } from './shared/Components/login/auth.interceptor';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GalleryComponent } from './shared/Components/gallery/gallery.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';
import { DynamicFormRenderComponent } from './shared/Components/dynamic-form-render/dynamic-form-render.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { DataService } from './shared/services/data.service';
import { PaymentCartService } from './shared/services/payment-cart.service';




import { OAuthModule, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    GeneralprocessingComponent,
    LoginComponent,
    GalleryComponent,
    // DynamicFormRenderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularmaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    I18nModule,
    DragDropModule,
    DigitOnlyModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000, // 15 seconds
      progressBar: true,
    }),
    MatTableExporterModule,
    NgSelectModule,
    PdfViewerModule,
    NgxGalleryModule,
    SharedModule,
    MatFormFieldModule,
    FormsModule,
    TranslateModule,
    OAuthModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],

  providers: [I18nModule, MessageService, DatePipe, DataService, PaymentCartService,OAuthService,UrlHelperService,authInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}