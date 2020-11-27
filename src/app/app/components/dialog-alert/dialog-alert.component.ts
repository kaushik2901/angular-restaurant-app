import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.css']
})
export class DialogAlertComponent implements OnInit {

  public dialogTitle: string;
  public dialogContent: string;
  public dialogButtonText: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dialogTitle = this.data.title;
    this.dialogContent = this.data.content;
    this.dialogButtonText = this.data.buttonText;
  }

}
