var X = [];
for (let i = 1; i < 10; i++) {
  X[i] = 0;
}
  
var typing = '';
var time = 0;
var word = [];
var sen = '';
var eyeX= 0;
var eyeY= 0;

webgazer.setGazeListener(function(data, elapsedTime) {
	eyeX = data.x
	eyeY = data.y
  // console.log(eyeX);
  // console.log(eyeY);
}).begin();


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255,255,255)
  fill(0,0,0)
  
  // this.x = windowWidth;
  // this.y = windowHeight;
}

function draw() {
  let outcome = [];
  let first = '';
  let mid = '';
  let last = '';
  let last2 =''; 
  let d;
  d = dist(eyeX, eyeY, windowWidth/2, windowHeight/2);

  frameRate(60);
  background(255,255,255);

  textAlign(CENTER, CENTER);
  text(word, windowWidth/2, windowHeight/2+30);
  text(sen, windowWidth/2,  windowHeight/2-30);

  textAlign(CENTER, CENTER);

  if(word[0] == '' | word[0] == undefined){
    first = consonant_input();
    if(time>20){
      word[0] = first;
      time = 0;
    }
  }

  else if(word[1] == '' | word[1] == undefined){
    idle();
    mid = vowel_input();
    if(time>30){
      word[1] = mid;
      time = 0;
    }
  }
  
  else if(word[2] == '' | word[2] == undefined){
    last = consonant2_input();
    if(time>30){
      word[2] = last;
      time = 0;
    }
  }
  else if(word[2] == 'ㄹ' | word[2] == 'ㄱ' | word[2] == 'ㄴ' | word[2] == 'ㅂ'){
      last2 = consonant3_input(word[2]);
      if(time>30){
        word[3] = last2;

        outcome = Hangul.assemble(word);
        sen = sen + outcome;
        typing = '';
        word = [];
        time =0;
      }
  }

  else{
    outcome = Hangul.assemble(word);
    sen = sen + outcome;
    typing = '';
    word = [];
    time =0;
  }
  
  if(word[0]== ' '){
    sen = sen + ' ';
    word = [];
    time = 0;
  }
  
  else if(d<100){
        //key = 0;
        outcome = Hangul.assemble(word);
        sen = sen + outcome;
        typing = '';
        word = [];
        time =0;
        
  }
  // console.log(first);
  // console.log(mid);
  // console.log(typing);
  // console.log(word);
  // //console.log(word[2]);
  // //console.log(word[3]);
  // //console.log(outcome);
  // console.log(sent);
}

function keyReleased(){
  if(key == 1){
    if(word[0] != '' & word[0] != undefined){
      word = [];
      typing = '';
      console.log(2);
    }
    
    else{
      console.log(3);
      sen = sen.substring(0, sen.length -1);
      word = [];
      typing = '';
    }
  }
}

function idle(duc){
  textSize(32);
  
  let cx = [];
  let cy = [];
  for (let i = 1; i < 10; i++) {
    cx[i] = windowWidth/2 + sin(radians(45*(i-1)))*windowHeight/2.5
    cy[i] = windowHeight/2 - cos(radians(45*(i-1)))*windowHeight/2.5
  }

  fill('blue')
  ellipse(windowWidth/2, windowHeight/2, 10);
  fill('black')
  
  if(duc== 0){
      text('ㄱ', cx[1], cy[1]);
      text('ㅌ', cx[3], cy[3]);
      text('ㅂ', cx[4], cy[4]);
      text('ㅅ', cx[6], cy[6]);
      text('ㅈ', cx[7], cy[7]);
      text('ㅁ', cx[8], cy[8]);
  }
  if(duc== 1){
      text('ㅅ', cx[6], cy[6]);
  }
  if(duc== 2){
      textSize(32);
      text('ㅎ', cx[6], cy[6]);
      text('ㅈ', cx[7], cy[7]);
  }
  else {
    text('ㄱ', cx[1], cy[1]);
    text('ㄴ', cx[2], cy[2]);
    text('ㄷ', cx[3], cy[3]);
    text('ㅂ', cx[4], cy[4]);
    text('space', cx[5], cy[5]);
    text('ㅅ', cx[6], cy[6]);
    text('ㅈ', cx[7], cy[7]);
    text('ㅇ', cx[8], cy[8]);
  }
  
}

function nolr(num){
  let first;
  time++;
  
  let r = 200;
  let cx = [];
  let cy = [];
  for (let i = 1; i < 10; i++) {
    cx[i] = windowWidth/2 + sin(radians(45*(i-1)))*windowHeight/2.5
    cy[i] = windowHeight/2 - cos(radians(45*(i-1)))*windowHeight/2.5
  }
  
  let common_con = ['','ㄱ','ㄴ','ㄷ','ㅂ',' ','ㅅ','ㅈ','ㅇ'];
  let double_con = ['','ㄲ', '', 'ㄸ', 'ㅃ', '', 'ㅆ', 'ㅉ', ''];
  let storng_con = ['','ㅋ', 'ㄹ', 'ㅌ', 'ㅍ', '', 'ㅎ', 'ㅊ', 'ㅁ'];
  
  textSize(32);
  text(common_con[num], cx[num], cy[num]);
  
  X[num] = X[num] +5;
  
  let pos1, pos2;
  
  pos1 = cx[num] - X[num];
  pos2 = cx[num] + X[num]; 
      
  if (pos1 < cx[num] - 2*r/3){
      pos1 = cx[num] - 2*r/3;
  }
  if (pos2 > cx[num] + 2*r/3){
      pos2 = cx[num] + 2*r/3;
  }
  text(double_con[num], pos1, cy[num]);
  text(storng_con[num], pos2, cy[num]);
  fill('red')
  ellipse(windowWidth/2, windowHeight/2, 10);
  fill('black')

  if(eyeX > cx[num]+r/3){
    first = storng_con[num]
  }
  else if(eyeX < cx[num]-r/3){
    first = double_con[num]
  }
  else{
    first = common_con[num]
  }
  return first;
}

function noud(num, type){
  let first;
  time++;
  
  let r = 200;
  let cx = [];
  let cy = [];
  
  for (let i = 1; i < 10; i++) {
    cx[i] = windowWidth/2 + sin(radians(45*(i-1)))*windowHeight/2.5
    cy[i] = windowHeight/2 - cos(radians(45*(i-1)))*windowHeight/2.5
  }
  
  
  let common_con = ['','ㄱ','ㄴ','ㄷ','ㅂ',' ','ㅅ','ㅈ','ㅇ'];
  let double_con = ['','ㄲ', '', 'ㄸ', 'ㅃ', '', 'ㅆ', 'ㅉ', ''];
  let storng_con = ['','ㅋ', 'ㄹ', 'ㅌ', 'ㅍ', '', 'ㅎ', 'ㅊ', 'ㅁ'];
  let double_jong_con = ['','ㄲ', '', '', '', '', 'ㅆ', '', ''];
  let double_jong2_con = ['', '','', '','','ㅎ', '','',''];
  
  textSize(32);
  text(common_con[num], cx[num], cy[num]);
  
  X[num] = X[num] +5;
  
  let pos1, pos2;
  
  pos1 = cy[num] - X[num];
  pos2 = cy[num] + X[num]; 
    
  if (pos1 < cy[num] - 2*r/3){
      pos1 = cy[num] - 2*r/3;
  }
  if (pos2 > cy[num] + 2*r/3){
      pos2 = cy[num] + 2*r/3;
  }
  if(type == 'cho'){
    text(double_con[num], cx[num], pos1);
  }
  else if(type == 'jong'){
    text(double_jong_con[num], cx[num], pos1);
  }
  else if(type == 'jong2'){
    text(double_jong2_con[num], cx[num], pos1);
  }
  text(storng_con[num], cx[num], pos2);
  fill('red')
  ellipse(windowWidth/2, windowHeight/2, 10);
  fill('black')

  if(eyeY > cy[num]+r/3){
    first = storng_con[num];
  }
  else if(eyeY < cy[num]-r/3){
    if(type == 'cho'){
      first = double_con[num];
    }
    else if(type == 'jong'){
      first = double_jong_con[num];
    }
    else if(type == 'jong2'){
      first = double_jong2_con[num];
    }
  }
  else{
    first = common_con[num];
  }
  
  return first;
}

function non(num, type, duc){
  let first;
  time++;
  textSize(32);
  
  let r = 200;
  let cx = [];
  let cy = [];
  for (let i = 1; i < 10; i++) {
    cx[i] = windowWidth/2 + sin(radians(45*(i-1)))*windowHeight/2.5
    cy[i] = windowHeight/2 - cos(radians(45*(i-1)))*windowHeight/2.5
  }
  
  
  let ducons =[];
  for(let i=0; i<10; i++){
    ducons[i] = [];
  }
    
  ducons[0] = ['','ㄱ','','ㅌ','ㅂ',' ','ㅅ','ㅈ','ㅁ'];
  ducons[1] = ['','', '', '', '', '', 'ㅅ', '', ''];
  ducons[2] = ['','', '', '', '', '', 'ㅎ', 'ㅈ', ''];
  
  
  if(type == 'cho'){
    text('space', cx[num], cy[num]);
    first = ' ';
  }
  else if(type == 'jong2'){
    text(ducons[duc][num], cx[num], cy[num]);
    first = ducons[duc][num];
  }
  fill('red')
  ellipse(windowWidth/2, windowHeight/2, 10);
  fill('black')
  
  return first;
}


function consonant_input(){
  
  let first;
  let r = 200;
  let d = [];
  let cx = [];
  let cy = [];
  for (let i = 1; i < 10; i++) {
    cx[i] = windowWidth/2 + sin(radians(45*(i-1)))*windowHeight/2.5
    cy[i] = windowHeight/2 - cos(radians(45*(i-1)))*windowHeight/2.5
  }
  
  for (let i = 1; i<10; i++){
    d[i] = dist(eyeX, eyeY, cx[i], cy[i])
  }

  if(d[1]<r){
    first = nolr(1);
    
  }
  else if(d[2]<r){
    first = noud(2, 'cho');
  }
  else if(d[3]<r){
    first = noud(3, 'cho');
  }
  else if(d[4]<r){
    first = noud(4, 'cho');
  }
  else if(d[5]<r){
    first = non(5, 'cho', 3);
  }
  else if(d[6]<r){
    first = noud(6, 'cho');
  }
  else if(d[7]<r){
    first = noud(7, 'cho');
  }
  else if(d[8]<r){
    first = noud(8, 'cho')
  }
  else if(d[9]<r){
    first = noud(9, 'cho');
  }
  else{
    idle();
    first = '';
  }

  return first;
}

function consonant2_input(){
  
  let first;
  let r = 200;
  let d = [];
  let cx = [];
  let cy = [];
  for (let i = 1; i < 10; i++) {
    cx[i] = windowWidth/2 + sin(radians(45*(i-1)))*windowHeight/2.5
    cy[i] = windowHeight/2 - cos(radians(45*(i-1)))*windowHeight/2.5
  }
  
  for (let i = 1; i<10; i++){
    d[i] = dist(eyeX, eyeY, cx[i], cy[i])
  }

  if(d[1]<r){
    first = nolr(1);
    
  }
  else if(d[2]<r){
    first = noud(2, 'jong');
  }
  else if(d[3]<r){
    first = noud(3, 'jong');
  }
  else if(d[4]<r){
    first = noud(4, 'jong');
  }
  else if(d[5]<r){
    first = non(5, 'jong', 3);
  }
  else if(d[6]<r){
    first = noud(6, 'jong');
  }
  else if(d[7]<r){
    first = noud(7, 'jong');
  }
  else if(d[8]<r){
    first = noud(8, 'jong')
  }
  else if(d[9]<r){
    first = noud(9, 'jong');
  }
  else{
    idle();
    first = '';
  }

  return first;
}

function consonant3_input(numb){
  
  let first;
  let r = 200;
  let d = [];
  let cx = [];
  let cy = [];
  for (let i = 1; i < 10; i++) {
    cx[i] = windowWidth/2 + sin(radians(45*(i-1)))*windowHeight/2.5
    cy[i] = windowHeight/2 - cos(radians(45*(i-1)))*windowHeight/2.5
  }
  
  for (let i = 1; i<10; i++){
    d[i] = dist(eyeX, eyeY, cx[i], cy[i])
  }

  if(numb == 'ㄹ'){
    if(d[1]<r){
      first = non(1,'jong2', 0);
    }
    else if(d[3]<r){
      first = non(3,'jong2', 0);
    }
    else if(d[4]<r){
      first = non(4,'jong2', 0);
    }
    else if(d[6]<r){
      first = noud(6, 'jong2', 0);
    }
    else if(d[7]<r){
      first = non(7,'jong2', 0);
    }
    else if(d[8]<r){
      first = non(8,'jong2', 0);
    }
    else{
      idle(0);
      first = first;
    }
  }
    
  else if(numb == 'ㄱ' | numb == 'ㅂ'){
      if(d[6]<r){
        first = non(6,'jong2', 1);
      }
      else{
        idle(1);
        first = first;
      }
  }
    
  else{
      if(d[6]<r){
        first = non(6,'jong2', 2);
      }
      else if(d[7]<r){
        first = non(7,'jong2', 2);
      }
      else{
        idle(2);
        first = first;
      }
    }
    
    return first;
}


function keyPressed() {
  if (key == '2') {
    typing = typing + str(key)
  } 
  else if (key == '8') {
    typing = typing + str(key)
  }
  else if (key == '9') {
    typing = typing + str(key);
  }
}


function vowel_input(){
    let mid;
    let mid_real;
  time++;

    if ( typing == '92')        mid = 'ㅏ';
	else if ( typing == '922')	mid = 'ㅑ';
	else if ( typing == '29')	mid = 'ㅓ';
    else if ( typing == '229')	mid = 'ㅕ';
    else if ( typing == '28')	mid = 'ㅗ';
    else if ( typing == '228')	mid = 'ㅛ';
    else if ( typing == '82')	mid = 'ㅜ';
    else if ( typing == '822')	mid = 'ㅠ';
    else if ( typing == '8')	mid = 'ㅡ';
    else if ( typing == '9')	mid = 'ㅣ';
    else if ( typing == '929')	mid = 'ㅐ';
    else if ( typing == '9229')	mid = 'ㅒ';
    else if ( typing == '299')	mid = 'ㅔ';
    else if ( typing == '2299')	mid = 'ㅖ';
    else if ( typing == '89')	mid = 'ㅢ';
    else if ( typing == '289')	mid = 'ㅚ';
    else if ( typing == '829')	mid = 'ㅟ';
    else if ( typing == '28929')	mid = 'ㅙ';
    else if ( typing == '82299')	mid = 'ㅞ';
    else if ( typing == '2892')	mid = 'ㅘ';
    else if ( typing == '8229')	mid = 'ㅝ';
    else mid = '';
  
  return mid; 
}