//Create variables here
var dog,database,foodS,foodStock;
var dogImg,dogImg2;

function preload()
{
  //load images here
  dogImg=loadImage("Dog.png");
  dogImg2=loadImage("happydog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  
  dog=createSprite(250,300);
  dog.addImage(dogImg);
  dog.scale=0.15;

  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() { 
  background(46,139,87); 
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg2);
  }

  drawSprites();
  //add styles here
  fill(255,255,254);
  text("Food remaining : "+foodS,170,200);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",200,50);
  textSize(10);
  stroke("red");
  
}

function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
