import "./card.scss";
const createAndAppendHtmlElement = require( "../../add-element-function");

export class Card {
    card: HTMLElement;
    private _srcImgBack: any;
    private _id: number;
    constructor(srcImgBack:any, id:number) {
        this._srcImgBack = srcImgBack;
        this._id = id;
        this.card = document.createElement("div");
        this.card.classList.add("card");

        let cardBack = createAndAppendHtmlElement(this.card, "div", "card__back");
        cardBack.style.backgroundImage = `url(${require(`./../../assets/game/animals/${srcImgBack}.png`).default})`
        createAndAppendHtmlElement(this.card, "div", "card__front"); 
    }
    cardActive() {
        this.card.classList.add("active");
    }
    cardDeactivat() {
        this.card.classList.remove("active");
        this.card.classList.remove("error");
    }
    cardError(){
        this.card.classList.add("error");
    }
    cardCorrectly(){
        this.card.classList.add("correctly");
    }
 }