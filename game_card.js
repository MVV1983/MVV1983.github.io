var image = new Array("url('images/ladybug.jpg')","url('images/bug2.jpg')","url('images/bug3.jpg')","url('images/yellow_bug.jpg')","url('images/muha.jpg')"); 
let table = document.querySelector('.game_field');
var drawScore = document.querySelector('.count');
drawScore.innerHTML="SCORE: "+0;
drawScore.style.marginLeft = '400px';





for (let i = 0; i < 12; i++) {
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
			var bug = Math.round(Math.random()*4);
		
			let imageForCard = image[bug].substring(5,image[bug].length-2);
			//alert(image[bug].substring(5,image[bug].length-2));
			img.src = imageForCard;
		}
		//img.src = 'images/yellow_bug.jpg';
		img2.src = 'images/ladybug.jpg';//рубашка карточки - патом заменить
	}
	
	table.appendChild(tr);
}

const cards = document.querySelectorAll('.game_row');

var clickCount = 0;
var temp;
var firstCard;
var secondCard;
var countScore=0;
var temp1;
var temp2;

var card1;
var card2;
var isFlipped = false;


cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
	
  this.classList.add('flip');
  
  clickCount++;


	  if(clickCount == 1){
	   card1= this;
	   firstCard = this.querySelector('.front-face');
	   card1.setAttribute('data',firstCard.src);
	   isFlipped=true;
	   firstCard.alt = isFlipped;
	   temp1 = firstCard.alt;
		  
      }
      else if(clickCount == 2){

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
                matchesTwoCards(temp1,temp2,card1,card2);
            }


function matchesTwoCards(temp1,temp2,one,two){
  
  var card1Atr = card1.getAttribute('data');
  var card2Atr = card2.getAttribute('data');
  
	if(card1Atr == card2Atr){//if(temp1 == temp2){
		
		  alert('первая карточка:'+one+'совпадает с Второй карточкой:'+two);
		  countScore++;
		  drawScore.innerHTML="SCORE: "+countScore;
		  //let paragraph = document.querySelector('p');
          //paragraph.textContent = countScore;
		  clickCount=0;
		  one.removeEventListener('click', flipCard);
		  two.removeEventListener('click', flipCard);
	  }
	  else{
		  clickCount=0;
		  alert('Карточки не совпадают');
		  
	
			 alert(one + two);
			 one.classList.toggle('flip');
			 two.classList.toggle('flip');
	  }
}
