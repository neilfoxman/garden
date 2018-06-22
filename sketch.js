
var t = 0; // time variable
var organisms = [];
var resources = [];

function setup() {
	// createCanvas(windowWidth, windowHeight);
	createCanvas(500,500);

	organisms.push(new Grass(createVector(width/2, height/2)));
	organisms[0].seed();
	resources.push(new Rain());

}




function draw() {
	t++;
	background(210);
	var numResources = resources.length;
	var numOrganisms = organisms.length;

	for(var i = 0; i<numResources; i++){
		resources[i].cycle();
	}

	for(var i = 0; i < numOrganisms; i++){
		organisms[i].soak();
	}

	for(var i = 0; i < numOrganisms; i++){
		organisms[i].age();
	}


	for(var i = 0; i < numOrganisms; i++){
		organisms[i].show();
	}




}




function oneOutOf(chance){
	var outcome = random(chance);
	if(outcome < 1){
		return true;
	}
	else{
		return false;
	}

}
