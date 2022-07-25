import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormRenderComponent } from './Components/dynamic-form-render/dynamic-form-render.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularmaterialModule } from '../angular-material/angular-material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgSelectModule } from '@ng-select/ng-select';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { I18nModule } from '../i18n/i18n.module';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicFormRenderColumnComponent } from './Components/dynamic-form-render-column/dynamic-form-render-column.component';
import { MatSelectModule } from '@angular/material/select';
import { CardDetailsComponent } from '../general-processing/common-components/card-details/card-details.component';
import { BreadCrumbComponent } from '../general-processing/components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    AngularmaterialModule,
    // BrowserModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    FormsModule,
    // MatSelectModule,
    // MatListModule,
    // MatButtonModule,
    CommonModule,
    AngularmaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    NgSelectModule,
    I18nModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    DragDropModule,
    DigitOnlyModule,
    NgSelectModule,
    PdfViewerModule,
    MatTableModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [DynamicFormRenderComponent, DynamicFormRenderColumnComponent, CardDetailsComponent, BreadCrumbComponent],
  exports: [DynamicFormRenderComponent, DynamicFormRenderColumnComponent, CardDetailsComponent, BreadCrumbComponent]
})
export class SharedModule {}

