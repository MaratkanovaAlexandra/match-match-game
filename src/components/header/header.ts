import { resolve } from "../../../webpack.config";
import {Player} from "./../Player";
import {Registration} from "./../registration/registration";

import { createAndAppendHtmlElement } from "../../add-element-function";

export class Header {
  private _header: HTMLElement;
  private _register_button: HTMLElement;
  private _about_game: HTMLElement;
  private _top_score: HTMLElement;
  private _player:Player;
  private _game_button: HTMLElement;
  private _items: HTMLElement;
  constructor() {
    this._header = document.createElement("header");
    this._header.classList.add("header");

    this._items = createAndAppendHtmlElement(this._header,"div","header__wrapper");

    const LOGO = createAndAppendHtmlElement(this._items, "div","header__logo");
    createAndAppendHtmlElement(LOGO,"div","header__logo-item1", "match");
    createAndAppendHtmlElement(LOGO,"div","header__logo-item2", "match");

    const NAV = createAndAppendHtmlElement(this._items, "nav", "header__nav");
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

    this._register_button =createAndAppendHtmlElement(this._items, "button", "header__button", "register new player");

    this._register_button.addEventListener("click",() => this.drawPlayer());
  }
  
  get header():HTMLElement {
    return this._header;
  }

  private drawPlayer() {
    const REGISTRATION = new Registration();
    document.body.appendChild(REGISTRATION.pop_up);
    
    REGISTRATION.button.onclick = () => {
      if(!REGISTRATION.comlite) return;
      this._player = REGISTRATION.player;
      const ITEMS = this._header.firstChild;
      ITEMS.removeChild(this._register_button);
      this._game_button = createAndAppendHtmlElement(this._items, "button", "header__button", "Start game");
      const IMAGE = createAndAppendHtmlElement(this._items, "div", "header__image");
      if(this._player.image === "") {
        IMAGE.style.backgroundSize = "49px 49px";
        return;
      }
      IMAGE.style.backgroundImage = this._player.image;
    }
  }
}
