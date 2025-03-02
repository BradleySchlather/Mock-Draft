import { Component, computed, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from '../../models/player';
import { ApiService } from '../../services/api.service';
import { PlayerNotes } from '../../models/playerNotes';
import { UserService } from '../../services/user.service';

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
  public userId = computed(() => {
    return this.userService.userId();
  })
  
  constructor(private dialogRef: MatDialogRef<NotesComponent>, @Inject(MAT_DIALOG_DATA) public data: Player, private apiService: ApiService, private userService: UserService) { }

  ngOnInit() {
    this.player = this.data;
    this.title = `${this.player.playerName}`;
    this.note = this.player.note;
  }

  public close(): void {
    this.dialogRef.close(false);
  }

  public confirm(): void {
    this.dialogRef.close(this.note);
  }

  public saveNote(): void {
    // let id: number = this.userId();
    let note: PlayerNotes = {userId: this.userId(), playerId: this.player.playerId, note: this.note};
    this.apiService.setPlayerNotes(note).subscribe(data => {
      this.confirm();
    });
  }
}