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

function addImage(advancedTexture, position, imagePath){
        var image = new BABYLON.GUI.Image("but", imagePath);
        image.width = 0.2;
        image.autoScale = true
        advancedTexture.addControl(image);    
        image.top = "20px";
        image.left = position;
        image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        return image;
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

function healthBar(advancedTexture){
    knobs.guiHearts.forEach((image)=>{image.dispose()});
    var position = 200;
    for(let i = 0; i < Math.floor(knobs.health/2); i++){
        let pos = String(position) + "vw";
        let img = addImage(advancedTexture, pos, "https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/full-heart.png")
        knobs.guiHearts.push(img);
        position += 20;
    }
    if(knobs.health % 2){
        let pos = String(position) + "vw";
        let img = addImage(advancedTexture, pos, "https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/half-heart.png")
        knobs.guiHearts.push(img);
        position += 20;
    }
}

export { createGui, createLogger, healthBar }