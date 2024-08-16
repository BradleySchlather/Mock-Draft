import { Component, OnInit } from '@angular/core';
import { Player } from '../shared/models/player';
import { ApiService } from '../shared/services/api.service';
import { Team } from '../shared/models/team';
import { pick } from '../shared/models/pick';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrl: './draft.component.scss'
})
export class DraftComponent implements OnInit {
  // public players = ['', 'Marvin Harrison Jr', 'Caleb Williams', 'Olumuyiwa', 'Brock Bowers', 'Joe Alt', 'Drake Maye', 'JC Latham',
  //   'Laiatu Latu', 'Jared Verse', 'Dallas Turner'];
  // public draftOrder = ['Bears','Commanders','Patriots','Cardinals','Chargers','Giants','Titans','Falcons',
  // 'Bears','Jets','Vikings','Broncos','Raiders','Saints','Colts','Seahawks','Jaguars','Bengals', 'Rams',
  // 'Steelers','Dolphins','Eagles','Texans','Cowboys','Packers','Buccaneers','Cardinals','Bills','Lions',
  // 'Ravens','49ers','Chiefs'];
  // public imageArr = [
  // `../../assets/${this.draftOrder[0]}Logo.gif`, `../../assets/${this.draftOrder[1]}Logo.gif`, `../../assets/${this.draftOrder[2]}Logo.gif`, `../../assets/${this.draftOrder[3]}Logo.gif`, `../../assets/${this.draftOrder[4]}Logo.gif`,
  // `../../assets/${this.draftOrder[5]}Logo.gif`, `../../assets/${this.draftOrder[6]}Logo.gif`, `../../assets/${this.draftOrder[7]}Logo.gif`, `../../assets/${this.draftOrder[8]}Logo.gif`, `../../assets/${this.draftOrder[9]}Logo.gif`,
  // `../../assets/${this.draftOrder[10]}Logo.gif`,`../../assets/${this.draftOrder[11]}Logo.gif`,`../../assets/${this.draftOrder[12]}Logo.gif`,`../../assets/${this.draftOrder[13]}Logo.gif`,`../../assets/${this.draftOrder[14]}Logo.gif`,
  // `../../assets/${this.draftOrder[15]}Logo.gif`,`../../assets/${this.draftOrder[16]}Logo.gif`,`../../assets/${this.draftOrder[17]}Logo.gif`,`../../assets/${this.draftOrder[18]}Logo.gif`,`../../assets/${this.draftOrder[19]}Logo.gif`,
  // `../../assets/${this.draftOrder[20]}Logo.gif`,`../../assets/${this.draftOrder[21]}Logo.gif`,`../../assets/${this.draftOrder[22]}Logo.gif`,`../../assets/${this.draftOrder[23]}Logo.gif`,`../../assets/${this.draftOrder[24]}Logo.gif`,
  // `../../assets/${this.draftOrder[25]}Logo.gif`,`../../assets/${this.draftOrder[26]}Logo.gif`,`../../assets/${this.draftOrder[27]}Logo.gif`,`../../assets/${this.draftOrder[28]}Logo.gif`,`../../assets/${this.draftOrder[29]}Logo.gif`,
  // `../../assets/${this.draftOrder[30]}Logo.gif`,`../../assets/${this.draftOrder[31]}Logo.gif`,`../../assets/${this.draftOrder[32]}Logo.gif`
  // ];

  public positions = ['QB', 'RB', 'OL', 'C', 'TE', 'WR', 'DL', 'LB', 'DB'];
  public players: Player[] = [];
  public teams: Team[] = [];
  public draftOrder: string[] = [];
  public imageArr: string[] = [];
  public picks = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

  constructor(private apiService: ApiService) { }

  //To Do: Setup Trade Dialog

  ngOnInit(): void {
    //Will set all arrays here
    this.apiService.getPlayers().subscribe(data => {
      this.players = data;
    })
    this.apiService.getTeams().subscribe(data => {
      this.teams = data;
      let indexForPicks = 0
      this.teams.forEach(element => {
        element.pickNumbers.forEach(pickNumbersElement => {
          if (pickNumbersElement == indexForPicks) {
            this.draftOrder.push(element.name);
            this.imageArr.push(`../../assets/${element.name}Logo.gif`);
          }
          indexForPicks++;
        })
      });
    })
  }

  public onSave(): void {
    //Will use proc to set picks for user in database. proc will be called from .NET backend. When onSave() is called, picks will be sent to database for that user
    //To Do: need to prevent player from being added twice when I call onSave()
  }
}
