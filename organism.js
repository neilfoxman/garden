var idCounterOrg = 1;

function Organism(xStart,yStart){
  this.id = idCounterOrg++;
  this.xStart = xStart;
  this.yStart = yStart;
  this.locs = []; // points that relate to the organism (to be filled on the screen)
  this.type = "Unassigned";
  this.ageCounter = 0;

  // Location occupied by current organism
  function Loc(parent, pos){
    this.parent = parent; // reference to containing organism
    this.pos = pos; // actual xy position
    this.color; // color to show
    this.spent = false; // boolean indicating if location has interacted this round
  }

  this.soak = function() {
    // gather all nutrients
  }

  // Main function that acts depending on nutrients and surroundings
  this.age = function(){
    // console.log("Organism " + this.id + " of type " + this.type + " has unassigned age() function.");
    this.ageCounter++;

    // for each pixel belonging to this organism
      // var arrayOfLocs = this.getSurroundings()  // find all relevant locs that belong to a foreign organism
      // var actionOwner = determineActionOwner()
      // actionOwner.determineActionType(arrayOfLocs)
      // if actionType == interact
        // interact(arrayOfLocs)
      // if actionType == die
        // die(arrayOfLocs) // death function - may just remove Loc
      // if actionType == grow
        // grow(arrayOfLocs); // grow function - may just pick surrounding Loc at Random
  };

  this.show = function(){
    // for each loc
      // paint loc color
  };
}


function Grass(xStart, yStart){
  Organism.call(this, xStart, yStart);
  this.type = "Grass";

   // Plant Seed upon construction
   this.baseRadius = 20;

  this.age = function(){
    this.ageCounter++;
    fill(255,0,0);
    noStroke();

    // for each pixel occupied by this organism

  }


}
