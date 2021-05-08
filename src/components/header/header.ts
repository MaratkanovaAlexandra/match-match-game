import "./header.scss";
const createAndAppendHtmlElement =  require( "../../add-element-function");

export class Header {
  header: HTMLElement;
  register_button: HTMLElement;
  about_game: HTMLElement;
  top_score: HTMLElement;
  constructor() {
    this.header = document.createElement("header");
    this.header.classList.add("header");

    const LOGO = createAndAppendHtmlElement(this.header,"div","header__logo");
    createAndAppendHtmlElement(LOGO,"div","header__logo-item1", "match");
    createAndAppendHtmlElement(LOGO,"div","header__logo-item2", "match");

    const NAV = createAndAppendHtmlElement(this.header, "nav", "header__nav");
    this.about_game = createAndAppendHtmlElement(NAV, "div", "header__nav_item");
    createAndAppendHtmlElement(this.about_game, "div", "header__nav_item-about-game");
    createAndAppendHtmlElement(this.about_game, "div", "header__nav_item-text", "About Game");
    this.about_game.classList.add("nav-active")

    this.top_score= createAndAppendHtmlElement(NAV, "div", "header__nav_item");
    createAndAppendHtmlElement(this.top_score, "div", "header__nav_item-top-score");
    createAndAppendHtmlElement(this.top_score, "div", "header__nav_item-text", "Best Score");

    this.about_game = createAndAppendHtmlElement(NAV, "div", "header__nav_item");
    createAndAppendHtmlElement(this.about_game, "div", "header__nav_item-settings");
    createAndAppendHtmlElement(this.about_game, "div", "header__nav_item-text", "Game Settings");

    this.register_button =createAndAppendHtmlElement(this.header, "button", "header__button", "register new player");
  }
}
