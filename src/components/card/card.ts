import "./card.scss";
const createAndAppendHtmlElement =  require( "../../add-element-function");

export class Card {
    card: HTMLElement;
    srcImgBack: string;
    srcImgFront: "";
    id: number;
    constructor(srcImgBack:string, id:number, srcImgFront?:string) {
        this.srcImgBack = srcImgBack;
        this.id = id;
        this.card = document.createElement("div");
        this.card.classList.add("card");

        let cardBack = createAndAppendHtmlElement(this.card, "div", "card__back");
        cardBack.style.backgroundImage = srcImgBack;
        
        let cardFront = createAndAppendHtmlElement(this.card, "div", "card__front"); 
        cardFront.style.backgroundImage = srcImgFront;

        this.card.addEventListener("click", this.cardOnClick);
    }
    cardOnClick(){
        this.card.classList.add("active");
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