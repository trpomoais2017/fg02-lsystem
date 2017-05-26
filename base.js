var deg = Math.PI / 180;
var canvas = document.getElementById("canvas1");
var canvasHeight = parseInt(canvas.getAttribute("height"));
var canvasWidth = parseInt(canvas.getAttribute("width"));
var context = canvas.getContext('2d');
var transform = function (str, rulOf, rulTo, n) 
{
	var retStr = "";
	for (n; n > 0; n--) {
		var j = 0;
		retStr = "";
		for (var i = 0; i < str.length; i++) {
			if (str[i] == rulOf) {
					retStr += rulTo;
			}
			else
				retStr += str[i];
		}
		str = retStr;
	}
	return retStr;
}

var print = function (str, x, y, s, q) 
{

	context.lineWidth = "2";
	context.strokeStyle = "black";
	var a = 0;
	q = q * deg;
	var mem = [];
	context.save();
	context.beginPath();
	for (var i = 0; i < str.length; i++) {
		context.save();
		switch (str[i]) {
			case 'F':
				context.moveTo(x, y);
				var xs = x + s;
				var x1 = (xs - x) * Math.cos(a) + x; // (y-y)*Math.sin(a) = 0 
				var y1 = (xs - x) * Math.sin(a) + y; // (y-y)*Math.sin(a) = 0 
				x = x1;
				y = y1;
				context.lineTo(x, y);
				context.restore();
				break;

			case '+':
				a -= q;
				break;

			case '-':
				a += q;
				break;

			case '[':
				mem.push(x);
				mem.push(y);
				mem.push(a);
				break;

			case ']':
				a = mem.pop();
				y = mem.pop();
				x = mem.pop();
				break;

			default:
				break;
		}
	}
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
}

function run()
{
	print(transform("[F]+[F]+[F]+[F]+[F]+[F]", "F", "F[+FF][-FF]FF[+F][-F]FF", 4), 1000, 1000, 1, 60);
}

function qcheck(q) 
{
	var piFound = false;
	for (var i = 0; i < q.length; i++) {
		if (q[i] == "p" && i < (q.length - 3)) {
			if (q[i + 1] == "i") {
				piFound = true;
			}
		}
	}
	if (q == "")
		return "";
	if (!isNaN(q))
		return parseFloat(q);
	if (piFound == false)
		return "";
	else {
		var numerator = "";
		var denominator = "";
		var dFound = false;
		for (var i = 0; i < q.length; i++) {
			if (q[i] == "p")
				i += 2;
			if (q[i] == "/") {
				dFound = true;
				i++;
			}
			if (dFound)
				denominator += q[i];
			else
				numerator += q[i];
		}
		if (numerator == "")
			numerator = "1";
		if (isNaN(numerator))
			return 60;
		if (isNaN(denominator))
			return 60;
		return ((parseFloat(numerator) * 180) / parseFloat(denominator));
	}
}

function lsystem() 
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	var axiom = "F";
	var n = 5;
	var xO = 100;
	var yO = 100;
	var s = 10;
	var q = 22.5;
	var ofWhat = "F";
	var toWhat = "-F+F+[+F-F-]-[-F+F+F]";
	if (!isNaN(parseInt(document.getElementById("inputN").value)))
		n = Math.abs(parseInt(document.getElementById("inputN").value));
	if (!isNaN(parseInt(document.getElementById("inputX").value)))
		xO = Math.abs(parseInt(document.getElementById("inputX").value));
	if (!isNaN(parseInt(document.getElementById("inputY").value)))
		yO = Math.abs(parseInt(document.getElementById("inputY").value));
	if (!isNaN(parseInt(document.getElementById("inputS").value)))
		s = Math.abs(parseInt(document.getElementById("inputS").value));
	q = document.getElementById("inputQ").value;
	q = qcheck(q);
	axiom = document.getElementById("inputAxiom").value;
	ofWhat = document.getElementById("inputOF").value;
	toWhat = document.getElementById("inputTO").value;
	if (q == "")
		q = 22.5;
	if (axiom == "")
		axiom = "F";
	if (ofWhat == "" || ofWhat.length > 1)
		ofWhat = "F";
	if (toWhat == "")
		toWhat = "-F+F+[+F-F-]-[-F+F+F]";
	print(transform(axiom, ofWhat, toWhat, n), xO, yO, s, q);
}