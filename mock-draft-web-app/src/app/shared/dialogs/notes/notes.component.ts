import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from '../../models/player';
import { ApiService } from '../../services/api.service';
import { PlayerNotes } from '../../models/playerNotes';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {

  public title = '';
  public player!: Player;
  public username = '';
  public note = '';
  public userId!: number;

  constructor(
    private dialogRef: MatDialogRef<NotesComponent>, @Inject(MAT_DIALOG_DATA) public data: Player, private apiService: ApiService) { }

  ngOnInit() {
    this.player = this.data;
    this.title = `${this.player.playerName}`;
    //To Do: Get user id from service instead of hard coding to 1
    this.userId = 1;
    this.note = this.player.note;
  }

  public close(): void {
    this.dialogRef.close(false);
  }

  public confirm(): void {
    this.dialogRef.close(this.note);
  }

  public saveNote(): void {
    let note: PlayerNotes = {userId: this.userId, playerId: this.player.playerId, note: this.note};
    this.apiService.setPlayerNotes(note).subscribe(data => {
      this.confirm();
    });
  }
}