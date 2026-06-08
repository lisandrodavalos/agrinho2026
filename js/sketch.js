let jogador;
let itens = [];

let producao = 50;
let sustentabilidade = 50;

let tempo = 60;
let ultimoSegundo;

function setup() {
  createCanvas(800, 600);

  jogador = {
    x: width / 2,
    y: height - 60,
    tamanho: 50
  };

  ultimoSegundo = millis();

  for (let i = 0; i < 8; i++) {
    criarItem();
  }
}

function draw() {
  background(120, 200, 120);

  desenharCampo();
  movimentarJogador();
  desenharJogador();
  atualizarItens();
  painel();
  controlarTempo();

  if (tempo <= 0) {
    telaFinal();
    noLoop();
  }
}

function desenharCampo() {
  fill(90, 180, 90);
  rect(0, 400, width, 200);

  stroke(150, 120, 80);

  for (let i = 0; i < width; i += 60) {
    line(i, 400, i, 600);
  }

  noStroke();
}

function desenharJogador() {
  fill(255, 0, 0);
  rect(jogador.x, jogador.y, jogador.tamanho, 30);

  fill(50);
  circle(jogador.x + 10, jogador.y + 35, 15);
  circle(jogador.x + 40, jogador.y + 35, 15);
}

function movimentarJogador() {
  if (keyIsDown(LEFT_ARROW)) {
    jogador.x -= 6;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    jogador.x += 6;
  }

  jogador.x = constrain(
    jogador.x,
    0,
    width - jogador.tamanho
  );
}

function criarItem() {
  const tipo = random(["arvore", "agua", "poluicao"]);

  itens.push({
    x: random(width),
    y: -20,
    tipo,
    velocidade: random(2, 5)
  });
}

function atualizarItens() {
  for (let i = itens.length - 1; i >= 0; i--) {
    let item = itens[i];

    item.y += item.velocidade;

    textSize(28);

    switch (item.tipo) {
      case "arvore":
        text("🌱", item.x, item.y);
        break;

      case "agua":
        text("💧", item.x, item.y);
        break;

      case "poluicao":
        text("🛢️", item.x, item.y);
        break;
    }

    let d = dist(
      item.x,
      item.y,
      jogador.x + 25,
      jogador.y + 15
    );

    if (d < 40) {

      switch (item.tipo) {
        case "arvore":
          sustentabilidade += 10;
          break;

        case "agua":
          producao += 10;
          break;

        case "poluicao":
          sustentabilidade -= 15;
          break;
      }

      itens.splice(i, 1);
      criarItem();
    }

    if (item.y > height) {
      itens.splice(i, 1);
      criarItem();
    }
  }
}

function painel() {
  fill(255);
  rect(10, 10, 260, 100, 10);

  fill(0);
  textSize(18);

  text(`Produção: ${producao}`, 25, 40);
  text(`Sustentabilidade: ${sustentabilidade}`, 25, 70);
  text(`Tempo: ${tempo}`, 25, 100);
}

function controlarTempo() {
  if (millis() - ultimoSegundo >= 1000) {
    tempo--;
    ultimoSegundo = millis();
  }
}

function telaFinal() {
  background(220);

  textAlign(CENTER);

  fill(0);
  textSize(32);
  text("RESULTADO", width / 2, 120);

  textSize(22);

  if (
    producao >= 100 &&
    sustentabilidade >= 100
  ) {
    text(
      "Parabéns!\nVocê criou um agro forte e sustentável!",
      width / 2,
      250
    );
  } else if (producao > sustentabilidade) {
    text(
      "Boa produção,\nmas é preciso cuidar mais do meio ambiente.",
      width / 2,
      250
    );
  } else {
    text(
      "Você protegeu a natureza,\nmas precisa aumentar a produção.",
      width / 2,
      250
    );
  }

  text(
    `Produção Final: ${producao}`,
    width / 2,
    380
  );

  text(
    `Sustentabilidade Final: ${sustentabilidade}`,
    width / 2,
    420
  );
}
