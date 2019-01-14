var twitch = window.Twitch.ext;

const context = $('#counter')[0].getContext('2d');
const canvasWidth = 200;
const canvasHeight = 50;
const regex = /^[a-z]+$/i;
var i = -1;
function increment(){
    var incrementValue = $('#increment-amount').val()
    if(incrementValue !== '' && regex.exec(incrementValue)===null){
        i= i+(parseInt(incrementValue)-1);
        updateCanvas(++i);
    }
    else{
        updateCanvas(++i);

    }
}
function decrement(){
    if(i === -1){
    }
    else{
        updateCanvas(--i);
    }
}
function colorBackground(leftX,topY, width,height, color) {
	context.fillStyle = color;
	context.fillRect(leftX,topY, width,height);
}
function colorRect(leftX,topY, width,height, color) {
	context.fillStyle = color;
	context.fillRect(leftX,topY, width,height);
}

function colorCircle(centerX, centerY, radius, color) {
	context.fillStyle = color;
	context.beginPath();
	context.arc(centerX, centerY, radius, 0,Math.PI*2,true);
	context.fill();
}

function colorTriangle(height, base, x, y, color) {
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x + base / 2, y + height);
    context.lineTo(x - base / 2, y + height);
    context.closePath();
    context.fillStyle = color;
    context.fill();
}

function colorSegment(type, digit, on){

    const width = canvasWidth/16;
    const height = canvasHeight/16;
    const space = width/4;
    const centerW = canvasWidth/13;
    const centerH = canvasHeight/6;
    var color = "#440000";
    if(on === true){
    color = "#FF0000";
    }
    switch(type) {
        case "A":
            colorRect((space+(digit*width*2))+centerW, 0+centerH, width, height,color);
            break;
        case "B":
            colorRect(((width+space)+(digit*width*2))+centerW, space+centerH  , height, width, color);
            break;
        case "C":
            colorRect(((width+space)+(digit*width*2))+centerW, (width+(space*2))+centerH , height, width, color);
            break;
        case "D":
            colorRect((space+(digit*width*2))+centerW, ((width+space)*2)+centerH, width, height, color);
            break;
        case "E":
            colorRect(((digit*width*2))+centerW, (width+(space*2))+centerH , height, width, color);
            break;
        case "F":
            colorRect(((digit*width*2))+centerW, space+centerH , height, width, color);
            break;
        case "G":
            colorRect((space+(digit*width*2))+centerW, (width+space)+centerH, width, height, color);
            break;
        case "DP":
            colorCircle((63+width)+(digit*width*2), (width+25)*2 + 13, height/3, color);
    }

}

function colorDigit(digit, value, on=true){
  var numbers = [0x7E, 0x30, 0x6D, 0x79, 0x33, 0x5B, 0x5F, 0x70, 0x7F, 0x7B];
  var segments = ["A", "B", "C", "D", "E", "F", "G"]
  colorSegment(segments[0], 6-digit, isOn(numbers[value], 6, true));
  colorSegment(segments[1], 6-digit, isOn(numbers[value], 5, true));
  colorSegment(segments[2], 6-digit, isOn(numbers[value], 4, true));
  colorSegment(segments[3], 6-digit, isOn(numbers[value], 3, true));
  colorSegment(segments[4], 6-digit, isOn(numbers[value], 2, true));
  colorSegment(segments[5], 6-digit, isOn(numbers[value], 1, true));
  colorSegment(segments[6], 6-digit, isOn(numbers[value], 0, true));
}


function isOn(val, shift,on){
  if(((val >> shift) & 1) && on){
    return true;
  }
  return false;

}

function updateCanvas(i){
    colorBackground(0,0,canvasWidth, canvasHeight, "black");
    colorDigit(0, (i+1) % 10);
    colorDigit(1, Math.floor(((i+1)/10))%10);
    colorDigit(2, Math.floor(((i+1)/100))%10);
    colorDigit(3, Math.floor(((i+1)/1000))%10);
    colorDigit(4, Math.floor(((i+1)/10000))%10);
    colorDigit(5, Math.floor(((i+1)/100000))%10);
    colorDigit(6, Math.floor(((i+1)/1000000))%10);
}

$(function() {
    updateCanvas(i);
    $('#increment').prop('disabled', false);
    $('#decrement').prop('disabled', false);
    $('#increment').click(function() {
        increment();
    });
    $('#decrement').click(function() {
        decrement();
    });
});
