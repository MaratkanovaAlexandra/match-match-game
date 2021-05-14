const createAndAppendHtmlElement =  require( "../../add-element-function");

function createInput(parent:HTMLElement, text:string):HTMLElement {
    const LABEL =  createAndAppendHtmlElement(parent, "label", "pop_up_window__form_filds_inputs-label");
    createAndAppendHtmlElement(LABEL, "h6", "pop_up_window__form_filds_inputs-text", text);
    const INPUT = createAndAppendHtmlElement(LABEL, "input", "pop_up_window__form_filds_inputs-input");
    INPUT.type = "text";
    return INPUT;
}

export class Registration {
    pop_up: HTMLElement;
    pop_up__window: HTMLElement;
    submin_button: HTMLElement;
    exit_button: HTMLElement;
    first_name: HTMLElement;
    last_name: HTMLElement;
    email: HTMLElement;
    image: any;
    image_input: any;
    constructor() {
        this.pop_up = document.createElement("section");
        this.pop_up.classList.add("pop_up");

        this.pop_up__window = createAndAppendHtmlElement(this.pop_up, "div", "pop_up_window");

        //draw pop-up header
        const POP_UP_HEADER = createAndAppendHtmlElement(this.pop_up__window, "div", "pop_up_window__header");
        createAndAppendHtmlElement(POP_UP_HEADER, "p", "pop_up_window__header-text", "Registr new Player");

        //draw form 
        const FORM = createAndAppendHtmlElement(this.pop_up__window, "form", "pop_up_window__form");

        const FILDS = createAndAppendHtmlElement(FORM, "div", "pop_up_window__form_filds");
        const INPUTS = createAndAppendHtmlElement(FILDS, "div", "pop_up_window__form_filds_inputs");

        //draw text inputs
        this.first_name = createInput(INPUTS,"First Name");
        this.last_name = createInput(INPUTS,"Last Name");
        this.email = createInput(INPUTS,"E-mail");

        //draw file input
        this.image = createAndAppendHtmlElement(FILDS, "label", "pop_up_window__form_filds-image");
        this.image_input = createAndAppendHtmlElement(this.image, "input", "pop_up_window__form_filds-file");
        this.image_input.id = "file_input;"
        this.image_input.type = "file";
        this.image.htmlFor = "file_input";

        //draw buttons
        const BUTTONS = createAndAppendHtmlElement(FORM, "div","pop_up_window__form_buttons" )
        this.submin_button = createAndAppendHtmlElement(BUTTONS, "button","pop_up_window__form_button-blue","Add user");
        this.exit_button = createAndAppendHtmlElement(BUTTONS, "button","pop_up_window__form_button-light","cancel");

        this.submin_button.addEventListener("click", this.submit)
        this.exit_button.addEventListener("click", this.clean)
    }

    submit() {
        
        return false;
    }

    clean() {
        return false;
    }
} 
