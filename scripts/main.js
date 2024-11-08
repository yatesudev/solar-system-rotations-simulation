import {createCosmicBody, createSkybox, calculateMovement} from './cosmicObject.js';

window.onload = function() {
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
    } else {
    
        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);

        var scene = new BABYLON.Scene(engine);

        // Create camera
        var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", -Math.PI / 4.0, 0.25 * Math.PI, 4.0, new BABYLON.Vector3(0, 0, 0), scene);

        // Create Skybox
        var skybox = createSkybox(1000, "assets/skybox/skybox", scene);  // Corrected arguments

        
        var sun = createCosmicBody("Sun", 'planet', "assets/sun.jpg", 0.1, {x: 0, y: 0, z: 0}, scene, false, true);
        var earth = createCosmicBody("Earth", 'planet', "assets/earth.jpg", 0.3, {x: 1.0, y: 0, z: 0}, scene);
        var moon = createCosmicBody("Moon", 'planet', "assets/moon.jpg", 0.15, {x: earth.position.x - 0.5, y: earth.position.y, z: earth.position.z}, scene);
        var satellite = createCosmicBody("Satellite", 'satellite', "assets/metal.jpg", 1.0, {x: moon.position.x + 0.2, y: moon.position.y, z: moon.position.z}, scene, true);
        
        var light = new BABYLON.PointLight("dir01", new BABYLON.Vector3(-0.0, -0.0, 0.0), scene);
        light.diffuse = new BABYLON.Color3(1.0, 1.0, 1.0);

        var d = new Date();
        var startTime = d.getTime();
        var lastTime = startTime;
    
        var sim_year = 1.0; // one simulated earth year in minutes
        //var sim_day = sim_year / 365.24;
        var sim_month = sim_year / (365.24 / 27.3);
    
        // Update sim_year when input changes
        document.getElementById("orbitDuration").addEventListener("change", function(event) {
            sim_year = parseFloat(event.target.value);
            sim_month = sim_year / (365.24 / 27.3);
        });
    
        // Animate celestial bodies
        scene.registerBeforeRender(() => {
            var d = new Date();
            var time = d.getTime();
            var elapsed_t = time - startTime; // Time elapsed since the start
            lastTime = time;
            
            // Calculate simulated time in minutes
            var min2ms = 1000.0 * 60.0;
        
            // Calculate Earth's position and rotation (Earth orbits the Sun)
            calculateMovement(earth, {elapsed_t: elapsed_t, min2ms: min2ms}, sim_year, 1, 365.24, sim_year); // Earth's orbit around the Sun
        
            // Calculate Moon's position and rotation around the Sun (Moon orbits the Sun indirectly via Earth)
            calculateMovement(moon, {elapsed_t: elapsed_t, min2ms: min2ms}, sim_month, 0.5, 27.3, sim_year, earth); // Moon's orbit around Earth, and thus around the Sun
        
            // Calculate Satellite's position and rotation around the Moon (Satellite orbits the Moon)
            calculateMovement(satellite, {elapsed_t: elapsed_t, min2ms: min2ms}, (sim_month / 3), 0.2, 1, sim_year, moon); // Satellite's orbit around the Moon
        });
        
                            
        scene.activeCamera.attachControl(canvas);
        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
    
        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
    };
}