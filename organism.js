var idCounterOrganism = 1;

function Organism(startPos){
  this.id = idCounterOrganism++;
  this.type = "Unassigned";
  this.startPos = startPos;
  this.locs = []; // points that relate to the organism (to be filled on the screen)
  this.ageCounter = 0; // age counter for entire organism


  // Object class for single location (pixel) occupied by current organism
  function Loc(parent, pos){
    this.parentOrganism = parent; // reference to containing organism
    this.pos = pos; // actual xy position
    this.color = color(0); // color to show
    this.spent = false; // boolean indicating if location has interacted this round
    this.ageCounter = 0; // age counter for specific location
  }




  /* ---------- LIFECYCLE FUNCTIONS ----------
  The functions below are relevant to the life cycle of the organism.  They are
  not intended to be overwritten but generally orchestrate the common procedures.
  They should be called as desired in the main script.
  */

  // This function increments the age counter of the organism and its Locs
  // It also calls updateAppearance(), an activity function used to show age
  this.age = function(){
    this.ageCounter++;
    for(var idxLoc = 0; idxLoc < this.locs.length; idxLoc++){
      this.locs[idxLoc].ageCounter++;
    }
  }

  // Soak up nutrients in locations occupied by this organism.
  this.soak = function(arrayOfResources) {
    // gather all nutrients
  }

  // interact() is the main function for an organism.  It orchestrates most of the
  // activity functions below that act depending on nutrients and surroundings
  this.interact = function(arrayOfOrganisms){
    for(var idxLoc = 0; idxLoc < this.locs.length; idxLoc++){ // for each pixel belonging to this organism
      var loc = this.locs[idxLoc];
      // find all relevant locs that belong to a foreign organism

        // var actionOwner = determineActionOwner()
        // actionOwner.determineActionType(arrayOfLocs)
        // if actionType == fight
          // fight(arrayOfLocs)
        // if actionType == die
          // die(arrayOfLocs) // death function - may just remove Loc, exhaust resources
        // if actionType == grow
          // grow(arrayOfLocs); // grow function - may just pick surrounding Loc at Random
    }

  }






  /* ---------- ACTIVITY FUNCTIONS ----------
  The functions below are carried out by every organism.
  They generally have a default response but are intended to be overwritten.
  */

  // Create Seed.  Should be called once.  Used to place an organism in the field
  // can alter to determine starting shape/size.
  this.seed = function(){
    var defaultRadius = 10;
    for(var pxx = startPos.x - defaultRadius; pxx <= startPos.x + defaultRadius; pxx++){
      for(var pxy = startPos.y - defaultRadius; pxy <= startPos.y + defaultRadius; pxy++){
        if(dist(pxx, pxy, startPos.x, startPos.y) <= defaultRadius){
          var loc = new Loc(this, createVector(pxx, pxy));
          this.locs.push(loc);
        }
      }
    }
  }

  // Blank function used to update appearance based on age or health
  this.updateAppearance = function(){

  }

  this.show = function(){
    for(idxLoc = 0; idxLoc < this.locs.length; idxLoc++){
      var loc = this.locs[idxLoc];
      set(loc.pos.x, loc.pos.y, loc.color);
    }
    updatePixels();
  };
}

/* ---------- ORGANISM CLASSES ----------
The classes below represent organism types to spawn.  They may overwrite
activity functions above but must call the Organism function first to inherit.
*/

function Grass(startPos){
  Organism.call(this, startPos);
  this.type = "Grass";


}
