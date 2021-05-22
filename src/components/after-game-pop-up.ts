import { createAndAppendHtmlElement } from "../add-element-function";

import { Header } from "./header/header";
import { HowToPlay } from "./how_to_play/how_to_play";
import { Player } from "./Player";
       

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
        this.addToDB(this._header.player)
        document.body.removeChild(this._pop_up);
        document.body.firstChild.removeChild( document.body.firstChild.lastChild);
        const HOWTOPlAY = new HowToPlay();
        this._header.stopButton.style.display = "none";
        this._header.gameButton.style.display = "block";
        this._header.header.parentElement.appendChild(HOWTOPlAY.howtoplay);
    }

    private async addToDB(player:Player) {
        let request = indexedDB.open("score", 1);

        request.onupgradeneeded  = () => {
          const db = request.result;
          const res = db.createObjectStore("players",{keyPath: "score"});
          const authorIndex = res.createIndex("by_firstName", "firstName");
          
          res.put({firstName: "Nicci", lastName: "Troiani", email: "nicci@gmail.com", score: 456, image: ""});
          res.put({firstName: "Jane", lastName: "Doe", email: "jane.doe@gmail.com", score: 169,  image: ""});
          res.put({firstName: "Jones", lastName: "Dermot", email: "dermot@gamil.com", score: 211, image: ""});
          res.put({firstName: "George", lastName: "Fields", email: "jack@gmail.com", score: 358, image: ""});
        }
        
        request.onsuccess = function() {
            const db = request.result;
            const objectStore = db.transaction("players",'readwrite').objectStore("players");
            const names = objectStore.index("by_firstName")
            /* const res = objectStore.getAll();
            res.onsuccess = function() {
                console.log(res.result.reverse());
            };*/
            const r = names.get(player.firstName);
            r.onsuccess = () => {
                const res = r.result;
                if (res !== undefined && res.lastName === player.lastName && res.email === player.email
                    && res.image === player.image ) {
                        if (res.score > player.score) return;
                    objectStore.delete(res.score);
                }
                objectStore.put({firstName: player.firstName, 
                    lastName: player.lastName,
                    email: player.email, 
                    score: player.score,
                   image:  player.image});
            }
            
        }
        
        request.onerror = (err) => {
            console.log(err);
        }
        
    }
}