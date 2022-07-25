import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';
// import { EventtableDataSource, EventtableItem } from './eventtable-datasource';
import { EventService } from '../services/event.service';
import { Observable } from 'rxjs';

export interface EventtableItem {
   userId: number,
    id: number,
    title: string,
    completed: boolean
}

@Component({
  selector: 'app-eventtable',
  templateUrl: './eventtable.component.html',
  styleUrls: ['./eventtable.component.scss']
})
export class EventtableComponent implements AfterViewInit {
  data: EventtableItem[] | undefined ;
  // paginator: MatPaginator | undefined;
  // sort: MatSort | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EventtableItem>;
  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Eventid', 'VoilationdateTime', 'status', 'Dategory', 'DeploymentID', 'LocationDescription', 'LaneNumber', 'AmyDue','iconmenu' ];
 
eventdata:any;
dataSource :any;
  constructor(private EventService:EventService) {
    
  }
ngOnInit(){

     this.getdata();

    }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  
 getdata() {
          this.EventService.test().subscribe(res =>{
              this.eventdata = res;
              this.dataSource = res;
              console.log(this.eventdata);
          })
        }
 

}
