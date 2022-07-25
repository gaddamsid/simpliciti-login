import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EntityService } from '../services/entity.service';
import { Observable } from 'rxjs';

export interface EntitytableItem {
    plate_no: number,
    name: string,
    vehicle_info: string,
    effective_date:  string ,
    res_address:  string ,
    amt_due: number
}


@Component({
  selector: 'app-entitytable',
  templateUrl: './entitytable.component.html',
  styleUrls: ['./entitytable.component.scss']
})
export class EntitytableComponent implements AfterViewInit {
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
 data: EntitytableItem[] | undefined ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EntitytableItem>;
  dataSource:any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'VehicleInformation', 'EffectiveDatedob', 'ResidentAddress', 'OpenTickets', 'iconmenu',];
  EventService: any;
  eventdata: any;

  constructor(private EntityService:EntityService) {
    
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
          this.EntityService.test().subscribe(res =>{
              this.eventdata = res;
              this.dataSource = res;
              console.log(this.eventdata);
          })
        }
}
