"use strict";

const DEF_WIDTH = 1000;
const DEF_HEIGHT = 600;

function getData() {
	window.axiom = document.getElementById("axiom").value.split("");
	window.newF = document.getElementById("newF").value.split("");
	window.q = parseInt(document.getElementById("q").value);
	window.n = parseInt(document.getElementById("n").value);
	window.s = parseInt(document.getElementById("s").value);
	var pointX = parseInt(document.getElementById("point-x").value);
	var pointY = parseInt(document.getElementById("point-y").value);
	var pointA = parseInt(document.getElementById("point-a").value);
	window.point = {x: pointX, y: pointY, a: pointA};
	window.canvas = document.getElementById("canvas");
	window.ctx = canvas.getContext('2d');
	window.stack = [];	
}

function snowflake() {
	document.getElementById("axiom").value = "[F]+[F]+[F]+[F]+[F]+[F]";
	document.getElementById("newF").value = "F[+FF][-FF]FF[+F][-F]FF";
	document.getElementById("q").value = 60;
	document.getElementById("n").value = 3;
	document.getElementById("s").value = 2;
	document.getElementById("point-x").value = 500;
	document.getElementById("point-y").value = 300;
	document.getElementById("point-a").value = 0;
}

function bush() {
	document.getElementById("axiom").value = "F";
	document.getElementById("newF").value = "-F+F+[+F-F-]-[-F+F+F]";
	document.getElementById("q").value = 22.5;
	document.getElementById("n").value = 4;
	document.getElementById("s").value = 10;
	document.getElementById("point-x").value = 100;
	document.getElementById("point-y").value = 400;
	document.getElementById("point-a").value = -45;
}

function transform() {
	for(var i = 0; i < n; i++) {
		for(var j = 0; j < axiom.length; j++) {
 			if(axiom[j] === "F") {
 				axiom.splice.apply(axiom, [j, 1].concat(newF));
 				j += newF.length - 1;
 			}
		}
	} 	
}

function movePoint() {
	point.x += s*Math.cos(point.a*Math.PI/180);
	point.y += s*Math.sin(point.a*Math.PI/180);
}

function draw() {
	for(var i = 0; i < axiom.length; i++) {
		switch(axiom[i]) {
			case "F": 
				movePoint();
				ctx.lineTo(point.x, point.y); 
				break;
			case "[": 
				stack.push({x: point.x, y: point.y, a: point.a}); 
				break;
			case "]": 
				var oldP = stack.pop(); 
				point.x = oldP.x; 
				point.y = oldP.y; 
				point.a = oldP.a; 
				ctx.moveTo(point.x, point.y); 
				break;
			case "+": 
				point.a -= q; 
				break;
			case "-": 
				point.a += q; 
				break;
		}
	}
}

function scaling() {
	canvas.height = DEF_HEIGHT;
	canvas.width = DEF_WIDTH;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var scaleVal = document.getElementById("scaleRange").value;
	ctx.scale(scaleVal, scaleVal);
	build();
}

function build() {
	getData();
	transform();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.moveTo(point.x, point.y);
	draw();
	ctx.stroke();
}