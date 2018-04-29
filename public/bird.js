function Bird(x, y, brain){

  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 50;
  this.vx = 0;
  this.vy = 0;
  this.alive = true;
  this.fitness = 0;

  this.brain = brain;


  this.update = () => {
    this.vy += gravity;
    this.y += this.vy;
    if(this.alive) this.fitness++;
  }

  this.draw = (canvas) => {
    if (!this.alive) return;
    //canvas.fillStyle = 'blue';
    if(this.image) canvas.drawImage(this.image, this.x, this.y, this.width, this.height);
    else canvas.fillRect(this.x, this.y, this.width, this.height)
  };

  this.jump = () => {
    if (this.vy >= 0) this.vy = -15;
  };

  this.getBounds = () => {
    bounds = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    }
    return bounds;
  };

  this.think = (obstacleX, holeY) => {
    let thought = this.brain.activate([this.y/screenHeight, obstacleX/screenWidth, holeY/screenHeight, this.vy/20, this.y/screenHeight, (this.y-holeY)/500]);
    //console.log(this.brain.activate([1,1,1 ,1,1,1]));
    if ( thought > 0.5 ) this.jump();
  };
}
