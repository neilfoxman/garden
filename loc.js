// Object class for single location (pixel) occupied by current organism
function Loc(parent, pos) {
  this.parent = parent; // reference to containing organism
  this.pos = pos; // actual xy position as vector
  this.ageCounter = 0; // age counter for specific location
  this.color = color(0); // color to show
  this.interacted = false; // boolean indicating if location has interacted this round
  this.deletable = false; // flag for deletion
  this.neighborPxs = [
    createVector(this.pos.x - 1, this.pos.y - 1),
    createVector(this.pos.x, this.pos.y - 1),
    createVector(this.pos.x + 1, this.pos.y - 1),
    createVector(this.pos.x - 1, this.pos.y),
    createVector(this.pos.x + 1, this.pos.y),
    createVector(this.pos.x - 1, this.pos.y + 1),
    createVector(this.pos.x, this.pos.y + 1),
    createVector(this.pos.x + 1, this.pos.y + 1)
  ];
}
