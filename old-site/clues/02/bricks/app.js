let a = 1;
let red = 0;
let green = 0;
let blue = 0;
let newColor = "";

function update() {
    newColor = "rgb("+red.toString()+","+green.toString()+","+blue.toString()+")"
    console.log(newColor);
    document.getElementById("color").style.backgroundColor=newColor;

    document.getElementById("redDisplay").innerHTML = red.toString();
    document.getElementById("greenDisplay").innerHTML = green.toString();
    document.getElementById("blueDisplay").innerHTML = blue.toString();

    let colorAverage = (red+blue+green)/3

}

function upR() {
    if (red < 255) {
        red += 51;
    } else if (red === 255) {
        red = 0;
    }
    update();
}
function upG() {
    if (green < 255) {
        green += 51;
    } else if (green === 255) {
        green = 0;
    }
    update();
}
function upB() {
    if (blue < 255) {
        blue += 51;
    } else if (blue === 255) {
        blue = 0;
    }
    update();
}

function showValues() {
    alert(
        "Red: "+red.toString()+
        " Green: "+green.toString()+
        " Blue: "+blue.toString()
    );
}