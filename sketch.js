
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var realPos;

var isLeft;
var isRight;
var isJumping;
var isFalling;

var clouds;
var moutains;
var trees;
var houses;
var platforms;
var isOnPlatform;


var t_canyon;
var jewels;
var enemies;

var lives;
var score;
var isWon;
var isLost;


function setup()
{
    createCanvas(1024,576);
    score =0;
    isWon =false;
    isLost = false;
    lives = 5;
    startGame();
    
}
            
function startGame()
{
    // Variable to control the background scrolling.
	scrollPos = 0;
    floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	realPos = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;
    isOnPlatform = false;

	// Initialise arrays of scenery objects.
    
    //clouds
    clouds = [{xpos: 0, ypos: 0, color:255}];
    
    for (var i =0; i <50; i++)
    {
        var c ={xpos: random(0,10000), ypos: random(0,100), color:random(200,255,200,255,200,255)};
        clouds.push(c);
    }
    
    //mountains
    mountains =[{xpos:0, floorPos_y: 0, color:139}];
    
    for (var i =0; i <75; i++)
    {
        var m ={xpos: random(-500,10000), floorPos_y: 0, color: random(117,155,155)};   
        mountains.push(m);
    }
    

    houses = [{xpos: 0, floorPos_y: 0 }];
    
    for (var i =0; i <20; i++)
    {
        var h ={xpos: random(0,10000), floorPos_y: 0}; 
        houses.push(h);
    }
    
    
    //cayon object
    t_canyon =[{xpos: 1000, width: 50}, {xpos: 1125, width: 50}, {xpos: 1300, width: 100}, {xpos: 1800, width: 200}, {xpos: 2500, width: 50}, {xpos: 2600, width: 75}, {xpos: 2750, width: 100}, {xpos: 3500, width: 200}];
    
    //mystery item
    jewels =[{x_pos: 1150, y_pos: floorPos_y-110, size:3, isFound: false},{x_pos: 1500, y_pos: floorPos_y-110, size:3, isFound: false},{x_pos: 5000, y_pos: floorPos_y-100, size:3, isFound: false}];
    
    //enemies
    enemies = [];
    enemies.push(
    {
        x_pos: width/2+200,
        y_pos: floorPos_y,
        x1: width/2+200,
        x2: width/2+300,
        speed: 2,
        size: 30,
        display: function()
        {
            // Draw enemy.
            fill([255, 0, 0]);
            ellipse(this.x_pos, this.y_pos, this.size);
            
            strokeWeight(2)
            stroke([0,0,0]);
            ellipse(this.x_pos, this.y_pos, this.size-5);
            
            fill([0, 0, 0]);
            ellipse(this.x_pos, this.y_pos, this.size-20);
        },
        move: function()
        {
            this.x_pos += this.speed;
            if(this.x_pos < this.x1 || this.x_pos > this.x2)
            {
                //reverse direction
                this.speed *= -1;
            }
        },
        checkCharCollision: function()
        {
        if(realPos > this.x_pos && realPos < this.x_pos + this.size)
        {
            if(gameChar_y >= floorPos_y)
            {
                playerDied();
            }
        }
        
        }
    }
    );
    //enemies2
    enemies.push(
    {
        x_pos: 2000,
        y_pos: floorPos_y,
        x1: 2000,
        x2: 2200,
        speed: 7,
        size: 50,
        display: function()
        {
            // Draw enemy.
            fill([255, 0, 0]);
            ellipse(this.x_pos, this.y_pos, this.size);
            
            strokeWeight(4)
            stroke([0,0,0]);
            ellipse(this.x_pos, this.y_pos, this.size-10);
            
            fill([0, 0, 0]);
            ellipse(this.x_pos, this.y_pos, this.size-40);
        },
        move: function()
        {
            this.x_pos += this.speed;
            if(this.x_pos < this.x1 || this.x_pos > this.x2)
            {
                //reverse direction
                this.speed *= -1;
            }
        },
        checkCharCollision: function()
        {
        if(realPos > this.x_pos && realPos < this.x_pos + this.size)
        {
            if(gameChar_y >= floorPos_y)
            {
                playerDied();
            }
        }
        
        }
    }
    );
    

    
    //platform
    platforms = [];
    platforms.push(
    {
        x_pos: 700,
        y_pos: floorPos_y - 60,
        width: 200,
        height: 10,
        display: function()
        {
            // Draw platform.
            stroke(0);
            fill(153,101,21);
            rect(this.x_pos, this.y_pos, this.width, this.height,20);
            noStroke();
           
        },
        checkCharOn: function()
        {
            if(realPos > this.x_pos && realPos < this.x_pos +this.width && (gameChar_y > this.y_pos-10 && gameChar_y < this.y_pos +this.height-10))
                {
                   isOnPlatform = true;
                }
        }
    }
    );
    
    //platform2
    platforms.push(
    {
        x_pos: 1800,
        y_pos: floorPos_y - 50,
        width: 200,
        height: 10,
        display: function()
        {
            // Draw platform.
            stroke(0);
            fill(153,101,21);
            rect(this.x_pos, this.y_pos, this.width, this.height,20);
            noStroke();
           
        },
        checkCharOn: function()
        {
            if(realPos > this.x_pos && realPos < this.x_pos +this.width && (gameChar_y > this.y_pos-10 && gameChar_y < this.y_pos +this.height-10))
                {
                   isOnPlatform = true;
                }
        }
    }
    );
    
    //platform3
    platforms.push(
    {
        x_pos: 3500,
        y_pos: floorPos_y - 50,
        width: 200,
        height: 10,
        display: function()
        {
            // Draw platform.
            stroke(0);
            fill(153,101,21);
            rect(this.x_pos, this.y_pos, this.width, this.height,20);
            noStroke();
           
        },
        checkCharOn: function()
        {
            if(realPos > this.x_pos && realPos < this.x_pos +this.width && (gameChar_y > this.y_pos-10 && gameChar_y < this.y_pos +this.height-10))
                {
                   isOnPlatform = true;
                }
        }
    }
    );
}
    


function draw()
{
	background(255,140,0); 

	noStroke();
	fill(153,101,21);
	rect(0, floorPos_y, width, height/4); 

	//drawing game objects
    push();
        translate(scrollPos*0.1,0);
        drawClouds();
    pop();

	
    push();
        translate(scrollPos*0.3,0);
        drawMountains();
    pop();

    
    push();
        translate(scrollPos*0.5,0);
        drawHouses();
    pop();

	
    push();
        translate(scrollPos,0)
        for(var i =0; i < t_canyon.length; i++)
        {
            drawCanyon(t_canyon[i]);
            checkCanyon(t_canyon[i]);
        }
    pop();


    push();
        translate(scrollPos,0)
        for(var i =0; i < jewels.length; i++)
        {
            drawJewel(jewels[i]);
            checkJewel(jewels[i]);
        }
    pop();
    

    push();
        translate(scrollPos,0)
        for(var i =0; i < enemies.length; i++)
        {
            enemies[i].display();
            enemies[i].move();
            enemies[i].checkCharCollision();    
        }
    pop();
    
    
    push();
        translate(scrollPos,0);
        isOnPlatform = false;
        for ( var i = 0; i < platforms.length; i++)
        {
             platforms[i].display();
             platforms[i].checkCharOn();
        }
    pop();
    
    
	//GAME CHAR
	drawGameChar();
    

    //score
    
    fill(255,0,50);
    textSize(50);
    text("score: " + score, 20,70 );
    
    
    //player won
    
    
    checkPlayerDied();
    text("lives: " + lives,20,110);
    if(isLost ==true)
    {
        push();
            fill(255,0,50);
            textSize(25);
            text("GAME OVER!-You lost-refresh to continue",10,200);
            lives =0;
        pop();
       return;
        
    }
    
    checkPlayerWon();
    if(isWon ==true)
    {
        push();
            fill(0,255,50);
            textSize(50);
            text("YOU WON!",100,200);
        pop();
        return;
        
    }
    
    
    
	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
			if(gameChar_x > width * 0.2)
			{
					gameChar_x -= 5;
			}
			else
			{
					scrollPos += 5;
			}
	}

	if(isRight)
	{
			if(gameChar_x < width * 0.8)
			{
					gameChar_x  += 5;
			}
			else
			{
					scrollPos -= 5; // negative for moving against the background
			}
	}

	// Logic to make the game character rise and fall.
    if(isOnPlatform == true)
    {
       isJumping = false;
    }
       
    if(!isOnPlatform)
    {
        if(gameChar_y < floorPos_y)
        {
                gameChar_y += 3;
                isJumping = true;
        }
        else
        {
                isJumping = false;
        }
    
        if(isFalling)
        {
                gameChar_y += 10;
        }
    }
    
   
    
    
	// Updating real position of gameChar for collision detection.
	realPos = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

		

	if(key == 'A' || keyCode == 37)
	{
			isLeft = true;
	}

	if(key == 'D' || keyCode == 39)
	{
			isRight = true;
	}

	if(key == ' ' || key == 'W')
	{
			if(!isJumping)
			{
					gameChar_y -= 100;
			}
	}
}

function keyReleased(){

	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{

    
    if(isLeft && isJumping){
        
        //HEAD
        fill(192,192,192);
        stroke(0);
        rect(gameChar_x + 5,gameChar_y-40,20,20);
        //BODY
        rect(gameChar_x,gameChar_y-20,30,30);
        //BODY
        fill(0,0,0);
        //EYES
        ellipse(gameChar_x+8,gameChar_y-30,5,5);
        //ARMS
        fill(0,0,0);
        rect(gameChar_x+30,gameChar_y-20,5,15);
        rect(gameChar_x-15,gameChar_y-20,15,5);
        //FEET
        rect(gameChar_x,gameChar_y-7,10,10);
        rect(gameChar_x+20,gameChar_y,10,10);


    }
    else if(isRight && isJumping)
    {
    
        //HEAD
        fill(192,192,192);
        stroke(0);
        rect(gameChar_x + 5,gameChar_y-40,20,20);
        //BODY
        rect(gameChar_x,gameChar_y-20,30,30);
        //EYES
        fill(0,0,0);
        ellipse(gameChar_x+23,gameChar_y-30,5,5);
        //ARMS
        fill(0,0,0);
        rect(gameChar_x+30,gameChar_y-20,15,5);
        rect(gameChar_x-5,gameChar_y-20,5,15);
        //FEET
        rect(gameChar_x,gameChar_y,10,10);
        rect(gameChar_x+20,gameChar_y-7,10,10);
      


    }
    else if(isLeft)  
    {
    
    
        //HEAD
        fill(192,192,192);
        stroke(0);
        rect(gameChar_x + 5,gameChar_y-40,20,20);
        //BODY
        rect(gameChar_x,gameChar_y-20,30,30);
        //EYES
        fill(0,0,0);
        ellipse(gameChar_x+8,gameChar_y-30,5,5);
        //ARMS
        fill(0,0,0);
        rect(gameChar_x+30,gameChar_y-20,5,15);
        rect(gameChar_x-15,gameChar_y-20,15,5);
        //FEET
        rect(gameChar_x,gameChar_y,10,10);
        rect(gameChar_x+20,gameChar_y,10,10);

    }
    else if(isRight)
    {
   
    //HEAD
    fill(192,192,192);
    stroke(0);
    rect(gameChar_x + 5,gameChar_y-40,20,20);
    //BODY
    rect(gameChar_x,gameChar_y-20,30,30);
    //EYES
    fill(0,0,0);
    ellipse(gameChar_x+23,gameChar_y-30,5,5);
    //AMRS
    fill(0,0,0);
    rect(gameChar_x+30,gameChar_y-20,15,5);
    rect(gameChar_x-5,gameChar_y-20,5,15);
    //FEET 
    rect(gameChar_x,gameChar_y,10,10);
    rect(gameChar_x+23,gameChar_y,10,10);
    
        
    

    }
    else if(isJumping || isFalling)
    {
    
    
   
    //HEAD
    fill(192,192,192);
    stroke(0);
    rect(gameChar_x + 5,gameChar_y-40,20,20);
    //BODY
    rect(gameChar_x,gameChar_y-20,30,30);
    //EYES
    fill(0,0,0);
    ellipse(gameChar_x+8,gameChar_y-30,5,5);
    ellipse(gameChar_x+23,gameChar_y-30,5,5);
    //ARMS
    fill(0,0,0);
    rect(gameChar_x,gameChar_y-7,10,10);
    rect(gameChar_x+20,gameChar_y-7,10,10);
    //AMRS
    rect(gameChar_x+30,gameChar_y-20,15,5);
    rect(gameChar_x-15,gameChar_y-20,15,5);
    


    }
    else
    {

    //HEAD
    fill(192,192,192);
    stroke(0);    
    rect(gameChar_x + 5,gameChar_y-40,20,20);
    //BODY
    rect(gameChar_x,gameChar_y-20,30,30);
    //EYES
    fill(0,0,0);
    ellipse(gameChar_x+8,gameChar_y-30,5,5);
    ellipse(gameChar_x+23,gameChar_y-30,5,5);
    //ARMS
    fill(0,0,0);
    rect(gameChar_x,gameChar_y,10,10);
    rect(gameChar_x+20,gameChar_y,10,10);
    //FEET 
    rect(gameChar_x+30,gameChar_y-20,5,15);
    rect(gameChar_x-5,gameChar_y-20,5,15);

    }
    
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
    
    
    for (var i =0; i < clouds.length; i++)
    {
        
        noStroke();
        fill(clouds[i].color);
        ellipse(clouds[i].xpos+180,clouds[i].ypos+100,150,150);
        ellipse(clouds[i].xpos+120,clouds[i].ypos+100,100,100);
        ellipse(clouds[i].xpos+240,clouds[i].ypos+100,100,100);
        
    }
    
    
}

// Function to draw mountains objects.
function drawMountains()
{
    
    for (var i = 0; i < mountains.length; i++)
    {
        
        fill(255,0,0);
        stroke(0,0,0);
        fill(mountains[i].color,69,19);

        triangle(mountains[i].xpos,mountains[i].floorPos_y+432, mountains[i].xpos+300,mountains[i].floorPos_y+432, mountains[i].xpos+150,mountains[i].floorPos_y+127);
        triangle(mountains[i].xpos+100,mountains[i].floorPos_y+432, mountains[i].xpos,mountains[i].floorPos_y+432, mountains[i].xpos+150,mountains[i].floorPos_y+130);

        triangle(mountains[i].xpos,mountains[i].floorPos_y+432, mountains[i].xpos+350,mountains[i].floorPos_y+432, mountains[i].xpos+175,mountains[i].floorPos_y+227);
        triangle(mountains[i].xpos+100,mountains[i].floorPos_y+432, mountains[i].xpos,mountains[i].floorPos_y+432, mountains[i].xpos+175,mountains[i].floorPos_y+230);

    }
    
   
}



// Function to draw houses objects.
 function drawHouses()
{
    
   
    
    // Draw houses.
    for (var i =0; i < houses.length; i++)
    {    
        //main
        stroke(0,0,0);
        fill(169,169,169);
        rect(houses[i].xpos,floorPos_y-140,150,140);
        //door
        fill(58,58,58);
        rect(houses[i].xpos+65,floorPos_y-40,25,40);
        //house windows
        fill(255,255,224,150);
        rect(houses[i].xpos+25,floorPos_y-110,25,25);
        rect(houses[i].xpos+100,floorPos_y-110,25,25);
        rect(houses[i].xpos+25,floorPos_y-85,25,25);
        rect(houses[i].xpos+100,floorPos_y-85,25,25);
        //house roof
        fill(58,58,58)
        triangle(houses[i].xpos,floorPos_y-140,houses[i].xpos+70,floorPos_y-200,houses[i].xpos+150,floorPos_y-140);

    }
    
   
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
   
  fill(0,0,0);   
  rect(t_canyon.xpos,floorPos_y,t_canyon.width,height/4);
    

}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    
 if(realPos > t_canyon.xpos && realPos < t_canyon.xpos + t_canyon.width)
        {
            if(gameChar_y >= floorPos_y)
            {
                isFalling = true;
            }
        }
            if(isFalling)
        {
            gameChar_y +=5;
        }
    
    

}



// ----------------------------------
// Pick-up render and check functions
// ----------------------------------

// Function to draw pick-up objects.
function drawJewel(jewels)
{
    
    if(!jewels.isFound)
    {    
        fill(0,255,0);
        stroke(0,0,0);


        beginShape();

        vertex(jewels.x_pos+45,jewels.y_pos+90);

        vertex(jewels.x_pos+45,jewels.y_pos+75);
        vertex(jewels.x_pos+58,jewels.y_pos+65);



        //top

        vertex(jewels.x_pos+87,jewels.y_pos+65);
        vertex(jewels.x_pos+100,jewels.y_pos+75);
        vertex(jewels.x_pos+100,jewels.y_pos+90);
        vertex(jewels.x_pos+72,jewels.y_pos+110);

        endShape(CLOSE);

        stroke(0,0,0);
        line(jewels.x_pos+45,jewels.y_pos+90,jewels.x_pos+99,jewels.y_pos+90);
        line(jewels.x_pos+45,jewels.y_pos+75,jewels.x_pos+99,jewels.y_pos+75);
    
    }
    
    
}

// Function to check character has picked up an item.
function checkJewel(jewels)
{
    
  if(realPos > jewels.x_pos  && realPos < jewels.x_pos + jewels.size )
        {
            
            if(!jewels.isFound)
            {
            jewels.isFound = true;
            score = score +1;
            }
        }
}



function checkPlayerWon()
{
if (score == jewels.length)
    {
        isWon = true;
    }
}

function checkPlayerDied()
{    
    if(gameChar_y > height)
    {
        playerDied();
    }
                
}
    
function playerDied()
{
   
    
    console.log("you died");
    if (lives > 1)
    {    

        lives -=1;
        score = 0;
        startGame();   
                    
                       
    }
                
     else
    {
        isLost = true;
    }
            
                            
            
}
    
