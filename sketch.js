var painting = [];
var path = [];
var button;
var button1;
var drawing;
var currentDrawing = [];
var database;
var ref1;
var coordinates;
function setup(){
    database = firebase.database();
    canvas = createCanvas(500,500);
    canvas.mousePressed(startDrawing)
    button = createButton('Erase');
    button1 = createButton('Save');
    
}

function startDrawing(){
    currentDrawing = [];
    path.push(currentDrawing);
}

function draw(){
    background(0);
    getState();
    if (mouseIsPressed){
       coordinates ={
        x: mouseX,
        y: mouseY
        }
    currentDrawing.push(coordinates);
}
//getState();
button.position(350,10);
button1.position(320,10);
button.mousePressed(()=>{
    painting = [];
});

button1.mousePressed(update(path));

stroke("yellow");
strokeWeight(2);
noFill();
for(var i = 0; i<path.length;i++){
    var drawing = path[i];

beginShape();
for(var j = 0; j<drawing.length;j++){
    vertex(drawing[j].x,drawing[j].y)
}
endShape();
}
}

function showError(){
    console.log("There is an error");
}

function getState(){
    ref1  = database.ref('Drawing');
    ref1.on("value",function(data){
       painting = data.val();
    })

  }

  function update(paint){
    database.ref('/').update({
      painting: paint
    });
  }