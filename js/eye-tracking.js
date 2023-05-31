webgazer.clearData;
webgazer.setGazeListener(function(data, elapsedTime) {
	// console.log(data, elapsedTime); //elapsed time is based on time since begin was called
}).begin();



function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255,255,255)
	fill(0,0,0)
	cx = [];
	cy = [];
	for (let i = 1; i < 10; i++) {
	cx[i] = windowWidth/2 + sin(radians(45*(i-1)))*windowHeight/3
	cy[i] = windowHeight/2 - cos(radians(45*(i-1)))*windowHeight/3
	}
}

function draw(){
	frameRate(60);
	background(255,255,255);

	textAlign(LEFT, CENTER);
	textSize(32);

	text('ㄱ', cx[1], cy[1]);
	text('ㄴ', cx[2], cy[2]);
	text('ㄷ', cx[3], cy[3]);
	text('ㅂ', cx[4], cy[4]);
	text('space', cx[5], cy[5]);
	text('ㅅ', cx[6], cy[6]);
	text('ㅈ', cx[7], cy[7]);
	text('ㅇ', cx[8], cy[8]);
}
