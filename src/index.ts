import "./style.scss";
import "./components/header/header.ts";
import { Header } from "./components/header/header";
const ROOT = document.querySelector(".root");
const HEADER = new Header();
ROOT.appendChild(HEADER.header);
