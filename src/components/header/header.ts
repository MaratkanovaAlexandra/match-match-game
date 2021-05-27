import * as Const from "./../const";
import { Game } from "../game/game";
import { settings } from "./../game settings/settings"
import { Player } from "./../Player";
import { Registration } from "./../registration/registration";

import { createAndAppendHtmlElement } from "../../add-element-function";

const typesCards = {
  animals: "animals",
  web_design: "web-design"
};

export class Header {
  private _header: HTMLElement;
  private _nav:HTMLElement;
  private _items: HTMLElement;

  private _register_button: HTMLElement;
  private _about_game: HTMLElement;
  private _top_score: HTMLElement;

  player:Player;

  private _game_button: HTMLElement;
  private _stop_button: HTMLElement;
  private _settings: HTMLElement;

  private _game:Game;
  constructor() {
  }
  
  public init() {
    this.createHeader();
    this.createIcon();
    this.createNav();
    this.createButtons();
    this._header.addEventListener("click", () => {
      if(event.target === this._register_button)  this.drawPlayer();
      if(event.target === this._game_button) this.drawGame();
      if(event.target === this._stop_button) this.stopGame();
    })
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
    this._nav = createAndAppendHtmlElement(this._items, "nav", "header__nav");
    this._about_game = createAndAppendHtmlElement(this._nav, "div", "header__nav_item");
    createAndAppendHtmlElement(this._about_game, "div", "header__nav_item-about-game");
    createAndAppendHtmlElement(this._about_game, "div", "header__nav_item-text", Const.aboutGame);
    this._about_game.classList.add("nav-active");

    this._top_score= createAndAppendHtmlElement(this._nav, "div", "header__nav_item");
    createAndAppendHtmlElement(this._top_score, "div", "header__nav_item-top-score");
    createAndAppendHtmlElement(this._top_score, "div", "header__nav_item-text", Const.topScore);

    this._settings = createAndAppendHtmlElement(this._nav, "div", "header__nav_item");
    createAndAppendHtmlElement(this._settings, "div", "header__nav_item-settings");
    createAndAppendHtmlElement(this._settings, "div", "header__nav_item-text", Const.settings);
  }
  private createButtons() {
    this._game_button =createAndAppendHtmlElement(this._items, "button", "header__button", Const.startButton);
    this._stop_button =createAndAppendHtmlElement(this._items, "button", "header__button", Const.stopButton);
    this._game_button.id = "game_button";
    this._stop_button.id = "stop_button";
    this._register_button =createAndAppendHtmlElement(this._items, "button", "header__button", Const.regButton);
  }


  get header():HTMLElement {
    return this._header;
  }
  get items():HTMLElement {
    return this._items;
  }

  get aboutGame():HTMLElement {
    return this._about_game;
  }
  get topScore():HTMLElement {
    return this._top_score;
  }
  get settings():HTMLElement {
    return this._settings;
  }


  get gameButton():HTMLElement {
    return this._game_button;
  }
  get stopButton():HTMLElement {
    return this._stop_button;
  }
  get regButton():HTMLElement {
    return this._register_button;
  }

  removeActiveNav() {
    Array.from(this._nav.children).forEach(element => {
      element.classList.remove("nav-active");
  });
  }

  drawPlayer():void {
    const REGISTRATION = new Registration(this);
    REGISTRATION.init();
    document.body.appendChild(REGISTRATION.pop_up);
  }
  
  private drawGame() {
    this.removeActiveNav();
    this._game_button.style.display = "none";
    this._stop_button.style.display = "block";
    this._header.parentElement.removeChild(this._header.parentElement.lastChild);
    this._game= new Game(this, settings.difficulty[settings.activeItems.difficulty].value,
                               settings.typesCards[settings.activeItems.typesCards].value);
    this._header.parentElement.appendChild(this._game.game);
  }
  private stopGame() {
    if(this._stop_button.innerHTML === Const.stopButton) {
      this._game.gamePause();
      this._stop_button.innerHTML = Const.contButton;
      return;
    }
    this._game.gameStart();
    this._stop_button.innerHTML = Const.stopButton;
  }
}
