var idCounterResource = 1;

function Resource(){
  this.id = idCounterResource++;
  this.entityType = "Resource";
  this.type = "Unassigned";
  this.locs = [];
  this.ageCounter = 0;

  RESOURCES.push(this);

  this.cycle = function(){
    console.log("Resource " + this.id + " of type " + this.type + " has unassigned cycle() function.");
  }

  this.show = function() {
    for (locsIdx = 0; locsIdx < this.locs.length; locsIdx++) {
      var loc = this.locs[locsIdx];
      // set(loc.pos.x, loc.pos.y, loc.color);
      stroke(loc.color);
      point(loc.pos.x, loc.pos.y);
    }
    // updatePixels();
  }
}

function Rain(){
  Resource.call(this);
  this.type = "Rain";
  this.c = color(0,0,255);

  this.cycle = function(){
    this.ageCounter++;

    for (var locIdx = 0; locIdx < this.locs.length; locIdx++){
      var thisLoc = this.locs[locIdx];
      thisLoc.ageCounter++;
      if(thisLoc.ageCounter > 100) {
        thisLoc.state = LOCSTATE.DEAD;
      }
    }

    for(var pxx = 0; pxx < width; pxx++){
      for(var pxy = 0; pxy < height; pxy++){
        // console.log(pxx + " " + pxy);
        if(oneOutOf(10000)){
          var newLoc = new Loc(this, createVector(pxx, pxy));
          newLoc.color = this.c;
          this.locs.push(newLoc);
        }
      }
    }




  }
}
