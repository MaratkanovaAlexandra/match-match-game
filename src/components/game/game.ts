import "./game.scss";
import { Card } from "../card/card" 

const createAndAppendHtmlElement = require( "../../add-element-function");

export class Game {
    game: HTMLElement;
    private _time = {
        minute: 0,
        seconds: 0
    };
    private _score:number =  0;
    private _moves:number = 0;
    private _wrong_moves:number = 0;
    private _you_win:boolean = false;
    private _width_game: number;
    private _height_game: number;
    private _arr_cards: Card[] = [];
    card1: Card;
    card2: Card;
    private _difficulty: number;
    private _stop:boolean = false;
    private _arr_use_imgs: number[] = [];
    
    constructor(difficulty:number) {
        this._difficulty = difficulty;
        this._width_game = this._difficulty;

        if (this._difficulty % 2 !== 0) this._height_game = this._difficulty + 1;
        else this._height_game = this._difficulty;
        
        this.game = document.createElement("div");
        this.game.classList.add("game");

        const timerHTML = createAndAppendHtmlElement(this.game, "div", "game__timer");
        timerHTML.classList.add("timer");
        const timer_wrapper = createAndAppendHtmlElement(timerHTML, "div", "timer__wrapper");
        timer_wrapper.innerText = "00:00";

        for(let j = 0; j < this._height_game * (this._width_game / 2); j++) {
            this.createPairCards();
        }
        this._arr_cards = this.mixArrCards(this._arr_cards, 5);
        const game_wrapper = createAndAppendHtmlElement(this.game, "div", "game__wrapper");
        this.drawCards(game_wrapper);

        // Start Game
        setTimeout(() => {
            this.runTimer( timer_wrapper, new Date() )
            this._arr_cards.map( (card:Card) => {
                card.cardDeactivat();
                card.card.addEventListener("click", () => {
                    if(!card.card.classList.contains("correctly")){
                        if(this.card1 === undefined)  this.card1 = card;
                        else if(this.card2 === undefined){
                            this.card2 = card;
                            this.checkCards();
    
                        } 
                        card.cardActive();
                    }
                })
            })
        }, 10000);
    }
    checkCards() {
        this._moves++;
        if(this.card1.getId === this.card2.getId){
            this.card1.cardCorrectly();
            this.card2.cardCorrectly();
        } else {
            this._wrong_moves++;
            this.card1.cardError();
            this.card2.cardError();
            const card1 = this.card1;
            const card2 = this.card2
            setTimeout(()=>{
                card1.cardDeactivat();
                card2.cardDeactivat();

            }, 1500);
        }
        this.card1 = undefined;
        this.card2 = undefined
    }

    runTimer(timerHTML:HTMLElement, time_start:Date) {
        setInterval(() => {
            if(!this._stop){
                const now_time = new Date();
                const def_time = Math.floor( (now_time.getTime() - time_start.getTime()) / 1000 )
                
                this._time.minute = Math.floor( def_time / 60 ) ;
                this._time.seconds = def_time % 60;

                const str_time_minute = String( this._time.minute ).length === 2 ? 
                    String( this._time.minute ) : String( "0" + this._time.minute );
                const str_time_seconds = String( this._time.seconds ).length === 2 ? 
                    String( this._time.seconds ) : String( "0" + this._time.seconds )

                timerHTML.innerHTML = `${ str_time_minute }:${ str_time_seconds } `
            }
        }, 1000)
    }

    mixArrCards(array:Card[], countMix:number){
        for(let c = 0; c < countMix; c++){
            for (let i = (array.length - 1); i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        return array;
    }

    getRandomArbitrary(min:number, max:number) {
        let random = Math.floor(Math.random() * (max - min) + min);
        if(this._arr_use_imgs.indexOf(random) === -1) {
            this._arr_use_imgs.push(random);
        } else {
            random = this.getRandomArbitrary(min, max);
        }
        return random;
    }

    createPairCards() {
        const random_img_number = this.getRandomArbitrary(1, 51);
        const card1 = new Card(random_img_number, random_img_number);
        const card2 = new Card(random_img_number, random_img_number);

        card1.cardActive();
        card2.cardActive();

        this._arr_cards.push(card1);
        this._arr_cards.push(card2);
    }

    drawCards(parent:HTMLElement) {
        let game_row = createAndAppendHtmlElement(parent, "div", "game__row");
        for (let i = 0; i < this._arr_cards.length; i++) {
            game_row.appendChild(this._arr_cards[i].card)
            if ( (i + 1) % this._width_game === 0 ) {
                game_row = createAndAppendHtmlElement(parent, "div", "game__row");
            }  
        }
    }
}
