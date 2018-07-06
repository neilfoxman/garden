var idCounterOrganism = 1;

function Organism(startPos) {
  this.id = idCounterOrganism++;
  this.entityType = "Organism";
  this.type = "Unassigned";
  this.startPos = startPos;
  this.locs = []; // points that relate to the organism (to be filled on the screen)
  this.ageCounter = 0; // age counter for entire organism
  this.soakLocs = [];

  ORGANISMS.push(this); // Add this organism to the list









  /* ---------- LIFECYCLE FUNCTIONS ----------
  The functions below are relevant to the life cycle of the organism.  They are
  not intended to be overwritten but generally orchestrate the common procedures.
  They should be called as desired in the main script.
  */

  // Create Seed.  Should be called once.  Used to place an organism in the field
  // can alter to determine starting shape/size.
  this.seed = function() {
    // console.log("seed(): started for organism " + this.id + " of type " + this.type);
    this.createSeed(); // Make seed shape
    // console.log("seed(): createSeed() complete. this.locs.length = " + this.locs.length);

    var numDeletable = 0;
    var allLocs = getAllLocs();
    // console.log("seed(): allLocs length is " + allLocs.length);
    for(var allLocsIdx = 0; allLocsIdx < allLocs.length; allLocsIdx++){ // for each loc already declared
      var origLoc = allLocs[allLocsIdx]; // get the original loc placed
      if(origLoc.parent != this){
        var clashingLoc = this.getLocAt(origLoc); // compare if there is a clashing loc in current organism
        if(clashingLoc && origLoc.parent.entityType == "Organism"){
          // console.log("seed(): origLoc - parent:" + origLoc.parent.id + " coord:(" + origLoc.pos.x + "," + origLoc.pos.y + ")");
          // console.log("seed(): clashingLoc - parent:" + clashingLoc.parent.id + " coord:(" + clashingLoc.pos.x + "," + clashingLoc.pos.y + ")");
          clashingLoc.deletable = true;
          numDeletable++;
        } else{
          // console.log("Entity type was " + LOCS[locIdx].entityType);
          // console.log("Type was " + LOCS[locIdx].type);
        }
      }
    }
    // console.log("seed(): Set " + numDeletable + " as deletable");
    refreshLocs(); // refresh the loc list
    this.setSeedAppearance(); // apply initial color
  }

  // This function increments the age counter of the organism and its Locs
  this.age = function() {
    this.ageCounter++; // age organism

    // age each location occupied by organism
    for (var idxLoc = 0; idxLoc < this.locs.length; idxLoc++) {
      this.locs[idxLoc].ageCounter++;
    }

    // age soaked resources as they will be used over time by the organism
    for (var idxSoakLocs = 0; idxSoakLocs < this.soakLocs.length; idxSoakLocs++){
      this.soakLocs[idxSoakLocs].ageCounter++;
    }
  }

  // Soak up nutrients in locations occupied by this organism.  Also determine which locs will act
  this.soak = function() {
    // gather all nutrients
    for(var resourceIdx = 0; resourceIdx < RESOURCES.length; resourceIdx++){
      var resource = RESOURCES[resourceIdx];

      for(var resourceLocsIdx = 0; resourceLocsIdx < resource.locs.length; resourceLocsIdx++){
        var resourceLoc = resource.locs[resourceLocsIdx];

        var soakLoc = this.getLocAt(resourceLoc);
        if(soakLoc){
          this.soakLocs.push(soakLoc);
        }
      }
    }
    this.digest();
  }

  // interact() is the main function for an organism.  It orchestrates most of the
  // activity functions below that act depending on nutrients and surroundings
  // Notes on semantics: I will use the word pixel to identify a location
  // regardless of who inhabits it.  A Loc is an inhabited pixel Location
  this.interact = function() {
    // For each boundary loc
    // if neighbors are occupied
    // pick one at random and fight();
    // if no neighbors are occupied
    // boundary();

    // // find all relevant locs that belong to a foreign organism
    // var interactionLocs = this.getInteractionLocs(); // gets locs of this organism that may interact
    // for(var interactionLocsIdx = 0; interactionLocsIdx < interactionLocs.length; interactionLocsIdx++){
    //   var interactionLoc = interactionLocs[interactionLocIdx];
    //   this.determineActionOwner(interactionLoc);
    //
    //
    // }






    // var actionOwner = determineActionOwner()
    // actionOwner.determineActionType(arrayOfLocs)
    // if actionType == fight
    // fight(arrayOfLocs)
    // if actionType == die
    // die(arrayOfLocs) // death function - may just remove Loc, exhaust resources
    // if actionType == grow
    // grow(arrayOfLocs); // grow function - may just pick surrounding Loc at Random
  }



  this.show = function() {
    this.updateAppearance();
    for (locsIdx = 0; locsIdx < this.locs.length; locsIdx++) {
      var loc = this.locs[locsIdx];
      set(loc.pos.x, loc.pos.y, loc.color);
    }
    updatePixels();
  };






  /* ---------- ACTIVITY FUNCTIONS ----------
  The functions below are carried out by every organism.
  They generally have a default response but are intended to be overwritten.
  */
  // create default seed shape

  this.createSeed = function() {
    // console.log("createSeed(): started for organism " + this.id);
    var defaultRadius = 10;
    var numNewLocs = 0;
    for (var pxx = startPos.x - defaultRadius; pxx <= startPos.x + defaultRadius; pxx++) {
      for (var pxy = startPos.y - defaultRadius; pxy <= startPos.y + defaultRadius; pxy++) {
        if (dist(pxx, pxy, startPos.x, startPos.y) <= defaultRadius) {
          var loc = new Loc(this, createVector(pxx, pxy));
          this.locs.push(loc);
          numNewLocs++;
        }
      }
    }
    // console.log("createSeed(): created " + numNewLocs + " new locs");
  }

  this.setSeedAppearance = function() {

  }

  // Look internally and choose which locs will be interacting
  this.getInteractionLocs = function() {
    // // Default is to find locs on edges
    // for(var thisLocsIdx = 0; thisLocsIdx < this.locs.length; thisLocsIdx++){
    //   var thisLoc = this.locs[thisLocsIdx];
    //   if
    // }
  }

  // Blank function used to update appearance based on age or health
  this.updateAppearance = function() {

  }

  this.digest = function() {

  }







  /* ---------- UTILITY FUNCTIONS ----------
  Functions used commonly with organisms
  */
  this.getLocAt = function(compareLoc){
    // console.log("Length is " + this.locs.length);
    for(var thisLocIdx = 0; thisLocIdx < this.locs.length; thisLocIdx++){
      // console.log("thisLocIdx is " + thisLocIdx);
      var thisLoc = this.locs[thisLocIdx];
      // console.log(compareLoc.pos.x + " to " + thisLoc.pos.x + "\t" + compareLoc.pos.y + " to " + thisLoc.pos.y);
      if(compareLoc.pos.x == thisLoc.pos.x && compareLoc.pos.y == thisLoc.pos.y){
        return(thisLoc);
      }
    }
    return(null)

  }


}











/* ---------- ORGANISM CLASSES ----------
The classes below represent organism types to spawn.  They may overwrite
activity functions above but must call the Organism function first to inherit.
*/

function Grass(startPos) {
  Organism.call(this, startPos);
  this.type = "Grass";
  this.color = color(0, random(255), 0);

  this.setSeedAppearance = function() {
    for (var locIdx = 0; locIdx < this.locs.length; locIdx++) {
      this.locs[locIdx].color = this.color;
    }
  }


}
