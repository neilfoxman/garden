var idCounterOrganism = 1;

function Organism(startPos){
  this.id = idCounterOrganism++;
  this.type = "Unassigned";
  this.startPos = startPos;
  this.locs = []; // points that relate to the organism (to be filled on the screen)
  this.ageCounter = 0;


  // Create Seed
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


  // Location occupied by current organism
  function Loc(parent, pos){
    this.parentOrganism = parent; // reference to containing organism
    this.pos = pos; // actual xy position
    this.color = color(0); // color to show
    this.spent = false; // boolean indicating if location has interacted this round
  }

  this.soak = function() {
    // gather all nutrients
  }

  // Main function that acts depending on nutrients and surroundings
  this.age = function(){
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
    for(idxLoc = 0; idxLoc < this.locs.length; idxLoc++){
      var loc = this.locs[idxLoc];
      set(loc.pos.x, loc.pos.y, loc.color);
    }
    updatePixels();
  };
}


function Grass(startPos){
  Organism.call(this, startPos);
  this.type = "Grass";
  // console.log(startPos);


}
