import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from '../../models/player';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {

  public title = '';
  public player!: Player;
  public userName = '';
  public note = '';

  constructor(
    private dialogRef: MatDialogRef<NotesComponent>, @Inject(MAT_DIALOG_DATA) public data: Player) { }

  ngOnInit() {
    this.player = this.data;
    this.title = `Notes for ${this.player.playerName}`;
  }

  public close(): void {
    this.dialogRef.close(false);
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }

  public saveNote(): void {
    //To Do: Save note logic
  }
}