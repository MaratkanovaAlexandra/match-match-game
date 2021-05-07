import "./header.scss";
export class Header {
  header: HTMLElement;
  register_button: HTMLButtonElement;
  nav: HTMLElement;
  constructor() {
    this.header = document.createElement("header");
    this.header.classList.add("header");
    const LOGO = document.createElement("div");
    LOGO.classList.add("header__logo");
    const LOGO_ITEM1 =  document.createElement("div");
    const LOGO_ITEM2 =  document.createElement("div");
    LOGO_ITEM1.classList.add("header__logo-item1");
    LOGO_ITEM2.classList.add("header__logo-item2");
    LOGO_ITEM1.innerHTML = "match";
    LOGO_ITEM2.innerHTML = "match";
    LOGO.appendChild(LOGO_ITEM1);
    LOGO.appendChild(LOGO_ITEM2);

    this.register_button = document.createElement("button");
    this.register_button.classList.add("header__button");
    //this.nav = document.createElement("nav");
    //this.nav.classList.add("header__nav");

    this.header.appendChild(LOGO);   
    //this.header.appendChild(this.nav);
    this.header.appendChild(this.register_button);
 
  }
}
