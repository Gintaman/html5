let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - document.getElementById('header').getBoundingClientRect().height;

let findControlPoints = function(x0, y0, x1, y1, x2, y2, t) {
	let d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
	let d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	let fa = t*d01/(d01+d12);
	let fb = t*d12/(d01+d12);
	let p1x = x1-fa*(x2-x0);
	let p1y = y1-fa*(y2-y0);
	let p2x = x1+fb*(x2-x0);
	let p2y = y1+fb*(y2-y0);
	return [{x: p1x, y: p1y}, {x: p2x, y: p2y}];
}

ctx.strokeStyle = "black";
ctx.lineCap = "round";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(200, 40);
ctx.bezierCurveTo(220, 260, 35, 200, 120, 160);
ctx.stroke();

//potential modes:
//collaborative animation drawing? take a gif, split it into frames, give each person a frame,
//	let them put it back together? this one is iffy
//nxn mode, let users upload a picture, split it up into nxn squares, each user picks a square and draws it

//these 2 are probably best
//collaborative whiteboard, aka the DMZ, anything goes
//gallery, users can create paintings up to certain size, place them next to each other
let tools = {};

class User {
	constructor() {
		this.strokes = [];
	}
}

//shamelessly taken from eloquentjavascript
let trackDrag = function(onMove, onEnd) {
	let end = function(event) {
		removeEventListener("mousemove", onMove);
		removeEventListener("mouseup", end);
		if(onEnd) {
			onEnd(event);
		}
	};
	addEventListener("mousemove", onMove);
	addEventListener("mouseup", end);
}

let path = [];

let pencil = function(event, ctx, onEnd) {
	ctx.strokeStyle = "black";
	ctx.lineCap = "round";
	ctx.lineWidth = 2;
	let pos = getMousePos(ctx.canvas, event);
	trackDrag((event) => {
		ctx.beginPath();
		ctx.moveTo(pos.x, pos.y);
		pos = getMousePos(ctx.canvas, event);
		ctx.lineTo(pos.x, pos.y);
		//TODO send to server
		path.push({x: pos.x, y: pos.y});
		ctx.stroke();
	}, onEnd);
}


canvas.addEventListener("mousedown", (e) => {
	pencil(e, ctx, function() {
		console.log("end", path.length);
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.beginPath();
		for(let i = 0; i < path.length - 1; i++) {
			ctx.moveTo(path[i].x, path[i].y);
			ctx.lineTo(path[i + 1].x, path[i + 1].y);
			ctx.stroke();
		}
	});
	e.preventDefault();
});


let getMousePos = function(canvas, e) {
	let rect = canvas.getBoundingClientRect();
	return {
		x: Math.floor(e.clientX - rect.left),
		y: Math.floor(e.clientY - rect.top)
	};
}

