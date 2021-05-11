import "./card.scss";
const createAndAppendHtmlElement =  require( "../../add-element-function");

export class Card {
        card: HTMLElement;
    private _srcImgBack: string;
    private _srcImgFront: "../../assets/game/front_card.png";
    private _id: number;
    constructor(srcImgBack:string, id:number, srcImgFront?:any) {
        this._srcImgBack = srcImgBack;
        this._id = id;
        this.card = document.createElement("div");
        this.card.classList.add("card");
        if(typeof srcImgFront !== undefined) 
            this._srcImgFront = srcImgFront;

        let cardBack = createAndAppendHtmlElement(this.card, "div", "card__back");
        cardBack.style.backgroundImage = srcImgBack;
        
        let cardFront = createAndAppendHtmlElement(this.card, "div", "card__front"); 
        cardFront.style.backgroundImage = srcImgFront;

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