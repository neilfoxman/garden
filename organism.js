var idCounterOrg = 1;

function Organism(x,y){
  this.id = idCounterOrg++;
  this.x = x;
  this.y = y;
  this.body = [];

  this.ageCounter = 0;
  this.age = function(){
    console.log("Organism " + this.id + " has unassigned age() function.");
  };
}


function Grass(x, y){
  Organism.call(this, x, y);
  this.pxs = [];
  // this.points.push
  this.age = function(){
    this.ageCounter++;
    // console.log("grass aged");
    // console.log("x:" + this.x + " y:" + this.y);
    fill(255,0,0);
    noStroke();
    // ellipse(this.x, this.y, this.ageCounter, this.ageCounter)
  }


}
