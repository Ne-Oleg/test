
let bodyShapeIn = document.getElementById('shapesIn1');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
let btn4 = document.getElementById('btn4');
const canvas = document.getElementById('mycanvas');
const app = new PIXI.Application({
    view:canvas,
    backgroundColor: 0x1099bb, 
    width: 1000,
    height: 600,
   
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
.drawRect(0,0, 1000, 600)
.endFill();
drawBorder.interactive = true;
drawBorder.buttonMode = true;
app.stage.addChild(drawBorder);
drawBorder.on('mousedown', (event) =>{
    mouseX = event.data.global.x;
    mouseY = event.data.global.y;
});
drawBorder.on('click',onclickCreateFigure);

function drawRectangleSmall(){
    let x = Math.floor(Math.random()*800);
    let y = Math.floor(Math.random()*100);
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
        let x = Math.floor(Math.random()*800);
        let y = Math.floor(Math.random()*100);
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
    let x = Math.floor(Math.random()*800);
    let y = Math.floor(Math.random()*100);
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
    let x = Math.floor(Math.random()*800);
    let y = Math.floor(Math.random()*100);
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
  
    document.getElementById('shapesPerSec').innerHTML = 'Shapes per sec: ' + figurePerSec;
     }
function onClickPlusPerSec () {
    setInterval(clearTimeout(timerId),0);
    figurePerSec+=1;
  
    document.getElementById('shapesPerSec').innerHTML = 'Shapes per sec: ' + figurePerSec;
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
                            document.getElementById('shapesPerSec').innerHTML = 'Shapes per sec: ' + figurePerSec+ ' =MAX';
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
        document.getElementById('Gravity').innerHTML = 'Gravity: ' +gravity.toFixed(1);
         }

    function onClickPlus () {
        gravity+=1;
        document.getElementById('Gravity').innerHTML = 'Gravity: ' +gravity.toFixed(1);
        }

function animate(){
    countSapesIn=0;
    areaShaps=0;
    requestAnimationFrame(animate);
    for(let i=0; i<figure.length; i++){
    figure[i].position.y+=gravity/figure.length;
        if(figure[i].position.y>580){
        figure[i].clear();
        }
        if(figure[i].position.x>=0 && figure[i].position.x<=1000 && 
            figure[i].position.y>=0 && figure[i].position.y<=600){
               figure[i].live=true;
            }
             if(figure[i].position.y>=580){
                    figure[i].live=false;
            }
            figure[i].on('mousedown', () => {
                figure[i].position.y+=580;
            });
            if(figure[i].live==true){
                countSapesIn+=1
                areaShaps+=figure[i].area*coefficient*coefficient;
            
            }

            bodyShapeIn.innerHTML = 'Shapes in: ' + countSapesIn;;
            document.getElementById('ShapesInArea').innerHTML = 'Shapes area: ' + areaShaps;

    }
}