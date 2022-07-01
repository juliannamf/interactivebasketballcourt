# Interactive Basketball

This project was written as a final project for a computer graphics course.
I used Javascript, and the Three js library to complete this.

Techniques used:

Create objects using Three.js built-in
geomterical functions.
Built-in geomtetries I used:
PlaneGeometry
BoxGeometry
TorusGeometry
CylinderGeometry
SphereGeometry

Use colors and transparency.
Colored geometries using hex codes and made basketball goal 
net transparent, to show the net texture.

Use Transforms and rotations.
Three js geometry objects are transformed and rotated to
fix the size and orinetation of the scene.

Use cameras and lights.
A perective camera is used with orbit controls. An ambient 
light is added to make sure everything in the scene can be 
seen. Two spotlights are added to simulate lighting in a 
basketball court. Shadow effects are added to the spotlights 
and all the objects. I used the MeshLambertMaterial so that
the spotlight would appear less harsh.

Use textures/reflection.
The ceiling, walls, floor, basketball, and backboard are 
all textured using images that I found and edited or 
created myself.

Use animation.
The basketball is animated to dribble up and down forever.
Users can interact with basketball using keyboard inputs.
