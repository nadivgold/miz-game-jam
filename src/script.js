import { explode } from "./explode.js";
import { initBoxes } from "./initialize.js";
import { knobs } from "./knobs.js";
import { handleControls } from "./controls/controls.js";
import { handleAi } from "./enemyAi.js";
import { pauseToggle } from "./controls/pause.js";          
import { createGui } from './gui.js';

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
    var physicsViewer = new BABYLON.Debug.PhysicsViewer();
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
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);

    // GUI
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const healthGui = createGui(advancedTexture, "200vw");
    const scoreGui = createGui(advancedTexture, "-200vw");

    var healthLabel = new BABYLON.GUI.TextBlock();
    healthLabel.text = String("Health: " + knobs.health);
    healthGui.addControl(healthLabel)

    var scoreLabel = new BABYLON.GUI.TextBlock();
    scoreLabel.text = String("Score: " + knobs.score);
    scoreGui.addControl(scoreLabel);


    // create player
    var player = BABYLON.Mesh.CreateBox("player", 1, scene);
    player.material = new BABYLON.StandardMaterial("Test", scene); //Testing
    // player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 100, restitution: 1 }, scene)
    player.position.y = 0.5;
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
    const boxes = initBoxes(2, 20, -12, 30, 1, scene, physicsViewer);
    knobs.state = "play"; 

    scene.onBeforeRenderObservable.add(()=>{ 
        var deltaTime = engine.getDeltaTime();
        pauseToggle(inputMap);
        scoreLabel.text = String("Score: " + knobs.score);
        if (knobs.state === "play") {
            handleControls(player, inputMap, deltaTime, explode, physicsHelper, scene)
            boxes.forEach(box => (handleAi(box, player, deltaTime, scene)));
            boxes.forEach(box =>   {
                if (player.intersectsMesh(box, true)) {
                    if(!knobs.invulnerable){
                        knobs.health -= 1;
                        knobs.invulnerable = true;
                        healthLabel.text = String("Health: " + knobs.health);
                        setTimeout(() => { knobs.invulnerable = false }, knobs.iframe);
                    }
                console.log("collision, invin: ", knobs.invulnerable)
            } else {
            }
        })
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