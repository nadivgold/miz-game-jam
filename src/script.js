import { explode } from "./explode.js";

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
            var player = BABYLON.Mesh.CreateBox("box", 1, scene);
            player.position.y = 0.5;
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
            var boxSize = 2;
            var boxPadding = 4;
            var minXY = -12;
            var maxXY = 12;
            var maxZ = 8;
            var boxParams = { height: boxSize, width: boxSize, depth: boxSize };
            var boxImpostorParams = { mass: 0.5 * boxSize, restitution: 0, friction: 1 };
            var boxMaterial = new BABYLON.StandardMaterial("boxMaterial");
            boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
            for (var x = minXY; x <= maxXY; x += boxSize + boxPadding) {
                for (var z = minXY; z <= maxXY; z += boxSize + boxPadding) {
                    for (var y = boxSize / 2; y <= maxZ; y += boxSize) {
                        var boxName = "box:" + x + ',' + y + ',' + z;
                        var box = BABYLON.MeshBuilder.CreateBox(boxName, boxParams, scene);
                        box.position = new BABYLON.Vector3(x, y, z);
                        box.material = boxMaterial;
                        box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, boxImpostorParams, scene);
                        physicsViewer.showImpostor(box.physicsImpostor);
                    }
                }
            }
        

            // scene.registerBeforeRender(function() {
            setInterval(function(){  
                if(inputMap["a"] || inputMap["ArrowLeft"]){
                    player.position.x += 0.5;
                }
                if(inputMap["w"] || inputMap["ArrowUp"]){
                    player.position.z -= 0.5;
                }
                if(inputMap["d"] || inputMap["ArrowRight"]){
                    player.position.x -= 0.5;
                }
                if(inputMap["s"] || inputMap["ArrowDown"]){
                    player.position.z += 0.5;
                }
                if(inputMap[" "]){
                  explode(8, 20, player.position, 1000, physicsHelper);
                    // Radial explosion impulse/force
            // var radius = 8;
            // var strength = 20;
            // var origin = player.position;
            // setTimeout(function (origin) {
            //     var event = physicsHelper.applyRadialExplosionImpulse( // or .applyRadialExplosionForce
            //         origin,
            //         {
            //             radius: radius,
            //             strength: strength,
            //             falloff: BABYLON.PhysicsRadialImpulseFalloff.Linear, // or BABYLON.PhysicsRadialImpulseFalloff.Constant
            //         }
            //     );
    
            //     // Debug
            //     var eventData = event.getData();
            //     var debugData = showExplosionDebug(eventData);
            //     setTimeout(function (debugData) {
            //         hideExplosionDebug(debugData);
            //         event.dispose(); // we need to cleanup/dispose, after we don't use the data anymore
            //     }, 1500, debugData);
            //     // Debug - END
            // }, 1000, origin);
            }        
            }, 33);

        
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