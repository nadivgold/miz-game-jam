import {knobs} from "./knobs.js"

function gui(){
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    // var createRectangle1 = function() {
        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = 0.2;
        rect1.height = "40px";
        rect1.cornerRadius = 20;
        rect1.color = "Orange";
        rect1.thickness = 4;
        rect1.background = "green";
        advancedTexture.addControl(rect1);    
        rect1.top = "5px";
        rect1.left = "200vw";
        rect1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        // return rect1;
    // }
    // var createRectangle2 = function() {
        var rect2 = new BABYLON.GUI.Rectangle();
        rect2.width = 0.2;
        rect2.height = "40px";
        rect2.cornerRadius = 20;
        rect2.color = "Orange";
        rect2.thickness = 4;
        rect2.background = "green";
        advancedTexture.addControl(rect2);    
        rect2.top = "5px";
        rect2.left = "-200vw";
        rect2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        // return rect2;
    // }

    // var scoreGui = createRectangle1().verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    // var healthGui = createRectangle2().verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    var scoreLabel = new BABYLON.GUI.TextBlock();
    var sString = "Score: " + knobs.score;
    scoreLabel.text = sString;
    // scoreGui.addControl(scoreLabel);
    rect2.addControl(scoreLabel);

    var healthLabel = new BABYLON.GUI.TextBlock();
    sString = "Health: " + knobs.health;
    healthLabel.text = sString;
    // healthGui.addControl(healthLabel);
    rect1.addControl(healthLabel)
}

export { gui }