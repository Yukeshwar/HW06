let table;

function preload() {
  table = loadTable("Tree-Census-2015.csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  textFont('Arial');
}

function draw() {
  setElegantGradientBackground();
  drawMapOutline();

  let minLat = 40.5, maxLat = 40.9;
  let minLong = -74.3, maxLong = -73.7;

  for (let i = 0; i < table.getRowCount(); i++) {
    let lat = table.getNum(i, "latitude");
    let long = table.getNum(i, "longitude");
    let health = table.getString(i, "health");

    if (isNaN(lat) || isNaN(long) || !health) {
      continue;
    }

    let x = map(long, minLong, maxLong, 50, width - 50);
    let y = map(lat, minLat, maxLat, height - 50, 50);

    let col, size;
    if (health === "Good") {
      col = color(85, 180, 90, 200);
      size = random(7, 10);
    } else if (health === "Fair") {
      col = color(245, 200, 80, 160);
      size = random(5, 8);
    } else if (health === "Poor") {
      col = color(230, 90, 90, 120);
      size = random(4, 6);
    } else {
      col = color(200, 200, 200, 100);
      size = random(3, 5);
    }

    fill(col);
    noStroke();
    ellipse(x, y, size, size);
  }

  drawLegend();
  drawTitleAndLabels();
}

function setElegantGradientBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(200, 225, 255), color(255, 230, 240), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawMapOutline() {
  stroke(100, 100, 100, 150);
  strokeWeight(1.5);
  noFill();

  beginShape();
  vertex(100, height - 150);
  vertex(300, height - 600);
  vertex(450, height - 620);
  vertex(500, height - 450);
  vertex(700, height - 300);
  vertex(650, height - 150);
  endShape(CLOSE);
}

function drawTitleAndLabels() {
  fill(30);
  textSize(24);
  textStyle(BOLD);
  textAlign(CENTER);
  text("Tree Health Across NYC Boroughs (2015 Tree Census)", width / 2, 40);

  fill(50);
  textSize(14);
  textStyle(NORMAL);
  textAlign(CENTER);
  text("Manhattan", width * 0.3, height * 0.2);
  text("Brooklyn", width * 0.7, height * 0.7);
  text("Queens", width * 0.8, height * 0.4);
  text("Bronx", width * 0.5, height * 0.1);
  text("Staten Island", width * 0.2, height * 0.8);
}

function drawLegend() {
  fill(255, 250, 240, 200);
  noStroke();
  rect(20, height - 150, 150, 100, 10);

  fill(50);
  textSize(14);
  textStyle(BOLD);
  text("Legend", 95, height - 130);

  textSize(12);
  textStyle(NORMAL);

  fill(85, 180, 90, 200);
  ellipse(40, height - 100, 10, 10);
  fill(50);
  text("Good Health", 60, height - 95);

  fill(245, 200, 80, 160);
  ellipse(40, height - 80, 8, 8);
  fill(50);
  text("Fair Health", 60, height - 75);

  fill(230, 90, 90, 120);
  ellipse(40, height - 60, 6, 6);
  fill(50);
  text("Poor Health", 60, height - 55);

  fill(200, 200, 200, 100);
  ellipse(40, height - 40, 5, 5);
  fill(50);
  text("Unknown", 60, height - 35);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
