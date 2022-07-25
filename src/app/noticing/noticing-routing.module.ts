import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitationDetailsComponent } from './components/citation-details/citation-details.component';
import { NoticeDetailsComponent } from './components/notice-details/notice-details.component';
import { NoticeSearchComponent } from './components/notice-search/notice-search.component';


const routes: Routes = [
  { path: '', redirectTo: 'search' },
  {
    path: 'search', component: NoticeSearchComponent,
    data: { breadcrumb: 'Search Results' },
    children: [
      {
        path: 'details/:noticeId', component: NoticeDetailsComponent, data: { breadcrumb: 'Notice Details', hideSearch: true },
        children: [
          {path: 'citation-details/:citaionsId', component: CitationDetailsComponent, data: { breadcrumb: 'Citation Details', hideNotice: true }}
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticingRoutingModule { }
