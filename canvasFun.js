let canvas = document.getElementById("main");
let ctx = canvas.getContext("2d");
let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
ctx.fillStyle = gradient;
ctx.fillRect(0, 100, canvas.width, 30);

Math.quadEaseInOut = function(t) {
	t *= 2;
	if(t < 1) {
		return t * t / 2;
	}
	t -= 1;
	return (t * (t - 2) - 1) / -2;
}

console.log(Math.quadEaseInOut(0.9));
console.log(Math.quadEaseInOut(0.2));

let firstStop = 1;
let secondStop = 3;
let thirdStop = 5;
let draw = setInterval(() => {
	//console.log(((firstStop += 2) % 100) / 100, ((secondStop += 2) % 100) / 100, ((thirdStop += 2) % 100) / 100);
	gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height / 2);
	gradient.addColorStop(Math.quadEaseInOut(((firstStop += 2) % 100) / 100), '#009933');
	gradient.addColorStop(Math.quadEaseInOut(((secondStop += 2) % 100) / 100), '#00cc00');
	gradient.addColorStop(Math.quadEaseInOut(((thirdStop += 2) % 100) / 100), '#009933');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 100, canvas.width, 30);
}, 20);

/*let draw;
setInterval(() => {
	draw = setInterval(() => {
		gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height / 2);
		gradient.addColorStop(((firstStop += 2) % 100) / 100, '#009933');
		gradient.addColorStop(((secondStop += 2) % 100) / 100, '#00cc00');
		gradient.addColorStop(((thirdStop += 2) % 100) / 100, '#009933');
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 100, canvas.width, 30);
	}, 20);
	clearInterval(draw);
}, 5000);*/
