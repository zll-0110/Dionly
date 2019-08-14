var currentIndex=0;
function slideTo(index){
    if(index===2){
        currentIndex=index=0;
    }
    if(index===-1){
        currentIndex=index=1;
    }
    document.querySelector('.current').className='';
    document.querySelectorAll('#banner .list li')[index].className='current';

    //设定焦点
    document.querySelector('.focus').className='';
    document.querySelectorAll('.pagination li')[index].className='focus';
    
}
function slideNext(){
    currentIndex++;
    slideTo(currentIndex)
}
function slidePrev(){
    currentIndex--;
    slideTo(currentIndex)
}
var prev = document.querySelector('#banner .prevent')
var next = document.querySelector('#banner .next')

prev.onclick=function(){
    slidePrev()
}
next.onclick=function(){
    slideNext()
}

var bullets=document.querySelectorAll('.pagination li')
for(let i=0;i<bullets.length;i++){
    bullets[i].onmouseenter=function(){
        currentIndex=i;
        slideTo(currentIndex)
    }
}
var id;
function autoplay(){
    id=setInterval(()=>{
        slideNext()
    },3000)
}
autoplay();

function stop(){
    clearInterval(id);
}
document.querySelector('#banner').onmouseover=function(){
    stop();
}
document.querySelector('#banner').onmouseout=function(){
    autoplay(); 
}