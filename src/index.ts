import "./styles/main.scss";
import { Header } from "./components/header/header";
import { HowToPlay } from "./components/how_to_play/how_to_play";


const ROOT = document.createElement("div");
ROOT.classList.add(".root");
document.body.appendChild(ROOT);

const HEADER = new Header();
HEADER.init();
const HOWTOPlAY = new HowToPlay();

ROOT.appendChild(HEADER.header);
ROOT.appendChild(HOWTOPlAY.howtoplay);