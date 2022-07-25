import {
  ChangeDetectionStrategy, Component, OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  addMinutes, endOfWeek
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarEventTitleFormatter
} from 'angular-calendar';

import { CourtschedulingService } from '../../services/courtscheduling.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { WeekViewHourSegment } from 'calendar-utils';
import { fromEvent, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
};
@Component({
  selector: 'app-create-scheduling',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-scheduling.component.html',
  styleUrls: ['./create-scheduling.component.scss'],
})
export class CreateSchedulingComponent implements OnInit {
  // @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  @ViewChild('calendar', { static: true }) calendar!: TemplateRef<any>;
  scheduleForm!: FormGroup;
  locationObj!: any[];
  locations: string[] = [];
  typeObj!: any[];
  types: string[] = [];
  categoryObj!: any[];
  categories: string[] = [];
  arrayOfNumber = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  arayOfMins = [30, 60];
  loader: boolean = false;
  pageLoader: boolean = false;
  weeks: string[] = [];
  weekDaysResp: string[] = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ]
  // loader : boolean = true;

  tempWeek!: any[];
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData!: {
    action: string;
    event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [];
  refresh = new Subject<void>();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  disableSave: boolean = true;
  disableWhenSaved : boolean = false;
  // calendarLoader : boolean = false;
  noOfSlots : number =0;

  constructor(
    public fb: FormBuilder,
    private service: CourtschedulingService,
    private notificationService: ToastrService,
    public router: Router,
    private language: LanguageService,
    private translate: TranslateService,
    private modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.pageLoader = true;
    this.language.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    this.getList();
    this.initializeForm();
    this.disableFormFields();
    this.tempWeek = this.weekDaysResp;
    this.pageLoader = false;
  }
  getList() {
    // this.getCourtScheduleList();
    this.getLocationList();
    this.getTypeList();
    this.getCategoryList();
  }
  getLocationList() {
    this.service.getLocationlist().subscribe((res) => {
      // console.log(res);

      this.locationObj = res;
      // this.locationObj.forEach((locations) => {
      //   this.locations.push(locations['name'].toString());
      // });
    });
  }
  getTypeList() {
    this.service.getCourtRoomTypes().subscribe((res) => {
      this.typeObj = res;
      this.typeObj.forEach((type) => {
        this.types.push(type['roomTypeDescription'].toString());
      });
    });
  }
  getCategoryList() {
    this.service.getCourtRoomCategory().subscribe((res) => {
      this.categoryObj = res;
      this.categoryObj.forEach((category) => {
        this.categories.push(category['categoryDescription'].toString());
      });
    });
  }
  initializeForm() {
    this.scheduleForm = this.fb.group({
      location: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      dateRangeFrom: new FormControl('', Validators.required),
      dateRangeTo: new FormControl('', Validators.required),
      dateStartTime: new FormControl('', Validators.required),
      dateEndTime: new FormControl('', Validators.required),
      breakStartTime: new FormControl('', Validators.required),
      breakEndTime: new FormControl('', Validators.required),
      daysOfWeek: new FormControl([], Validators.required),
      numberOfRooms: new FormControl('', Validators.required),
      numberOfSlots: new FormControl(''),
      slotLength: new FormControl('', Validators.required),
      maxNumbersOfTickets: new FormControl('', [Validators.required, Validators.maxLength(2)]),
    });
  }
  loadCalendar(id: number)
  {
    // debugger
    this.getCourtScheduleList(id);
    this.enableControls();

  }
  disableFormFields()
  {
    this.scheduleForm.get('type')?.disable();
    this.scheduleForm.get('category')?.disable();
    this.scheduleForm.get('dateRangeFrom')?.disable();
    this.scheduleForm.get('dateRangeTo')?.disable();
    this.scheduleForm.get('dateStartTime')?.disable();
    this.scheduleForm.get('dateEndTime')?.disable();
    this.scheduleForm.get('breakStartTime')?.disable();
    this.scheduleForm.get('breakEndTime')?.disable();
    this.scheduleForm.get('daysOfWeek')?.disable();
    this.scheduleForm.get('numberOfRooms')?.disable();
    this.scheduleForm.get('numberOfSlots')?.disable();
    this.scheduleForm.get('slotLength')?.disable();
    this.scheduleForm.get('maxNumbersOfTickets')?.disable();

  }
  enableControls()
  {
    this.scheduleForm.get('type')?.enable();
    this.scheduleForm.get('category')?.enable();
    this.scheduleForm.get('dateRangeFrom')?.enable();
    this.scheduleForm.get('dateRangeTo')?.enable();
    this.scheduleForm.get('dateStartTime')?.enable();
    this.scheduleForm.get('dateEndTime')?.enable();
    this.scheduleForm.get('breakStartTime')?.enable();
    this.scheduleForm.get('breakEndTime')?.enable();
    this.scheduleForm.get('daysOfWeek')?.enable();
    this.scheduleForm.get('numberOfRooms')?.enable();
    // this.scheduleForm.get('numberOfSlots')?.enable();
    this.scheduleForm.get('slotLength')?.enable();
    this.scheduleForm.get('maxNumbersOfTickets')?.enable();
  }
  saveASchedule(data: any) {
    let weeksID: number[] = this.checkWeekId().sort((a, b) => a - b);

    if (!this.scheduleForm.invalid) {
      this.disableWhenSaved = true;
      this.loader = true;
      // console.log(data);
      let startTime = this.convertTo24HrsFormat(data.dateStartTime);
      let endTime = this.convertTo24HrsFormat(data.dateEndTime);
      let breakSTime = this.convertTo24HrsFormat(data.breakStartTime);
      let breakETime = this.convertTo24HrsFormat(data.dateEndTime);
      let scheduleDateFrom = this.convertDate(data.dateRangeFrom, startTime,2);
      let scheduleDateTo = this.convertDate(data.dateRangeTo, endTime,2);
      let slotFromTime = this.convertDate(data.dateStartTime,startTime, 2);
      let slotToTime = this.convertDate(data.dateEndTime,endTime, 2);
      let breakStartTime = this.convertDate(data.dateRangeFrom, breakSTime, 2);
      let breakEndTime = this.convertDate(data.dateRangeFrom,breakETime, 2);
      
      let reqObj = {
        "courtScheduleModel": {
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-06-29T05:05:45.604Z",
          "updateDatetime": "2022-06-29T05:05:45.604Z",
          "isDeleted": "N",
          "courtHearingHoursID": 0,
          "courtsID": this.getLocationId(data.location),
          "courtRoomTypeID": this.getTypeId(data.type),
          "courtRoomCategoryID": this.getCategoryId(data.category),
          "scheduleDateFrom": scheduleDateFrom,
          "scheduleDateTo": scheduleDateTo,
          "dateRangeSlotFromTime": scheduleDateFrom,
          "dateRangeRangeSlotToTime": scheduleDateTo,
          "timeRangeBreakStartTime": breakStartTime,
          "timeRangeBreakEndTime": breakEndTime,
          "daysOfWeek": weeksID,
          "numberofRooms": parseInt(data.numberOfRooms),
          "numberofSlots": this.noOfSlots,
          "slotLength": parseInt(data.slotLength),
          "ticketsPerSlot": parseInt(data.maxNumbersOfTickets)
        }
      };
      this.service.createNewSchedule(reqObj).subscribe((res) => {
        if (res === null) {
          this.loader = false;
          this.disableWhenSaved = false;
        }
        else {
          // console.log(res);
          if (res.status! === 'Success') {
            this.notificationService.success('Record Inserted');
          } else {
            let errMsg = this.translate.instant('Something went wrong!')
            this.notificationService.error(errMsg);
          }
          this.scheduleForm.reset();
          this.loader = false;
          this.disableWhenSaved = false;
          this.router.navigateByUrl('court/scheduling');
        }
      },
        (err) => {
          this.loader = false;
          this.disableWhenSaved = false;
          let errMsg = this.translate.instant('Duplicate record Found')
          this.notificationService.error(errMsg);
        }
      );
    }
    else {
      this.scheduleForm.markAllAsTouched();
      let errMsg = this.translate.instant('Please check required fields and try again')
      this.notificationService.error(errMsg);
    }

  }

  onSlotLengthSelection(mins : number)
  {
    // debugger
    // console.log(mins)
    let startTime = this.convertTo24HrsFormat(this.scheduleForm.get('dateStartTime')?.value);
    let endTime = this.convertTo24HrsFormat(this.scheduleForm.get('dateEndTime')?.value);
    
    let courtInterval =( (parseInt(endTime.split(":")[0]) - parseInt(startTime.split(":")[0])) * 60)/ mins;

    this.noOfSlots = courtInterval;
    this.scheduleForm.get('numberOfSlots')?.setValue(courtInterval);
  }
  private checkWeekId(): number[] {
    let returnValue: number[] = [];
    let array: any[] = this.scheduleForm.controls['daysOfWeek'].value;
    if (array.length > 0) {
      array.forEach(day => {
        returnValue.push(this.weekDaysResp.indexOf(day) + 1);
      })
    }
    return returnValue;
  }

  private convertDate(date: any, time: any, returVal: any = 1): string {
    //Reference for Date time formats
    // "2022-06-22T11:40:44.701Z"
    // debugger
    if (returVal == 1) {
      let newtime: any;
      let seconds = new Date().getSeconds();

      newtime = time.split(" ")[0];
      time = `${newtime}:${seconds}`;

      return date + 'T' + time;

    } else if (returVal === 2) {
      // 2022-06-28T11:10:29.561Z
      let newtime: any;
      let seconds = '00';
      let miliseconds = '000'; 
      newtime = time.split(" ")[0];
      time = `${newtime}:${seconds}.${miliseconds}`;

      return date + 'T' + time + 'Z';
    }
    return '';
  }

  private getLocationId(location: string): Number {
    let id = 0;
    if (this.locationObj.length == 0) {
      id = 1;
    } else {
      this.locationObj.forEach((e) => {
        if (e.name === location) {
          id = e.courtsId;
        }
      });
    }

    return id;
  }

  private getTypeId(type: string): Number {
    let id = 0;
    if (this.typeObj.length === 0) {
      id = 1;
    } else {
      this.typeObj.forEach((e) => {
        if (e.roomTypeDescription === type) {
          id = e.courtRoomTypeID;
        }
      });
    }

    return id;
  }

  private getCategoryId(category: string): Number {
    let id = 0;
    if (this.categoryObj.length == 0) {
      id = 10;
    } else {
      this.categoryObj.forEach((e) => {
        if (e.categoryDescription === category) {
          id = e.courtRoomCategoryID;
        }
      });
    }
    return id;
  }
  private getCourtScheduleList(courtsId : number) {
    // debugger
    // this.calendarLoader = true;
    this.service.getCourtScheduleList().subscribe((response: any) => {
      let obj: any = {};
      this.events = [];
      response?.forEach((res: any) => {
        // console.log(res);
        if(res?.courtsId === courtsId)
        {
          let startDate = addDays(new Date(res?.scheduleDate.toString()), 0);
          let startDateTime = startDate.getTime();
          let dur = res?.time?.hours;
          let endaDate = this.addHours(dur, startDate);
  
          obj = {
            start: startDate,
            end: endaDate,
            // title: 'A 3 day event',
            color: colors.blue,
            actions: this.actions,
            allDay: false,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
          }
          this.events.push(obj);
          this.refresh.next();
        }
      });
      // this.calendarLoader = false;
      // this.scheduleForm.get('numberOfSlots')?.setValue('10');
      this.refresh.next();
    })
  }
  addHours(numOfHours: any, date = new Date()) {
    const dateCopy = new Date(date.getTime());

    dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);

    return dateCopy;
  }
  resetForm() {
    this.scheduleForm.reset();
    let errMsg = this.translate.instant('Process Canceled');
    this.notificationService.info(errMsg);
    this.router.navigateByUrl('/court/scheduling');
  }

  onWeeksRemoved(week: string) {
    const weeks = this.scheduleForm.controls['daysOfWeek'].value as string[];
    this.removeFirst(weeks, week);
    this.scheduleForm.controls['daysOfWeek'].setValue(weeks); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }
  setPagelabel(lang: any) {
    this.translate.use(lang).subscribe((res: any) => {
      // this.dataSource.paginator = this.paginator;
      const alertMsg = this.translate.instant("Items per page", { msg: '' });
      // this.dataSource.paginator._intl.itemsPerPageLabel = alertMsg;
    });
  }

  //Calendar Implmentation
  applyChangesOnCalendar(data: any) {
    // debugger

    if (this.scheduleForm.valid) {
      let obj: any = {};
      let startTime = this.convertTo24HrsFormat(data.dateStartTime);
      let endTime = this.convertTo24HrsFormat(data.dateEndTime);
      let breakStartTime = parseInt(this.convertTo24HrsFormat(data.breakStartTime).split(":")[0]);
      let breakEndTime = parseInt(this.convertTo24HrsFormat(data.breakEndTime).split(":")[0]); 
      let startDate = this.convertDate(data.dateRangeFrom, startTime);
      let endDate = this.convertDate(data.dateRangeTo, endTime);
      let start = new Date(startDate.toString());
      let end = new Date(endDate.toString());
      let difference = end.valueOf() - start.valueOf(); //in milliseconds
      difference = Math.ceil(difference / (1000 * 60 * 60 * 24)); // into days
      let slotPerDay = this.noOfSlots;
      let hours =  this.scheduleForm.get('slotLength')?.value === 60 ? 1 : 0.5;
      let maxTickets = this.scheduleForm.get('maxNumbersOfTickets')?.value;
      let slotStart :any;
      let slotEnd : any;
      this.actions = [
        {
          label: '<i class="fas fa-fw fa-pencil-alt"></i>',
          a11yLabel: 'Edit',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.handleEvent('Edited', event);
          },
        },
        {
          label: '<i class="fas fa-fw fa-trash-alt"></i>',
          a11yLabel: 'Delete',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            this.handleEvent('Deleted', event);
          },
        },
      ];
      for (let i = 0; i < difference; i++) 
      {
          slotStart = addDays(start, i);
          for(let j =1; j<=slotPerDay ; j++ )
          {
            slotEnd = this.addHours(hours, slotStart);
            let startDay = slotStart.getDay();
            if(startDay !== 0 && startDay !== 6)
            {
              let checkTimeStart = slotStart.getHours();
              let checkTimeEnd = slotEnd.getHours();
              if(checkTimeStart !== breakStartTime || checkTimeEnd !== breakEndTime)
              {
                obj = {
                  start: slotStart,
                  end: slotEnd,
                  title: `${maxTickets} tickets per slot`,
                  color: colors.blue,
                  actions: this.actions,
                  allDay: false,
                  resizable: {
                    beforeStart: true,
                    afterEnd: true,
                  },
                  draggable: true,
                }
                this.events.push(obj);
                this.refresh.next();
              }
            }
            slotStart = slotEnd;
          }
        }
      this.refresh.next();
      // console.log(this.events);
      this.disableSave = false;
    }
    else {
      this.scheduleForm.markAllAsTouched();
      this.notificationService.error('Please select atleast the required criteria');
    }
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
      this.CalendarView.Day;
    }
  }
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }
  daysBetweenDays(date_1: any, date_2: any): number {
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  }

  convertTo24HrsFormat(time: string) {
    const slicedTime = time.split(/(PM|AM)/gm)[0];
    let hours: any = slicedTime.split(':')[0];
    let minutes: any = slicedTime.split(':')[1];
    // let [hours, minutes] = slicedTime.split(':');

    if (hours === '12') {
      hours = '00';
    }
    if (time.endsWith('PM')) {
      hours = parseInt(hours, 10) + 12;
    }
    return `${this.addition(hours)}:${this.addition(minutes)}`;
  }

  addition(hoursOrMin: any) {
    let updateHourAndMin =
      hoursOrMin.length < 2
        ? (hoursOrMin = `${0}${hoursOrMin}`)
        : hoursOrMin;

    return updateHourAndMin;
  }

}

