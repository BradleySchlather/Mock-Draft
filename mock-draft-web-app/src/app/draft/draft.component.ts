import { Component } from '@angular/core';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrl: './draft.component.scss'
})
export class DraftComponent {
  public players = ['', 'Marvin Harrison Jr', 'Caleb Williams', 'Olumuyiwa', 'Brock Bowers', 'Joe Alt', 'Drake Maye', 'JC Latham',
    'Laiatu Latu', 'Jared Verse', 'Dallas Turner'];
  public positions = ['QB', 'RB', 'OL', 'C', 'TE', 'WR', 'DL', 'LB', 'DB'];
  public picks = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''];
  public draftOrder = ['Bears','Commanders','Patriots','Cardinals','Chargers','Giants','Titans','Falcons',
  'Bears','Jets','Vikings','Broncos','Raiders','Saints','Colts','Seahawks','Jaguars','Bengals', 'Rams',
  'Steelers','Dolphins','Eagles','Texans','Cowboys','Packers','Buccaneers','Cardinals','Bills','Lions',
  'Ravens','49ers','Chiefs'];

  onSave(): void{
    //Will use proc to set picks for user in database. proc will be called from.NET backend. When onSave() is called, picks will be sent to database for that user.
    //Need to create a player model and player data that I can use for the entire app
  }
}
