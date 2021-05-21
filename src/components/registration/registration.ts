import { createAndAppendHtmlElement } from "../../add-element-function";

import { Header } from "./../header/header";
import {Player} from "./../Player";

function createInput(parent:HTMLElement, text:string):HTMLInputElement {
    const LABEL =  createAndAppendHtmlElement(parent, "label", "pop_up_window__form_filds_inputs-label");
    createAndAppendHtmlElement(LABEL, "h6", "pop_up_window__form_filds_inputs-text", text);
    const INPUT = createAndAppendHtmlElement(LABEL, "input", "pop_up_window__form_filds_inputs-input");
    INPUT.type = "text";
    INPUT.maxLength = 30;
    return INPUT;
}

function showMistake(INPUT:HTMLInputElement, messege:string):HTMLElement {
    INPUT.parentElement.classList.add("invalid");
    const TOOLTIP = createAndAppendHtmlElement(INPUT.parentElement, "div", "tooltip", messege);
    return TOOLTIP;
}

export class Registration {
    private _pop_up: HTMLElement;
    private _pop_up__window: HTMLElement;
    private _submin_button: HTMLInputElement;
    private _exit_button: HTMLInputElement;
    private _first_name: HTMLInputElement;
    private _last_name: HTMLInputElement;
    private _email: HTMLInputElement;
    private _image: HTMLLabelElement;
    private _image_input: HTMLInputElement;
    private _fname_tooltip:HTMLElement = null;
    private _lname_tooltip:HTMLElement = null;
    private _email_tooltip:HTMLElement = null;
    private _player:Player;
    private _header: Header;
    constructor(header:Header) {
        this._header = header
        this._pop_up = document.createElement("section");
        this._pop_up.classList.add("pop_up");

        this._pop_up__window = createAndAppendHtmlElement(this._pop_up, "div", "pop_up_window");

        //draw pop-up header
        const POP_UP_HEADER = createAndAppendHtmlElement(this._pop_up__window, "div", "pop_up_window__header");
        createAndAppendHtmlElement(POP_UP_HEADER, "p", "pop_up_window__header-text", "Registr new Player");

        //draw form 
        const FORM = createAndAppendHtmlElement(this._pop_up__window, "form", "pop_up_window__form");

        const FILDS = createAndAppendHtmlElement(FORM, "div", "pop_up_window__form_filds");
        const INPUTS = createAndAppendHtmlElement(FILDS, "div", "pop_up_window__form_filds_inputs");

        //draw text inputs
        this._first_name = createInput(INPUTS,"First Name");
        this._last_name = createInput(INPUTS,"Last Name");
        this._email = createInput(INPUTS,"E-mail");

        //draw file input
        this._image = createAndAppendHtmlElement(FILDS, "label", "pop_up_window__form_filds-image");
        this._image_input = createAndAppendHtmlElement(this._image, "input", "pop_up_window__form_filds-file");
        this._image_input.id = "file_input";
        this._image_input.type = "file";
        this._image.htmlFor = "file_input";


        //draw buttons
        const BUTTONS = createAndAppendHtmlElement(FORM, "div","pop_up_window__form_buttons" );
        this._submin_button = createAndAppendHtmlElement(BUTTONS, "button","pop_up_window__form_button-blue","Add user");
        this._exit_button = createAndAppendHtmlElement(BUTTONS, "button","pop_up_window__form_button-light","cancel");
        this._submin_button.type = "button";
        this._exit_button.type = "button";

        //input events
        this._first_name.addEventListener("input",() => {
           this._fname_tooltip = this.validate_name_input(this._first_name,this._fname_tooltip);
        });

        this._last_name.addEventListener("input",() => {
            this._lname_tooltip = this.validate_name_input(this._last_name,this._lname_tooltip);
        });

        this._email.addEventListener("input",() => this.validate_email_input());
        this._image_input.addEventListener("input",() => this.imageLoad());       

        this._submin_button.addEventListener("click", () => {
            if(!this.complited()) return;
            this.submit();
            this.clean();
        });
        this._exit_button.addEventListener("click",() => this.clean());
    }

    get pop_up():HTMLElement {
        return this._pop_up;
    }

    private validate_name_input(INPUT:HTMLInputElement, tooltip:HTMLElement) {
        if(tooltip){
            INPUT.parentElement.removeChild(INPUT.parentElement.lastChild);
            tooltip = null;
        }
        INPUT.parentElement.classList.remove("invalid");
        if(INPUT.value === "") {
            tooltip = showMistake(INPUT,"name can not be empty");
            return tooltip;
        }
        if(/\d/.test(INPUT.value)){
            tooltip = showMistake(INPUT,"name can not contain digits");
            return tooltip;
        }
        if(!/^[a-zа-яA-ZА-Я ]+$/.test(INPUT.value)){
            tooltip = showMistake(INPUT,"name can not contain s.simbols");
            return tooltip;
        }
        INPUT.parentElement.classList.add("valid");
        return tooltip;
    }

    private validate_email_input(){
        if(this._email_tooltip){
            this._email.parentElement.removeChild(this._email.parentElement.lastChild);
            this._email_tooltip = null;
        }
        this._email.parentElement.classList.remove("invalid");
        if(this._email.value === "") {
            this._email_tooltip = showMistake(this._email,"email can not be empty");
            return this._email_tooltip;
        }
        if(!/^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-z]{2,6}$/.test(this._email.value)) {
            this._email_tooltip = showMistake(this._email,"it's not an email");
            return this._email_tooltip;
        }
        this._email.parentElement.classList.add("valid");
        return this._email_tooltip;
    }

    private imageLoad() {
        const image = this._image_input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this._image.style.backgroundImage = `url(${reader.result})`;
        };
        reader.readAsDataURL(image);
        this._image_input.value = "";
        this._image.style.backgroundSize = "auto 163px";
    }

    private complited():boolean {
        return /^[a-zа-яA-ZА-Я]+$/.test(this._first_name.value) &&
               /^[a-zа-яA-ZА_Я]+$/.test(this._last_name.value) &&
               /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-z]{2,6}$/.test(this._email.value);
    }

    private submit() {
        this._player = new Player(this._first_name.value,this._last_name.value,
            this._email.value,this._image.style.backgroundImage);
        this._header.player = this._player;
        
        this._header.items.removeChild(this._header.items.lastChild);
            
        if(this._header.stopButton.style.display !== "none"){
            this._header.stopButton.style.display = "none";  
        }
        
        this._header.gameButton.style.display = "block";
        const IMAGE = createAndAppendHtmlElement(this._header.items, "div", "header__image");
        if(this._player.image === "") {
            IMAGE.style.backgroundSize = "49px 49px";
            return;
         }
        IMAGE.style.backgroundImage = this._player.image;
    }

    private clean() {
        document.body.removeChild(this._pop_up);
    }
} 
