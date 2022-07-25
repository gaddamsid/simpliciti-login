import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GPService } from 'src/app/general-processing/services/g-p.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Notes } from 'src/app/general-processing/models/notes.model'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-notes-view',
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.scss'],
  providers: [DatePipe]
})
export class NotesViewComponent implements OnInit {
  // accountEntityId:any;
  isLoading = false;
  recordId: any;
  clearData: any = '';
  ticketNumber: any;
  successMsg!: string;
  notesForm!: FormGroup;
  notesData!: Notes;
  showNotesForm: boolean = false;
  searchTerm: any = '';
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['SNo', 'createDatetime', 'createUserId', 'dataRecord'];
  notesDetails: Notes[] = [{
    "dataRecord": "This is Notes detail View",
    "createDatetime": "2022-06-20T05:37:12.758",
    "createUserId": 1
  },
  {
    "dataRecord": "First User ",
    "createDatetime": "2022-06-20T05:37:12.758",
    "createUserId": 2,
  }
  ];
  dialogRef: any;
  @ViewChild('note') note!: ElementRef;
  noteList!: FormArray;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private router: Router
    , private datePipe: DatePipe, public gpservice: GPService,
    public translate: TranslateService, private notificationService: ToastrService,
    private notesDialogRef: MatDialogRef<NotesViewComponent>,
    @Inject(MAT_DIALOG_DATA) public accountEntityId: any,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private gpService: GPService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.recordId = this.accountEntityId;

    this.getNotesListByAccountEntityId(this.accountEntityId);

  }

  getNotesListByAccountEntityId(accountEntityId: any) {
    this.gpService.get(`note/${accountEntityId}`).subscribe(res => {
      this.notesDetails = res;
      let notesDetailsList: any = [];
      this.sortData.forEach((e: any) => {
        const notesDetail = {
          dataRecord: e.dataRecord,
          createDatetime: this.datePipe.transform(e.createDatetime, 'MMM d, y, h:mm a'),
          createUserId: `${e.firstName}, ${e.lastName}`
        }
        notesDetailsList.push(notesDetail);
        this.notesDetails = notesDetailsList;
      });
      this.dataSource = new MatTableDataSource<any>(this.notesDetails);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    })
  }

  get sortData() {
    return this.notesDetails.sort((a: any, b: any) => {
      return <any>new Date(b.createDatetime) - <any>new Date(a.createDatetime);
    });
  }


  closeDialog() {
    this.notesDialogRef.close();
  }


}
