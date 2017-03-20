var ctx = document.querySelector("canvas").getContext("2d");

var AXIOM, NEW_F, Q, S, N;
var POINT = {x: 0, y: 0, a: 0};
var LANGUAGES_SELECT = myForm.language;

function Fractals(){
	var selectedOption = LANGUAGES_SELECT.options[LANGUAGES_SELECT.selectedIndex];
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
	POINT.x -= S*Math.cos(-POINT.a*Math.PI/180);
	POINT.y -= S*Math.sin(-POINT.a*Math.PI/180);
	ctx.lineTo(POINT.x , POINT.y);
}
function MakeNewF(){
	let str = "";
	for(var i=0; i<N; i++){
		str = "";
		for(var comandAxiom of AXIOM){
			if(comandAxiom == "F")
				str += NEW_F;
			else
				str += comandAxiom;
		}
		AXIOM = str;
	}
	return AXIOM;
}
function DrawLSystem(){
	let teleport;
	let stack = [];
	for(var comand of NEW_F){
		switch(comand){
			case 'F':
				F();
			break;
			case '-':
				POINT.a -= Q;
			break;
			case '+':
				POINT.a += Q;
			break;
			case '[':
				stack.push({x: POINT.x, y: POINT.y, a: POINT.a});
			break;
			case ']':
				teleport = stack.pop();
				POINT.x = teleport.x;
				POINT.y = teleport.y;
				POINT.a = teleport.a;
				ctx.moveTo(POINT.x, POINT.y);
			break;
		}
	}
}
function Universal(){
	NEW_F = MakeNewF();
	DrawLSystem();
}
function Start(){
	ctx.clearRect(0, 0, document.querySelector("canvas").clientWidth, document.querySelector("canvas").clientHeight);
	AXIOM = document.getElementById("axiom").value;
	NEW_F = document.getElementById("newF").value;
	N = parseInt(document.getElementById("n").value);
	S = parseFloat(document.getElementById("s").value);
	Q = parseFloat(document.getElementById("q").value);
	POINT.x = parseFloat(document.getElementById("x").value);
	POINT.y = parseFloat(document.getElementById("y").value);
	POINT.a = parseFloat(document.getElementById("a").value);
	ctx.beginPath();
	ctx.moveTo(POINT.x, POINT.y);
	Universal();
	ctx.stroke();
}
addEventListener("keydown", function(event) {
    if (event.code == "Enter")	Start();
 });
 LANGUAGES_SELECT.addEventListener("change", Fractals);