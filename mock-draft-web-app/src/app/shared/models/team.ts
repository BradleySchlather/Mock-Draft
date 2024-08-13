import { pick } from "./pick";

export class Team {
    name!: string;
    image!: string;
    draftPicks!: pick[];
}