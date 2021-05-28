import { createAndAppendHtmlElement } from "../add-element-function";
import * as Const from "./const";

import { Player } from "./Player";

export class BestScore {
  private _wrapper: HTMLElement;

 

  public init():void {
    this.createWrapper();
    this.createHeader();
    this.getPlayers();
  }

  private createWrapper() {
    this._wrapper = document.createElement("div");
    this._wrapper.classList.add("bestScore__wrapper");
  }

  private createHeader() {
    createAndAppendHtmlElement(
      this._wrapper,
      "div",
      "bestScore__wrapper_header",
      Const.bestPlayers
    );
  }

  private getPlayers() {
    const request = indexedDB.open("score", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      const res = db.createObjectStore("players", { keyPath: "score" });
      res.createIndex("by_firstName", "firstName");
    };

    request.onsuccess = () => {
      const db = request.result;
      const objectStore = db.transaction("players").objectStore("players");
      const res = objectStore.getAll();
      res.onsuccess = () => {
        const result = res.result.reverse().slice(0, 10);
        if (result.length === 0) {
          createAndAppendHtmlElement(this._wrapper, "p", "player__no_player", Const.noPlayers);
        }
        result.forEach((item) => this.createPlayer(item));
      };
    };

    request.onerror = (err) => {
      console.log(err);
    };
  }

  private createPlayer(player: Player) {
    const ELEMENT = createAndAppendHtmlElement(
      this._wrapper,
      "div",
      "player_item"
    );

    const IMAGE = createAndAppendHtmlElement(ELEMENT, "div", "player_image");
    IMAGE.style.marginLeft = "0";
    if (player.image === "") {
      IMAGE.style.backgroundSize = "49px 49px";
    } else {
      IMAGE.style.backgroundImage = player.image;
    }

    const NAME = createAndAppendHtmlElement(ELEMENT, "div", "player_data");
    createAndAppendHtmlElement(
      NAME,
      "p",
      "player_data_name",
      `${player.firstName} ${player.lastName}`
    );
    createAndAppendHtmlElement(
      NAME,
      "p",
      "player_data_email",
      `${player.email}`
    );

    const SCORE = createAndAppendHtmlElement(ELEMENT, "div", "player_score");
    createAndAppendHtmlElement(SCORE, "p", "player_score-text", Const.score);
    createAndAppendHtmlElement(
      SCORE,
      "span",
      "player_score-number",
      `${player.score}`
    );
  }

  get bestScore() :HTMLElement {
    return this._wrapper;
  }
}
