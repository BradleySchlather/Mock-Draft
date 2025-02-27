import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-tips',
  templateUrl: './user-tips.component.html',
  styleUrl: './user-tips.component.scss'
})
export class UserTipsComponent {

constructor(private dialogRef: MatDialogRef<UserTipsComponent>, @Inject(MAT_DIALOG_DATA) 
public data: {title: string, message: string}){}

  public close(): void {
    this.dialogRef.close();
  }
}
