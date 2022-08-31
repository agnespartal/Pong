//bolinha
let xBolinha = 300; 
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2

//velocidade bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Raquete 1 
let xRaquete1 = 10;
let yRaquete1 = 150;
let larguraRaquete = 10;
let alturaRaquete = 80;

//Raquete 2 
let xRaquete2 = 580
let yRaquete2 = 150
let velocidadeYRaquete2;
let chanceDeErrar = 0;
  
let colidir = false;

//placar

let meusPontos = 0;
let pontosOponente = 0;

//sons

let raquete;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquete = loadSound("raquetada.mp3");
}
  
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movBolinha();
  colisaoBorda();
  mostraRaquete(xRaquete1, yRaquete1);
  movRaquete1();
  //colisaoRaquete1();
  colidirRaqueteBiblioteca(xRaquete1,yRaquete1);
  mostraRaquete (xRaquete2, yRaquete2);
  movRaquete2();
  colidirRaqueteBiblioteca(xRaquete2, yRaquete2);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}


function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function  colisaoBorda(){
  if (xBolinha+raio > width || xBolinha-raio < 0){ 
    velocidadeXBolinha *= -1;
  }
  if (yBolinha+raio > height || yBolinha-raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
    rect(x , y , larguraRaquete, 
      alturaRaquete);
}


function movRaquete1 (){
    if (keyIsDown(UP_ARROW)) {
    yRaquete1 -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete1 += 10;
  }
}


function colisaoRaquete1() {
    if (xBolinha - raio < xRaquete1 + larguraRaquete &&
        yBolinha - raio < yRaquete1 + alturaRaquete && 
        yBolinha + raio > yRaquete1) {
        velocidadeXBolinha *= -1;
    }

}

function colidirRaqueteBiblioteca(x,y){
   colidir = collideRectCircle(x, y,
  larguraRaquete, alturaRaquete, xBolinha, yBolinha,
  raio);
  if (colidir == true){
    velocidadeXBolinha *= -1
    raquete.play();
  }
  
}

function movRaquete2(){
  velocidadeYRaquete2 = yBolinha - yRaquete2 - larguraRaquete / 2 - 30;
  yRaquete2 += velocidadeYRaquete2 + chanceDeErrar;
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER)
  textSize (24);
  fill(color(255,99,71));
  rect(230, 5 , 40 ,30);
  fill(255);
  text (meusPontos, 250 , 26);
  fill(color(255,99,71));
  rect(330 , 5 , 40 , 30);
  fill(255);
  text (pontosOponente, 350 , 26)
}

function marcaPonto(){
  if (xBolinha > 588){
    meusPontos += 1
    ponto.play();
  }
  if (xBolinha < 12){
    pontosOponente += 1
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}
