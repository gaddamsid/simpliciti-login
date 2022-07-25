import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';
import {TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs';
import { GlobalFormats } from 'src/app/general-processing/enums/global.formats';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { NoticeSearch, NoticeTable } from '../../models/noticeSearch.interface';
import { NoticeService } from '../../services/notice.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-notice-search',
  templateUrl: './notice-search.component.html',
  styleUrls: ['./notice-search.component.scss'],
})
export class NoticeSearchComponent implements OnInit {
  displayedColumns: string[] = [];
  noticeTypeDropDown: any = [];
  stateDropDown: string[] = [];
  noticeSearchForm!: FormGroup;
  loader: boolean = false;
  loaderNoticeType: boolean = true;
  loaderStateList: boolean = true;
  fieldDisabled: boolean = true;
  showTable: boolean = false;
  public globalFormats = GlobalFormats;
  dataSource = new MatTableDataSource<NoticeTable>();
  selection = new SelectionModel<NoticeTable>(true, []);
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  activateCombinationOne: boolean = false;
  hideSearch = false;
  _ = _;
  constructor(
    private fb: FormBuilder,
    private service: NoticeService,
    private notification: ToastrService,
    private route: ActivatedRoute,
    private language: LanguageService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let activatedRoute = this.route.snapshot;
    while (activatedRoute?.firstChild) {
      activatedRoute = activatedRoute?.firstChild;
    }
    if (activatedRoute?.data['hideSearch']) {
      this.hideSearch = activatedRoute?.data['hideSearch'];
    }
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route.snapshot),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .subscribe((route: ActivatedRouteSnapshot) => {
        this.hideSearch = route.data && route.data['hideSearch'];
      });
    this.initializeForm();
    if (this.noticeSearchForm) {
      this.displayedColumns = [
        'select',
        'noticeTypeLongName',
        'dateSent',
        'batchNumber',
        'status',
        'fileTransfer',
        'sequenceNumber',
        'ticketcount',
        'noticeCount',
        'pageCount',
        'amtDue',
        'readLetter',
      ];
      this.loadRequiredField();
    }
    this.language.sendLang.subscribe((lang) => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
  }
  initializeForm() {
    this.noticeSearchForm = this.fb.group({
      noticeName: new FormControl({ value: null, disabled: true }),
      dateMailed: new FormControl(),
      dateGenerated: new FormControl(),
      sequenceNumber: new FormControl(null, [Validators.maxLength(11)]),
      citationNumberOrTicketNumber: new FormControl(null, [
        Validators.maxLength(11),
      ]),
      state: new FormControl(null),
      plateID: new FormControl(null, [Validators.maxLength(10)]),
      driverSearchLicense: new FormControl(null, [Validators.maxLength(10)]),
      noticeType: new FormControl(null),
    });
  }
  loadRequiredField() {
    this.loadNoticeTypeList();
    this.loadStateList();
  }
  loadNoticeTypeList(): any {
    // debugger
    this.service.getNoticeTypeList().subscribe((res) => {
      if (res) {
        this.noticeTypeDropDown = res;
        // console.log(res);
        this.loaderNoticeType = false;
      } else {
      }
    });
  }
  loadStateList(): any {
    let abb : any;
    this.service.getStateList().subscribe((res : any) => {
      if (res) {
        // abb = ;
        res?.forEach((response : any) => {
          this.stateDropDown.push(response?.abbreviation);
        })
        this.loaderStateList = false;
      } else {
        this.loadStateList();
      }
      this.stateDropDown = this.stateDropDown.sort();

    });
    // this.stateDropDown = this.stateDropDown.sort((a:any,b:any) => a-b);
  }
  searchNotice() {
    // debugger
    this.selection.clear();
    if (this.noticeSearchForm.touched) {
      this.loader = true;
      if (this.checkFieldCombination()) {
        this.showTable = true;
        if (this.noticeSearchForm.value) {
          this.dataSource.data = [];
          const requestBody = this.createRequestBody(this.noticeSearchForm);
          this.service.searchNotice(requestBody).subscribe(
            (res: any) => {
              if (res.length > 0) {
                // console.log(res);
                let responseBody! : NoticeTable;
                res?.forEach((response : any) => {
                  responseBody = {
                    noticeID : response.noticeID,
                    noticeTypeID : response.noticeTypeID,
                    noticeTypeLongName : response.noticeTypeLongName,
                    noticeType : response.noticeType,
                    dateSent  :response.dateSent,
                    batchNumber : response.batchNumber,
                    status : response.status,
                    fileTransfer  :response.fileTransfer,
                    sequenceNumber : response.sequenceNumber,
                    ticketcount : response.ticketcount,
                    noticeCount  :response.noticeCount,
                    pageCount  :response.pageCount,
                    amtDue : response.amtDue
                  };
                  this.dataSource.data.push(responseBody);
                })
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                setTimeout(() => {
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                });
                this.loader = false;
                this.removeAllValidators();
                
              } else {
                this.dataSource.data = res;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.loader = false;
                this.removeAllValidators();
              }
            },
            (err: any) => {
              if (err?.status === 400) {
                this.loader = false;
                this.notification.error('Please enter a valid date');
              }
            }
          );
        }
      } else {
        this.loader = false;
      }
    } else {
      let err = this.translate.instant(
        'Please enter atleast one parameter for search result'
      );
      this.notification.error(err);
      this.loader = false;
    }
  }
  createRequestBody(form: FormGroup) {
    let plateID = form.get('plateID')?.value ? form.get('plateID')?.value : '';
    let state = form.get('state')?.value ? form.get('state')?.value : '';
    return {
      getNoticeModel: {
        noticeName: this.checkStringFieldForNull(form.get('noticeName')?.value),
        dateMailed: this.convertDate(form.get('dateMailed')?.value),
        dateGenerated: this.convertDate(form.get('dateGenerated')?.value),
        sequenceNumber: this.checkNumberFieldForNull(form.get('sequenceNumber')?.value),
        citationNumberOrTicketNumber: this.checkStringFieldForNull(form.get('citationNumberOrTicketNumber')?.value),
        statePlate: this.getStatePlate(state, plateID),
        driverSearchLicense: this.checkStringFieldForNull(form.get('driverSearchLicense')?.value),
        noticeTypeId: this.checkNumberFieldForNull(form.get('noticeType')?.value),
      },
    };
  }
  checkFieldCombination(): any {
    // debugger
    let noticeType = this.noticeSearchForm.get('noticeType')?.value;
    let dateMailed = this.noticeSearchForm.get('dateMailed')?.value;
    let dateGenerated = this.noticeSearchForm.get('dateGenerated')?.value;
    let sequenceNumber = this.noticeSearchForm.get('sequenceNumber')?.value;
    let state = this.noticeSearchForm.get('state')?.value;
    let plateID = this.noticeSearchForm.get('plateID')?.value;
    let ticketNumber = this.noticeSearchForm.get('citationNumberOrTicketNumber')?.value;
    let dl = this.noticeSearchForm.get('driverSearchLicense')?.value;

    if (this.noticeSearchForm) {
      if (noticeType && (!state || !plateID || !ticketNumber || !dl)) {
        if (sequenceNumber) {
          if (dateMailed && dateGenerated) {
            let err = this.translate.instant(
              'Please select either date mailed/generated'
            );
            this.notification.error(err);
            return false;
          } else if ((dateMailed || dateGenerated) &&(state || plateID || ticketNumber || dl)) 
          {
            let err = this.translate.instant(
              'Please try the right combination. Notice type and sequence number should be combined with Date mailed/Generated only'
            );
            this.notification.error(err);
            return false;
          } else if (dateMailed || dateGenerated) {
            return true;
          } else {
            this.noticeSearchForm.get('dateMailed')?.addValidators([Validators.required]);
            this.noticeSearchForm.get('dateMailed')?.updateValueAndValidity();
            this.noticeSearchForm.get('dateGenerated')?.addValidators([Validators.required]);
            this.noticeSearchForm.get('dateGenerated')?.updateValueAndValidity();
            let err = this.translate.instant(
              'Enter value in Date mailed/ Date generated'
            );
            this.notification.error(err);
            return false;
          }
        } else if (state && plateID && ticketNumber && dl) {
          let err = this.translate.instant(
            'Not a valid combination, Please combine Notice type with sequence number and date mailed/generated'
          );
          this.notification.error(err);
          return false;
        } else if (noticeType) {
          return true;
        } else {
          this.noticeSearchForm.get('sequenceNumber')?.addValidators([Validators.required]);
          this.noticeSearchForm.get('sequenceNumber')?.updateValueAndValidity();
          let err = this.translate.instant('Enter value in sequence Number');
          this.notification.error(err);
          return false;
        }
      }
      if (sequenceNumber && (!state || !plateID || !ticketNumber || !dl)) {
        if (noticeType) {
          if (dateMailed && dateGenerated) {
            let err = this.translate.instant(
              'Please select either date mailed/ date generated'
            );
            this.notification.error(err);
            return false;
          } else if (
            (dateMailed || dateGenerated) &&
            (state || plateID || ticketNumber || dl)
          ) {
            let err = this.translate.instant(
              'Please try the right combination. Notice type and sequence number should be combined with Date mailed/Generated only'
            );
            this.notification.error(err);
            return false;
          } else if (dateMailed || dateGenerated) {
            return true;
          } else {
            let err = this.translate.instant(
              'Enter value in Date mailed/ Date generated'
            );
            this.notification.error(err);
            return false;
          }
        } else if (state || plateID || ticketNumber || dl) {
          let err = this.translate.instant(
            'Not a valid combination, Please combine sequence number with notice type and date mailed/generated'
          );
          this.notification.error(err);
          return false;
        } else {
          this.noticeSearchForm
            .get('noticeType')
            ?.addValidators([Validators.required]);
          this.noticeSearchForm.get('noticeType')?.updateValueAndValidity();
          let err = this.translate.instant('Enter value in notice Type');
          this.notification.error(err);
          return false;
        }
      }
      if (dateMailed &&(!noticeType || !sequenceNumber || !ticketNumber || !dl)) 
      {
        if (dateMailed && dateGenerated) {
          let err = this.translate.instant(
            'Please either select date mailed or date generated'
          );
          this.notification.error(err);
          return false;
        }
        else if(dateMailed)
        {
          return true;
        }
      }
      if (dateGenerated &&(!noticeType || !sequenceNumber || !ticketNumber || !dl)) 
      {
        if (dateMailed && dateGenerated) {
          let err = this.translate.instant(
            'Please either select date mailed or date generated'
          );
          this.notification.error(err);
          return false;
        } else if(dateGenerated)
        {
          return true;
        }
      }
      if (state && !noticeType && !sequenceNumber && !ticketNumber && !dl && !dateMailed && !dateGenerated) 
      {
        if (plateID &&(!noticeType ||!dateMailed ||!dateGenerated ||!sequenceNumber ||!ticketNumber ||!dl)) 
        {
          return true;
        } 
        else if 
        ( noticeType ||dateMailed ||dateGenerated ||sequenceNumber ||ticketNumber ||dl) 
        {
          let err = this.translate.instant(
            'Not a valid combination, Please combine state with plate id'
          );
          this.notification.error(err);
          return false;
        } else {
          this.noticeSearchForm
            .get('plateID')
            ?.addValidators([Validators.required]);
          this.noticeSearchForm.get('plateID')?.updateValueAndValidity();
          let err = this.translate.instant('Please enter plate id');
          this.notification.error(err);
          return false;
        }
      }
      if (plateID &&!noticeType &&!sequenceNumber &&!ticketNumber &&!dl &&!dateMailed &&!dateGenerated) {
        if (state) {
          return true;
        } else {
          this.noticeSearchForm
            .get('state')
            ?.addValidators([Validators.required]);
          this.noticeSearchForm.get('plateID')?.updateValueAndValidity();
          let err = this.translate.instant('Please enter state value');
          this.notification.error(err);
          return false;
        }
      }
      if (ticketNumber &&!noticeType &&!sequenceNumber &&!dl &&!state &&!plateID &&!dateMailed &&!dateGenerated) {
        return true;
      }
      if (dl &&!noticeType &&!sequenceNumber &&!ticketNumber &&!state &&!plateID &&!dateMailed &&!dateGenerated)
      {
        return true;
      }
    }
    let error = this.translate.instant(
      'Please enter atleast one parameter for search result'
    );
    this.removeAllValidators();
    this.notification.error(error);
    return false;
  }
  checkStringFieldForNull(fieldname: any) {
    return fieldname ? fieldname : null;
  }
  checkNumberFieldForNull(fieldname: any) {
    return fieldname ? fieldname : 0;
  }
  convertDate(date: string) {
    if (date) {
      let time = `${date}`;
      return time;
    } else {
      return null;
    }
  }
  getStatePlate(state: string, plateId: string) {
    return state && plateId ? state + plateId : '';
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  toggleNoticeName(noticeTypeLongName: string) {
    if (noticeTypeLongName) {
      if (noticeTypeLongName === 'N/A') {
        this.noticeSearchForm.get('noticeName')?.setValue(null);
        this.noticeSearchForm.get('sequenceNumber')?.enable();
        this.noticeSearchForm.get('citationNumberOrTicketNumber')?.enable();
        this.noticeSearchForm.get('state')?.enable();
        this.noticeSearchForm.get('plateID')?.enable();
        this.noticeSearchForm.get('driverSearchLicense')?.enable();
      } else {
        this.noticeSearchForm.get('citationNumberOrTicketNumber')?.disable();
        this.noticeSearchForm.get('state')?.disable();
        this.noticeSearchForm.get('plateID')?.disable();
        this.noticeSearchForm.get('driverSearchLicense')?.disable();
        this.noticeSearchForm.get('noticeName')?.setValue(noticeTypeLongName);
      }
    } else {
      this.notification.info('Please select a correct notice type');
    }
  }
  toggleState(statename: string) 
  {
    if (statename) {
      if (statename  === 'N/A') {
        this.noticeSearchForm.get('noticeType')?.enable();
        this.noticeSearchForm.get('dateMailed')?.enable();
        this.noticeSearchForm.get('dateGenerated')?.enable();
        this.noticeSearchForm.get('sequenceNumber')?.enable();
        this.noticeSearchForm.get('driverSearchLicense')?.enable();
        this.noticeSearchForm.get('citationNumberOrTicketNumber')?.enable();
        this.noticeSearchForm.get('state')?.setValue(null);
      } else{
        this.noticeSearchForm.get('noticeType')?.disable();
        this.noticeSearchForm.get('dateMailed')?.disable();
        this.noticeSearchForm.get('dateGenerated')?.disable();
        this.noticeSearchForm.get('sequenceNumber')?.disable();
        this.noticeSearchForm.get('driverSearchLicense')?.disable();
        this.noticeSearchForm.get('citationNumberOrTicketNumber')?.disable();
        // this.noticeSearchForm.get('state')?.setValue(statename);
      }
    } else {
      this.notification.info('Please select a correct state');
    }
  }
  onChangeSequenceNumber(event : any)
  {

    // debugger
    if(event.target?.value.length > 0)
    {
      this.noticeSearchForm.get('citationNumberOrTicketNumber')?.disable();
      this.noticeSearchForm.get('state')?.disable();
      this.noticeSearchForm.get('plateID')?.disable();
      this.noticeSearchForm.get('driverSearchLicense')?.disable();
      
    }
    else
    {
      this.noticeSearchForm.get('citationNumberOrTicketNumber')?.enable();
      this.noticeSearchForm.get('state')?.enable();
      this.noticeSearchForm.get('plateID')?.enable();
      this.noticeSearchForm.get('driverSearchLicense')?.enable();
 
    }

  }
  onChangeTicketNumber(event : any)
  {
    // debugger
    if(event.target?.value.length > 0)
    {
      this.noticeSearchForm.get('noticeType')?.disable();
      this.noticeSearchForm.get('dateMailed')?.disable();
      this.noticeSearchForm.get('dateGenerated')?.disable();
      this.noticeSearchForm.get('sequenceNumber')?.disable();
      this.noticeSearchForm.get('state')?.disable();
      this.noticeSearchForm.get('plateID')?.disable();
      this.noticeSearchForm.get('driverSearchLicense')?.disable();
    }
    else
    {
      this.noticeSearchForm.get('noticeType')?.enable();
      this.noticeSearchForm.get('dateMailed')?.enable();
      this.noticeSearchForm.get('dateGenerated')?.enable();
      this.noticeSearchForm.get('sequenceNumber')?.enable();
      this.noticeSearchForm.get('state')?.enable();
      this.noticeSearchForm.get('plateID')?.enable();
      this.noticeSearchForm.get('driverSearchLicense')?.enable();
    }
  }
  onChangeStatePlate(event : any)
  {

    // debugger
    if(event.target?.value.length > 0)
    {
      this.noticeSearchForm.get('noticeType')?.disable();
      this.noticeSearchForm.get('dateMailed')?.disable();
      this.noticeSearchForm.get('dateGenerated')?.disable();
      this.noticeSearchForm.get('sequenceNumber')?.disable();
      this.noticeSearchForm.get('driverSearchLicense')?.disable();
      this.noticeSearchForm.get('citationNumberOrTicketNumber')?.disable();
    }
    else
    {
      this.noticeSearchForm.get('noticeType')?.enable();
      this.noticeSearchForm.get('dateMailed')?.enable();
      this.noticeSearchForm.get('dateGenerated')?.enable();
      this.noticeSearchForm.get('sequenceNumber')?.enable();
      this.noticeSearchForm.get('driverSearchLicense')?.enable();
      this.noticeSearchForm.get('citationNumberOrTicketNumber')?.enable();
    }

  }
  onChangeMailDate(event  :any)
  {
    if(event.target?.value.length > 0 )
    {
      this.noticeSearchForm.get('citationNumberOrTicketNumber')?.disable();
      this.noticeSearchForm.get('state')?.disable();
      this.noticeSearchForm.get('plateID')?.disable();
      this.noticeSearchForm.get('driverSearchLicense')?.disable();
    }
    else
    {
      this.noticeSearchForm.get('citationNumberOrTicketNumber')?.enable();
      this.noticeSearchForm.get('state')?.enable();
      this.noticeSearchForm.get('plateID')?.enable();
      this.noticeSearchForm.get('driverSearchLicense')?.enable();
    }
  }
  onChangeGeneratedDate(event  :any)
  {
    if(event.target?.value.length > 0 )
    {
      this.noticeSearchForm.get('citationNumberOrTicketNumber')?.disable();
      this.noticeSearchForm.get('state')?.disable();
      this.noticeSearchForm.get('plateID')?.disable();
      this.noticeSearchForm.get('driverSearchLicense')?.disable();
    }
    else
    {
      this.noticeSearchForm.get('citationNumberOrTicketNumber')?.enable();
      this.noticeSearchForm.get('state')?.enable();
      this.noticeSearchForm.get('plateID')?.enable();
      this.noticeSearchForm.get('driverSearchLicense')?.enable();
    }
  }
  onChangeDriversLicense(event :any)
  {
    if(event.target?.value.length > 0)
    {
      this.noticeSearchForm.get('noticeType')?.disable();
      this.noticeSearchForm.get('dateMailed')?.disable();
      this.noticeSearchForm.get('dateGenerated')?.disable();
      this.noticeSearchForm.get('sequenceNumber')?.disable();
      this.noticeSearchForm.get('state')?.disable();
      this.noticeSearchForm.get('plateID')?.disable();
      this.noticeSearchForm.get('citationNumberOrTicketNumber')?.disable();
    }
    else
    {
      this.noticeSearchForm.get('noticeType')?.enable();
      this.noticeSearchForm.get('dateMailed')?.enable();
      this.noticeSearchForm.get('dateGenerated')?.enable();
      this.noticeSearchForm.get('sequenceNumber')?.enable();
      this.noticeSearchForm.get('state')?.enable();
      this.noticeSearchForm.get('plateID')?.enable();
      this.noticeSearchForm.get('citationNumberOrTicketNumber')?.enable();
    }
  }
  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }
  setPagelabel(lang: any) {
    this.translate.use(lang).subscribe((res: any) => {
      this.dataSource.paginator = this.paginator;
      const alertMsg = this.translate.instant('Items per page');
      this.dataSource.paginator._intl.itemsPerPageLabel = alertMsg;
    });
  }
  applyFilter(event: any) {
    // debugger
    // this.dataSource.filter = filterValue?.value;
    const filterValue = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showNoticeDetails(id: string) {
    this.router.navigateByUrl(`/notice/search/details/${id}`);
  }
  removeAllValidators() {
    this.noticeSearchForm
      .get('noticeName')
      ?.removeValidators([Validators.required]);
    this.noticeSearchForm.get('noticeName')?.updateValueAndValidity();
    this.noticeSearchForm
      .get('dateMailed')
      ?.removeValidators([Validators.required]);
    this.noticeSearchForm.get('dateMailed')?.updateValueAndValidity();
    this.noticeSearchForm
      .get('dateGenerated')
      ?.removeValidators([Validators.required]);
    this.noticeSearchForm.get('dateGenerated')?.updateValueAndValidity();
    this.noticeSearchForm
      .get('sequenceNumber')
      ?.removeValidators([Validators.required]);
    this.noticeSearchForm.get('sequenceNumber')?.updateValueAndValidity();
    this.noticeSearchForm
      .get('citationNumberOrTicketNumber')
      ?.removeValidators([Validators.required]);
    this.noticeSearchForm
      .get('citationNumberOrTicketNumber')
      ?.updateValueAndValidity();
    this.noticeSearchForm.get('state')?.removeValidators([Validators.required]);
    this.noticeSearchForm.get('state')?.updateValueAndValidity();
    this.noticeSearchForm
      .get('plateID')
      ?.removeValidators([Validators.required]);
    this.noticeSearchForm.get('plateID')?.updateValueAndValidity();
    this.noticeSearchForm
      .get('dateGenerated')
      ?.removeValidators([Validators.required]);
    this.noticeSearchForm.get('dateGenerated')?.updateValueAndValidity();
    this.noticeSearchForm
      .get('driverSearchLicense')
      ?.removeValidators([Validators.required]);
    this.noticeSearchForm.get('driverSearchLicense')?.updateValueAndValidity();
    this.noticeSearchForm
      .get('noticeType')
      ?.removeValidators([Validators.required]);
    this.noticeSearchForm.get('noticeType')?.updateValueAndValidity();
  }
}