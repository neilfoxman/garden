
var TIME = 0; // time variable
// var LOCS = []; // List of all occupied locations
var ORGANISMS = []; // List of all organisms
var RESOURCES = []; // List of all resources

function setup() {
	// createCanvas(windowWidth, windowHeight);
	createCanvas(500,500);

	console.log("Creating starting organisms...");
	var g1 = new Grass(createVector(width/2, height/2));
	var g2 = new Grass(createVector(ORGANISMS[0].startPos.x + 10, ORGANISMS[0].startPos.y));
	var g3 = new Grass(createVector(ORGANISMS[0].startPos.x, ORGANISMS[0].startPos.y - 20));
	var r1 = new Rain();

	console.log("Seeding...");
	for(var organismsIdx = 0; organismsIdx < ORGANISMS.length; organismsIdx++){
		ORGANISMS[organismsIdx].seed();
	}


	console.log("Setup Complete.");
	// noLoop();
}




function draw() {
	TIME++;
	background(210);
	// line(mouseX, 0, mouseX, 100);

	// Cycle resources
	// console.log("Cycling resources...");
	for(var i = 0; i<RESOURCES.length; i++){
		RESOURCES[i].cycle();
	}

	// Age organisms
	// console.log("Aging organisms...");
	for(var i = 0; i < ORGANISMS.length; i++){
		ORGANISMS[i].age();
	}

	// Organisms collect resources
	// console.log("Soaking...");
	for(var i = 0; i < ORGANISMS.length; i++){
		ORGANISMS[i].soak();
	}
	refreshLocs();


	// Organisms do stuff depending on surrounding organisms
	// console.log("Interacting...");
	for(var i = 0; i < ORGANISMS.length; i++){
		ORGANISMS[i].interact();
	}

	// show results
	// console.log("Displaying...");
	for(var i = 0; i < ORGANISMS.length; i++){
		ORGANISMS[i].show();
	}
	for(var i = 0; i<RESOURCES.length; i++){
		RESOURCES[i].show();
	}

}


function refreshLocs(){
	ORGANISMS = ORGANISMS.filter(function(organism){return(!organism.deletable)}); // remove dead organisms

	for(var organismsIdx = 0; organismsIdx < ORGANISMS.length; organismsIdx++){
		var organism = ORGANISMS[organismsIdx];

		//remove deletable locs from organism locs lists
		organism.locs = organism.locs.filter(function(organismLoc){return(!organismLoc.deletable)});
		organism.soakLocs = organism.soakLocs.filter(function(organismSoakLoc){return(!organismSoakLoc.deletable)});
	}

	for(var resourcesIdx = 0; resourcesIdx < RESOURCES.length; resourcesIdx++){
		var resource = RESOURCES[resourcesIdx];

		//remove soaked locs from resource ownership
		resource.locs = resource.locs.filter(function(resourceLoc){return(!resourceLoc.soaked)});
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





function getAllLocs(){
	var retLocs = [];
	for(var organismsIdx = 0; organismsIdx < ORGANISMS.length; organismsIdx++){
		var organism = ORGANISMS[organismsIdx];
		for(var organismLocsIdx = 0; organismLocsIdx < organism.locs.length; organismLocsIdx++){
			var organismLoc = organism.locs[organismLocsIdx];
			retLocs.push(organismLoc);
		}
	}
	return(retLocs);
}
