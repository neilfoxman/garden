
var t = 0; // time variable
var organisms = [];
var resources = [];

function setup() {
	// createCanvas(windowWidth, windowHeight);
	createCanvas(500,500);

	organisms.push(new Grass(createVector(width/2, height/2)));
	organisms.push(new Grass(createVector(organisms[0].startPos.x + 5, organisms[0].startPos.y)));
	resources.push(new Rain());

	for(var organismsIdx = 0; organismsIdx < organisms.length; organismsIdx++){
		organisms[organismsIdx].seed();
	}

	// var g = organisms[0]
	// console.log("Organism age: " + g.ageCounter)
	// for(var idxLoc = 0; idxLoc < g.locs.length; idxLoc++){
	// 	locAge = g.locs[idxLoc].ageCounter;
	// 	console.log("loc age:" + locAge);
	// }


	noLoop();
}




function draw() {
	t++;
	background(210);
	var numResources = resources.length;
	var numOrganisms = organisms.length;

	// Cycle resources
	for(var i = 0; i<numResources; i++){
		resources[i].cycle();
	}

	// Age organisms
	for(var i = 0; i < numOrganisms; i++){
		organisms[i].age();
	}

	// Organisms collect resources
	for(var i = 0; i < numOrganisms; i++){
		organisms[i].soak(resources);
	}

	// Organisms do stuff depending on surrounding organisms
	for(var i = 0; i < numOrganisms; i++){
		organisms[i].interact(organisms);
	}

	// show results
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
