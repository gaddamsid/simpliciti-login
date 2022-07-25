import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticingRoutingModule } from './noticing-routing.module';
import { NoticeSearchComponent } from './components/notice-search/notice-search.component';
import { NoticingComponent } from './components/noticing/noticing.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { I18nModule } from '../i18n/i18n.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableModule } from '@angular/material/table';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableExporterModule } from 'mat-table-exporter';
import { SharedModule } from '../shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { CourtRoutingModule } from '../court/court-routing.module';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NoticeDetailsComponent } from './components/notice-details/notice-details.component';
import { CitationDetailsComponent } from './components/citation-details/citation-details.component';

@NgModule({
  declarations: [
    NoticeSearchComponent,
    NoticingComponent,
    NoticeDetailsComponent,
    CitationDetailsComponent
  ],
  imports: [
    CommonModule,
    NoticingRoutingModule,
    MatDatepickerModule,
    I18nModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    NgSelectModule,
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
    MatDialogModule,
    MatTableExporterModule,
    SharedModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    CourtRoutingModule,
    MatInputModule,
    ToastrModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }),
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatCheckboxModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NoticingModule { }
