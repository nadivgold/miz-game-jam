import {knobs} from "./knobs.js"

function createGui(advancedTexture, position ){
        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = 0.2;
        rect1.height = "40px";
        rect1.cornerRadius = 20;
        rect1.color = "Orange";
        rect1.thickness = 4;
        rect1.background = "green";
        advancedTexture.addControl(rect1);    
        rect1.top = "5px";
        rect1.left = position;
        rect1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        return rect1;
}
export { createGui }