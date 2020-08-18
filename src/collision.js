import { knobs } from "./knobs.js";

function handleEntCollision(ent, direction, length, scene, deltaTime){
    const rayDirection = BABYLON.Vector3.TransformCoordinates(direction, ent.getWorldMatrix());
    const dir = BABYLON.Vector3.Normalize(rayDirection.subtract(origin));
    const ray = new BABYLON.Ray((new BABYLON.Vector3(ent.position.x, ent.position.y, ent.position.z)), direction, (length*Math.min(deltaTime, 20)));
    // let rayHelper = new BABYLON.RayHelper(ray);		
	// rayHelper.show(scene);		
    const hits = scene.multiPickWithRay(ray);
    if (hits){
        for (var i=0; i<hits.length; i++){
            if(hits[i].pickedMesh.name !== ent.name && hits[i].pickedMesh.name != "ray"){
                return true;
            }
        }
    }
    return false;
}

export { handleEntCollision }