const app = new PIXI.Application({
    backgroundColor: 0x1099bb, 
    width: window.innerWidth,
    height: window.innerHeight,
});
 

document.body.appendChild(app.view);
var colors = [0xFFFF0B, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 
0x41ccc9, 0xe03375, 0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba];

var gravity = 0;
var count = 0;
let figure =[];
let rectangleSmall = new PIXI.Graphics();
let ellipse = new PIXI.Graphics();

let drawBorder = new PIXI.Graphics()
.beginFill(0x1099bb)
.lineStyle(2, 0xFFFFFF, 1)
.drawRect(250, 50, 800, 600)
.endFill();
drawBorder.interactive = true;
drawBorder.buttonMode = true; 
drawBorder.on('mousedown', (event) =>{
let mouseX = event.data.global.x;
let mouseY = event.data.global.y;

ellipse.lineStyle(2, 0xFFFFFF, 1);
ellipse.beginFill(colors[Math.floor(Math.random() * colors.length)]);
ellipse.drawEllipse(mouseX,mouseY, 80, 50);
ellipse.endFill();
ellipse.interactive = true; 
ellipse.buttonMode = true; 
figure.push(ellipse);

rectangleSmall.beginFill(colors[Math.floor(Math.random() * colors.length)])
.lineStyle(2,0xFFFFFF, 1)
.drawRect(mouseX,mouseY,50,50)
.endFill();
rectangleSmall.interactive = true; 
rectangleSmall.buttonMode = true;  
figure.push(rectangleSmall)
app.stage.addChild(figure[Math.floor(Math.random() * figure.length)]);
requestAnimationFrame(animate);
});

app.stage.addChild(drawBorder);

var countingText = new PIXI.Text('COUNT: 00', { align: 'left', stroke: '#a4410e'});
countingText.position.x = 370;
countingText.position.y = 650;
countingText.anchor.x = 0.5;
app.stage.addChild(countingText);

var countingText1 = new PIXI.Text('GRAVITY: 00', { align: 'left', stroke: '#a4410e'});
countingText1.position.x = 580;
countingText1.position.y = 650;
countingText1.anchor.x = 0.5;
app.stage.addChild(countingText1);


var textureButton = PIXI.Texture.fromImage('plus.png');
var button = new PIXI.Sprite(textureButton);
button.buttonMode = true;

button.anchor.set(0.5);
button.x = 290;
button.y = 665;

button.interactive = true;
button.buttonMode = true;
app.stage.addChild(button);
button.on('mousedown', (event) =>{
count++;
countingText.text = 'COUNT: ' + Math.floor(count);
});
var textureButton1 = PIXI.Texture.fromImage('min.png');
var button1 = new PIXI.Sprite(textureButton1);
button1.buttonMode = true;
button1.anchor.set(0.5);
button1.x = 265;
button1.y = 665;
button1.interactive = true;
button1.buttonMode = true;
app.stage.addChild(button1);
button1.on('mousedown', (event) =>{
if (count<=1){
    count=0;
} else{
    count--;
}
countingText.text = 'COUNT: ' + Math.floor(count);
});

var textureButton3 = PIXI.Texture.fromImage('plus.png');
var button3 = new PIXI.Sprite(textureButton3);
button3.buttonMode = true;

button3.anchor.set(0.5);
button3.x = 490;
button3.y = 665;

button3.interactive = true;
button3.buttonMode = true;
app.stage.addChild(button3);
button3.on('mousedown', (event) =>{
gravity++;
countingText1.text = 'GRAVITY: ' + Math.floor(gravity);
});

var textureButton4 = PIXI.Texture.fromImage('min.png');
var button4 = new PIXI.Sprite(textureButton4);
button4.buttonMode = true;

button4.anchor.set(0.5);
button4.x = 465;
button4.y = 665;

button4.interactive = true;
button4.buttonMode = true;
app.stage.addChild(button4);
button4.on('mousedown', (event) =>{
gravity--;
countingText1.text = 'GRAVITY: ' + Math.floor(gravity);
});

ellipse.on('mousedown', (event) =>{
app.stage.removeChild(ellipse);
});

rectangleSmall.on('mousedown', onClick);

function onClick (eventData) {
app.stage.removeChild(rectangleSmall);
}
function animate(){
requestAnimationFrame(animate);
ellipse.position.y+=gravity;
rectangleSmall.position.y +=gravity;
if(rectangleSmall.position.y>=520){
app.stage.removeChild(rectangleSmall);
}
if(ellipse.position.y>=520){
app.stage.removeChild(ellipse);
}
}