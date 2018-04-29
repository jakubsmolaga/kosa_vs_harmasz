function Pipe(x){
  this.x = x;
  this.velocity = 7;
  this.hole_size = 200;
  this.width = 100;
  this.hole_y = Math.random() * (500-this.hole_size) + this.hole_size;
  this.image_down = document.getElementById('pipe');
  this.image_up = document.getElementById('pipe2');

  this.draw = (canvas) => {
    canvas.drawImage(this.image_down, this.x, this.hole_y, this.width, 500);
    canvas.drawImage(this.image_up, this.x, this.hole_y-this.hole_size-500, this.width, 500);
  };

  this.update = () => {
    this.x -= this.velocity;
    if (this.x < -this.width) {
      this.x = 800;
      this.hole_y = Math.random() * (500-this.hole_size) + this.hole_size;
    }
  };

  this.checkCollision = (bounds) => {
    //upper pipe
    if (bounds.x + bounds.width > this.x &&
        bounds.x < this.x + this.width &&
        bounds.y < this.hole_y - this.hole_size) return true;
    //lower pipe
    if (bounds.x + bounds.width > this.x &&
        bounds.x < this.x + this.width &&
        bounds.y + bounds.height > this.hole_y) return true;
    //else
    return false
  };
}
