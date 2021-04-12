var count = 0;
change(count);

function plus(i){
    count = ((((count+i)%3)+3)%3);
    change(count);
}

function num(j){
    count = j;
    change(count);
}

function change(count){
    const cover = document.querySelectorAll('.cover');
    const span = document.querySelectorAll('span');
    for (let index = 0; index < cover.length; index++) {
        cover[index].style.display = "none";
    } 
    cover[count].style.display = "block";
    
    for (let index = 0; index < cover.length; index++) {
        span[index].classList.remove("active");
    }
    span[count].classList.add("active"); 
}