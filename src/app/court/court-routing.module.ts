import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeSearchComponent } from '../noticing/components/notice-search/notice-search.component';
import { CourtComponent } from './components/court/court.component';
import { CreateSchedulingComponent } from './components/create-scheduling/create-scheduling.component';
import { ScheduleHearingComponent } from './components/schedule-hearing/schedule-hearing.component';


const routes: Routes = [
  { path: '', redirectTo: 'scheduling' },
  {
    path: 'scheduling', component: CourtComponent,
  },
  {
    path: 'schedule/createSchedule', component: CreateSchedulingComponent,
  },
  {
    path: 'schedule-hearing/:plateNumber/:citationNumbers', component: ScheduleHearingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourtRoutingModule { }
