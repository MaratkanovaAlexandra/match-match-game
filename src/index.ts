import "./style.scss";
import "./components/header/header.ts"
import { Header } from "./components/header/header";
import { HowToPlay } from"./components/how_to_play/how_to_play";
import "./components/how_to_play/assets/image1.jpg";
import "./components/how_to_play/assets/image2.jpg";
import "./components/how_to_play/assets/image3.jpg";

const ROOT = document.querySelector(".root");
const HEADER = new Header();
const HOWTOPlAY = new HowToPlay();
ROOT.appendChild(HEADER.header);
ROOT.appendChild(HOWTOPlAY.howtoplay);