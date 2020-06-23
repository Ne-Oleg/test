const app = new PIXI.Application({
    backgroundColor: 0x1099bb, 
    width: window.innerWidth,
    height: window.innerHeight,
});
 

document.body.appendChild(app.view);
let figure =[];  
let gravity = 0;
let figurePerSec = 0; 
let countClick=0;
let mouseX =0;
let mouseY=0;
let timerId;
let coefficient=5;
let countSapesIn =0;
let areaShaps = 0;

if(window.innerWidth>2000){
    coefficient=5;
} else if (window.innerWidth>1500){
    coefficient=4;
}else if (window.innerWidth>1000){
    coefficient=3;
}else if (window.innerWidth>500){
    coefficient=2;
}else if(window.innerWidth<=500){
    coefficient=1;
}
let drawBorder = new PIXI.Graphics()
.beginFill(0x1099bb)
.lineStyle(2, 0xFFFFFF, 1)
.drawRect(window.innerWidth/4, window.innerHeight/4, window.innerWidth/2, window.innerHeight/2)
.endFill();
drawBorder.interactive = true;
drawBorder.buttonMode = true;
app.stage.addChild(drawBorder);
drawBorder.on('mousedown', (event) =>{
    mouseX = event.data.global.x;
    mouseY = event.data.global.y;
});
drawBorder.on('click',onclickCreateFigure);

let drawbutton1 = new PIXI.Graphics()
.lineStyle(2, 0xFF00FF, 1)
.beginFill(0x650A5A, 0.25)
.drawRoundedRect(window.innerWidth/4, window.innerHeight/4+4+window.innerHeight/2, 60, 25, 4)
.endFill();
app.stage.addChild(drawbutton1);

let drawbutton2 = new PIXI.Graphics()
.lineStyle(2, 0xFF00FF, 1)
.beginFill(0x650A5A, 0.25)
.drawRoundedRect(window.innerWidth/4+250, window.innerHeight/4+4+window.innerHeight/2, 60, 25, 4)
.endFill();
app.stage.addChild(drawbutton2);

let drawbutton1left = new PIXI.Graphics()
.lineStyle(0)
.beginFill(0x650A5A, 0.25)
.drawRoundedRect(window.innerWidth/4+3, window.innerHeight/4+6+window.innerHeight/2, 24, 21, 4)
.endFill();
drawbutton1left.interactive = true;
drawbutton1left.buttonMode= true;
app.stage.addChild(drawbutton1left);
drawbutton1left.on('mousedown', onClickMinus);

let drawbutton1right = new PIXI.Graphics()
.lineStyle(0)
.beginFill(0x650A5A, 0.25)
.drawRoundedRect(window.innerWidth/4+33, window.innerHeight/4+6+window.innerHeight/2, 24, 21, 4)
.endFill();
drawbutton1right.interactive = true;
drawbutton1right.buttonMode= true;
app.stage.addChild(drawbutton1right);
drawbutton1right.on('mousedown', onClickPlus);

let drawbutton2left = new PIXI.Graphics()
.lineStyle(0)
.beginFill(0x650A5A, 0.25)
.drawRoundedRect(window.innerWidth/4+3+250, window.innerHeight/4+6+window.innerHeight/2, 24, 21, 4)
.endFill();
drawbutton2left.interactive = true;
drawbutton2left.buttonMode= true;
app.stage.addChild(drawbutton2left);
drawbutton2left.on('mousedown', onClickMinusPerSec);
drawbutton2left.on('mouseup',onclickCreateFigurePerSec);


let drawbutton2right = new PIXI.Graphics()
.lineStyle(0)
.beginFill(0x650A5A, 0.25)
.drawRoundedRect(window.innerWidth/4+33+250, window.innerHeight/4+6+window.innerHeight/2, 24, 21, 4)
.endFill();
drawbutton2right.interactive = true;
drawbutton2right.buttonMode= true;
app.stage.addChild(drawbutton2right);
drawbutton2right.on('mousedown', onClickPlusPerSec);
drawbutton2right.on('mouseup',onclickCreateFigurePerSec);


let drawbuttonline1 = new PIXI.Graphics()
.lineStyle(2, 0xFF00FF, 1)
.moveTo(window.innerWidth/4+30,window.innerHeight/4+4+window.innerHeight/2)
.lineTo(window.innerWidth/4+30, window.innerHeight/4+29+window.innerHeight/2)
.endFill();
app.stage.addChild(drawbuttonline1);

let drawbuttonline2 = new PIXI.Graphics()
.lineStyle(2, 0xFF00FF, 1)
.moveTo(window.innerWidth/4+280,window.innerHeight/4+4+window.innerHeight/2)
.lineTo(window.innerWidth/4+280, window.innerHeight/4+29+window.innerHeight/2)
.endFill();
app.stage.addChild(drawbuttonline2);

let drawbuttonIn1 = new PIXI.Graphics()
.lineStyle(4, 0xFF00FF, 1)
.beginFill(0xFF00FF, 0.25)
.drawRoundedRect(window.innerWidth/4+7, window.innerHeight/4+16+window.innerHeight/2, 15, 2, 1)
.endFill();
drawbuttonIn1.interactive = true;
drawbuttonIn1.buttonMode = true;
app.stage.addChild(drawbuttonIn1);
drawbuttonIn1.on('mousedown', onClickMinus);

let drawbuttonIn2 = new PIXI.Graphics()
.lineStyle(4, 0xFF00FF, 1)
.beginFill(0xFF00FF, 0.25)
.drawRoundedRect(window.innerWidth/4+37, window.innerHeight/4+16+window.innerHeight/2, 15, 2, 1)
.drawRoundedRect(window.innerWidth/4+44, window.innerHeight/4+10+window.innerHeight/2, 2, 15, 1)
.endFill();
drawbuttonIn2.interactive = true;
drawbuttonIn2.buttonMode = true;
app.stage.addChild(drawbuttonIn2);
drawbuttonIn2.on('mousedown', onClickPlus);

let drawbuttonPerSecIn1 = new PIXI.Graphics()
.lineStyle(4, 0xFF00FF, 1)
.beginFill(0xFF00FF, 0.25)
.drawRoundedRect(window.innerWidth/4+257, window.innerHeight/4+16+window.innerHeight/2, 15, 2, 1)
.endFill();
drawbuttonPerSecIn1.interactive = true;
drawbuttonPerSecIn1.buttonMode = true;
app.stage.addChild(drawbuttonPerSecIn1);
drawbuttonPerSecIn1.on('mousedown', onClickMinusPerSec);
drawbuttonPerSecIn1.on('mouseup',onclickCreateFigurePerSec);

let drawbuttonPerSecIn2 = new PIXI.Graphics()
.lineStyle(4, 0xFF00FF, 1)
.beginFill(0xFF00FF, 0.25)
.drawRoundedRect(window.innerWidth/4+287, window.innerHeight/4+16+window.innerHeight/2, 15, 2, 1)
.drawRoundedRect(window.innerWidth/4+294, window.innerHeight/4+10+window.innerHeight/2, 2, 15, 1)
.endFill();
drawbuttonPerSecIn2.interactive = true;
drawbuttonPerSecIn2.buttonMode = true;
app.stage.addChild(drawbuttonPerSecIn2);
drawbuttonPerSecIn2.on('mousedown', onClickPlusPerSec);
drawbuttonPerSecIn2.on('mouseup',onclickCreateFigurePerSec);

var countingText1 = new PIXI.Text('GRAVITY: 00', { align: 'left', stroke: '#a4410e'});
countingText1.position.x = window.innerWidth/4+62;
countingText1.position.y = window.innerHeight/4+2+window.innerHeight/2;
countingText1.anchor.x = 0.0;
app.stage.addChild(countingText1);

var countingText2 = new PIXI.Text('Shapes per sec: 00', { align: 'left', stroke: '#a4410e'});
countingText2.position.x = window.innerWidth/4+312;
countingText2.position.y = window.innerHeight/4+2+window.innerHeight/2;
countingText2.anchor.x = 0.0;
app.stage.addChild(countingText2);

var countingText3 = new PIXI.Text('SHAPES IN: 00', { align: 'left', stroke: '#a4410e'});
countingText3.position.x = window.innerWidth/4;
countingText3.position.y = window.innerHeight/4-27;
countingText3.anchor.x = 0.0;
app.stage.addChild(countingText3);

var countingText4 = new PIXI.Text('SHAPES AREA: 00', { align: 'left', stroke: '#a4410e'});
countingText4.position.x = window.innerWidth/4+250;
countingText4.position.y = window.innerHeight/4-27;
countingText4.anchor.x = 0.0;
app.stage.addChild(countingText4);

function drawRectangleSmall(){
    let x = Math.floor(Math.random()*(window.innerWidth-220));
    let y = Math.floor(Math.random()*(window.innerHeight/10));
    let rectangleSmall = new PIXI.Graphics();
    rectangleSmall.beginFill(Math.random() * 0xFFFFFF)
    .lineStyle(0)
    .drawRect(0,0,20*coefficient,20*coefficient)
    .endFill();
    rectangleSmall.area = 400;
    rectangleSmall.live=false;
    rectangleSmall.interactive = true; 
    rectangleSmall.buttonMode = true;  
    figure.push(rectangleSmall);
    app.stage.addChild(rectangleSmall);
    rectangleSmall.position.x = x+25*coefficient;
    rectangleSmall.position.y = y-innerHeight/4;
    rectangleSmall.on('pointerdown', controller.clearFigure);
    requestAnimationFrame(animate);
};

function drawEllipse(){
        let x = Math.floor(Math.random()*(window.innerWidth-220));
        let y = Math.floor(Math.random()*(window.innerHeight/10));
        let ellipse = new PIXI.Graphics();
        ellipse.lineStyle(0);
        ellipse.beginFill(Math.random() * 0xFFFFFF);
        ellipse.drawEllipse(0,0, 20*coefficient, 10*coefficient);
        ellipse.endFill();
        ellipse.area=628;
        ellipse.live=false;
        ellipse.interactive = true; 
        ellipse.buttonMode = true; 
        figure.push(ellipse);
        app.stage.addChild(ellipse);
        ellipse.position.set(x+25*coefficient,y-innerHeight/4);
        ellipse.on('pointerdown', controller.clearFigure);
        requestAnimationFrame(animate);
};


function drawShape(){
    let x = Math.floor(Math.random()*(window.innerWidth-220));
    let y = Math.floor(Math.random()*(window.innerHeight/10));
    let shape = new PIXI.Graphics();
    shape.lineStyle(0);
    shape.beginFill(Math.random() * 0xFFFFFF);
    shape.moveTo(0,0);
    shape.lineTo(10*coefficient, 20*coefficient);
    shape.lineTo(-10*coefficient, 20*coefficient);
    shape.lineTo(0, 0);
    shape.endFill();
    shape.area=173;
    shape.live=false;
    shape.interactive = true; 
    shape.buttonMode = true; 
    figure.push(shape);
    app.stage.addChild(shape);
    shape.position.set(x+25*coefficient,y-innerHeight/4);
    shape.on('pointerdown', controller.clearFigure);
    requestAnimationFrame(animate);
};

function drawShapeCloud(){
    let x = Math.floor(Math.random()*(window.innerWidth-220));
    let y = Math.floor(Math.random()*(window.innerHeight/10));
    let shapeCloud = new PIXI.Graphics();
    shapeCloud.lineStyle(0);
    shapeCloud.beginFill(Math.random() * 0xFFFFFF);
    shapeCloud.moveTo(0,0);
    shapeCloud.bezierCurveTo(0, 0, 5*coefficient, -8*coefficient, 10*coefficient, 0);
    shapeCloud.bezierCurveTo(10*coefficient, 0, 15*coefficient, -5*coefficient, 18*coefficient, 5*coefficient);
    shapeCloud.bezierCurveTo(18*coefficient, 5*coefficient, 26*coefficient, 10*coefficient, 20*coefficient, 15*coefficient);
    shapeCloud.bezierCurveTo(20*coefficient, 15*coefficient, 18*coefficient, 26*coefficient, 10*coefficient, 20*coefficient);
    shapeCloud.bezierCurveTo(10*coefficient, 20*coefficient, 5*coefficient, 26*coefficient, 0, 20*coefficient);
    shapeCloud.bezierCurveTo(0, 20*coefficient, -7*coefficient,25*coefficient,-8*coefficient, 15*coefficient);
    shapeCloud.bezierCurveTo(-8*coefficient, 15*coefficient, -18*coefficient, 10*coefficient,-8*coefficient, 5*coefficient);
    shapeCloud.bezierCurveTo(-8*coefficient, 5*coefficient, -6*coefficient, -4*coefficient, 0, 0);
    shapeCloud.endFill();
    shapeCloud.area=784;
    shapeCloud.live=false;
    shapeCloud.interactive = true; 
    shapeCloud.buttonMode = true; 
    figure.push(shapeCloud);
    app.stage.addChild(shapeCloud);
    shapeCloud.position.set(x+25*coefficient,y-innerHeight/4);
    shapeCloud.on('pointerdown', controller.clearFigure);
    requestAnimationFrame(animate);
};

let createFigurePerSec =[]; 
createFigurePerSec.push(drawEllipse);
createFigurePerSec.push(drawRectangleSmall);
createFigurePerSec.push(drawShape);
createFigurePerSec.push(drawShapeCloud);

function onClickMinusPerSec () {
    setInterval(clearTimeout(timerId),0);
    if (figurePerSec<=1){
        figurePerSec=0;
    } else{
        figurePerSec-=1;
    }
    countingText2.text = 'Shapes per sec: ' + figurePerSec;
     }
function onClickPlusPerSec () {
    setInterval(clearTimeout(timerId),0);
    figurePerSec+=1;
    countingText2.text = 'Shapes per sec: ' + figurePerSec;
    }

var controller = {
    clearFigure: function() {
        this.clear();
    }
}

function onclickCreateFigure(eventData) {
    
    switch (countClick){
        case 0:
            drawRectangleSmall();
            figure[figure.length-1].position.set(mouseX,mouseY);
        break;
        case 1: 
        drawEllipse();
        figure[figure.length-1].position.set(mouseX,mouseY);
        break;
        case 2: 
        drawShape();
        figure[figure.length-1].position.set(mouseX,mouseY);
        break;
        case 3: 
        drawShapeCloud();
        figure[figure.length-1].position.set(mouseX,mouseY);
        break;
    }
    countClick+=1;
    if (countClick==4){
        countClick-=4;
    }
};

function getRandom(max){
    return Math.floor(Math.random()*max);
}
function onclickCreateFigurePerSec() {
  
    (function loopingFunction() {
        
        if (figurePerSec==0){
        } if(figurePerSec==1){
            createFigurePerSec[Math.floor(Math.random()*4)]();
            timerId = setTimeout(loopingFunction, 1000);
            }  if(figurePerSec==2){
                createFigurePerSec[Math.floor(Math.random()*4)]();
                timerId =setTimeout(loopingFunction, 500);
                }  if(figurePerSec==3){
                    createFigurePerSec[Math.floor(Math.random()*4)]();
                    timerId =setTimeout(loopingFunction, 330);
                    }  if(figurePerSec==4){
                        createFigurePerSec[Math.floor(Math.random()*4)]();
                        timerId =setTimeout(loopingFunction, 250);
                        }  if(figurePerSec>=5){
                            figurePerSec=5;
                            countingText2.text = 'Shapes per sec: ' + figurePerSec + ' =MAX';
                            createFigurePerSec[Math.floor(Math.random()*4)]();
                            timerId =setTimeout(loopingFunction, 200);
                            } 
    })();
  
};

    function onClickMinus () {
        if (gravity<=1){
            gravity=0;
        } else{
            gravity-=1;
        }
        countingText1.text = 'GRAVITY: ' + gravity.toFixed(1);
         }

    function onClickPlus () {
        gravity+=1;
        countingText1.text = 'GRAVITY: ' + gravity.toFixed(1);
        }

function animate(){
    countSapesIn=0;
    areaShaps=0;
    requestAnimationFrame(animate);
    for(let i=0; i<figure.length; i++){
    figure[i].position.y+=gravity/figure.length;
        if(figure[i].position.y>window.innerHeight-100){
        figure[i].clear();
        }
        if(figure[i].position.x>=window.innerWidth/4 && figure[i].position.x<=window.innerWidth/4*3 && 
            figure[i].position.y>=window.innerHeight/4 && figure[i].position.y<=window.innerHeight/4*3){
               figure[i].live=true;
            }
             if(figure[i].position.x>=window.innerWidth/4 && figure[i].position.x<=window.innerWidth/4*3 &&
                figure[i].position.y>=window.innerHeight/4*3){
                    figure[i].live=false;
            }
            figure[i].on('mousedown', () => {
                figure[i].position.y+=window.innerHeight-100;
            });
            if(figure[i].live==true){
                countSapesIn+=1
                areaShaps+=figure[i].area*coefficient*coefficient;
            
            }
            countingText3.text = 'SHAPES IN: ' + countSapesIn;
            countingText4.text = 'SHAPES AREA: ' + areaShaps;
    }
}