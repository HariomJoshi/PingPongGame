const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// ping pong game

//creating a rectangle in between
const width = 400;
const height = 600;
canvas.width = width;
canvas.height = height;



// draw canvas
function showScore(s1, s2){
    // showing the score
    let score1 = s1;
    let score2 = s2;
    ctx.font = "30px serif";
    ctx.fillText(score1, 10, 280);
    ctx.fillText(score2, 10, 340);
}

p1 = {
    x : 175,
    y : 10,
    goingLeft: false,
    goingRight: false,
    width :50,
    height : 10,
}

p2 ={
    x: 175,
    y: height -20,
    goingLeft: false,
    goingRight: false,
    width:50,
    height:10,
}


const drawCanvas = ()=>{

    // create a paddle
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, width, height);
    ctx.fillStyle = "white";
    ctx.fillRect(p1.x, p1.y, p1.width, p1.height);
    ctx.fillRect(p2.x, p2.y, p2.width, p2.height);

    // drawing the center line;
    ctx.beginPath();
    ctx.setLineDash([6]);
    ctx.moveTo(0, height/2);
    ctx.lineTo(width, height/2);

    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();    
}


//drawing a circle in between
const ball = {
    x:width/2,
    y:height/2,
    vx: 3,
    vy: 3,
    radius:5,
    colour: "white",
    draw(){
        ctx.beginPath();
        ctx.setLineDash([0]);
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.stroke(); 
    }

};

// function to draw (where the magic happens)
let s1 = 0;
let s2 = 0;
function draw(){
    ctx.clearRect(0,0, width, height);
    drawCanvas();
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
    
    if(ball.x + ball.vx > width || ball.x + ball.vx < 0){
        ball.vx = -ball.vx;
    }

    if(ball.y + ball.vy > height || ball.y + ball.vy < 0){
        if(ball.y + ball.vy > height){
            s1++;
        }else if(ball.y + ball.vy < 0){
            s2++;
        }
        ball.vy = -ball.vy;
    }

    // logic to go moove the pedal left or right

    if(p1.goingLeft && p1.x>0){
        p1.x -= 3; 
    }
    if(p1.goingRight && p1.x + p1.width< width){
        p1.x +=3;
    }
    if(p2.goingLeft && p2.x>0){
        p2.x -= 3;
    }
    if(p2.goingRight && p2.x + p1.width< width){
        p2.x += 3; 
    }

    // logic to make the ball bounce on hitting the pedal

    let y = ball.y + ball.radius/2;
    let x = ball.x + ball.radius/2;

    // handling when ball hits from above
    if((((y) >= p2.y) && (x >= p2.x && x <= p2.x + p2.width)) || ((y) <= (p1.y + p1.height) && (x >= p1.x && x <= p1.x + p1.width))){
        ball.vy = -ball.vy;
    }

    // handling when ball strikes from side
    // else if(((x>= p1.x || x<= p1.x + p1.width) && (y < p1.y + p1.height && y> p1.y)) || ((x>= p2.x || x<= p2.x + p2.width) &&(y < p2.y + p2.height && y> p2.y) )){
    //     ball.vx = -ball.vx;
    // }


    showScore(s1,s2);

    raf = window.requestAnimationFrame(draw);

}


// making the paddle moove on keypresses
document.body.addEventListener("keydown", function(event){ 
    switch(event.key){
        case 'a':
            p1.goingLeft = true;
            break;
        case 'd':
            p1.goingRight = true;
            break;
        case 'ArrowRight':
            p2.goingRight = true;
            break;
        case 'ArrowLeft':
            p2.goingLeft = true;
            break;
        default:
            break;       
    }

})

document.body.addEventListener("keyup", function(event){ 
    switch(event.key){
        case 'a':
            p1.goingLeft = false;
            break;
        case 'd':
            p1.goingRight = false;
            break;
        case 'ArrowRight':
            p2.goingRight = false;
            break;

        case 'ArrowLeft':
            p2.goingLeft = false;
            break;

        default:
            break;
    }
})

let animation = false;
// making ball moove on mouseover
document.body.addEventListener("keypress", (e) => {
    if(e.key === "Enter" && !animation){
        animation = true;
        raf = window.requestAnimationFrame(draw);    
    }
       
});
  
document.body.addEventListener("keypress", (e) => {
    if(e.key === "p" && animation){
        animation = false;
        window.cancelAnimationFrame(raf);
    } 
});


ball.draw()
drawCanvas()







