let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - document.getElementById('header').getBoundingClientRect().height;

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


let pencil = function(event, ctx, onEnd) {
	ctx.strokeStyle = "black";
	ctx.lineCap = "round";
	let pos = getMousePos(ctx.canvas, event);
	trackDrag((event) => {
		ctx.beginPath();
		ctx.moveTo(pos.x, pos.y);
		pos = getMousePos(ctx.canvas, event);
		ctx.lineTo(pos.x, pos.y);
		//TODO send to server
		paths.push({x: pos.x, y: pos.y});
		ctx.stroke();
	}, onEnd);
}

canvas.addEventListener("mousedown", (e) => {
	pencil(e, ctx);
	e.preventDefault();
});


let getMousePos = function(canvas, e) {
	let rect = canvas.getBoundingClientRect();
	return {
		x: Math.floor(e.clientX - rect.left),
		y: Math.floor(e.clientY - rect.top)
	};
}

