var canvas;
var ctx;
var axiom = 'F';
var newF = '-F+F+[+F-F-]-[-F+F+F]';
var deltaAngle = Math.PI / 8;
var iterations = 0;
var currentAxiom = axiom;
var startPoint = new Point(400, 500);
var startAngle = -Math.PI / 2;
var stepLength = 15;
var offset = new Point(0, 0);

function generate() {
	axiom = document.getElementById("axiomField").value;
	newF = document.getElementById("ruleField").value;
	iterations = document.getElementById("iterationsField").value;
	deltaAngle = Math.PI / document.getElementById("angleField").value;
	currentAxiom = getTransformation(axiom, newF, iterations);
	drawAxiom();
}

function drawAxiom() {
	ctx.fillStyle = "#ffffff";
	ctx.strokeStyle = "#000";
	ctx.strokeWidth = 1;
	
	ctx.fillRect(offset.x, offset.y, canvas.width, canvas.height);
	ctx.strokeRect(offset.x, offset.y, canvas.width, canvas.height);
	var point = startPoint;
	var angle = startAngle;
	var step = stepLength;
	ctx.strokeWidth = 2;
	ctx.beginPath();
	ctx.moveTo(point.x, point.y);
	var positionsStack = [];
	for (var i = 0; i < currentAxiom.length; ++i) {
		switch (currentAxiom.charAt(i)) {
			case 'F':
				ctx.lineTo(point.x + step * Math.cos(angle), point.y + step * Math.sin(angle));
				point = new Point(point.x + step * Math.cos(angle), point.y + step * Math.sin(angle));
				break;
			case '+':
				angle -= deltaAngle;
				break;
			case '-':
				angle += deltaAngle;
				break;
			case '[':
				positionsStack.push( { x: point.x, y: point.y, a: angle } );
				break;
			case ']':
				ctx.stroke();
				var tmp = positionsStack.pop();
				point.x = tmp.x;
				point.y = tmp.y;
				angle = tmp.a;
				ctx.beginPath();
				ctx.moveTo(point.x, point.y);
				break;
		}
		if (i == currentAxiom.length - 1)
			ctx.stroke();
	}
}

function getTransformation(axiom, newF, iterations) {
	if (iterations == 0) return axiom;
	var result = "";
	for (var i = 0; i < axiom.length; ++i) {
		if (axiom.charAt(i) == 'F')
			result += newF;
		else
			result += axiom.charAt(i);
	}
	return getTransformation(result, newF, iterations - 1);
}

var lmbpressed = false;
var lastMousePoint;
function load() {
	canvas = document.getElementById("mCanvas");
	ctx = canvas.getContext('2d');
	currentAxiom = getTransformation(axiom, newF, iterations);
	drawAxiom();
	window.onmousewheel = function (e) {
		if (!lmbpressed) {
			if (e.wheelDelta > 0) {
				stepLength += 0.5;
			} else {
				stepLength -= 0.5;
			}
			drawAxiom();
		}
	};
	window.onmousedown = function () {
		lmbpressed = true;
	};
	window.onmouseup = function () {
		lmbpressed = false;
		lastMousePoint = null;
	};
	canvas.onmousemove = function (e) {
		if (lmbpressed) {
			if (lastMousePoint) {
				ctx.translate(e.pageX - lastMousePoint.x, e.pageY - lastMousePoint.y);
				offset.x -= e.pageX - lastMousePoint.x;
				offset.y -= e.pageY - lastMousePoint.y;
				drawAxiom();
			}
			lastMousePoint = new Point(e.pageX, e.pageY);
		}
	}
}

var lmbpressed = false;
var lastMousePoint;
function load() {
	canvas = document.getElementById("mCanvas");
	ctx = canvas.getContext('2d');
	currentAxiom = getTransformation(axiom, newF, iterations);
	drawAxiom();
	
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}