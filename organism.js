var idCounterOrganism = 1;

function Organism(startPos) {
  this.id = idCounterOrganism++;
  this.entityType = "Organism";
  this.type = "Unassigned";
  this.startPos = startPos;
  this.locs = []; // points that relate to the organism (to be filled on the screen)
  this.ageCounter = 0; // age counter for entire organism
  this.soakLocs = [];
  this.interactionLocs = [];
  this.health = 0;
  this.deletable = false;
  this.neighborKernel = [
    createVector(-1, -1),
    createVector(0, -1),
    createVector(1, -1),
    createVector(-1,0),
    createVector(1,0),
    createVector(-1, 1),
    createVector(0, 1),
    createVector(1, 1)
  ]

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
    var allOrganismLocs = getAllOrganismLocs();
    // console.log("seed(): allLocs length is " + allLocs.length);
    for(var allOrganismLocsIdx = 0; allOrganismLocsIdx < allOrganismLocs.length; allOrganismLocsIdx++){ // for each loc already declared
      var origLoc = allOrganismLocs[allOrganismLocsIdx]; // get the original loc placed

      if(origLoc.parent != this){ // if that locs parent is not this organism
        var clashingLoc = this.getLocAt(origLoc); // compare if there is a clashing loc in current organism
        if(clashingLoc && origLoc.parent.entityType == "Organism"){
          // console.log("seed(): origLoc - parent:" + origLoc.parent.id + " coord:(" + origLoc.pos.x + "," + origLoc.pos.y + ")");
          // console.log("seed(): clashingLoc - parent:" + clashingLoc.parent.id + " coord:(" + clashingLoc.pos.x + "," + clashingLoc.pos.y + ")");
          // clashingLoc.deletable = true;
          clashingLoc.state = LOCSTATE.DEAD;
          numDeletable++;
        } else {
          // console.log("Entity type was " + LOCS[locIdx].entityType);
          // console.log("Type was " + LOCS[locIdx].type);
        }
      }
    }
    // console.log("seed(): Set " + numDeletable + " as deletable");
    // refreshLocs(); // refresh all locs (delete deletable ones)
    refreshLocs(); // delete locs marked as dead (clashing)
    this.health = this.locs.length; // initialize health to same as loc length
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
    // TODO: update so that it matches a resource loc map to an organism loc map for better speed
    for(var resourceIdx = 0; resourceIdx < RESOURCES.length; resourceIdx++){ // for each resource
      var resource = RESOURCES[resourceIdx];

      for(var resourceLocsIdx = 0; resourceLocsIdx < resource.locs.length; resourceLocsIdx++){ // for each loc owned by the resource
        var resourceLoc = resource.locs[resourceLocsIdx];

        var soakLoc = this.getLocAt(resourceLoc); // find a loc of this organism at the same loc as the resource
        if(soakLoc){ // if a loc has been found in this organism that can soak a resource
          this.soakLocs.push(resourceLoc); // add the resource to the soakLoc list
          // resourceLoc.soaked = true; // flag it as soaked (to change ownership)
          resourceLoc.state = LOCSTATE.SOAKED;
        }
      }
    }
    this.digest(); // interpret soaked resources for health
    // console.log("soak(): health for organism " + this.id + " is " + this.health);
    if(this.health < 0){
      this.deletable = true;
      // console.log("soak(): setting organism " + this.id + " as deletable");
    }
  }



  // interact() is the main function for an organism.  It orchestrates most of the
  // activity functions below that act depending on nutrients and surroundings
  // Notes on semantics: I will use the word pixel to identify a location
  // regardless of who inhabits it.  A Loc is an inhabited pixel Location
  this.interact = function() {
    // reset all previous states
    for(var thisLocsIdx = 0; thisLocsIdx < this.locs.length; thisLocsIdx ++){
      var thisLoc = this.locs[thisLocsIdx];
      thisLoc.state = LOCSTATE.IDLE;
    }

    this.interactionLocs = []; // clear interactionLocs
    this.getInteractionLocs(); // gets locs of this organism that may interact
    this.determineInteractionTypes(); // sets interaction Locs to specific type
    // console.log("interact(): " + TIME + " id:" + this.id + " this.interactionLocs.length=" + this.interactionLocs.length);

    for(var interactionLocsIdx = 0; interactionLocsIdx < this.interactionLocs.length; interactionLocsIdx++){
      var interactionLoc = this.interactionLocs[interactionLocsIdx];

      if(interactionLoc.state == LOCSTATE.IDLE){

      } else if (interactionLoc.state == LOCSTATE.DEAD){
        this.die(interactionLoc);
        interactionLoc.state = LOCSTATE.DEAD; // just to make sure state turns to dead for cleanup
      } else if (interactionLoc.state == LOCSTATE.GROWING){
        this.grow(interactionLoc);
      } else if (interactionLoc.state == LOCSTATE.FIGHTING){
        this.fight(interactionLoc);
      } else {
        console.log("Unknown interaction type in organism " + this.id + "of type " + this.type);
      }
    }
  }



  this.show = function() {
    this.updateAppearance();
    for (locsIdx = 0; locsIdx < this.locs.length; locsIdx++) {
      var loc = this.locs[locsIdx];
      // set(loc.pos.x, loc.pos.y, loc.color);
      stroke(loc.color);
      point(loc.pos.x, loc.pos.y);
    }
    // updatePixels();
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

  // function used to initialize appearance of seed Locs
  this.setSeedAppearance = function() {

  }

  // determine health of organism based on previous health and
  this.digest = function() {

    // // decrease health constantly due to metabolic energy tax
    // this.health -= 0.0001 * this.locs.length;

    // Increase health based on nutrients picked up
    for(var soakLocsIdx = 0; soakLocsIdx < this.soakLocs.length; soakLocsIdx++){
      var soakLoc = this.soakLocs[soakLocsIdx];

      if(soakLoc.parent.type == "Rain"){
        this.health += 1;
        soakLoc.state = LOCSTATE.DEAD;
      }
    }
  }

  // Look internally and choose which locs will be interacting
  this.getInteractionLocs = function() {
    // Default is to find locs on edges

    var organismLocMap = getOrganismLocMap();
    for(var x = 0; x < width; x++){
      for(var y = 0; y < height; y++){
        var thisLoc = organismLocMap[x][y];
        if(thisLoc && thisLoc.parent == this){   // If the spot is occupied and the owner is this organism

          // get neighbors
          thisLoc.neighbors = []; // clear out previous neighbors
          for(var neighborIdx = 0; neighborIdx < this.neighborKernel.length; neighborIdx++){
            var neighborx = thisLoc.pos.x + this.neighborKernel[neighborIdx].x;
            var neighbory = thisLoc.pos.y + this.neighborKernel[neighborIdx].y;
            thisLoc.neighbors.push(organismLocMap[neighborx][neighbory]);
          }
          // console.log("getInteractionLocs(): " + thisLoc.neighbors.length);

          // if not all neighbors are same organism
          for(var neighborsIdx = 0; neighborsIdx < thisLoc.neighbors.length; neighborsIdx++){
            var neighbor = thisLoc.neighbors[neighborsIdx];

            if(!neighbor || neighbor.parent != thisLoc.parent){
              this.interactionLocs.push(thisLoc);
              // console.log("(" + thisLoc.pos.x + "," + thisLoc.pos.y + ")");
              // thisLoc.color = color(255,0,0);
              break;
            }
          }
        }
      }
    }

  }

  this.determineInteractionTypes = function() {
    // health delta is comparison of health and size
    var healthDelta = this.health - this.locs.length;
    // console.log("determineInteractionTypes(): " + healthDelta);

    for(var interactionLocsIdx = 0; interactionLocsIdx < this.interactionLocs.length; interactionLocsIdx++){
      var interactionLoc = this.interactionLocs[interactionLocsIdx];

      if(healthDelta <= 0){
        // a health delta of -1 means around 1 loc will die this turn out of the interaction locs
        var probDie = (healthDelta * -1) / this.interactionLocs.length;
        if(!getResultFromProbability(probDie)){
          interactionLoc.state = LOCSTATE.IDLE;

        } else {
          interactionLoc.state = LOCSTATE.DEAD;

        }

      } else if(healthDelta > 0){
        // can fight or grow if health is good.  first determine whether or not to expand
        var probExpand = healthDelta / this.interactionLocs.length;
        if(!getResultFromProbability(probExpand)){ // if no expansion
          interactionLoc.state = LOCSTATE.IDLE; // set to idle
        } else { // if expanding
          // look at neighbor types
          var unoccupiedNeighborIdxs = [];
          var thisOrganismNeighborIdxs = [];
          var occupiedNeighborIdxs = [];
          for(var neighborsIdx = 0; neighborsIdx < interactionLoc.neighbors.length; neighborsIdx++){
            var neighbor = interactionLoc.neighbors[neighborsIdx];
            if(!neighbor){
              unoccupiedNeighborIdxs.push(neighborsIdx);
            } else if (neighbor.parent == this){
              thisOrganismNeighborIdxs.push(neighborsIdx);
            } else if (neighbor.parent != this){
              occupiedNeighborIdxs.push(neighborsIdx);
            } else{
              console.log("determineInteractionTypes(): Unknown neighbor from interactionLoc at ("
              + interactionLoc.pos.x + "," + interactionLoc.pos.y + ")");
            }
          } // for each neighbor

          // determine if expanding through growing or fighting
          if((unoccupiedNeighborIdxs.length + thisOrganismNeighborIdxs.length) > occupiedNeighborIdxs.length &&
              unoccupiedNeighborIdxs != []){
            interactionLoc.state = LOCSTATE.GROWING;
            console.log("determineInteractionTypes(): " + TIME + " marked loc for growing (" + interactionLoc.pos.x + "," + interactionLoc.pos.y + ")");
          } else {
            interactionLoc.state = LOCSTATE. FIGHTING;
          }



        } // if expanding
      } //healthDelta > 0
    } // for each loc

  }

  // function used when interaction is set to die.
  // Loc will be put in a dead state in interaction().  This just handles extra effects
  this.die = function(actionLoc){

  }

  // function used to grow into unoccupied areas
  this.grow = function(actionLoc){
    var possibleGrowLocIdxs = [];
    for (var neighborsIdx = 0; neighborsIdx < actionLoc.neighbors.length; neighborsIdx++){
      var neighbor = actionLoc.neighbors[neighborsIdx];

      if(!neighbor){
        possibleGrowLocIdxs.push(neighborsIdx);
      }
    }

    var growLocIdx = random(possibleGrowLocIdxs); // choose index at random for growning
    console.log("actionLoc.pos.x = " + actionLoc.pos.x);
    console.log("actionLoc.pos.y = " + actionLoc.pos.y);
    console.log("growLocIdx = " + growLocIdx);
    console.log("this.neighborKernel = " + this.neighborKernel);
    console.log("this.neighborKernel[growLocIdx].x = " + this.neighborKernel[growLocIdx].x);
    console.log("this.neighborKernel[growLocIdx].y = " + this.neighborKernel[growLocIdx].y);
    var growLocPos = createVector(
      actionLoc.pos.x + this.neighborKernel[growLocIdx].x,
      actionLoc.pos.y + this.neighborKernel[growLocIdx].y
    )
    this.locs.push(new Loc(this, growLocPos));
  }

  // function for fighting with neighbors
  this.fight = function(actionLoc){

  }

  // Blank function used to update appearance based on age or health
  this.updateAppearance = function() {

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
