class Player{
constructor(x,y,type){
    this.player = createSprite(x,y,1,1)
    // types noweapon, guntype, swordtype, gunandwater, gunwaterfire, swordwater, swordwaterfire
    this.type = type
    this.player.scale = 0.5
    this.player.debug= true
    this.img  = loadAnimation("images/robot stand.png")
    this.lwimg= loadAnimation("images/leftwalk/leftwalk1.png", "images/leftwalk/leftwalk2.png")
    this.rwimg= loadAnimation("images/rightwalk/rightwalk1.png", "images/rightwalk/rightwalk2.png")
    this.jimg= loadAnimation("images/jump.png")

    this.swordleft = loadAnimation("images/leftsword/leftsword1.png","images/leftsword/leftsword2.png","images/leftsword/leftsword3.png")
    this.swordright=loadAnimation("images/rightsword/rightsword3.png","images/rightsword/rightsword2.png","images/rightsword/rightsword1.png")
    this.life = 200
    this.state = "normal"

    this.moveflag = 0
    this.showflag = 0
    this.player.addAnimation("robotstand", this.img) 
    //this.player.visible = false
}

display(){
    if(this.showflag === 0){
        this.player.addAnimation("robotstand", this.img) 
        this.player.addAnimation("robotleft", this.lwimg) 
        this.player.addAnimation("robotright", this.rwimg) 
        this.player.addAnimation("jump", this.jimg) 
        this.player.addAnimation("leftsword", this.swordleft) 
        this.player.addAnimation("rightsword", this.swordright) 
        this.showflag = 1
    }
    //console.log(movecheck);
    if(this.type === "noweapon"){
    if(keyDown(RIGHT_ARROW)){
        this.player.x = this.player.x + 20
        this.player.changeAnimation("robotright") 
        movecheck = "right"
    }
    else if(keyDown(LEFT_ARROW)){
        this.player.x = this.player.x -20
        movecheck = "left"
        this.player.changeAnimation("robotleft") 
    }
    else if(keyDown(UP_ARROW) && this.player.y > 650){
        this.player.y = this.player.y - 50
        this.player.changeAnimation("jump")

    }
    else{
        movecheck = "still";
        this.player.changeAnimation("robotstand") 
    }
    //this.player.visible = false
}
if(this.type === "sword"){
    if(keyDown(RIGHT_ARROW)){
        this.player.x = this.player.x + 20
        this.player.changeAnimation("robotright") 
        movecheck = "right"
        this.state = "normal"
    }
    else if(keyDown(LEFT_ARROW)){
        this.player.x = this.player.x -20
        movecheck = "left"
        this.player.changeAnimation("robotleft")
        this.state = "normal"
    }
    else if(keyDown(UP_ARROW) && this.player.y > 550){
        this.player.y = this.player.y - 50
        this.player.changeAnimation("jump")
        this.state = "normal"
    }
    else{
        this.player.changeAnimation("robotstand") 
        this.state = "normal"
    }
    console.log(pyro.state)
    if(keyDown("space")){
        this.state = "attack"
        //pyro.enemy.life = pyro.enemy.life - 1
        if(movecheck === "left"){
        this.player.changeAnimation("leftsword") 
        }
        else if(movecheck === "right"){
        this.player.changeAnimation("rightsword") 
        } 
    }
    if(pyro.state === "attack" && this.player.isTouching(pyro.enemy)){
        this.life--
    }
    //this.player.visible = false
}
}
}
