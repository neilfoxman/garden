var idCounterOrganism = 1;

function Organism(startPos) {
  this.id = idCounterOrganism++;
  this.type = "Unassigned";
  this.startPos = startPos;
  this.locs = []; // points that relate to the organism (to be filled on the screen)
  this.ageCounter = 0; // age counter for entire organism


  // Object class for single location (pixel) occupied by current organism
  function Loc(parent, pos) {
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

  // Create Seed.  Should be called once.  Used to place an organism in the field
  // can alter to determine starting shape/size.
  this.seed = function() {
    this.createSeed(); // Make seed shape
    this.setSeedAppearance(); // apply color
  }

  // This function increments the age counter of the organism and its Locs
  // It also calls updateAppearance(), an activity function used to show age
  this.age = function() {
    this.ageCounter++;
    for (var idxLoc = 0; idxLoc < this.locs.length; idxLoc++) {
      this.locs[idxLoc].ageCounter++;
    }
  }

  // Soak up nutrients in locations occupied by this organism.
  this.soak = function(arrayOfResources) {
    // gather all nutrients
  }

  // interact() is the main function for an organism.  It orchestrates most of the
  // activity functions below that act depending on nutrients and surroundings
  // Notes on semantics: I will use the word pixel to identify a location
  // regardless of who inhabits it.  A Loc is an inhabited pixel Location
  this.interact = function(arrayOfOrganisms) {
    // Look at each organism other than this one
    for (var arrayOfOrganismsIdx = 0; arrayOfOrganismsIdx < arrayOfOrganisms.length; arrayOfOrganismsIdx++) {
      var inspectedOrganism = arrayOfOrganisms[arrayOfOrganismsIdx];

      if (this !== inspectedOrganism) { // if the organism is not this same organism (another one)
        var otherOrganism = inspectedOrganism;
        // console.log("Num Locs in organism " + this.id + ": " + this.locs.length);

        // for each Loc (pixel) belonging to this organism
        for (var locIdx = 0; locIdx < this.locs.length; locIdx++) {
          var thisLoc = this.locs[locIdx];

          // find all surrounding pixels
          var neighboringPxs = [
            createVector(thisLoc.pos.x - 1, thisLoc.pos.y - 1),
            createVector(thisLoc.pos.x, thisLoc.pos.y - 1),
            createVector(thisLoc.pos.x + 1, thisLoc.pos.y - 1),
            createVector(thisLoc.pos.x - 1, thisLoc.pos.y),
            createVector(thisLoc.pos.x + 1, thisLoc.pos.y),
            createVector(thisLoc.pos.x - 1, thisLoc.pos.y + 1),
            createVector(thisLoc.pos.x, thisLoc.pos.y + 1),
            createVector(thisLoc.pos.x + 1, thisLoc.pos.y + 1)
          ];


          // then search the other organism to see if they have a loc corresponding to this loc
          var neighboringLocs = []; // Create an array to store any neighboring Locs

          for (var neighboringPxsIdx = 0; neighboringPxsIdx < neighboringPxs.length; neighboringPxsIdx++) { // For each neighboring px
            var neighboringPx = neighboringPxs[neighboringPxsIdx];

            // go thru each loc of the other organism and see if they share the position
            for(otherOrganismLocsIdx = 0; otherOrganismLocsIdx < otherOrganism.locs.length; otherOrganismLocsIdx++){
              var otherOrganismLoc = otherOrganism.locs[otherOrganismLocsIdx];
              if(otherOrganismLoc.pos.x == neighboringPx.x){ // if x value of other's loc matches neighbor
                if(otherOrganismLoc.pos.y == neighboringPx.y){ // and if y value of other's loc matches neighbor
                  // then a match has been found i.e. one of the neighbors is another organism
                  otherOrganismLoc.color = color(255,0,0);
                }
              }
            }




          }
        }

      }

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
  this.createSeed = function(){
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

  // Blank function used to update appearance based on age or health
  this.updateAppearance = function() {

  }








  /* ---------- UTILITY FUNCTIONS ----------
  Functions used commonly with organisms
  */

  // used to see if organisms in neigboring pixels
  // used to remove otherOrganism Locs that inhabit thisLoc
  this.getLocsInSamePositionAs = function(arrayOfVectorsOrOrganism){
    var arrayOfVectors = [];
    if(arrayOfVectorsOrOrganism instanceof Organism){
      arrayOfVectors = arrayOfVectorsOrOrganism.locs;
    } else {
      arrayOfVectors = arrayOfVectorsOrOrganism;
    }

    var matchingLocs = [];
    for(var loc in this.locs){
      // for (var vect in )
      // if(loc.pos.x == )

    }

    // var newarr = arrayOfVectors.filter(function(vect){
    //   if(vect.x)
    //   return a !== 'deleted'}
    // )
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

  this.setSeedAppearance = function(){
    for(var locIdx = 0; locIdx < this.locs.length; locIdx++){
      this.locs[locIdx].color = this.color;
    }
  }


}
