let player;
let resources = [];
let cityArea;
let fieldArea;
let playerInCity = true; // Começa na cidade

function setup() {
  createCanvas(600, 400);
  
  // Define as áreas da cidade e do campo
  cityArea = { x: 0, y: 0, width: width / 2, height: height };
  fieldArea = { x: width / 2, y: 0, width: width / 2, height: height };
  
  // Cria o personagem
  player = new Player();
  
  // Cria recursos no campo e na cidade
  resources.push(new Resource(random(50, 300), random(100, 300), 'field'));
  resources.push(new Resource(random(350, 550), random(100, 300), 'city'));
}

function draw() {
  background(220);
  
  // Desenha a cidade e o campo
  fill(200, 200, 255); // Cor para a cidade
  rect(cityArea.x, cityArea.y, cityArea.width, cityArea.height);
  
  fill(150, 255, 150); // Cor para o campo
  rect(fieldArea.x, fieldArea.y, fieldArea.width, fieldArea.height);
  
  // Desenha o personagem
  player.update();
  player.display();
  
  // Desenha os recursos
  for (let resource of resources) {
    resource.display();
  }
  
  // Verifica a colisão com os recursos
  player.checkCollision(resources);
  
  // Exibe o título do jogo
  fill(0);
  textSize(24);
  text("Conexão Campo - Cidade", 180, 30);
  
  // Exibe o status do jogador (onde ele está)
  textSize(18);
  text(playerInCity ? "Você está na cidade" : "Você está no campo", 180, 350);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move(-10, 0);
  } else if (keyCode === RIGHT_ARROW) {
    player.move(10, 0);
  } else if (keyCode === UP_ARROW) {
    player.move(0, -10);
  } else if (keyCode === DOWN_ARROW) {
    player.move(0, 10);
  }
}

class Player {
  constructor() {
    this.x = width / 4;
    this.y = height / 2;
    this.size = 20;
    this.resourcesCollected = [];
  }
  
  update() {
    // Lógica para transitar entre o campo e a cidade
    if (this.x > fieldArea.x) {
      playerInCity = false;
    } else {
      playerInCity = true;
    }
  }
  
  move(x, y) {
    this.x += x;
    this.y += y;
  }
  
  display() {
    fill(0);
    ellipse(this.x, this.y, this.size);
  }
  
  checkCollision(resources) {
    for (let i = resources.length - 1; i >= 0; i--) {
      let r = resources[i];
      if (dist(this.x, this.y, r.x, r.y) < this.size / 2 + r.size / 2) {
        this.resourcesCollected.push(r);
        resources.splice(i, 1);
        break;
      }
    }
  }
}

class Resource {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.size = 30;
    this.type = type; // 'field' ou 'city'
  }
  
  display() {
    if (this.type === 'field') {
      fill(34, 139, 34); // Cor do recurso do campo
    } else {
      fill(0, 0, 255); // Cor do recurso da cidade
    }
    ellipse(this.x, this.y, this.size);
  }
}
