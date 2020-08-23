import {knobs} from "./knobs.js"

function createGui(advancedTexture, position ){
        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = 0.2;
        rect1.height = "40px";
        rect1.cornerRadius = 20;
        rect1.color = "gray";
        rect1.thickness = 4;
        // rect1.background = "white";
        advancedTexture.addControl(rect1);    
        rect1.top = "5px";
        rect1.left = position;
        rect1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        return rect1;
}

function createLogger(advancedTexture){
    var text1 = new BABYLON.GUI.TextBlock();
    text1.text = "";
    text1.color = "black";
    text1.fontSize = 24;
    text1.top = "200vh";
    advancedTexture.addControl(text1);
    return text1;
}

export { createGui, createLogger }