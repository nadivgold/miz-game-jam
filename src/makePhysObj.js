var makePhysicsObject = (newMeshes, scene, scaling)=>{
    // Create physics root and position it to be the center of mass for the imported mesh
    var physicsRoot = new BABYLON.Mesh("physicsRoot", scene);
    physicsRoot.position.y -= 0.9;

    // For all children labeled box (representing colliders), make them invisible and add them as a child of the root object
    newMeshes.forEach((m, i)=>{
        if(m.name.indexOf("box") != -1){
            m.isVisible = false
            physicsRoot.addChild(m)
        }
    })

    // Add all root nodes within the loaded gltf to the physics root
    newMeshes.forEach((m, i)=>{
        if(m.parent == null){
            physicsRoot.addChild(m)
        }
    })

    // Make every collider into a physics impostor
    physicsRoot.getChildMeshes().forEach((m)=>{
        if(m.name.indexOf("box") != -1){
            m.scaling.x = Math.abs(m.scaling.x)
            m.scaling.y = Math.abs(m.scaling.y)
            m.scaling.z = Math.abs(m.scaling.z)
            m.physicsImpostor = new BABYLON.PhysicsImpostor(m, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.1 }, scene);
        }
    })
    
    // Scale the root object and turn it into a physics impsotor
    physicsRoot.scaling.scaleInPlace(scaling)
    physicsRoot.physicsImpostor = new BABYLON.PhysicsImpostor(physicsRoot, BABYLON.PhysicsImpostor.NoImpostor, { mass: 3 }, scene);
    
    return physicsRoot
}

export {makePhysicsObject}