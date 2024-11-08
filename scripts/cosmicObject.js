// Helper functions
function createMaterial(name, texturePath, scene, emissiveColor, glowing){
    var material = new BABYLON.StandardMaterial(name, scene);
    material.diffuseTexture = new BABYLON.Texture(texturePath, scene);
    material.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    material.emissiveColor = emissiveColor;
    material.diffuseTexture.vScale = -1;
    material.diffuseTexture.uScale = -1;
    return material;
}


function createBabylonObject(name, type, size, scene, position = {x: 0, y: 0, z: 0}, rotation = {x: 0, y: 0, z: 0}) {
    var obj;
    if (type === 'planet') {
        obj = BABYLON.Mesh.CreateSphere(name, 30.0, size, scene);
    } else if (type === 'satellite') {
        obj = BABYLON.Mesh.CreateCylinder(name, size*0.03, size*0.001, size*0.09, 10, scene);
    } else if (type === 'skybox') {
        obj = BABYLON.Mesh.CreateBox(name, size, scene);
    }
    obj.position.x = position.x;
    obj.position.y = position.y;
    obj.position.z = position.z;

    obj.rotation.x = rotation.x;
    obj.rotation.y = rotation.y;
    
    return obj;
}

export function createCosmicBody(name, type, texturePath, size, position, scene, isSatellite = false, glowing = false) {
    var body = createBabylonObject(name, type, size, scene, position);
    let emissiveColor;

    if (glowing) {
        emissiveColor = new BABYLON.Color3(1, 1, 1);
    } else {
        emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    }

    var material = createMaterial(name + "Material", texturePath, scene, emissiveColor, glowing);
    body.material = material;
    if (isSatellite) {
        // Adjust the satellite's rotation if needed
        body.rotation.z = -0.4 * Math.PI;
    }
    return body;
}

export function createSkybox(size, texturePath, scene) {
    var skybox = createBabylonObject("skyBox", 'skybox', size, scene, new BABYLON.Vector3(0, 0, 0));
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBoxMaterial", scene);
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0); // Optional, but we set it to black for better lighting control
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0); // No specular reflection
    skyboxMaterial.backFaceCulling = false; // Make sure we see the inside of the box
    // Applying the texture for the Skybox
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(texturePath, scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE; // Correct coordinates for Skybox
    skybox.material = skyboxMaterial;
    return skybox;
}


export function calculateMovement(object, time, orbitalPeriod, radius, rotationDays, sim_year, rotationObject = null) {
    var simulated_time_in_minutes = time.elapsed_t / time.min2ms; 

    // If rotationObject is provided, adjust the position relative to the rotationObject
    if (rotationObject) {
        object.position.x = rotationObject.position.x + Math.cos((2 * Math.PI * simulated_time_in_minutes) / orbitalPeriod) * radius;
        object.position.z = rotationObject.position.z + Math.sin((2 * Math.PI * simulated_time_in_minutes) / orbitalPeriod) * radius;
    } else {
        // If no rotationObject is provided, just use the orbitalPeriod and radius for global movement
        object.position.x = Math.cos((2 * Math.PI * simulated_time_in_minutes) / orbitalPeriod) * radius;
        object.position.z = Math.sin((2 * Math.PI * simulated_time_in_minutes) / orbitalPeriod) * radius;
    }

    // Rotate the object based on the elapsed time and orbital period
    if (object.name == "Satellite") {
        object.rotation.y = -(time.elapsed_t / (time.min2ms * orbitalPeriod) * 2 * Math.PI);
    } else if (object.name == "Moon") {
        console.log("moon found!");
        object.rotation.y = -(time.elapsed_t / ((time.min2ms / 27.3) * sim_year) * 2 * Math.PI);
    } else {
        object.rotation.y = -(time.elapsed_t / ((time.min2ms / rotationDays) * orbitalPeriod) * 2 * Math.PI);
    }

}
