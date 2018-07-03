
var t = 0; // time variable
var LOCS = []; // List of all occupied locations
var ORGANISMS = []; // List of all organisms
var RESOURCES = []; // List of all resources

function setup() {
	// createCanvas(windowWidth, windowHeight);
	createCanvas(500,500);

	var g1 = new Grass(createVector(width/2, height/2));
	var g2 = new Grass(createVector(ORGANISMS[0].startPos.x + 10, ORGANISMS[0].startPos.y));
	var g3 = new Grass(createVector(ORGANISMS[0].startPos.x, ORGANISMS[0].startPos.y - 10));
	var r1 = new Rain();

	for(var organismsIdx = 0; organismsIdx < ORGANISMS.length; organismsIdx++){
		ORGANISMS[organismsIdx].seed();
	}



	noLoop();
}




function draw() {
	t++;
	background(210);
	var numResources = RESOURCES.length;
	var numOrganisms = ORGANISMS.length;

	// Cycle resources
	console.log("Cycling resources...");
	for(var i = 0; i<numResources; i++){
		RESOURCES[i].cycle();
	}

	// Age organisms
	console.log("Aging organisms...");
	for(var i = 0; i < numOrganisms; i++){
		ORGANISMS[i].age();
	}

	// Organisms collect resources
	console.log("Soaking...");
	for(var i = 0; i < numOrganisms; i++){
		ORGANISMS[i].soak();
	}

	// Organisms do stuff depending on surrounding organisms
	console.log("Interacting...");
	for(var i = 0; i < numOrganisms; i++){
		ORGANISMS[i].interact();
	}

	// show results
	console.log("Displaying...");
	for(var i = 0; i < numOrganisms; i++){
		ORGANISMS[i].show();
	}

}


function refreshLocs(){
	// console.log("refreshLocs(): started");
	// empty LOCS and only re-add organism locs not marked as deletable
	LOCS = [];
	for(var organismsIdx = 0; organismsIdx < ORGANISMS.length; organismsIdx++){
		var organism = ORGANISMS[organismsIdx];

		//remove deletable locs from organism locs list
		organism.locs = organism.locs.filter(function(organismLoc){return(!organismLoc.deletable)});

		// add final locs to LOCS
		for(var organismLocsIdx = 0; organismLocsIdx < organism.locs.length; organismLocsIdx++){
			var organismLoc = organism.locs[organismLocsIdx]
			LOCS.push(organismLoc);
		}

		// var skipped = 0;
		// for (var locIdx = 0; locIdx < organism.locs.length; locIdx++){
		// 	var loc = organism.locs[locIdx];
		// 	if(!loc.deletable){
		// 		LOCS.push(loc);
		// 	} else{
		// 		// console.log("refreshLocs(): skipping " + loc.pos.x + ", " + loc.pos.y + " of organism " + loc.parent.id);
		// 		skipped++;
		// 	}
		// }
		// console.log("refreshLocs(): Skipped deletables of organism " + organism.id + ". Skipped " + skipped);
		// console.log("refreshLocs(): LOCS is now of length " + LOCS.length);
	}
	// console.log("refreshLocs(): Cycled through all organisms. LOCS length is now " + LOCS.length);

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
