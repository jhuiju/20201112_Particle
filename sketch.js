//비가 오는것처럼 만들어보고싶다.
//우산을 만들어서 마우스에 따라다니게 만들고 비가 우산에 닿으면 튕겨지도록
let systems = [];

function setup() {
  let text = createP("click to add particle systems");
  text.position(10, 730);

  createCanvas(1080, 720);
}

function draw() {
  background(0, 0, 0, 25);
  for (let i = 0; i < systems.length; i++) {
    systems[i].addParticle();
    systems[i].run();
  }
}

function mousePressed() {
  systems.push(new ParticleSystem(1, createVector(mouseX, mouseY)));
}
class Particle {
  constructor(position) {
    this.acceleration = createVector(0, 0.06);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.position = position.copy();
    this.lifespan = 300.0;
  }

  run() {
    this.update();
    this.display();
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }

  // Method to display
  display() {
    stroke(255, 255);
    strokeWeight();
    fill(130, 200, random(220, 240), 170);
    ellipse(this.position.x, this.position.y, 8, 8);
  }

  // Is the particle still useful?
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
class ParticleSystem {
  constructor(num, position) {
    this.origin = position.copy();
    this.particles = [];
    for (let i = 0; i < num; i++) {
      this.particles.push(new Particle(this.origin));
    }
  }

  addParticle() {
    this.particles.push(new Particle(this.origin));
  }

  run() {
    for (let particle of this.particles) {
      particle.run();
    }
    this.particles = this.particles.filter(particle => !particle.isDead());
  }
}
