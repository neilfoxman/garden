
var t = 0; // time variable
var organisms = [];
var resources = [];

function setup() {
	// createCanvas(windowWidth, windowHeight);
	createCanvas(500,500);

	organisms.push(new Grass(width/2, height/2));
	resources.push(new Rain());

	console.log(organisms[0].testLoc.parent);
}




function draw() {
	t++;
	background(210);

	var numOrganisms = organisms.length;
	for(var i = 0; i < numOrganisms; i++){
		var organism = organisms[i];
		// console.log(organism.id);

		organism.age();
	}

	var numResources = resources.length;
	for(var i = 0; i<numResources; i++){
		var resource = resources[i];

		resource.age();
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
