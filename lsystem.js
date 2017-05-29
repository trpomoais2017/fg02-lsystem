"use strict"

function draw(len, angle, coords, path, q) {
    console.log(path);
    let canvas = document.getElementById("lsystem");
    let canvasHeight = parseInt(canvas.getAttribute("height"));
    let canvasWidth = parseInt(canvas.getAttribute("width"));

    let context = canvas.getContext('2d');

    context.lineWidth = "1";
    context.strokeStyle = "0000FF";

    let newF;
    let xStack = new Array();
    let yStack = new Array();
    let angleStack = new Array();

    newF = path.split("");

    for (let i = 0; i < newF.length; i++) {
        switch (newF[i]) {
            case "F":
                drawLine(context, len, coords, angle);
                break;
            case "[":
                xStack.push(coords.x);
                yStack.push(coords.y);
                angleStack.push(angle);
                break;
            case "]":
                coords.x = xStack.pop();
                coords.y = yStack.pop();
                angle = angleStack.pop();                
                break;
            case "+":
                angle += q;
                break;
            case "-":
                angle -= q;
                break;
        }
    }
}

function drawLine(context, len, coords, q) {

    context.beginPath();
    context.moveTo(coords.x, coords.y);

    coords.x = coords.x + len * Math.cos(q);
    coords.y = coords.y + len * Math.sin(q);

    context.lineTo(coords.x, coords.y);
    context.stroke();
}

function drawFract(axiom, newF, len, q, coords, angle, iterations) {
    let stack = new Array();
    let newAxiom = "";
    let temp = 0;    
    for(let i = 0; i < axiom.length; i++) {
        if(axiom.charAt(i) === 'F') {
            stack.push(axiom.substring(temp, i));
            stack.push(newF);
            temp = i + 1;
        }
    }
    stack.push(axiom.substring(temp, axiom.length));   
    for(let i = 0; i < stack.length; i++) {
        newAxiom += stack[i];
    }
    if(iterations > 1) {
        drawFract(newAxiom, newF, len, q, coords, angle, iterations - 1);
        return;
    }
    draw(len, angle, coords, newAxiom, q);    
}

function bush() {
    var len = document.getElementById("length").value;
    var angle = document.getElementById("angle").value;
    var iterations = document.getElementById("iterations").value;
    var coords = {x: 100, y: 300};

    drawFract("F", "-F+F+[+F-F-]-[-F+F+F]", len, Math.PI / 8, coords, angle, iterations);
}

function snowflake() {
    var len = parseInt(document.getElementById("length").value);
    var angle = parseInt(document.getElementById("angle").value);
    var iterations = parseInt(document.getElementById("iterations").value);

    drawFract("[F]+[F]+[F]+[F]+[F]+[F]", "F[+FF][-FF]FF[+F][-F]FF", len, Math.PI / 3, {x: 250, y: 250}, angle, iterations);
}