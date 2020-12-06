//Create variables here
var dog,dogimg,happydogimg;
var foodStock, foodS;
var database;
var feed,addFood;
var fedTime, lastFed;
var foodObj;
var feed1;
var invi;

function preload()
{
  //load images here
  happydogimg = loadImage("images/dogImg1.png");
  dogimg= loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  dog = createSprite(800,300);
  
  
  invi =  createSprite(dog.x, dog.y + 80, 200,10);
  invi.visible = false;


  dog.addImage("dog",dogimg);
  dog.addImage("d2",happydogimg); 

  dog.scale =0.2;
  


  feed=createButton("Feed the Dog"); 
  feed.position(400,95); 
  feed1 = createSprite(95,55,96,20);
  feed.mousePressed(feedDog); 
  addFood=createButton("Add Food"); 
  addFood.position(550,95); 
  addFood.mousePressed(addFoods);   
  foodStock = database.ref('Food');
  foodStock.on("value",function(data){
    foodS = data.val();
  })
  foodObj = new Food(foodS,lastFed);

  input = createInput("Name your pet");
	input.position(width/2+690, height/2-80);

  name = input.value();

}


//function to update food stock and last fed time 
function feedDog(){ 
  dog.changeImage("d2",happydogimg); 


 
  foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
  database.ref('/').update({ 
    Food:foodObj.getFoodStock(),
    hour:hour()
    
   

  })
} 

//function to add food in story' 
function addFoods(){ 
  foodS++; 
  database.ref('/').update({ 
    Food:foodS 
  }) 
} 


function draw() {  
  background(46,139,87);
  if(mousePressedOver(feed1) && dog.y >= 294.2){
    dog.velocityY = -5;
    }

  dog.velocityY = dog.velocityY+0.8;
  dog.collide(invi);
  console.log(dog.y)
  fedTime = database.ref('hour');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill("turquoise");
  textSize(30);
 
  text("Food Available:" + foodS,200,500);
  drawSprites();
  //add styles here
  
  foodObj.display();
   
  textSize(35); 
  if(lastFed>=12){ 
    text("Last Fed : "+ lastFed%12 + " PM", 450,50); 
  }else if(lastFed==0){ 
    text("Last Fed : 12 AM",450,50); 
  }else{ 
    text("Last Fed : "+ lastFed + " AM", 450,50); 
  } 
  
}

