var canvas, pen, down = false, prevX = 0, currX = 0, prevY = 0, currY = 0;
var color = "#000000", pentype = "pen", pensize = 1;

function painting(){
	canvas = document.getElementById('newcanvas');
	pen = canvas.getContext("2d");
	w = canvas.width;
	h = canvas.height;

	canvas.addEventListener("mousedown", function(e){
		paint(e);
	}, false);
	canvas.addEventListener("mousemove", function(e){
		draw(e);
	}, false);
	canvas.addEventListener("mouseup", function(e){
		stop(e);
	}, false);
	canvas.addEventListener("mouseout", function(e){
		stop(e);
	}, false);

	function draw(e){
		if(down)
		{
			prevX = currX;
			prevY = currY;
			currX = e.clientX - canvas.offsetLeft;
			currY = e.clientY - canvas.offsetTop;

			pen.beginPath();
			pen.moveTo(prevX, prevY);
			pen.strokeStyle = color;
			pen.lineWidth = pensize;
			if(pentype == "pen"){
				pen.lineTo(currX, currY);
				pen.stroke();
			}
			else if(pentype == "rect"){
				var x = Math.min(prevX, currX),
          			y = Math.min(prevY, currY),
          			wi = Math.abs(prevX - currX),
          			hi = Math.abs(prevY - currY);
				pen.strokeRect(x,y,wi,hi);
				pen.stroke();
			}
			else if(pentype == "circ"){
				var x = Math.min(prevX, currX),
          			y = Math.min(prevY, currY),
          			wi = Math.abs(prevX - currX),
          			hi = Math.abs(prevY - currY);
				pen.arc(currx, y, 50, 0, 2*Math.PI);
				pen.stroke();
			}
			pen.closePath();
		}
	};
	function stop(e){
		down = false;
	};
	function paint(e){
		prevX = currX;
		prevY = currY;
		currX = e.clientX - canvas.offsetLeft;
		currY = e.clientY - canvas.offsetTop;

		down = true;
		pen.beginPath();
		pen.fillStyle = color;
		pen.fillRect(currX, currY, pensize, pensize);
		pen.closePath();
	}

}
function pencil(e){
	pentype = "pen";
	changebutton(e);
}
function rect(e){
	pentype = "rect";
	changebutton(e);
}
function circ(e){
	pentype = "circ"
	changebutton(e);
}
function trash(){
	canvas.restore();
}
function changebutton(e){
	allbutt = document.getElementsByClassName('btn');
	for(i=0;i < allbutt.length;i++){
		allbutt[i].style.background = "";
	}

	button = document.getElementById(e);
	button.style.background = "#B0B0B0";
}

function changesize(e){
	document.getElementById("sizebar").innerHTML=e;
	pensize = e;
}

var coloring = document.getElementById("ground"), 		
	rainbow = document.getElementById("rainbow");

coloring.addEventListener("input", function(){
	color = coloring.value;
	rainbow.style.color = color;
}, false);
