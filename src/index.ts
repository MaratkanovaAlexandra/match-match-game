import "./styles/main.scss";
import { Header } from "./components/header/header";
import { HowToPlay } from "./components/how_to_play/how_to_play";
import { GameSettings } from "./components/game settings/game_settings"

const ROOT = document.querySelector(".root");
const HEADER = new Header();
HEADER.init();
const HOWTOPlAY = new HowToPlay();
const GAMESETTINGS = new GameSettings();


ROOT.appendChild(HEADER.header);
HEADER.init();
ROOT.appendChild(GAMESETTINGS.init());