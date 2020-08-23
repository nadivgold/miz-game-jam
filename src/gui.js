import {knobs} from "./knobs.js"

function createGui(advancedTexture, position ){
        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = 0.2;
        rect1.height = "30px";
        rect1.cornerRadius = 20;
        rect1.color = "#e6482e";
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

function openStartScreen(advancedTexture){
    knobs.startPageGui.forEach((elem) => {elem.dispose()});
    var backdrop =  new BABYLON.GUI.Image("back", "https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/backdrop.png");
    knobs.startPageGui.push(backdrop);
    backdrop.stretch = BABYLON.GUI.Image.STRETCH_FILL;
    advancedTexture.addControl(backdrop);
    var image = new BABYLON.GUI.Image("but", "https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/startScreen.png");
    knobs.startPageGui.push(image);
    image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    advancedTexture.addControl(image);    
    if(knobs.state === "ready"){
        var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "play");
        knobs.startPageGui.push(button1);
        button1.width = "150px"
        button1.height = "40px";
        button1.color = "#f4b41b";
        button1.top = "125vh";
        button1.left = "275vh";
        button1.fontSize = 30;
        button1.onPointerUpObservable.add(function() {
            knobs.startPageGui.forEach((elem) => {elem.dispose()});
            knobs.state = "play";
    });
    advancedTexture.addControl(button1); 
    } else {
        var text1 = new BABYLON.GUI.TextBlock();
        knobs.startPageGui.push(text1);
        text1.text = "loading";
        text1.color = "#f4b41b";
        text1.fontSize = 30;
        text1.top = "125vh";
        text1.left = "275vh"
        advancedTexture.addControl(text1);
    }
}

function openEndScreen(advancedTexture){
    var backdrop =  new BABYLON.GUI.Image("back", "https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/backdrop.png");
    backdrop.stretch = BABYLON.GUI.Image.STRETCH_FILL;
    advancedTexture.addControl(backdrop);
    var image = new BABYLON.GUI.Image("but", "https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/endScreen.png");
    image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    advancedTexture.addControl(image);   
    var text1 = new BABYLON.GUI.TextBlock();
    text1.text = "score: " + String(knobs.score);
    text1.color = "#f4b41b";
    text1.fontSize = 30;
    text1.top = "125vh";
    text1.left = "275vh";
    advancedTexture.addControl(text1); 
}

export { createGui, createLogger, healthBar, openStartScreen, openEndScreen }