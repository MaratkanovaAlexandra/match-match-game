import "./styles/main.scss";
const createAndAppendHtmlElement =  require( "./add-element-function");

import {Player} from "./components/Player";
import {Registration} from "./components/registration/registration";
import { Header } from "./components/header/header";
<<<<<<< HEAD
import { HowToPlay } from "./components/how_to_play/how_to_play";
import { Game } from  "./components/game/game";
=======
import { HowToPlay } from"./components/how_to_play/how_to_play";
>>>>>>> registration

const ROOT = document.querySelector(".root");
const HEADER = new Header();
const HOWTOPlAY = new HowToPlay();
<<<<<<< HEAD

const typesCards = {
    animals: "animals",
    web_design: "web-design"
}

const GAME = new Game(4, typesCards.web_design);



ROOT.appendChild(HEADER.header);
ROOT.appendChild(GAME.game);
=======
const REGISTRATION = new Registration();
ROOT.appendChild(HEADER.header);
ROOT.appendChild(HOWTOPlAY.howtoplay);
//document.body.appendChild(REGISTRATION.pop_up)
>>>>>>> registration
