import "./zeroing.scss";
import "./how_to_play.scss";


function createAndAppendHtmlElement(appendElement: HTMLElement, typeElement: string, classElement?: string,  value?: string) : HTMLElement {
    const element = document.createElement(typeElement);
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
        const howtoplay__wrapper = createAndAppendHtmlElement(this.howtoplay, "h3", "howtoplay__wrapper");
        const howtoplay__column1 = createAndAppendHtmlElement(howtoplay__wrapper, "div", "howtoplay__column");
        const howtoplay__step_fisrt = createAndAppendHtmlElement(howtoplay__column1, "div", "howtoplay__step-fisrt");
        createAndAppendHtmlElement(howtoplay__step_fisrt, "div", "step__number", "1");
        createAndAppendHtmlElement(howtoplay__step_fisrt, "div", "step__text", "Register new player in game");
        const howtoplay__step_second = createAndAppendHtmlElement(howtoplay__column1, "div", "howtoplay__step-second");
        createAndAppendHtmlElement(howtoplay__step_second, "div", "step__number", "2");
        createAndAppendHtmlElement(howtoplay__step_second, "div", "step__text", "Configure your game settings");
        const howtoplay__step_third = createAndAppendHtmlElement(howtoplay__column1, "div", "howtoplay__step-third");
        createAndAppendHtmlElement(howtoplay__step_third, "div", "step__number", "3");
        createAndAppendHtmlElement(howtoplay__step_third, "div", "step__text", "Start you new game! Remember card positions and match it before times up.");

        const howtoplay__column2 = createAndAppendHtmlElement(howtoplay__wrapper, "div", "howtoplay__column");
        const img1 = createAndAppendHtmlElement(howtoplay__column2, "div", "howtoplay__img-reg");
        const img2 = createAndAppendHtmlElement(howtoplay__column2, "div", "howtoplay__img-set");
        const img3 = createAndAppendHtmlElement(howtoplay__column2, "div", "howtoplay__img-game");
    }
}
