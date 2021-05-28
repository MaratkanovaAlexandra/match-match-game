import { images } from "./constant";
import { settings } from "./../game settings/settings";

export const getImageByIdAndTypesCars = (id:number, typePickture:string):string => {
    if(typePickture === settings.typesCards[0].value){
        return `url(${images.animals[id - 1]})`;
    } 
    else if(typePickture === settings.typesCards[1].value){
        return `url(${images.web_design[id - 1]})`;
    }

};