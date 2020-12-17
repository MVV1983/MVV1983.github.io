var i=0;
var image = document.getElementById("image");
var imgs = new Array('coctail_.png','vine.png','vine2.png');

function changeImgage() {
    
	if(i == imgs.length){
		i=0;
	}
	image.src=imgs[i];
    i++;
}
