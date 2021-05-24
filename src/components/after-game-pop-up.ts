import { Const } from "./const";
import { createAndAppendHtmlElement } from "../add-element-function";

import { Header } from "./header/header";
import { BestScore } from "./best-score" 
import { Player } from "./Player";
       

export class AfterGame {
    private _header:Header;
    private _pop_up:HTMLElement;
    private _pop_up__window:HTMLElement;
    private _submin_button: HTMLButtonElement;
    private _exit_button: HTMLButtonElement;

    constructor(header:Header) {
        this._header = header;
    }

    public init() {
        this.createPopUp();
        this.createPopUpHeader();
        this.createForm();
    }

    private createPopUp(){
        this._pop_up = document.createElement("section");
        this._pop_up.classList.add("pop_up");

        this._pop_up__window = createAndAppendHtmlElement(this._pop_up, "div", "pop_up_window");
    }

    private createPopUpHeader() {
        const POP_UP_HEADER = createAndAppendHtmlElement(this._pop_up__window , "div", "pop_up_window__header");
        createAndAppendHtmlElement(POP_UP_HEADER, "p", "pop_up_window__header-text", Const.afterGameHead);
    }

    private createForm() {
        const FORM = createAndAppendHtmlElement(this._pop_up__window , "div", "pop_up_window__form");

        const FILDS = createAndAppendHtmlElement(FORM, "div", "pop_up_window__form_filds");
        const INPUTS = createAndAppendHtmlElement(FILDS, "div", "pop_up_window__form_filds_inputs");

        //draw buttons
        const BUTTONS = createAndAppendHtmlElement(FORM, "div","pop_up_window__form_buttons" );
        this._submin_button = createAndAppendHtmlElement(BUTTONS, "button","pop_up_window__form_button-blue",Const.afterGameAddPlayer);
        this._exit_button = createAndAppendHtmlElement(BUTTONS, "button","pop_up_window__form_button-light",Const.afterGameClose);

        this._submin_button.addEventListener("click", () => {
            this._header.drawPlayer();
            this.close();
        });
        this._exit_button.addEventListener("click", () => this.close());
    }

    get pop_up():HTMLElement {
        return this._pop_up;
    }

    private close() {
        this.addToDB(this._header.player);
        this._header.topScore.classList.add("nav-active")

        document.body.removeChild(this._pop_up);
        document.body.firstChild.removeChild( document.body.firstChild.lastChild);
        const BEST = new BestScore();
        BEST.init();

        this._header.stopButton.style.display = "none";
        this._header.gameButton.style.display = "block";

        this._header.header.parentElement.appendChild(BEST.bestScore);
    }

    private addToDB(player:Player) {
        let request = indexedDB.open("score", 1);

        request.onupgradeneeded  = () => {
          const db = request.result;
          const restonce = db.createObjectStore("players",{keyPath: "score"});
          const authorIndex = restonce.createIndex("by_firstName", "firstName");
        }
        
        request.onsuccess = function() {
            const db = request.result;
            const objectStore = db.transaction("players",'readwrite').objectStore("players");
            const names = objectStore.index("by_firstName")

            const result = names.get(player.firstName);
            result.onsuccess = () => {
                const restonce = result.result;
                if (restonce !== undefined && restonce.lastName === player.lastName && restonce.email === player.email
                    && restonce.image === player.image ) {
                        if (restonce.score > player.score) return;
                    objectStore.delete(restonce.score);
                }
                objectStore.put(player);
            }
            
        }
        
        request.onerror = (err) => {
            console.log(err);
        }
        
    }
}