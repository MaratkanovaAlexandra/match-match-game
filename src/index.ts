import "./style.scss";
import "./components/header/header.ts";
import { Header } from "./components/header/header";
import { HowToPlay } from "./components/how_to_play/how_to_play";
import { Game } from  "./components/game/game";

const ROOT = document.querySelector(".root");
const HEADER = new Header();
const HOWTOPlAY = new HowToPlay();

const typesCards = {
    animals: "animals",
    web_design: "web-design"
}

const GAME = new Game(4, typesCards.web_design);



ROOT.appendChild(HEADER.header);
ROOT.appendChild(GAME.game);