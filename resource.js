var idCounterRes = 1;

function Resource(){
  this.id = idCounterRes++;
  this.locs = [];
  this.age = function(){
  }
}

function Rain(){
  Resource.call(this);
  this.c = color(0,0,255);

  this.age = function(){
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
