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
    private _width_game: number;
    private _height_game: number;
    private _pairCards: {
        card1: null,
        card2: null
    };
    private _difficulty: number;
    stop: false;
    
    constructor(difficulty:number) {
        this._difficulty = difficulty;
        this._height_game = this._difficulty;
        if (this._difficulty % 2 !== 0) this._width_game = this._difficulty + 1;
        else this._width_game = this._difficulty;
        

        this.game = document.createElement("div");
        this.game.classList.add("game");

        const timer = createAndAppendHtmlElement(this.game, "div", "game__timer");
        timer.classList.add("timer");
        const timer_wrapper = createAndAppendHtmlElement(timer, "div", "timer__wrapper");
        timer_wrapper.innerText = "00:00";


        const game_wrapper = createAndAppendHtmlElement(this.game, "div", "game__wrapper");
        let counter = 0;
        for(let i = 0; i < this._width_game; i++) {
            const game_row = createAndAppendHtmlElement(game_wrapper, "div", "game__row");
            for(let j = 0; j < this._height_game; j++) {
                const card = new Card(++counter, ++counter).card;
                game_row.appendChild(card);
            }
        }
    }
}
