import "./styles/main.scss";
import { Header } from "./components/header/header";
import { HowToPlay } from"./components/how_to_play/how_to_play";

const ROOT = document.querySelector(".root");
const HEADER = new Header();
const HOWTOPlAY = new HowToPlay();
ROOT.appendChild(HEADER.header);
ROOT.appendChild(HOWTOPlAY.howtoplay);