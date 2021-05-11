import "./game.scss";
import { Card } from "../card/card" 


const createAndAppendHtmlElement = require( "../../add-element-function");

export class Game {
    game: HTMLElement;
    private _time: 0;
    private _score: 0;
    private _moves: 0;
    private _wrong_moves: 0;
    private _you_win: false;
    private _pairCards: {
        card1: null,
        card2: null
    };
    private _difficulty: number;
    stop: false;
    
    constructor(difficulty:number) {
        this._difficulty = difficulty;

        this.game = document.createElement("div");
        this.game.classList.add("game");

        let timer = createAndAppendHtmlElement(this.game, "div", "game__timer");

        let game_wrapper = createAndAppendHtmlElement(this.game, "div", "game__wrapper");

        for(let i = 0; i < this._difficulty; i++) {
            let game_row = createAndAppendHtmlElement(game_wrapper, "div", "game__row");
            for(let j = 0; j < this._difficulty; j++) {
                let card = new Card(`../../assets/game/animals/1.png`, 1).card;
                game_row.appendChild(card);
            }
        }
    }
}
