import { explode } from "./explode.js";
import { initBoxes } from "./initialize.js";
import { knobs } from "./knobs.js";
import { handleControls } from "./controls.js";
import { moveAi } from "./enemyAi.js";

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
    
    
    
        // Lightning
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;
    
    
        // Ground
        var ground = BABYLON.Mesh.CreateGround("ground1", 64, 64, 2, scene);
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, scene);
        
        // create player
        var player = BABYLON.Mesh.CreateBox("player", 1, scene);
        // player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 100, restitution: 1 }, scene)
        player.position.y = 0.5;
        player.position.x = 20;
        camera.lockedTarget = player;
        
        var inputMap ={};
        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        
        // Boxes
        const boxes = initBoxes(2, 4, -12, 12, 1, scene, physicsViewer);
        knobs.state = "play"; 

        scene.onBeforeRenderObservable.add(()=>{ 
            var deltaTime = engine.getDeltaTime();
            if (knobs.state == "play") {
                handleControls(player, inputMap, deltaTime, explode, physicsHelper, scene)
                boxes.forEach(box => (moveAi(box, player, deltaTime, scene)));
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