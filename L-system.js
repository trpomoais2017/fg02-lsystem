var ctx = document.querySelector("canvas").getContext("2d");

var newF, q, s, n;
var stack = [];
var axiom, str = "";
var point = {x: 0, y: 0, a: 0};
var teleport;
var languagesSelect = myForm.language;

function Fractals(){
	var selectedOption = languagesSelect.options[languagesSelect.selectedIndex];
	switch(selectedOption.text){
		case "Куст":												
			document.getElementById("axiom").value = "F";
			document.getElementById("newF").value = "-F+F+[+F-F-]-[-F+F+F]";
			document.getElementById("q").value = 22.5;
			document.getElementById("n").value = 4;
			document.getElementById("s").value = 10;
			document.getElementById("x").value = 300;
			document.getElementById("y").value = 470;
			document.getElementById("a").value = 250;
			break;
		case "Снежинка":
			document.getElementById("axiom").value = "[F]+[F]+[F]+[F]+[F]+[F]";
			document.getElementById("newF").value = "F[+FF][-FF]FF[+F][-F]FF";
			document.getElementById("q").value = 60;
			document.getElementById("n").value = 3;
			document.getElementById("s").value = 2;
			document.getElementById("x").value = 450;
			document.getElementById("y").value = 300;
			document.getElementById("a").value = 0;
			break;
	}
	Start();
}
function F(){
	point.x -= s*Math.cos(-point.a*Math.PI/180);
	point.y -= s*Math.sin(-point.a*Math.PI/180);
	ctx.lineTo(point.x , point.y);
}
function Universal(){
	for(var i=0; i<n; i++){
		str = "";
		for(var comandAxiom of axiom){
			if(comandAxiom == "F")
				str += newF;
			else
				str += comandAxiom;
		}
		axiom = str;
	}
	newF = axiom;
	
	for(var comand of newF){
		switch(comand){
			case 'F':
				F();
			break;
			case '-':
				point.a -= q;
			break;
			case '+':
				point.a += q;
			break;
			case '[':
				stack.push({x: point.x, y: point.y, a: point.a});
			break;
			case ']':
				teleport = stack.pop();
				point.x = teleport.x;
				point.y = teleport.y;
				point.a = teleport.a;
				ctx.moveTo(point.x, point.y);
			break;
		}
	}
}
function Start(){
	ctx.clearRect(0, 0, document.querySelector("canvas").clientWidth, document.querySelector("canvas").clientHeight);
	axiom = document.getElementById("axiom").value;
	newF = document.getElementById("newF").value;
	n = parseInt(document.getElementById("n").value);
	s = parseFloat(document.getElementById("s").value);
	q = parseFloat(document.getElementById("q").value);
	point.x = parseFloat(document.getElementById("x").value);
	point.y = parseFloat(document.getElementById("y").value);
	point.a = parseFloat(document.getElementById("a").value);
	ctx.beginPath();
	ctx.moveTo(point.x, point.y);
	Universal();
	ctx.stroke();
}
addEventListener("keydown", function(event) {
    if (event.code == "Enter")	Start();
 });
 languagesSelect.addEventListener("change", Fractals);