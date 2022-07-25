import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, startOfMonth, endOfMonth, isSameDay, isSameMonth, addHours, setMinutes, setHours, } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourtschedulingService } from '../../services/courtscheduling.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpParams } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { EntityDetail } from 'src/app/general-processing/models/plate.model';
import { MonthlyScheduleTickets, TicketSlot } from '../../models/monthly-schedule-tickets.model';
import { GPService } from 'src/app/general-processing/services/g-p.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  purple: {
    primary: '#800080',
    secondary: '#923aea',
  }
};

@Component({
  selector: 'app-schedule-hearing',
  templateUrl: './schedule-hearing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],

})
export class ScheduleHearingComponent implements OnInit {
  /*Start Mat Accordion */
  step = 0;
  RoomTypesResp: any;
  plateNoDlNo: any;
  loader: boolean = false;
  categoryResp: any;
  nameResp: any;
  typeResp: any;
  plateDetails!: EntityDetail;
  isShow: any;
  welcome: any;
  btnContinue: boolean = false;
  addSave: boolean = false;
  btnBack: boolean = true;

  setStep(index: number) { this.step = index; }
  nextStep() { this.step++; }
  prevStep() { this.step--; }
  /*End Mat Accordion */
  /* Start FullCalender*/

  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  scheduleHearingForm!: FormGroup;
  typeObj!: any[];
  types: string[] = [];
  categoryObj!: any[];
  categories: string[] = [];
  locationObj!: any[];
  locations: string[] = [];
  modalData!: { action: string; event: CalendarEvent; }
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = false;
  monthlyScheduleTickets: MonthlyScheduleTickets[] = [];
  ticketSlots: TicketSlot[] = [];
  constructor(
    private modal: NgbModal,
    private gpService: GPService,
    public fb: FormBuilder,
    private service: CourtschedulingService,
    private notificationService: ToastrService,
    public router: Router,
    public route: ActivatedRoute,
    private language: LanguageService,
    private translate: TranslateService,
    private datePipe: DatePipe) { }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.plateNoDlNo = params['plateNumber'];
      this.getPlateDetails();
    })
    this.language.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    this.scheduleHearingForm = new FormGroup({
      courtName: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
    });
    this.getTypeList();
    this.getCategoryList();
    this.getCourtlist();
    const citationNumbers = this.route.snapshot.params['citationNumbers'];
    if (citationNumbers) {
      const citationsId = citationNumbers.toString().split(',');
      citationsId?.forEach((e: any) => {
        let obj = { citationNumber: e, citationId: '', isSelected: false, slotTime: '' };
        this.ticketSlots.push(obj);
      });
    }
    this.gpService.get(`getEntityDetails/${this.plateNoDlNo}`).subscribe(res => {
      const issuanceData = res.citationsSummary;
      this.ticketSlots?.forEach(d => {
        const id = issuanceData?.find((s: any) => s.citationNo == d.citationNumber)?.citationsId
        d.citationId = id ?? 0;
      });
    });
  }

  get getTicketSelectedCount(): number { return this.ticketSlots.filter(s => s.isSelected)?.length ?? 0; }
  get isSomeTicketsSelected(): boolean { return this.ticketSlots.filter(s => s.isSelected)?.length > 0; }

  //#region  /*start API call*/
  getCourtlist() {
    this.service.getCourtlist().subscribe((res) => { this.nameResp = res; });
  }

  getTypeList() {
    this.service.getCourtRoomTypes().subscribe((res) => { this.typeResp = res; });
  }

  getCategoryList() {
    this.service.getCourtRoomCategory().subscribe(res => {
      this.categoryResp = res;
      console.log('categoryResp' + JSON.stringify(res))
    });
  }
  //#endregion

  getPlateDetails() {
    this.service.getPlateInfo(this.plateNoDlNo).subscribe((res: any) => {
      this.plateDetails = res;
    });
  }

  onSelectCourtName(leadDays: number) {
    let date = new Date();
    date.setDate(date.getDate() + leadDays);
    let year = date.getFullYear();
    const month = date.getMonth() > 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
    let day = date.getDate() > 10 ? `${date.getDate()}` : `0${date.getDate()}`;
    this.scheduleHearingForm.get('startDate')?.setValue(`${year}-${month}-${day}`);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let Lyear = lastDay.getFullYear();
    const Lmonth = lastDay.getMonth() > 10 ? `${lastDay.getMonth() + 1}` : `0${lastDay.getMonth() + 1}`;
    let Lday = lastDay.getDate() > 10 ? `${lastDay.getDate()}` : `0${lastDay.getDate()}`;
    this.scheduleHearingForm.get('endDate')?.setValue(`${Lyear}-${Lmonth}-${Lday}`);
  }

  onClickNextAvailable() {
    const month = new Date(this.scheduleHearingForm.get('startDate')?.value).getMonth();
    const year = new Date(this.scheduleHearingForm.get('startDate')?.value).getFullYear();
    const startDate = new Date(year, month + 1, 1);
    const endDate = new Date(year, month + 1 + 1, 0);
    this.scheduleHearingForm.get('startDate')?.setValue(startDate);
    this.scheduleHearingForm.get('endDate')?.setValue(endDate);
  }

  onClickContinue() {
    let queryParams = new HttpParams();
    this.viewDate = new Date(this.scheduleHearingForm.get('startDate')?.value);
    const dateFrom = new Date(this.scheduleHearingForm.get('startDate')?.value);
    const dateStrFrom = dateFrom.getFullYear() + '-' + ('0' + (dateFrom.getMonth() + 1)).slice(-2) + '-' + ('0' + dateFrom.getDate()).slice(-2);
    const dateTo = new Date(this.scheduleHearingForm.get('endDate')?.value);
    const dateStrTo = dateTo.getFullYear() + '-' + ('0' + (dateTo.getMonth() + 1)).slice(-2) + '-' + ('0' + dateTo.getDate()).slice(-2);
    queryParams = queryParams.append("CourtsId", this.scheduleHearingForm.get('courtName')?.value);
    queryParams = queryParams.append("CourtRoomTypeId", this.scheduleHearingForm.get('type')?.value);
    queryParams = queryParams.append("CourtRoomCategoryId", this.scheduleHearingForm.get('category')?.value);
    queryParams = queryParams.append("ScheduleHearingStartDate", dateStrFrom);
    queryParams = queryParams.append("ScheduleHearingEndDate", dateStrTo);
    //  this.storeFlag = true;
    this.service.getEventMonth(queryParams).subscribe((res: any) => {
      this.monthlyScheduleTickets = [];
      this.setView(CalendarView.Month);
      if (res && res.length != 0) {
        res.forEach((d: any) => {
          this.monthlyScheduleTickets.push({ ...d, weeklyScheduleTickets: [], selected: false });
        });
        this.events = this.updateMonthlyCalenderEventData();
        this.refresh.next();

      }
    });
  }

  updateMonthlyCalenderEventData(): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    this.monthlyScheduleTickets?.forEach(d => {
      let eventTitle;
      eventTitle = '<span class="pr-2">' + d.ticketsAssigned + '/' + d.totalTickets + '</span>' + d.roomTypeDescription;
      let eventData = {
        start: startOfDay(new Date(d.scheduleHearingDate)),
        end: endOfDay(new Date(d.scheduleHearingDate)),
        title: eventTitle,
        color: colors.purple
      };
      events.push(eventData);
    });
    return events;
  }

  updateDayCalenderEventData(date: Date): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    const weekData = this.monthlyScheduleTickets?.find(s =>
      new Date(s.scheduleHearingDate).getDate() == new Date(date).getDate())?.weeklyScheduleTickets;
    weekData?.forEach(d => {
      let eventTitle;
      eventTitle = '<span class="pr-2">' + d.ticketsAssigned + '/' + d.totalTickets + '</span>' + d.roomTypeDescription;
      const n = new Date(d.scheduleHearingDate);
      let hrs = n.getHours();
      const event = {
        start: addHours(startOfDay(new Date(d.scheduleHearingDate)), hrs),
        title: eventTitle,
      };
      events.push(event);
    });
    return events;
  }

  onSelectCitation(selectedTicket: TicketSlot) {
    selectedTicket.isSelected = !selectedTicket.isSelected;
    if (!selectedTicket.isSelected && selectedTicket.slotTime) {
      this.removeBookingSlot(selectedTicket.slotTime);
      selectedTicket.slotTime = '';
    }
  }

  removeBookingSlot(value: string) {
    this.monthlyScheduleTickets?.forEach(s => {
      if (new Date(s.scheduleHearingDate).getDate() == new Date(value).getDate()) {
        s.weeklyScheduleTickets?.forEach(d => {
          if (new Date(d.scheduleHearingDate).getTime() == new Date(value).getTime()) {
            if (d.ticketsAssigned == 0) {
              return;
            }
            d.ticketsAssigned -= 1;
            d.citationNumber = '';
          }
        });
      }
    });
    this.events = this.updateDayCalenderEventData(new Date(value));
  }

  addBookingSlot(value: { event: CalendarEvent<any>; sourceEvent: MouseEvent | KeyboardEvent; }) {
    let isMessage = false;
    const selectedTickets = this.ticketSlots.filter(s => s.isSelected && !s.slotTime);
    selectedTickets?.forEach(f => {
      this.monthlyScheduleTickets?.forEach(s => {
        if (new Date(s.scheduleHearingDate).getDate() == new Date(value.event.start).getDate()) {
          s.weeklyScheduleTickets?.forEach(d => {
            if (new Date(d.scheduleHearingDate).getTime() == new Date(value.event.start).getTime()) {
              if (d.ticketsAssigned == d.totalTickets) {
                isMessage = true;
                return;
              }
              d.ticketsAssigned += 1;
              d.citationNumber = f.citationNumber;
              f.slotTime = d.scheduleHearingDate;
              f.courtSchedulesID = d.courtSchedulesID;
              this.btnContinue = true;
            }
          });
        }
      });
    });
    this.events = this.updateDayCalenderEventData(value.event.start);
    if (isMessage) {
      this.notificationService.info(
        this.translate.instant("This slot has been completely filled, Select another slot for ticket(s)"));
    }
  }

  getWeek(date: any) {
    const url = 'ScheduleHearing/getScheduleHearingByDay'
    this.events = [];
    this.viewDate = new Date(date);
    const dateStrFrom = this.viewDate.getFullYear() + '-' + ('0' + (this.viewDate.getMonth() + 1)).slice(-2) + '-' + ('0' + this.viewDate.getDate()).slice(-2);
    let queryParams = new HttpParams();
    queryParams = queryParams.append("CourtsId", this.scheduleHearingForm.get('courtName')?.value);
    queryParams = queryParams.append("CourtRoomTypeId", this.scheduleHearingForm.get('type')?.value);
    queryParams = queryParams.append("CourtRoomCategoryId", this.scheduleHearingForm.get('category')?.value);
    queryParams = queryParams.append("ScheduleHearingDate", dateStrFrom);
    this.service.getEventWeek(queryParams).subscribe((res: any) => {
      this.monthlyScheduleTickets.forEach(s => {
        s.selected = false;
        if (new Date(s.scheduleHearingDate).getDate() == new Date(date).getDate()) {
          s.selected = true;
          s.weeklyScheduleTickets = res;
          // s.weeklyScheduleTickets?.forEach(f => {
          //   f.citationNumber = '';
          // });
        }
      });
      this.events = this.updateDayCalenderEventData(date);
      this.refresh.next();
      this.view = CalendarView.Week;
    });
  }

  Continue() {
    this.isShow = !this.isShow;
    this.btnContinue = false;
    this.addSave = true;
    this.btnBack = false;
  }

  onSaveEvent() {
    if (this.scheduleHearingForm.valid) {
      let ticketsData: any[] = [];
      this.ticketSlots.forEach(s => {
        ticketsData.push({
          createUserID: "0",
          updateUserID: 1,
          createDatetime: "2022-07-21T07:22:40.933Z",
          updateDatetime: "2022-07-21T07:22:40.933Z",
          courtHearingID: 0,
          contractID: 2,
          courtSchedulesID: s.courtSchedulesID,
          citationsID: s?.citationId ?? 0,
          hearingOfficerID: 0,
          hearingDateTime: "2022-07-21T07:22:40.933Z",
          hearingstatus: 1,
          hearingRequired: "Y",
          caseNo: s.citationNumber,
          hearingScheduleCount: 1,
        })
      });
      const obj = {
        "courtHearingModel": ticketsData
      };
      this.service.addEvent(obj).subscribe(
        (res) => {
          if (res.status == 'Success') {
            const msg = '';
            let successMsg = this.translate.instant('Record Added Successfully', {
              msg: msg,
            });
            this.notificationService.success(successMsg);
            this.scheduleHearingForm.reset();
            this.toNavigate();

          }
        },
      )
    }
  }

  toNavigate() {
    this.router.navigateByUrl(`gp/search/entity-details/entity/${this.plateNoDlNo}`);
  }

  cancel() {
    this.notificationService.info(this.translate.instant("Process Cancelled"));
    this.toNavigate();
  }

  back() { this.toNavigate(); }

  /*end API call*/
  appendLang(lang: string) {
    this.translate.use(lang);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }


  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  get selectedSlots(): Array<any> {
    const slots: Array<any> = [];
    const uniqueSlots = Array.from(new Set(this.ticketSlots.map(a => a.slotTime))).map(id => {
      return this.ticketSlots.find(b => b.slotTime === id);
    });
    uniqueSlots.forEach((s, i) => {
      if (s?.slotTime) {
        const citationNumbers = this.ticketSlots.filter(d => (new Date(d.slotTime).getTime() == new Date(String(s.slotTime)).getTime())).map(s => s.citationNumber);
        slots.push({ srNo: i + 1, slotTime: s.slotTime, citationNumbers: citationNumbers.join(",\r\n"), length: citationNumbers?.length ?? 0 });
      }
    });
    return slots;
  }
  /* End FullCalender*/





}


