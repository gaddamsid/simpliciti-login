import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-ui-design',
  templateUrl: './ui-design.component.html',
  styleUrls: ['./ui-design.component.scss']
})
export class UIDesignComponent implements OnInit {
  constructor(private dialog: MatDialog) { }
  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any> | undefined;
  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  ngOnInit(): void {
  }

}
