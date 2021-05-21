import { createAndAppendHtmlElement } from "../add-element-function";

import { Header } from "./header/header";
import { HowToPlay } from "./how_to_play/how_to_play";
       

export class AfterGame {
    

    private _header:Header;
    private _pop_up:HTMLElement;
    private _submin_button: HTMLButtonElement;
    private _exit_button: HTMLButtonElement;

    constructor(header:Header) {
        this._header = header;

        this._pop_up = document.createElement("section");
        this._pop_up.classList.add("pop_up");

        const WINDOW= createAndAppendHtmlElement(this._pop_up, "div", "pop_up_window");

        const POP_UP_HEADER = createAndAppendHtmlElement(WINDOW, "div", "pop_up_window__header");
        createAndAppendHtmlElement(POP_UP_HEADER, "p", "pop_up_window__header-text", "You WIN!");

        const FORM = createAndAppendHtmlElement(WINDOW, "div", "pop_up_window__form");

        const FILDS = createAndAppendHtmlElement(FORM, "div", "pop_up_window__form_filds");
        const INPUTS = createAndAppendHtmlElement(FILDS, "div", "pop_up_window__form_filds_inputs");

        //draw buttons
        const BUTTONS = createAndAppendHtmlElement(FORM, "div","pop_up_window__form_buttons" );
        this._submin_button = createAndAppendHtmlElement(BUTTONS, "button","pop_up_window__form_button-blue","Add user");
        this._exit_button = createAndAppendHtmlElement(BUTTONS, "button","pop_up_window__form_button-light","cancel");

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
        document.body.removeChild(this._pop_up);
        document.body.firstChild.removeChild( document.body.firstChild.lastChild);
        const HOWTOPlAY = new HowToPlay();
        this._header.stopButton.style.display = "none";
        this._header.gameButton.style.display = "block";
        this._header.header.parentElement.appendChild(HOWTOPlAY.howtoplay);
    }

    private addToDB() {
        //db.createObjectStore(name);
    }
}