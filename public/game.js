const gravity=1.5;
const FPS = 30;

let canvas;
//let player;
let pipes;
let activePipeIndex;
let paused;
let screenWidth;
let screenHeight;
let birds;
let populationSize;
let birdsAlive;

function setup(){
  screenWidth = 800;
  screenHeight = 500;
  populationSize = 30;

  //player = new Bird(200, 225);
  Perceptron.clone = function() {return Perceptron.fromJSON(Perceptron.toJSON(this))}
  birds=[];
  for (let i=0; i<populationSize; i++) birds.push(new Bird(200, 225, new Architect.Perceptron(6, 8, 1)));
  birdsAlive=populationSize;
  pipes = [];
  pipes.push(new Pipe(800));
  pipes.push(new Pipe(1100));
  pipes.push(new Pipe(1400))
  activePipeIndex=0;
  paused = false;
}

function restart() {
  bestBird = birds[0];
  for (i in birds) if (birds[i].fitness > bestBird.fitness) bestBird = birds[i];

  birds=[];
  for (let i=0; i<populationSize; i++) birds.push(new Bird(200, 225, Network.fromJSON(bestBird.brain.toJSON())));
  for (let i=1;i<populationSize;i++){
    birds[i].brain.mutate(neataptic.methods.mutation.MOD_WEIGHT);
    birds[i].brain.mutate(neataptic.methods.mutation.MOD_BIAS);
  }
  for (let i=1;i<populationSize/2;i++){
    birds[i].brain.connections[Math.floor(Math.random()*56)].weight = Math.random()-0.5
  }
  birds[populationSize-1].brain = new Architect.Perceptron(6, 8, 1);
  birdsAlive=populationSize;
  pipes = [];
  pipes.push(new Pipe(800));
  pipes.push(new Pipe(1100));
  pipes.push(new Pipe(1400))
  activePipeIndex=0;
}

function draw(){
  //updates
  if (!paused){
    //player.update();
    // if (player.y + player.height > screenHeight){
    //   setup();
    //   return;
    // }
    for (i in birds) {
      if (birds[i].alive){
        birds[i].think(pipes[activePipeIndex].x, pipes[activePipeIndex].hole_y);
        birds[i].update();
        if (birds[i].y + birds[i].height > screenHeight || birds[i].y < 0){
          birds[i].alive=false;
          birdsAlive--;
        }
      }
    }
    for (i in pipes) pipes[i].update();
    //if (pipes[activePipeIndex].x + pipes[activePipeIndex].width < player.x) activePipeIndex++;
    if (pipes[activePipeIndex].x + pipes[activePipeIndex].width < birds[0].x) activePipeIndex++;
    if (activePipeIndex >= pipes.length) activePipeIndex=0;

    for (i in birds){
      if ( birds[i].alive && pipes[activePipeIndex].checkCollision(birds[i].getBounds())){
        birds[i].alive = false;
        birdsAlive--;
      }
    }
    if (birdsAlive === 0) restart();
    // if (pipes[activePipeIndex].checkCollision(player.getBounds())) setup();
  }

  //drawing
  canvas.fillStyle = 'white';
  canvas.fillRect(0,0,800,500);
  //player.draw(canvas);
  canvas.fillStyle = 'blue';
  for (i in birds) birds[i].draw(canvas);
  canvas.fillStyle = 'green';
  for (i in pipes) pipes[i].draw(canvas);
}

function keyPressed(e){
  if(e.keyCode == 32){
    paused=false;
    //player.jump();
  }
}

window.onload = () => {
  let canvas_object = document.getElementById('game_canvas')
  canvas = canvas_object.getContext('2d');

  setup();
  setInterval(draw, 1000/FPS);
  document.addEventListener('keydown', keyPressed);
}
