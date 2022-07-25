import { Component,OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { assetUrl } from 'src/single-spa/asset-url';
import {ApiService} from 'src/app/shared/services/api.service';
import { QueuesApiservices } from 'src/app/shared/services/queues-apiservices.ts.service';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/Services/Contract/contract.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }

  panelOpenState = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public cite_img = assetUrl('cite.png');
  public gp_img = assetUrl('Group 9960.png');
  public queues_img = assetUrl('Group 9961.png');
  public fleet_img = assetUrl('Group 9965.png');
  public bt_img = assetUrl('Group 9966.png');
  public pymt_img = assetUrl('Group 9962.svg');
  public installment_img = assetUrl('Group 9963.svg');
  public court_img = assetUrl('Group 9964.png');
  public DMV_img = assetUrl('Group 9965.png');
  public Permits_img = assetUrl('Group 9966.png');
  public admin_img = assetUrl('Group 9967.png');
  public Meters_img = assetUrl('Group 9968.png');
  public notice_img = assetUrl('Group 9969.png');
  public qc_img = assetUrl('Group 9970.png');
  public bc_img = assetUrl('Group 9971.png');
  public reports_img = assetUrl('Group 9960.png');
  constructor(private breakpointObserver: BreakpointObserver,private apiService: QueuesApiservices,private router:Router, private contractService: ContractService,

  ) { }
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showAdminTabs: boolean = false;
  PaymentMenu: boolean = false;
  ContractMenu: boolean = false;
  ContractPaymentMenu: boolean = false;
  NoticesMenu: boolean = false;
  DispositionMenu: boolean = false;
  BoottowMenu: boolean = false;
  IssuanceMenu: boolean = false;
  CollectionMenu: boolean = false;
  CitationMenu: boolean = false;
  WorkflowMenu: boolean = false;
  locationMenu: boolean = false;
  AssetsMenu: boolean = false;
  NewMenu: boolean = false;
  Court: boolean = false;
  queueList :any =[];
  contractList :any =[];

  ngOnInit(): void {
      this.getQueueList();
      this.getContractList();
 }

  getQueueList() {
    this.apiService.get('Queues/getAllActiveQueues?ContractID=2',true).subscribe(res => {
      this.queueList = res.sort((a: any, b: any) => {
        return a.queuesName == b.queuesName ? 0
          : a.queuesName > b.queuesName ? 1 : -1
      });
    })
  
  }

  initialQueue() {
    const queueId = this.queueList[0].queuesID;
    this.router.navigateByUrl('admin/Queue/'+queueId);
  }

  selectQueue(id:number) {
    this.router.navigateByUrl('admin/Queue/'+id);
  }

  getContractList() {
    this.contractService.getContract().subscribe(res => {
      this.contractList = res;
    })
  
  }

}