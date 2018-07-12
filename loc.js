// Object class for single location (pixel) occupied by current organism
function Loc(parent, pos) {
  this.parent = parent; // reference to containing organism
  this.pos = pos; // actual xy position as vector
  this.ageCounter = 0; // age counter for specific location
  this.color = color(0); // color to show
  // this.color = color(255,0,0);
  this.state = LOCSTATE.IDLE;
  // this.interactionType = LOCINTERACTION.IDLE;
  this.neighbors = []; // to store other locs of interest when determining actions
}

// var LOCINTERACTION = Object.freeze({
// 	IDLE : 1,
// 	GROW : 2,
// 	FIGHT : 3,
// 	DIE : 4
// });

var LOCSTATE = Object.freeze({
  IDLE : {},
  DEAD : {},
  SOAKED : {},
  GROWING : {},
  FIGHTING : {},
});
