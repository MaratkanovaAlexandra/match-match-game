import {Player} from "./../Player";
import {Registration} from "./../registration/registration";

const createAndAppendHtmlElement =  require( "../../add-element-function");

export class Header {
  private _header: HTMLElement;
  private _register_button: HTMLElement;
  private _about_game: HTMLElement;
  private _top_score: HTMLElement;
  constructor() {
    this._header = document.createElement("header");
    this._header.classList.add("header");

    const HEADER_TEMS = createAndAppendHtmlElement(this._header,"div","header__wrapper");

    const LOGO = createAndAppendHtmlElement(HEADER_TEMS, "div","header__logo");
    createAndAppendHtmlElement(LOGO,"div","header__logo-item1", "match");
    createAndAppendHtmlElement(LOGO,"div","header__logo-item2", "match");

    const NAV = createAndAppendHtmlElement(HEADER_TEMS, "nav", "header__nav");
    this._about_game = createAndAppendHtmlElement(NAV, "div", "header__nav_item");
    createAndAppendHtmlElement(this._about_game, "div", "header__nav_item-about-game");
    createAndAppendHtmlElement(this._about_game, "div", "header__nav_item-text", "About Game");
    this._about_game.classList.add("nav-active")

    this._top_score= createAndAppendHtmlElement(NAV, "div", "header__nav_item");
    createAndAppendHtmlElement(this._top_score, "div", "header__nav_item-top-score");
    createAndAppendHtmlElement(this._top_score, "div", "header__nav_item-text", "Best Score");

    this._about_game = createAndAppendHtmlElement(NAV, "div", "header__nav_item");
    createAndAppendHtmlElement(this._about_game, "div", "header__nav_item-settings");
    createAndAppendHtmlElement(this._about_game, "div", "header__nav_item-text", "Game Settings");

    this._register_button =createAndAppendHtmlElement(HEADER_TEMS, "button", "header__button", "register new player");
    this._register_button.addEventListener("click",() => {
      const REGISTRATION = new Registration();
      document.body.appendChild(REGISTRATION.pop_up);
    });
  }
  
  get header():HTMLElement {
    return this._header;
  }
}
