const app = new PIXI.Application({
    backgroundColor: 0x1099bb, 
    width: window.innerWidth,
    height: window.innerHeight,
});
 

document.body.appendChild(app.view);
let figure =[];  
let gravity = 0;  
let countClick=0;
let mouseX =0;
let mouseY=0;

let drawBorder = new PIXI.Graphics()
.beginFill(0x1099bb)
.lineStyle(2, 0xFFFFFF, 1)
.drawRect(250, 100, window.innerWidth/2, window.innerHeight/2)
.endFill();
drawBorder.interactive = true;
drawBorder.buttonMode = true;
app.stage.addChild(drawBorder);
drawBorder.on('mousedown', (event) =>{
    mouseX = event.data.global.x;
    mouseY = event.data.global.y;
});
drawBorder.on('mouseup',onclickCreateFigure);

let drawbutton1 = new PIXI.Graphics()
.lineStyle(2, 0xFF00FF, 1)
.beginFill(0x650A5A, 0.25)
.drawRoundedRect(250, 480, 25, 25, 4)
.endFill();
drawbutton1.interactive = true;
drawbutton1.buttonMode = true;
app.stage.addChild(drawbutton1);
drawbutton1.on('mousedown', onClickMinus);

let drawbuttonIn1 = new PIXI.Graphics()
.lineStyle(2, 0xFF00FF, 1)
.beginFill(0x650A5A, 0.25)
.moveTo(270,482)
.lineTo(270, 502)
.lineTo(255, 492)
.lineTo(270, 482)
.endFill();
drawbuttonIn1.interactive = true;
drawbuttonIn1.buttonMode = true;
app.stage.addChild(drawbuttonIn1);
drawbuttonIn1.on('mousedown', onClickMinus);

let drawbutton2 = new PIXI.Graphics()
.lineStyle(2, 0xFF00FF, 1)
.beginFill(0x650A5A, 0.25)
.drawRoundedRect(280, 480, 25, 25, 4)
.endFill();
drawbutton2.interactive = true;
drawbutton2.buttonMode = true;
app.stage.addChild(drawbutton2);
drawbutton2.on('mousedown', onClickPlus);

let drawbuttonIn2 = new PIXI.Graphics()
.lineStyle(2, 0xFF00FF, 1)
.beginFill(0x650A5A, 0.25)
.moveTo(285,482)
.lineTo(285, 502)
.lineTo(300, 492)
.lineTo(285, 482)
.endFill();
drawbuttonIn2.interactive = true;
drawbuttonIn2.buttonMode = true;
app.stage.addChild(drawbuttonIn2);
drawbuttonIn2.on('mousedown', onClickPlus);

var countingText1 = new PIXI.Text('GRAVITY: 00', { align: 'left', stroke: '#a4410e'});
countingText1.position.x = 390;
countingText1.position.y = 480;
countingText1.anchor.x = 0.5;
app.stage.addChild(countingText1);

function drawRectangleSmall(){
    let x = Math.floor(Math.random()*window.innerWidth)-50;
    let y = Math.floor(Math.random()*25);
    let rectangleSmall = new PIXI.Graphics();
    rectangleSmall.beginFill(Math.random() * 0xFFFFFF)
    .lineStyle(0)
    .drawRect(x,y,100,100)
    .endFill();
    rectangleSmall.interactive = true; 
    rectangleSmall.buttonMode = true;  
    figure.push(rectangleSmall);
    app.stage.addChild(rectangleSmall);
    rectangleSmall.on('pointerdown', controller.clearFigure);
    requestAnimationFrame(animate);
};

function drawEllipse(){
        let x = Math.floor(Math.random()*window.innerWidth)-50;
        let y = Math.floor(Math.random()*25);
        let ellipse = new PIXI.Graphics();
        ellipse.lineStyle(0);
        ellipse.beginFill(Math.random() * 0xFFFFFF);
        ellipse.drawEllipse(x,y, 100, 50);
        ellipse.endFill();
        ellipse.interactive = true; 
        ellipse.buttonMode = true; 
        figure.push(ellipse);
        app.stage.addChild(ellipse);
        ellipse.on('pointerdown', controller.clearFigure);
        requestAnimationFrame(animate);
};


function drawShape(){
    let x = Math.floor(Math.random()*window.innerWidth)-50;
    let y = Math.floor(Math.random()*25);
    let shape = new PIXI.Graphics();
    shape.lineStyle(0);
    shape.beginFill(Math.random() * 0xFFFFFF);
    shape.moveTo(x,y);
    shape.lineTo(x+100, y+100);
    shape.lineTo(x-80, y+100);
    shape.lineTo(x+100, y+80);
    shape.endFill();
    shape.interactive = true; 
    shape.buttonMode = true; 
    figure.push(shape);
    app.stage.addChild(shape);
    shape.on('pointerdown', controller.clearFigure);
    requestAnimationFrame(animate);
};

function drawShapeCloud(){
    let x = Math.floor(Math.random()*window.innerWidth)-50;
    let y = Math.floor(Math.random()*25);
    let shapeCloud = new PIXI.Graphics();
    shapeCloud.lineStyle(0);
    shapeCloud.beginFill(Math.random() * 0xFFFFFF);
    shapeCloud.moveTo(x,y);
    shapeCloud.bezierCurveTo(x, y, x+25, y-40, x+50, y);
    shapeCloud.bezierCurveTo(x+50, y, x+75, y-25, x+90, y+25);
    shapeCloud.bezierCurveTo(x+90, y+25, x+130, y+50, x+100, y+75);
    shapeCloud.bezierCurveTo(x+100, y+75, x+90, y+130, x+50, y+100);
    shapeCloud.bezierCurveTo(x+50, y+100, x+25, y+130, x, y+100);
    shapeCloud.bezierCurveTo(x, y+100, x-35, y+125, x-40, y+75);
    shapeCloud.bezierCurveTo(x-40, y+75, x-90, y+50, x-40, y+25);
    shapeCloud.bezierCurveTo(x-40, y+25, x-30, y-20, x, y);
    shapeCloud.endFill();
    shapeCloud.interactive = true; 
    shapeCloud.buttonMode = true; 
    figure.push(shapeCloud);
    app.stage.addChild(shapeCloud);
    shapeCloud.on('pointerdown', controller.clearFigure);
    requestAnimationFrame(animate);
};



setInterval(drawEllipse,400000);
setInterval(drawRectangleSmall,500000);
setInterval(drawShape,300000);
setInterval(drawShapeCloud,200000);

var controller = {
    clearFigure: function() {
        this.clear();
    }
}

function onclickCreateFigure(eventData) {
    
    switch (countClick){
        case 0: 
        drawRectangleSmall();
        figure[figure.length-1].position.x= mouseX;
        figure[figure.length-1].position.y= mouseY;
        break;
        case 1: 
        drawEllipse();
        figure[figure.length-1].position.x= mouseX;
        figure[figure.length-1].position.y= mouseY;
        break;
        case 2: 
        drawShape();
        figure[figure.length-1].position.x= mouseX;
        figure[figure.length-1].position.y= mouseY;
        break;
        case 3: 
        drawShapeCloud();
        figure[figure.length-1].position.x= mouseX;
        figure[figure.length-1].position.y= mouseY;
        break;
    }
    countClick+=1;
    if (countClick==4){
        countClick-=4;
    }
};

    function onClickMinus (eventData) {
        if (gravity<=0.1){
            gravity=0;
        } else{
            gravity-=0.1;
        }
        countingText1.text = 'GRAVITY: ' + gravity.toFixed(1);
         }

    function onClickPlus (eventData) {
        gravity+=0.1;
        countingText1.text = 'GRAVITY: ' + gravity.toFixed(1);
        }

function animate(){
    requestAnimationFrame(animate);
    for(let i=0; i<figure.length; i++){
    figure[i].position.y+=gravity;
        if(figure[i].position.y>window.innerHeight-100){
        figure[i].clear();
        }
    }
}