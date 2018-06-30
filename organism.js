var idCounterOrganism = 1;

function Organism(startPos) {
  this.id = idCounterOrganism++;
  this.entityType = "Organism";
  this.type = "Unassigned";
  this.startPos = startPos;
  this.locs = []; // points that relate to the organism (to be filled on the screen)
  this.ageCounter = 0; // age counter for entire organism=

  ORGANISMS.push(this); // Add this organism to the list


  /* ---------- LIFECYCLE FUNCTIONS ----------
  The functions below are relevant to the life cycle of the organism.  They are
  not intended to be overwritten but generally orchestrate the common procedures.
  They should be called as desired in the main script.
  */

  // Create Seed.  Should be called once.  Used to place an organism in the field
  // can alter to determine starting shape/size.
  this.seed = function() {
    this.createSeed(); // Make seed shape
    // Delete clashes with other organisms
    for(var locIdx = 0; locIdx < LOCS.length; locIdx++){
      var clashingLoc = this.getLocAt(LOCS[locIdx]);
      if(clashingLoc && LOCS[locIdx].entityType == "Organism"){
        clashingLoc.deletable = true;
      }
    }

    refreshLocs(); // refresh the loc list
    this.setSeedAppearance(); // apply initial color
  }

  // This function increments the age counter of the organism and its Locs
  this.age = function() {
    this.ageCounter++;
    for (var idxLoc = 0; idxLoc < this.locs.length; idxLoc++) {
      this.locs[idxLoc].ageCounter++;
    }
  }

  // Soak up nutrients in locations occupied by this organism.
  this.soak = function() {
    // gather all nutrients
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
    var defaultRadius = 10;
    for (var pxx = startPos.x - defaultRadius; pxx <= startPos.x + defaultRadius; pxx++) {
      for (var pxy = startPos.y - defaultRadius; pxy <= startPos.y + defaultRadius; pxy++) {
        if (dist(pxx, pxy, startPos.x, startPos.y) <= defaultRadius) {
          var loc = new Loc(this, createVector(pxx, pxy));
          this.locs.push(loc);
        }
      }
    }
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







  /* ---------- UTILITY FUNCTIONS ----------
  Functions used commonly with organisms
  */
  this.getLocAt = function(compareLoc){
    for(var thisLocIdx = 0; thisLocIdx < this.locs.length; thisLocIdx++){
      var thisLoc = this.locs[thisLocIdx];

      if(compareLoc.pos.x == thisLoc.pos.x || compareLoc.pos.y == thisLoc.pos.y){
        return(thisLoc);
      } else {
        return(null);
      }
    }

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
