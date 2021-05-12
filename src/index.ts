import "./styles/main.scss";
const createAndAppendHtmlElement =  require( "./add-element-function");

import {Player} from "./components/Player";
import {Registration} from "./components/registration/registration";
import { Header } from "./components/header/header";
import { HowToPlay } from"./components/how_to_play/how_to_play";

const ROOT = document.querySelector(".root");
const HEADER = new Header();
const HOWTOPlAY = new HowToPlay();
const REGISTRATION = new Registration();
ROOT.appendChild(HEADER.header);
ROOT.appendChild(HOWTOPlAY.howtoplay);
document.body.appendChild(REGISTRATION.pop_up)