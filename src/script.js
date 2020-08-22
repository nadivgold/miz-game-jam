import { explode } from "./explode.js";
import { gameDirector } from "./gameMaster.js";
import { knobs } from "./knobs.js";
import { handleControls } from "./controls/controls.js";
import { handleAi } from "./enemyAi.js";
import { pauseToggle } from "./controls/pause.js";          
import { createGui, createLogger } from './gui.js';

var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
var createScene = function () {

    // Scene
    var scene = new BABYLON.Scene(engine);
    scene.enablePhysics();
    // Physics engine
    // var physicsViewer = new BABYLON.Debug.PhysicsViewer();
    var physicsHelper = new BABYLON.PhysicsHelper(scene);
    // Camera
    var camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 0, 0), scene);
    camera.radius = 25;
    camera.heightOffset = 35;
    camera.attachControl(canvas, true);
    camera.inputs.clear();
    // Lightning
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    // Ground
    var ground = BABYLON.Mesh.CreateGround("ground1", knobs.worldSize.worldx, knobs.worldSize.worldz, 2, scene);
    var groundMaterial = new BABYLON.BackgroundMaterial("groundMat", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/groundTexure.png", scene);
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = groundMaterial;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);
    
    
    var platformColumn = BABYLON.Mesh.CreateBox("column", 100, scene);
    platformColumn.position.y = -49.99;

    // GUI
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const healthGui = createGui(advancedTexture, "200vw");
    const scoreGui = createGui(advancedTexture, "-200vw");
    let powerUpLog = createLogger(advancedTexture);

    var healthLabel = new BABYLON.GUI.TextBlock();
    healthLabel.text = String("Health: " + knobs.health);
    healthGui.addControl(healthLabel)

    var scoreLabel = new BABYLON.GUI.TextBlock();
    scoreLabel.text = String("Score: " + knobs.score);
    scoreGui.addControl(scoreLabel);


    // create player
    var player = BABYLON.Mesh.CreateBox("player", 1, scene);
    player.material = new BABYLON.StandardMaterial("Test", scene); //Testing
    player.position.y = 0.51;
    player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1000, restitution: 1 }, scene)    
    camera.lockedTarget = player;
    camera.sensibility = 0;
    

    
    var inputMap ={};
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    
    // Boxes
    setTimeout(() => {
        // player.rotation = new BABYLON.Vector3(0, 0, 0);
        knobs.gameStartTime = Math.floor((new Date().getTime() / 1000));
        knobs.state = "play"; 
    }, 5000)
    

    scene.onBeforeRenderObservable.add(()=>{ 
        var deltaTime = engine.getDeltaTime();
        var currTime = Math.floor((new Date().getTime() / 1000));
        pauseToggle(inputMap);
        scoreLabel.text = String("Score: " + knobs.score);
        knobs.difficulty = (Math.floor(knobs.score/5) + 1); // changes the number that spawn
        if (knobs.state === "play") {
            handleControls(player, inputMap, deltaTime, explode, physicsHelper, scene)
            knobs.ents.entArr.forEach(box => (handleAi(box, player, deltaTime, scene, ground)));
            knobs.ents.entArr.forEach(box =>   {
                if (player.intersectsMesh(box, true)) {
                    if(!knobs.invulnerable){
                        knobs.health -= 1;
                        knobs.invulnerable = true;
                        healthLabel.text = String("Health: " + knobs.health);
                        setTimeout(() => { knobs.invulnerable = false }, knobs.iframe);
                    }
                // console.log("collision, invin: ", knobs.invulnerable)
            } else {
            }
        });
            knobs.ents.powerUpArr.forEach(powerUp =>   {
                if (player.intersectsMesh(powerUp, true) && !knobs.ents.removedEnts.includes(powerUp.name)) {
                    if(!knobs.gotPickup){
                        if (powerUp.name.includes("radius")){
                            powerUpLog.text = "Explosion Size Up!";
                            knobs.explosion.radius++;
                        } else if (powerUp.name.includes("strength")){
                            powerUpLog.text = "Explosion Strength Up!";
                            knobs.explosion.strength++;
                        }
                        console.log("powerUp roataion ",  powerUp.rotation.z = 0, " ",
                        powerUp.rotation.x = 0, " ",
                        powerUp.rotation.y = 0
                        )
                        knobs.gotPickup = true;
                        knobs.ents.removedEnts.push(powerUp.name)
                        scene.removeMesh(powerUp);
                        powerUp.dispose();
                        powerUp = null;
                        setTimeout(() => { knobs.gotPickup = false; powerUpLog.text=""; }, knobs.iframe);
                    }
                //console.log("collision, invin: ", knobs.invulnerable)
            } else {
            }
        });
            gameDirector(currTime, 5, scene);
        }   
    })


    return scene;

};




var engine;
try {
engine = createDefaultEngine();
} catch(e) {
console.log("the available createEngine function failed. Creating the default engine instead");
engine = createDefaultEngine();
}
    if (!engine) throw 'engine should not be null.';
    scene = createScene();;
    sceneToRender = scene

    engine.runRenderLoop(function () {
        if (sceneToRender) {
            sceneToRender.render();
        }
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });