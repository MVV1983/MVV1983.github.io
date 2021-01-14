let backGrnd = document.querySelector('body');
backGrnd.style.backgroundColor='#43506C';

let btnStart = document.createElement('button1');//запилим стартовую кнопку в начале игры
btnStart.textContent="START";

let aboutButton = document.createElement('button2');//запилим стартовую кнопку в начале игры
aboutButton.textContent="ABOUT";

let table = document.querySelector('.game_field');
table.appendChild(btnStart);
table.appendChild(aboutButton);

let nav = document.querySelector('.navigation');
let foot= document.querySelector('footer');
nav.classList.toggle('hide');
foot.classList.toggle('hide');

btnStart.onclick = start;


function start(){
		alert('start game');
		goGame();
		table.removeChild(btnStart);
		table.removeChild(aboutButton);
		nav.classList.toggle('hide');
		foot.classList.toggle('hide');
}

function goGame(){

var image = new Array("url('images/ladybug.jpg')","url('images/bug2.jpg')","url('images/bug3.jpg')","url('images/yellow_bug.jpg')","url('images/muha.jpg')","url('images/bluebug.jpg')"); 
//let table = document.querySelector('.game_field');
var drawScore = document.querySelector('.count');
drawScore.innerHTML="Score: "+0;

var doubleClick = "url('images/no.jpg')";
var messageForPlayer = document.querySelector('.Message');


for (let i = 0; i < 16; i++) {
	let tr = document.createElement('div');
	tr.className = "game_row";
	
	for (let i = 0; i < 1; i++) {
	    let img = document.createElement('img');
		let img2 = document.createElement('img');
		
		
		tr.appendChild(img);
		tr.appendChild(img2);
		img.className = "front-face";
		img2.className = "back-face";
		//разброс карточек рандомно подве каждого зверька
		for(let i = 0; i < 2; i++){
			var bug = Math.round(Math.random()*5);
		    let imageForCard = image[bug].substring(5,image[bug].length-2);
			//alert(image[bug].substring(5,image[bug].length-2));
			img.src = imageForCard;
		}
		//img.src = 'images/yellow_bug.jpg';
		img2.src = 'images/backface.jpg';//рубашка карточки - патом заменить
	}
	
	table.appendChild(tr);
}

const cards = document.querySelectorAll('.game_row');

var clickCount = 0;
var firstCard;
var secondCard;
var countScore=0;
var temp1;
var temp2;

var card1;
var card2;
let lockCard = false;

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
	if(lockCard){
		return;
	}
  messageForPlayer.innerHTML="";
  this.classList.add('flip');
  
  clickCount++;


	  if(clickCount == 1){
	   card1= this;
	   
	   firstCard = this.querySelector('.front-face');
	   card1.setAttribute('data',firstCard.src);
	   firstCard.alt= "1";
	   temp1 = firstCard.alt;
      }
	  else if(this == card1){
		  this.removeEventListener('click', flipCard);
		  messageForPlayer.innerHTML="Эта карточка уже выбрана. Выбирайте другую!";
	  }
      else{//else if(clickCount == 2)
	   lockCard=true;
	   card2= this;
	   secondCard = this.querySelector('.front-face');
	   card2.setAttribute('data',secondCard.src);
	   secondCard.alt= "1";
	   temp2 = secondCard.alt;
	   clickCount = 0;
       f2();//сделаем паузу
	  }
}
 
      async function f2() {
                var delay = ms => new Promise(resolve => { setTimeout(resolve, ms); });
                await delay(1000);
                // код функции для выполнения после приостановки на 1 секунду
                matchesTwoCards(firstCard,temp2,card1,card2);
            }


function matchesTwoCards(temp1,temp2,one,two){
  var card1Atr = card1.getAttribute('data');
  var card2Atr = card2.getAttribute('data');
  
	if(card1Atr == card2Atr){//if(temp1 == temp2){
		
		  //alert('первая карточка:'+one+'совпадает с Второй карточкой:'+two);
		  countScore++;
		  drawScore.innerHTML="SCORE: "+countScore;
		  //let paragraph = document.querySelector('p');
          //paragraph.textContent = countScore;
		  clickCount=0;
		  one.removeEventListener('click', flipCard);
		  two.removeEventListener('click', flipCard);
		  lockCard=false;
		  //часть кода для открытия новых сверху слева персонажей
		  let unit1 = document.querySelector('.unit1');
		  let openUnit = temp1.getAttribute('src');
		  //unit1.style.backgroundImage = "url('images/yellow_bug.jpg')";
		  unit1.setAttribute("style","background-image: url(\""+openUnit+"\")");
		  unit1.style.backgroundRepeat = "no-repeat";
		  unit1.style.backgroundSize = "60px 100px";
	  }
	  else{
		  lockCard=false;
		  clickCount=0;
		  messageForPlayer.innerHTML="Карточки не совпадают!";
	      one.addEventListener('click', flipCard);
		//alert(one + two);
		one.classList.toggle('flip');
	    two.classList.toggle('flip');
	  }
  }
}