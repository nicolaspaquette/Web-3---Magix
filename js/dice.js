class Dice {

    constructor() {
        this.node = document.querySelector(".dice");
        this.nodeValue = document.querySelector(".diceValue");
        this.value;

        this.parent = document.querySelector(".throwDice");

        this.marginX = this.node.offsetWidth / 2;
        this.marginY = this.node.offsetHeight / 2;

        this.angle = 0;
        this.valueCounter = 0;
        this.moving = true;

        this.speedY = 0;
        this.velocityY = 0.5;
        this.stopped = false;
        this.bottomCounter = 0;
        this.movementOver = false;

        this.posXBefore = 0;
        this.posXNow = 0;
        this.speedX = 0;
        this.letGo = true;

        this.bounceLeft = 0;
        this.bounceRight = 0;

        this.warCry = new Audio("./sounds/warCry.wav");
        this.fallingBack = new Audio("./sounds/fallingBack.wav");
    }

    tick(mouseX, mouseY, isFalling, movementOver) {

        this.movementOver = movementOver;

        if (!this.movementOver){
            this.stopped = false;
        }

        if(!this.stopped){
            this.valueCounter++

            if (this.valueCounter == 10){
                this.value = Math.floor(Math.random() * 20) + 1;
                let textValue = this.value.toString();
                this.nodeValue.innerHTML = textValue;
                this.valueCounter = 0;
            }

            this.angle += 3;
            this.node.style.transform = "rotate(" + this.angle + "deg)";
        }

        if (this.movementOver == false && this.stopped == false){
            this.mouseX = mouseX;
            this.mouseY = mouseY;

            if(isFalling == false){
                this.node.style.left = (this.mouseX - this.marginX) + "px";
                this.node.style.top = (this.mouseY - this.marginY) + "px";

                if (parseInt(this.node.style.left) < 0){
                    this.node.style.left = 0 + "px";
                }
                else if (parseInt(this.node.style.left) + this.node.offsetWidth > this.parent.offsetWidth){
                    this.node.style.left = this.parent.offsetWidth - this.node.offsetWidth + "px";
                }
               
                if (parseInt(this.node.style.top) < 0){
                    this.node.style.top = 0 + "px";
                }
                else if (parseInt(this.node.style.top) + this.node.offsetHeight > this.parent.offsetHeight){
                    this.node.style.top = this.parent.offsetHeight - this.node.offsetHeight + "px";
                }
    
            }else{

                // mouvement horizontal

                if (this.letGo){
                    this.posXNow = (this.mouseX - this.marginX);
                    this.speedX = (this.posXNow - this.posXBefore)/4;

                    if (this.speedX < 1 && this.speedX > 0){
                        this.speedX = 1;
                    }
                    else if (this.speedX > -1 && this.speedX < 0){
                        this.speedX = -1;
                    }

                    this.letGo = false;
                }
            
                let left = parseInt(this.node.style.left);
                left += this.speedX;

                if (left <= 0){
                    this.speedX = -this.speedX;
                    this.bounceLeft++;
                    if (this.bounceLeft == 1){
                        this.bounceRight = 0;
                        this.speedX /= 1.5;
                    }
                }
                else if (left >= this.parent.offsetWidth - this.node.offsetWidth){
                    this.speedX = -this.speedX;
                    this.bounceRight++;
                    if (this.bounceRight == 1){
                        this.bounceLeft = 0;
                        this.speedX /= 1.5;
                    }
                }

                this.node.style.left = left + "px";

                // mouvement vertical

                this.speedY += this.velocityY;
                let top = parseInt(this.node.style.top);
                top += this.speedY;

                if (top > this.parent.offsetHeight - this.node.offsetHeight){
                    this.speedY = -(this.speedY / 1.5);
                    top = this.parent.offsetHeight - this.node.offsetHeight;
                    this.bottomCounter++;
                }

                this.node.style.top = top + "px";

                // apres 10 rebonds, ne bouge plus

                if (this.bottomCounter >= 10){
                    if (this.value == 1){
                        document.querySelector(".critical").innerHTML = "CRITICAL MISS !";

                        this.fallingBack.play();

                        setTimeout(function(){
                            document.querySelector(".critical").innerHTML = '';
                        }, 3000);
                    }
                    else if (this.value == 20){
                        document.querySelector(".critical").innerHTML = "CRITICAL HIT !";

                        this.warCry.play();

                        setTimeout(function(){
                            document.querySelector(".critical").innerHTML = '';
                        }, 3000);
                    }

                    this.bottomCounter = 0;
                    this.stopped = true;
                    this.letGo = true;
                    return true;
                }
            }   
        }

        this.posXBefore = (this.mouseX - this.marginX);
        return false;
    }
}