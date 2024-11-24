# Solar System Rotations Simulation

**Course**: Computer Graphics and Visualization (Computergrafik und Visualisierung)  
**Instructor**: Prof. Dr.-Ing. Gordon Müller  
**Semester**: Wintersemester 2024/25  
**Project**: Aufgabe 1 - Rotationen im Sonnensystem

## Project Overview

This project simulates the rotations and orbital movements of celestial bodies in the solar system using Babylon.js. The simulation includes the Earth's movement around the Sun, its self-rotation, the Moon's orbit around the Earth, and a satellite orbiting the Moon. It demonstrates the use of 3D transformations and animations to model realistic celestial mechanics.

## Key Features:
1. **Earth's Orbit Around the Sun**:
   - The Earth orbits the Sun in a circular motion with an adjustable orbital period.
   - The rotation speed of the Earth can be modified via a user interface input.

2. **Earth’s Self-Rotation**:
   - The Earth rotates around its own axis (y-axis), completing 365.24 rotations per orbit.

3. **Moon’s Orbit Around the Earth**:
   - The Moon completes one orbit around the Earth in 27.3 days, with a fixed distance.
   - The Moon also rotates around its own axis, showing the same face to Earth.

4. **Satellite Orbiting the Moon**:
   - A satellite orbits the Moon 3 times faster than the Moon’s self-rotation.
   - The satellite always faces the same side towards the Moon.

5. **Skybox**:
   - A background Skybox is added to simulate space around the objects.

## Setup Instructions:

1. **Local Web Server**: Ensure you have a local web server running (e.g., XAMPP).
2. **Download and Extract**: Download the zip file `CGV-P1.zip` and extract it to your web server's document root (e.g., `c:\xampp\htdocs`).
3. **Run the Project**: Open the `cgv1.html` file in your browser by visiting `http://localhost/CGV-P1/cgv1.html`.

## Technologies Used:
- **Babylon.js** for 3D rendering and animations.
- **JavaScript** for modeling the celestial motions and interactions.
