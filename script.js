"use strict";

const width = 1000;
const height = 600;
var point, axiom, newF, task, canvas, ctx;
var stack = [];



function getData() {
    let pointX = parseInt(document.getElementById("pointX").value);
    let pointY = parseInt(document.getElementById("pointY").value);
    let startAngle = parseInt(document.getElementById("startAngle").value);
    point = { x: pointX, y: pointY, a: startAngle };
    axiom = document.getElementById("axiom").value.split("");
    newF = document.getElementById("newF").value.split("");
    task = { q: parseInt(document.getElementById("q").value), n: parseInt(document.getElementById("n").value), s: parseInt(document.getElementById("s").value) }
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    stack = [];
}

function transform() {

    for (var i = 0; i < task.n; i++) {
        let result = "";
        for (var j = 0; j < axiom.length; j++) {
            if (axiom[j] === "F") {
                result += newF;
            }
            else
                result += axiom[j];
        }
        axiom = result;
    }
}

function draw() {
    for (var i = 0; i < axiom.length; i++) {
        switch (axiom[i]) {
            case "F":
                point.x += task.s * Math.cos(point.a * Math.PI / 180);
                point.y += task.s * Math.sin(point.a * Math.PI / 180);
                ctx.lineTo(point.x, point.y);
                break;
            case "[":
                stack.push({ x: point.x, y: point.y, a: point.a });
                break;
            case "]":
                var tmp = stack.pop();
                point.x = tmp.x;
                point.y = tmp.y;
                point.a = tmp.a;
                ctx.moveTo(point.x, point.y);
                break;
            case "+":
                point.a -= task.q;
                break;
            case "-":
                point.a += task.q;
                break;
        }
    }
    ctx.stroke();
}

function run() {
    getData();
    transform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    draw();
}

function scaling() {
    canvas.height = height;
    canvas.width = width;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var scaleVal = document.getElementById("scaleRange").value;
    ctx.scale(scaleVal, scaleVal);
    run();
}

function clearData() {
    document.getElementById("pointX").value = "";
    document.getElementById("pointY").value = "";
    document.getElementById("startAngle").value = "";
    document.getElementById("axiom").value = "";
    document.getElementById("newF").value = "";
    document.getElementById("q").value = "";
    document.getElementById("n").value = "";
    document.getElementById("s").value = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function snowflake() {
    document.getElementById("pointX").value = 500;
    document.getElementById("pointY").value = 300;
    document.getElementById("startAngle").value = 0;
    document.getElementById("axiom").value = "[F]+[F]+[F]+[F]+[F]+[F]";
    document.getElementById("newF").value = "F[+FF][-FF]FF[+F][-F]FF";
    document.getElementById("q").value = 60;
    document.getElementById("n").value = 3;
    document.getElementById("s").value = 2;
}

function bush() {
    document.getElementById("pointX").value = 200;
    document.getElementById("pointY").value = 500;
    document.getElementById("startAngle").value = -80;
    document.getElementById("axiom").value = "F";
    document.getElementById("newF").value = "-F+F+[+F-F-]-[-F+F+F]";
    document.getElementById("q").value = 22.5;
    document.getElementById("n").value = 4;
    document.getElementById("s").value = 10;
}