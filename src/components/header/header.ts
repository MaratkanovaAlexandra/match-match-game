import { Const } from "./../const";
import { Game } from "../game/game";
import { Player } from "./../Player";
import { Registration } from "./../registration/registration";

import { createAndAppendHtmlElement } from "../../add-element-function";

const typesCards = {
  animals: "animals",
  web_design: "web-design"
};

export class Header {
  private _header: HTMLElement;
  private _register_button: HTMLElement;
  private _about_game: HTMLElement;
  private _top_score: HTMLElement;
  player:Player;
  private _game_button: HTMLElement;
  private _stop_button: HTMLElement;
  private _items: HTMLElement;
  constructor() {
  }
  
  public init() {
    this.createHeader();
    this.createIcon();
    this.createNav();
    this.createButtons();
  }

  private createHeader() {
    this._header = document.createElement("header");
    this._header.classList.add("header");

    this._items = createAndAppendHtmlElement(this._header,"div","header__wrapper");
  }
  private createIcon() {
    const LOGO = createAndAppendHtmlElement(this._items, "div","header__logo");
    createAndAppendHtmlElement(LOGO,"div","header__logo-item1", Const.match);
    createAndAppendHtmlElement(LOGO,"div","header__logo-item2", Const.match);
  }
  private createNav() {
    const NAV = createAndAppendHtmlElement(this._items, "nav", "header__nav");
    this._about_game = createAndAppendHtmlElement(NAV, "div", "header__nav_item");
    createAndAppendHtmlElement(this._about_game, "div", "header__nav_item-about-game");
    createAndAppendHtmlElement(this._about_game, "div", "header__nav_item-text", Const.aboutGame);
    this._about_game.classList.add("nav-active");

    this._top_score= createAndAppendHtmlElement(NAV, "div", "header__nav_item");
    createAndAppendHtmlElement(this._top_score, "div", "header__nav_item-top-score");
    createAndAppendHtmlElement(this._top_score, "div", "header__nav_item-text", Const.topScore);

    this._about_game = createAndAppendHtmlElement(NAV, "div", "header__nav_item");
    createAndAppendHtmlElement(this._about_game, "div", "header__nav_item-settings");
    createAndAppendHtmlElement(this._about_game, "div", "header__nav_item-text", Const.settings);
  }
  private createButtons() {
    this._game_button =createAndAppendHtmlElement(this._items, "button", "header__button", Const.startButton);
    this._stop_button =createAndAppendHtmlElement(this._items, "button", "header__button", Const.stopButton);
    this._game_button.id = "game_button";
    this._stop_button.id = "stop_button";
    this._register_button =createAndAppendHtmlElement(this._items, "button", "header__button", Const.regButton);

    this._register_button.addEventListener("click",() => this.drawPlayer());
    this._game_button.addEventListener("click",() => this.drawGame());
  }


  get header():HTMLElement {
    return this._header;
  }
  get items():HTMLElement {
    return this._items;
  }
  get gameButton():HTMLElement {
    return this._game_button;
  }
  set gameButton(value:HTMLElement) {
    this._game_button = value;
  }
  get stopButton():HTMLElement {
    return this._stop_button;
  }
  set stopButton(value:HTMLElement) {
    this._stop_button = value;
  }
  get regButton():HTMLElement {
    return this._register_button;
  }
 

  drawPlayer():void {
    const REGISTRATION = new Registration(this);
    REGISTRATION.init();
    document.body.appendChild(REGISTRATION.pop_up);
  }
  
  private drawGame() {
    this._game_button.style.display = "none";
    this._stop_button.style.display = "block";
    this._header.parentElement.removeChild(this._header.parentElement.lastChild);
    const GAME = new Game(this, 4, typesCards.web_design);
    this._header.parentElement.appendChild(GAME.game);
  }
}
