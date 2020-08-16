            // // Gravitational field
            // var gravitationalFieldOrigin = new BABYLON.Vector3(0, 6, 10);
            // setTimeout(function() {
            //     var event = physicsHelper.gravitationalField(
            //         gravitationalFieldOrigin,
            //         {
            //             radius: radius,
            //             strength: strength,
            //             falloff: BABYLON.PhysicsRadialImpulseFalloff.Linear,
            //         }
            //     );
            //     event.enable();
        
            //     // Debug
            //     var eventData = event.getData();
            //     var sphere = eventData.sphere;
            //     addMaterialToMesh(sphere);
            //     sphere.isVisible = true;
        
            //     setTimeout(function (sphere) {
            //         event.disable();
            //         sphere.isVisible = false;
            //         event.dispose(); // we need to cleanup/dispose, after we don't use the data anymore
            //     }, 3000, sphere);
            //     // Debug - END
            // }, 4000);
        
        
            // // Updraft
            // var updraftOrigin = new BABYLON.Vector3(12, 0, 12);
            // setTimeout(function() {
            //     var event = physicsHelper.updraft(
            //         updraftOrigin,
            //         {
            //             radius: 12,
            //             strength: 2,
            //             height: 20,
            //         }
            //     );
            //     event.enable();
        
            //     // Debug
            //     var eventData = event.getData();
            //     var cylinder = eventData.cylinder;
            //     addMaterialToMesh(cylinder);
            //     cylinder.isVisible = true;
        
            //     setTimeout(function (cylinder) {
            //         event.disable();
            //         cylinder.isVisible = false;
            //         event.dispose(); // we need to cleanup/dispose, after we don't use the data anymore
            //     }, 2000, cylinder);
            //     // Debug - END
            // }, 6000);
        
        
            // Vortex
            // var vortexOrigin = new BABYLON.Vector3(0, -8, 8);
            // setTimeout(function() {
            //     var event = physicsHelper.vortex(
            //         vortexOrigin,
            //         {
            //             radius: 20,
            //             strength: 40,
            //             height: 30,
            //         }
            //     );
            //     event.enable();
        
            //     // Debug
            //     var eventData = event.getData();
            //     var cylinder = eventData.cylinder;
            //     addMaterialToMesh(cylinder);
            //     cylinder.isVisible = true;
        
            //     setTimeout(function (cylinder) {
            //         event.disable();
            //         cylinder.isVisible = false;
            //         event.dispose(); // we need to cleanup/dispose, after we don't use the data anymore
            //     }, 1000, cylinder);
            //     // Debug - END
            // }, 0);