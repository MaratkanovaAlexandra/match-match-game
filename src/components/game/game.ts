import { Card } from "../card/card";
import { AfterGame } from "../after-game-pop-up";
import { Header } from "./../header/header";

import { createAndAppendHtmlElement } from "../../add-element-function";

export class Game {
    game: HTMLElement;
    private _time = {
        minute: 0,
        seconds: 0
    };

    private _header:Header;

    private _width_game: number;
    private _height_game: number;

    private _difficulty: number;
    private _stop = false;

    private _countCorrectCards = 0;
    private _moves = 0;
    private _wrong_moves = 0;

    private timer_wrapper:HTMLElement;
    private game__wrapper:HTMLElement;

    private typeCard:string;
    private _arr_use_imgs: number[] = [];
    private _arr_cards: Card[] = [];
    private card1: Card;
    private card2: Card;
    
    constructor(header:Header, difficulty:number, typeCard:string) {
        this._header = header;

        this._difficulty = difficulty;
        this.typeCard = typeCard;
        this._width_game = this._difficulty;

        if (this._difficulty % 2 !== 0) this._height_game = this._difficulty + 1;
        else this._height_game = this._difficulty;
        
        this.game = document.createElement("div");
        this.game.classList.add("game");
        
        this.layoutTimer();
        this.layoutCards();

        // Start Game
        this.Game();
    }

    private layoutTimer() {
        const timerHTML = createAndAppendHtmlElement(this.game, "div", "game__timer");
        timerHTML.classList.add("timer");
        this.timer_wrapper = createAndAppendHtmlElement(timerHTML, "div", "timer__wrapper");
        this.timer_wrapper.innerText = "00:00";
    }
    // создаёт пары карт перемешивает их (сами карточки хранятся в this._arr_cards) и отрисовка их в браузере
    private layoutCards() {
        const countCards = this._height_game * (this._width_game / 2);
    
        for(let j = 0; j < countCards; j++)  this.createPairCards();
        this._arr_cards = this.mixArrCards(this._arr_cards, 5);

        this.game__wrapper = createAndAppendHtmlElement(this.game, "div", "game__wrapper");
        this.drawCards( this.game__wrapper );
    }

    private createPairCards() : void {
        const random_img_number = this.getRandomArbitrary(1, 51);
        const card1 = new Card(random_img_number, random_img_number, this.typeCard);
        const card2 = new Card(random_img_number, random_img_number, this.typeCard);

        card1.cardActive();
        card2.cardActive();

        this._arr_cards.push(card1);
        this._arr_cards.push(card2);
    }
    private drawCards(parent:HTMLElement) : void {
        console.log(this._width_game)
        let game_row = createAndAppendHtmlElement(parent, "div", "game__row");
        for (let i = 0; i < this._arr_cards.length; i++) {
            game_row.appendChild(this._arr_cards[i].card);
            if ( (i + 1) % this._width_game === 0 &&  i + 1 !== this._arr_cards.length) {
                console.log(i);
                game_row = createAndAppendHtmlElement(parent, "div", "game__row");
            }  
        }
    }
    private Game() : void {
        setTimeout(() => {
            this.card1 = undefined;
            this.card2 = undefined;
            this.runTimer( this.timer_wrapper, new Date() );
            this._arr_cards.map( (card:Card) => {
                card.cardDeactivat();
                card.card.addEventListener("click", () => this.onClickCard(card));
            });
        }, 10000);
    }
    private runTimer(timerHTML:HTMLElement, time_start:Date) : void {
        setInterval(() => {
            if(!this._stop){
                const now_time = new Date();
                const def_time = Math.floor( (now_time.getTime() - time_start.getTime()) / 1000 );
                
                this._time.minute = Math.floor( def_time / 60 ) ;
                this._time.seconds = def_time % 60;

                const str_time_minute = String( this._time.minute ).length === 2 ? 
                    String( this._time.minute ) : String( "0" + this._time.minute );
                const str_time_seconds = String( this._time.seconds ).length === 2 ? 
                    String( this._time.seconds ) : String( "0" + this._time.seconds );

                timerHTML.innerHTML = `${ str_time_minute }:${ str_time_seconds } `;
            }
        }, 1000);
    }
    private getRandomArbitrary(min:number, max:number) : number {
        let random = Math.floor(Math.random() * (max - min) + min);
        if(this._arr_use_imgs.indexOf(random) === -1) {
            this._arr_use_imgs.push(random);
        } else {
            random = this.getRandomArbitrary(min, max);
        }
        return random;
    }
    private mixArrCards(array:Card[], countMix:number) {
        for(let c = 0; c < countMix; c++){
            for (let i = (array.length - 1); i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        return array;
    }
    private onClickCard(card:Card) : void {
        if( !card.card.classList.contains("correctly")
         && !card.card.classList.contains("error")
         && !card.card.classList.contains("active") ){
            if(this.card1 === undefined)  this.card1 = card;
            else if(this.card2 === undefined){
                this.card2 = card;
                this.checkCards();
            } 
            card.cardActive();
        }
    }
    private checkCards() : void {
        this._moves++;
    
        if(this.card1.getId === this.card2.getId){
            this.card1.cardCorrectly();
            this.card2.cardCorrectly();
            this._countCorrectCards++;
            if(this._countCorrectCards === this._arr_cards.length / 2){
                this._stop = true;
                this.drawWindowWinner();
            }
        } else {
            this._wrong_moves++;
            this.card1.cardError();
            this.card2.cardError();
            const card1 = this.card1;
            const card2 = this.card2;
            setTimeout(()=>{
                card1.cardDeactivat();
                card2.cardDeactivat();
            }, 1500);
        }
        this.card1 = undefined;
        this.card2 = undefined;
    }
//// TODO ТУТ ПОЛНАЯ ХРЕНЬ ( пояснение: ибо ссылки быть не должно )
    private drawWindowWinner() : void {
        const window_winner = createAndAppendHtmlElement(this.game__wrapper, "div", "window_winner");
        const window_winner__window = createAndAppendHtmlElement(window_winner, "div", "window_winner__window");
        const text = `Congratulations! You successfully found all matches on ${this._time.minute }.${
            String( this._time.seconds ).length === 2 ? 
            String( this._time.seconds ) : String( "0" + this._time.seconds )
        }`;
        createAndAppendHtmlElement(window_winner__window, "div", "window_winner__text", text);
        const window_winner__btn = createAndAppendHtmlElement(window_winner__window, "div", "window_winner__btn","OK");
        this._header.player.score = this.score;

        window_winner__btn.addEventListener("click", () => { 
            document.body.removeChild(document.body.lastChild);
           const AFTERGAME = new AfterGame(this._header);
           AFTERGAME.init();
           document.body.appendChild(AFTERGAME.pop_up);
        });
    }

    public get score() : number {
        // (количество сравнений - количество ошибочных сравнений) * 100 - (время прошедшее с начала в секундах) * 10
        return  (this._moves - this._wrong_moves) * 100 - (this._time.minute * 60 + this._time.seconds) * 10;
    }
    public gamePause() : void {
        this._stop = true;
        this.game__wrapper.classList.add("game__wrapper--lock");
        
    }
    public gameStart() : void {
        this._stop = false;
        this.game__wrapper.classList.remove("game__wrapper--lock");
    }
}