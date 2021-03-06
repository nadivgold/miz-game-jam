import { gameDirector } from "./gameMaster.js";
import { knobs } from "./knobs.js";
import { handleControls } from "./controls/controls.js";
import { handleAi } from "./enemyAi.js";
import { pauseToggle } from "./controls/pause.js";          
import { createGui, createLogger, healthBar, openStartScreen, openEndScreen } from './gui.js';
import { textureCube } from './textureCube.js';
import { playerTextureSwitcher } from './textureAnimPlayer.js';

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
    camera.heightOffset = 15;
    camera.attachControl(canvas, true);
    camera.inputs.clear();
    // Lightning
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 7;
    // Ground
    var ground = BABYLON.Mesh.CreateGround("ground1", knobs.worldSize.worldx, knobs.worldSize.worldz, 2, scene);
    var groundMaterial = new BABYLON.BackgroundMaterial("groundMat", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/groundTexure.png", scene);
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = groundMaterial;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);
    

    var platformColumn = textureCube("platformColumn","https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/pillarTexture.png", 100, false, scene);
    platformColumn.position.y = -50.001;
    platformColumn.rotation = new BABYLON.Vector3(Math.PI,0,0);

    // GUI
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    healthBar(advancedTexture);
    const scoreGui = createGui(advancedTexture, "-200vw");
    let powerUpLog = createLogger(advancedTexture);

    var scoreLabel = new BABYLON.GUI.TextBlock();
    scoreLabel.color = "#e6482e";
    scoreLabel.text = String("Score: " + knobs.score);
    scoreGui.addControl(scoreLabel);

        openStartScreen(advancedTexture);


    // create player
    var player = textureCube("player","https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/player1.png", 1, true, scene);
    player.position.y = 0.51;
    player.rotation = new BABYLON.Vector3(0,0,0);
    player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 99999, restitution: 1 }, scene)    
    camera.lockedTarget = player;
    camera.sensibility = 0;

    // Particles 
    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    particleSystem.particleTexture = new BABYLON.Texture('https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/particle.png', scene);
    particleSystem.emitter = player;
    particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0); // To...
    particleSystem.minSize = 1;
    particleSystem.maxSize = 1.5;
    particleSystem.minLifeTime = 0.1;
    particleSystem.maxLifeTime = 0.2;
    particleSystem.emitRate = 500;
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
    particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
    particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;
    particleSystem.minEmitPower =  7;
    particleSystem.maxEmitPower = 10;
    particleSystem.updateSpeed = 0.005;
    
    knobs.particles = particleSystem;
    

    
    var inputMap ={};
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));


    // sound from https://freesound.org/people/citeyo1/sounds/430307/
    var bomb = new BABYLON.Sound("explode", "https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/explosion.mp3", scene);
    // Boxes
    setTimeout(() => {
        // player.rotation = new BABYLON.Vector3(0, 0, 0);
        knobs.gameStartTime = Math.floor((new Date().getTime() / 1000));
        // music credits https://soundimage.org/chiptunes/
        var music = new BABYLON.Sound("Music", "https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/music.mp3", scene, null, {
            loop: true,
            autoplay: true
        });
        knobs.state = "ready"; 
        openStartScreen(advancedTexture);
    }, 5000);
    

    scene.onBeforeRenderObservable.add(()=>{ 
        var deltaTime = engine.getDeltaTime();
        var currTime = Math.floor((new Date().getTime() / 1000));
        pauseToggle(inputMap);
        scoreLabel.text = String("Score: " + knobs.score);
        knobs.difficulty = (Math.floor(knobs.score/knobs.difficutyRampSpeed) + 1); // changes the number that spawn
        if (knobs.state === "play") {
            handleControls(player, inputMap, deltaTime, physicsHelper, bomb, scene)
            knobs.ents.entArr.forEach(box => (handleAi(box, player, deltaTime, scene, ground)));
            knobs.ents.entArr.forEach(box =>   {
                if (player.intersectsMesh(box, true)) {
                    if(!knobs.invulnerable){
                        knobs.health -= 1;
                        knobs.invulnerable = true;
                        healthBar(advancedTexture);
                        setTimeout(() => { knobs.invulnerable = false }, knobs.iframe);
                    }
            }
            // else {}
        });
            knobs.ents.powerUpArr.forEach(powerUp =>   {
                if (player.intersectsMesh(powerUp, true) && !knobs.ents.removedEnts.includes(powerUp.name)) {
                    if(!knobs.gotPickup){
                        if (powerUp.name.includes("radius")){
                            powerUpLog.text = "Explosion Size Up!";
                            knobs.explosion.radius += 2;
                        } else if (powerUp.name.includes("strength")){
                            powerUpLog.text = "Explosion Strength Up!";
                            knobs.explosion.strength += 2;
                        } else if (powerUp.name.includes("health")){
                            powerUpLog.text = "Health Up!";
                            knobs.health += 2;
                            healthBar(advancedTexture);
                        }
                        knobs.gotPickup = true;
                        knobs.ents.removedEnts.push(powerUp.name)
                        scene.removeMesh(powerUp);
                        powerUp.dispose();
                        knobs.ents.totalEnts -= 1;
                        powerUp = null;
                        setTimeout(() => { knobs.gotPickup = false; powerUpLog.text=""; }, knobs.powerUpLimit);
                    }
            } 
            //else {}
        });
            gameDirector(currTime, 5, scene);
            if(knobs.health <= 0 || player.position.y < 0 ){ //handle death
                knobs.state = "game-over";
                player.material = playerTextureSwitcher("player","https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/deadplayer.png", 1, true, scene);
                setTimeout(() => {
                    openEndScreen(advancedTexture);
                }, 1500);
            }
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