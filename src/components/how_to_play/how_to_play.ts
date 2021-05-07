import "./zeroing.scss";
import "./how_to_play.scss";

function createAndAppendHtmlElement(appendElement: HTMLElement, typeElement: string, classElement?: string,  value?: string) : HTMLElement {
    let element = document.createElement(typeElement);
    if (typeof classElement !== 'undefined') element.classList.add(classElement);
    if (typeof value !== 'undefined')  element.innerText = value;
    appendElement.appendChild(element);
    return element;
}

export class HowToPlay {
    howtoplay: HTMLElement;
    constructor() {
        this.howtoplay = document.createElement("div");
        this.howtoplay.classList.add("wrapper");
        
        createAndAppendHtmlElement(this.howtoplay, "h3", "howtoplay__title", "How to play?");
        createAndAppendHtmlElement(this.howtoplay, "div", "howtoplay__column");
        createAndAppendHtmlElement(this.howtoplay, "div", "howtoplay__column");

        let howtoplay__step_first = document.createElement("div");
        howtoplay__step_first.classList.add("howtoplay__step-first");

        let step_first__number = document.createElement("div");
        step_first__number.classList.add("step_first__number");
        step_first__number.innerText = "1";
        
        let step_first__text =  document.createElement("div");
        step_first__text.classList.add("step_first__text");
        step_first__text.innerText = "Register new player in game";

        let howtoplay__step_second = document.createElement("div");
        howtoplay__step_second.classList.add("howtoplay__step-second");


        howtoplay__step_first.appendChild(step_first__number);
        howtoplay__step_first.appendChild(step_first__text);
///////////////////////////////////////////////////////////////     


    
    }
}
