import { createAndAppendHtmlElement } from "../../add-element-function";

export class Card {
    card: HTMLElement;
    private _srcImgBack: number;
    private _id: number;
    constructor(srcImgBack:number, id:number, typePickture:string) {
        this._srcImgBack = srcImgBack;
        this._id = id;
        this.card = document.createElement("div");
        this.card.classList.add("card");

        const cardBack = createAndAppendHtmlElement(this.card, "div", "card__back");
        cardBack.style.backgroundImage = `url(${require(`./../../assets/game/${typePickture}/${srcImgBack}.png`).default})`;
        createAndAppendHtmlElement(this.card, "div", "card__front"); 
    }
    
    public get getId() : number {
        return this._id;
    }
    
    cardActive() : void {
        this.card.classList.add("active");
    }
    cardDeactivat() : void {
        this.card.classList.remove("active");
        this.card.classList.remove("error");
    }
    cardError() : void{
        this.card.classList.add("error");
    }
    cardCorrectly() : void {
        this.card.classList.add("correctly");
    }
 }