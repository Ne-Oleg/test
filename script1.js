let btn11 = document.getElementById('btn1');
let btn22 = document.getElementById('btn2');
let btn33 = document.getElementById('btn3');
let btn44 = document.getElementById('btn4');

btn11.on('click', onClickMinusNew);
btn22.on('click', onClickPlusNew);

function onClickMinusNew(){
    onClickMinus();
};

function onClickPlusNew(){
    onClickPlus();
};


btn33.on('click', onClickMinusPerSecNew);
btn44.on('click', onClickPlusPerSecNew);

 
function onClickMinusPerSecNew(){
    onClickMinusPerSec ();
    onclickCreateFigurePerSec ();
};

function onClickPlusPerSecNew(){
    onClickPlusPerSec ();
    onclickCreateFigurePerSec ();
};