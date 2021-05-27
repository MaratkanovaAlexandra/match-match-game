import { createAndAppendHtmlElement } from "../../add-element-function";

export class Card {
  card: HTMLElement;
  private _srcImgBack: number;
  private _id: number;
  constructor(
    srcImgBack: number,
    id: number,
    typePickture: string,
    count_cards: number
  ) {
    this._srcImgBack = srcImgBack;
    this._id = id;
    this.card = document.createElement("div");
    this.card.classList.add("card");
    this.card.style.width = `${1000 / count_cards - 24}px`;
    this.card.style.height = `${1000 / count_cards - 24}px`;

    const cardBack = createAndAppendHtmlElement(this.card, "div", "card__back");
    cardBack.style.backgroundImage = `url(${
      require(`./../../assets/game/${typePickture}/${srcImgBack}.png`).default
    })`;
    cardBack.style.backgroundSize = "cover";
    createAndAppendHtmlElement(this.card, "div", "card__front");
  }

  public get getId(): number {
    return this._id;
  }

  cardActive(): void {
    this.card.classList.add("active");
  }
  cardDeactivat(): void {
    this.card.classList.remove("active");
    this.card.classList.remove("error");
  }
  cardError(): void {
    this.card.classList.add("error");
  }
  cardCorrectly(): void {
    this.card.classList.add("correctly");
  }
}
