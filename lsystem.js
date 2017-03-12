"use strict";

var scaleVal, startx, starty, startAngle;
var angle = 0;
var stepSize = 50;
var axiom = "F";
var lSysString = axiom;
var drawLetters = [];
var moveLetters = [];
var backgroundColor = 80;
var strokeColor = 0;
var lenReduceValue = 2 / 3;
var rule;

function setup() {
    createCanvas(900, 600);
    background(backgroundColor);
    stroke(strokeColor);
    strokeWeight(0.1);
    initLetters();
}

function initLetters() {
    drawLetters.push("F");
    moveLetters.push("f");
}

function initLSystem() {
    axiom = document.getElementById("axiom").value;
    angle = document.getElementById("angle").value;
    stepSize = document.getElementById("stepSize").value;
    startx = document.getElementById("startx").value;
    starty = document.getElementById("starty").value;
    scaleVal = document.getElementById("scale").value;
    startAngle = document.getElementById("startAngle").value;

    var ruleString = document.getElementById("rule").value;
    var partsOfRule = ruleString.split("->");
    rule = { pred: partsOfRule[0], succ: partsOfRule[1] };

    lSysString = axiom;
}

function turtle() {
    background(backgroundColor);
    resetMatrix();
    translate(startx, starty);
    rotate(radians(startAngle));
    scaleVal = document.getElementById("scale").value;
    scale(scaleVal, scaleVal);

    for (var i = 0; i < lSysString.length; i++) {

        var currentSymbol = lSysString.charAt(i);

        if (drawLetters.includes(currentSymbol)) {
            line(0, 0, 0, -stepSize);
            translate(0, -stepSize);
            continue;
        }
        if (moveLetters.includes(currentSymbol)) {
            translate(0, -stepSize);
            continue;
        }
        if (currentSymbol == "+") {
            rotate(radians(angle));
            continue;
        }
        if (currentSymbol == "-") {
            rotate(radians(-angle));
            continue;
        }
        if (currentSymbol == "[") {
            push();
            continue;
        }
        if (currentSymbol == "]") {
            pop();
            continue;
        }
    }
}

function applyRule() {
    var resultString = "";
    var currentSymbol;
    for (var i = 0; i < lSysString.length; i++) {
        currentSymbol = lSysString.charAt(i);
        if (currentSymbol == rule.pred) {
            resultString += rule.succ;
        } else {
            //Если не нашли символ, удовлетворяющий правилам, то просто пишем в строку текущий символ
            resultString += currentSymbol;
        }
    }
    lSysString = resultString;
    stepSize *= lenReduceValue;
}

function bush() {
    document.getElementById("axiom").value = "F";
    document.getElementById("rule").value = "F->-F+F+[+F-F-]-[-F+F+F]";
    document.getElementById("angle").value = 22.5;
    document.getElementById("startx").value = width / 2;
    document.getElementById("starty").value = height;
    document.getElementById("stepSize").value = height / 15;
    document.getElementById("startAngle").value = 10;
    lenReduceValue = 1 / 2;
}

function snowflake() {
    document.getElementById("axiom").value = "[F]+[F]+[F]+[F]+[F]+[F]";
    document.getElementById("rule").value = "F->F[+FF][-FF]FF[+F][-F]FF";
    document.getElementById("angle").value = 60;
    document.getElementById("startx").value = width / 2;
    document.getElementById("starty").value = height / 2;
    document.getElementById("stepSize").value = height / 15;
    document.getElementById("startAngle").value = 0;
    lenReduceValue = 1 / 5;
}