let backGrnd = document.querySelector('body');
backGrnd.style.backgroundColor='#43506C';

let btnStart = document.createElement('button1');//запилим стартовую кнопку в начале игры
let p = document.createElement('p');
p.innerHTML="Start";
btnStart.appendChild(p);

let aboutButton = document.createElement('button2');//запилим стартовую кнопку в начале игры
let pAbout = document.createElement('p');
pAbout.innerHTML="About";
aboutButton.appendChild(pAbout);

let table = document.querySelector('.game_field');
table.appendChild(btnStart);
table.appendChild(aboutButton);

let nav = document.querySelector('.navigation');
let foot= document.querySelector('footer');
nav.classList.toggle('hide');
foot.classList.toggle('hide');

var messageForPlayer = document.querySelector('.Message');

btnStart.onclick = start;
let isWin = false;

function start(){

		goGame();
		table.removeChild(btnStart);
		table.removeChild(aboutButton);
		nav.classList.toggle('hide');
		foot.classList.toggle('hide');
}


function goGame(){
	let budilnik = document.getElementById("timer");
budilnik.innerHTML="Время:"+0;
//let table = document.querySelector('.game_field');
var drawScore = document.querySelector('.count');
drawScore.innerHTML="Score: "+0;

//var messageForPlayer = document.querySelector('.Message');

let fillingGrid=0;
while(fillingGrid!=2){
	fillingGrid++;
	filling();//заполним карточки изображениями
}
	
	
const cards = document.querySelectorAll('.game_row');

showCards(cards);
sleep(1000).then(()=>{hideCards(cards);});
const startTime = Date.now();

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

		  countScore++;
		  drawScore.innerHTML="SCORE: "+countScore;
		  //let paragraph = document.querySelector('p');
          //paragraph.textContent = countScore;
		  clickCount=0;
		  one.removeEventListener('click', flipCard);
		  two.removeEventListener('click', flipCard);
		  lockCard=false;
		  //часть кода для открытия новых сверху справа по id slot персонажей//slots
	       let slot = document.getElementById(countScore);
		   alert(slot.getAttribute('id'));
		   let openUnit = temp1.getAttribute('src');
		   slot.setAttribute("style","background-image: url(\""+openUnit+"\")");
		  slot.style.backgroundRepeat = "no-repeat";
		  slot.style.backgroundSize = "60px 100px";
		  
	      
		  
		  if(countScore == 6){
			   const timeOver = Date.now();
                           let INTERVAL = timeOver-startTime;
                           messageForPlayer.innerHTML="Маладец !!";
                           budilnik.innerHTML ="Время: "+Number.parseFloat(INTERVAL/1000).toFixed(2)+"секунд";
			   sleep(10000).then(()=>{restoreLevel();});//restoreLevel();
		  }
		  //let unit1 = document.querySelector('.unit1');
		  //let openUnit = temp1.getAttribute('src');
		  //unit1.style.backgroundImage = "url('images/yellow_bug.jpg')";
		  //unit1.setAttribute("style","background-image: url(\""+openUnit+"\")");
		  //unit1.style.backgroundRepeat = "no-repeat";
		  //unit1.style.backgroundSize = "60px 100px";
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


function filling(){
	var image = new Array("url('images/ladybug.jpg')","url('images/bug2.jpg')","url('images/bug3.jpg')","url('images/yellow_bug.jpg')","url('images/muha.jpg')","url('images/bluebug.jpg')"); 
    shuffleImage(image);//функция делаем клон массива image и рандомно перемешиваем карточки

	for (let i = 0; i <6; i++) {
	let tr = document.createElement('div');
	tr.className = "game_row";
	
	let bug = i;
	for (let j = 0; j < 1; j++) {
	    let img = document.createElement('img');
		let img2 = document.createElement('img');
		
		tr.appendChild(img);
		tr.appendChild(img2);
		img.className = "front-face";
		img2.className = "back-face";

		    let imageForCard = image[bug].substring(5,image[bug].length-2);
			img.src = imageForCard;

		img2.src = 'images/backface.jpg';//рубашка карточки - патом заменить
	}
	
	table.appendChild(tr);
	//let ggg = document.querySelectorAll('.front-face').length;//всего скольок объектов Img в нашем игровом поле именно картинок с героями а не обоих рубашек
	//alert(ggg);
	}
}

function shuffleImage(image){
	let array = image;
	for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function restoreLevel(){

	while(table.firstChild){
		table.removeChild(table.firstChild);
	}

	messageForPlayer.innerHTML="Красава";
	clearUnitsImg();
	start();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showCards(cards){
	cards.forEach((item)=>{
	item.classList.add('flip');
})
}

function hideCards(cards){
	cards.forEach((item)=>{
	item.classList.toggle('flip');
})
}
function clearUnitsImg(){
	let slots = document.querySelectorAll('.unit');
	slots.forEach((item)=>{
	item.setAttribute("style","background-image: none");
})
}
