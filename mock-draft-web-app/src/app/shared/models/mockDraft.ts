import { Player } from "./player";
import { Team } from "./team";
import { UserSelections } from "./userSelections";

export class MockDraft {
    players!: Player[];
    teams!: Team[];
    userSelections!: UserSelections;
}