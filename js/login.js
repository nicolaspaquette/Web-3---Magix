let spriteList = [];
let clickCount = 0;
let isMoving = false;
let isFalling = false;
let x;
let y;
let movementOver = false;
let isStopped = false;

window.addEventListener("load", () => {
    spriteList.push(new Dice());
    tick();
});


const tick = () => {

    if (isStopped){
        movementOver = true;
        isMoving = false;
        isFalling = false;
    }

    document.querySelector(".dice").onmousedown = () =>{
        isMoving = true;
        movementOver = false;
        isStopped = false;
    }
    
    document.querySelector(".dice").onmouseup = () =>{
        movementOver = false;
        isStopped = false;
        if (isMoving){
            isFalling = true;
        }
    }

    document.onmousemove = evt => {
            let diceBox = document.querySelector(".throwDice");
            x = evt.pageX - diceBox.offsetLeft;
            y = evt.pageY - diceBox.offsetTop;
    }

    if (isMoving){
        for (let i = 0; i < spriteList.length; i++) {
            const sprite = spriteList[i];
            isStopped = sprite.tick(x, y, isFalling, movementOver);
        }
    }

    window.requestAnimationFrame(tick);
}