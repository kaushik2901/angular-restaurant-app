import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '../app/components/dialog-alert/dialog-alert.component';

@Injectable({
  providedIn: 'any'
})
export class DialogServiceService {

  constructor(private dialog: MatDialog) { }

  openAlertDialog(
    title: string,
    content: string,
    buttonText: string,
  ) {
    this.dialog.open(DialogAlertComponent, {
      data: {
        title,
        content,
        buttonText,
      }
    })
  }
}
