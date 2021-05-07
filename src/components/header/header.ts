import "./header.scss";
export class Header {
    header: HTMLElement;
    constructor() {
        this.header = document.createElement("header");
        this.header.classList.add("header");
    }
}