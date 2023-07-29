import { storedValue } from "../components/helper.js";
import { Branch } from "./afk.js";
class HeroPortrait {
    name;
    based;
    gclass;
    faction;
    skills;
    constructor(name, base, gameclass, race) {
        this.based = base;
        this.name = name;
        this.gclass = gameclass;
        this.faction = race;
    }
}
export class Team {
    heroes;
    pet;
    target;
    elderTree;
    _max;
    damage;
    constructor(p, t, ...team) {
        this._max = 5;
        this.pet = p;
        this.target = t;
        this.heroes = [];
        this.elderTree = new Map();
        for (const br in Branch) {
            if (storedValue(br)) {
                this.elderTree.set(br, parseInt(storedValue(br).toString()));
            }
        }
        if (team.length >= this._max) {
            throw Error("Only 5 team members max");
        }
        else {
            team.forEach((v, i) => {
                this.heroes.push([i, v]);
            });
        }
    }
    addToTeam(h) {
        if (this.heroes?.length < 5) {
            this.heroes.push([this.heroes.length, h]);
            return true;
        }
        else {
            console.log("Team is full!");
            return false;
        }
    }
    makeAttack(dmg, c) {
        if (this.damage === undefined) {
            this.damage = [];
        }
        this.damage.push([dmg, c]);
    }
    removeHero(h) {
        if (typeof h === "string") {
            const idx = this.heroes.findIndex((x) => x[1].name.includes(h) || x[1].short.includes(h));
            if (idx > -1) {
                this.heroes.splice(idx, 1);
            }
        }
        if (typeof h === "number") {
            this.heroes.splice(h, 1);
        }
        if (typeof h === "object") {
            const idx = this.heroes.findIndex((x) => x[1].name === h.name);
            if (idx > -1) {
                this.heroes.splice(idx, 1);
            }
        }
    }
    Heroes() {
        return this.heroes.map((x) => x[1]);
    }
    setElderTree(t, lvl) {
        this.elderTree.set(t, lvl);
        storedValue(t, lvl.toString());
    }
    TreeString() {
        return `MI:${this.elderTree.get("might")} | TA:${this.elderTree.get("tank")} | RA:${this.elderTree.get("ranger")} | SU:${this.elderTree.get("support")} | MA:${this.elderTree.get("mage")}`;
    }
}