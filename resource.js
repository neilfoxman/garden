var idCounterResource = 1;

function Resource(){
  this.id = idCounterResource++;
  this.type = "Unassigned";

  this.cycle = function(){
    console.log("Resource " + this.id + " of type " + this.type + " has unassigned cycle() function.");
  }
}

function Rain(){
  Resource.call(this);
  this.type = "Rain";
  this.c = color(0,0,255);

  this.cycle = function(){
    for(var pxx = 0; pxx < width; pxx++){
      for(var pxy = 0; pxy < height; pxy++){
        // console.log(pxx + " " + pxy);
        if(oneOutOf(10000)){
          set(pxx, pxy, this.c);
        }
      }
    }
    updatePixels();
  }
}
