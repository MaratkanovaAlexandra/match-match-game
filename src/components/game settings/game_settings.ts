import { createAndAppendHtmlElement } from "../../add-element-function";
import { settings } from "./settings";

export class GameSettings {
  init() : HTMLElement {
    const game_settings = document.createElement("div");
    game_settings.classList.add("game-settings");

    this.drawSettingTypesCards(game_settings);
    this.drawSettingDifficulty(game_settings);
    
    return game_settings;
  }
  private drawSettingTypesCards(game_settings:HTMLElement):void {
    const game_setting_cards_type = createAndAppendHtmlElement(
      game_settings,
      "div",
      "game-setting__cards-type"
    );
    const game_text_cards_type = createAndAppendHtmlElement(
      game_setting_cards_type,
      "div",
      "game-setting__text"
    );
    createAndAppendHtmlElement(
      game_text_cards_type,
      "div",
      "game-setting__title",
      "Game cards"
    );
    createAndAppendHtmlElement(
      game_text_cards_type,
      "div",
      "game-setting__detailed",
      "select game cards type"
    );
    const game_btn_type_cards = createAndAppendHtmlElement(
      game_setting_cards_type,
      "button",
      "game-setting__btn"
    );
    const game_setting_cards_type__list = createAndAppendHtmlElement(
      game_setting_cards_type,
      "ul",
      "cards-type__list"
    );
    for (let i = 0; i < settings.typesCards.length; i++) {
      const item = createAndAppendHtmlElement(
        game_setting_cards_type__list,
        "li",
        "cards-type__item",
        settings.typesCards[i].str
      );
      item.setAttribute("id", `${i}`);
      item.addEventListener("click", this.onClickItemTypesCards);
      if (settings.activeItems.typesCards === i) {
        item.classList.add("cards-type__item--active");
      }
    }
    game_btn_type_cards.onclick = this.onClickBtnTypeCards;
  }
  private drawSettingDifficulty(game_settings:HTMLElement):void {
    const game_setting_difficulty = createAndAppendHtmlElement(
      game_settings,
      "div",
      "game-setting__cards-type"
    );
    const game_text_difficulty = createAndAppendHtmlElement(
      game_setting_difficulty,
      "div",
      "game-setting__text"
    );
    createAndAppendHtmlElement(
      game_text_difficulty,
      "div",
      "game-setting__title",
      "Difficulty"
    );
    createAndAppendHtmlElement(
      game_text_difficulty,
      "div",
      "game-setting__detailed",
      "select game type"
    );
    const game_btn_difficulty = createAndAppendHtmlElement(
      game_setting_difficulty,
      "button",
      "game-setting__btn"
    );
    const game_setting_difficulty__list = createAndAppendHtmlElement(
      game_setting_difficulty,
      "ul",
      "cards-type__list"
    );
    for (let i = 0; i < settings.difficulty.length; i++) {
      const item = createAndAppendHtmlElement(
        game_setting_difficulty__list,
        "li",
        "cards-type__item",
        settings.difficulty[i].str
      );
      item.setAttribute("id", `${i}`);
      item.addEventListener("click", this.onClickItemDifficulty);
      if (settings.activeItems.difficulty === i) {
        item.classList.add("cards-type__item--active");
      }
    }
    game_btn_difficulty.addEventListener("click", this.onClickBtnDifficulty);
  }

  private onClickBtnTypeCards(event:MouseEvent) : void {
    const list = document.querySelectorAll(".cards-type__list");
    const target = event.target as HTMLElement;
    if (target.classList.contains("game-setting__btn--active")) {
      target.classList.remove("game-setting__btn--active");
      list[0].classList.remove("cards-type__list--active");
    } else {
      target.classList.add("game-setting__btn--active");
      list[0].classList.add("cards-type__list--active");
    }
  }
  private onClickBtnDifficulty(event:MouseEvent) {
    const list = document.querySelectorAll(".cards-type__list");
    const target = event.target as HTMLElement;
    if (target.classList.contains("game-setting__btn--active")) {
      target.classList.remove("game-setting__btn--active");
      list[1].classList.remove("cards-type__list--active");
    } else {
      target.classList.add("game-setting__btn--active");
      list[1].classList.add("cards-type__list--active");
    }
  }

  private onClickItemTypesCards(event:MouseEvent) {
    const lists = document.querySelectorAll(".cards-type__list");
    const target = event.target as HTMLElement;
    for (let i = 0; i < lists[0].children.length; i++) {
      const child = lists[0].children[i];
      if (child.classList.contains("cards-type__item--active")) {
        child.classList.remove("cards-type__item--active");
      }
    }
    target.classList.add("cards-type__item--active");
    settings.activeItems.typesCards = Number(target.id);
  }

  private onClickItemDifficulty(event:MouseEvent) {
    const lists = document.querySelectorAll(".cards-type__list");
    const target = event.target as HTMLElement;
    for (let i = 0; i < lists[1].children.length; i++) {
      const child = lists[1].children[i];
      if (child.classList.contains("cards-type__item--active")) {
        child.classList.remove("cards-type__item--active");
      }
    }
    target.classList.add("cards-type__item--active");
    settings.activeItems.difficulty = Number(target.id);
  }
}
