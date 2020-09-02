class Pyro{
constructor(x,y){
    this.enemy = createSprite(x,y,1,1)
    this.enemy.scale = 0.5
    this.enemy.debug= true
    this.img  = loadAnimation("images/pyrostand.png")
    this.laimg= loadAnimation("images/pyrofireleft.png")
    this.raimg= loadAnimation("images/pyrofireright.png")
    this.showflag = 0
    this.lrs = "still"
    this.enemy.addAnimation("robotstand", this.img) 
    this.state = "normal"
    this.life = 50
    this.attackpattern = 0
    //this.enemy.visible = false
}

display(){
    if(this.showflag === 0){
        this.enemy.addAnimation("enemystand", this.img) 
        this.enemy.addAnimation("enemyleft", this.laimg) 
        this.enemy.addAnimation("enemyright", this.raimg) 
     
        this.showflag = 1
    }
    //console.log(movecheck);
    if(plrpyro !== null){
    
    if(frameCount%50 === 0){
        var currentpattern = this.attackpattern
        if(currentpattern === 0 || currentpattern === 1){
            this.attackpattern++
            this.state = "attack"
            if(plrpyro.player.x > 500){
                this.enemy.x = plrpyro.player.x - 150
                

                this.enemy.changeAnimation("enemyright") 
                this.lrs = "right"
            }
            if(plrpyro.player.x <= 500){
                this.enemy.x = plrpyro.player.x + 150
                this.lrs = "left"
                this.enemy.changeAnimation("enemyleft")
            }
            }
        }
        if(currentpattern === 2){
            this.state = "normal"
            this.attackpattern = 0
            if(plrpyro.player.x <= 500){
                this.enemy.x = plrpyro.player.x + 150
            }
            if(plrpyro.player.x > 500){
            this.enemy.x = plrpyro.player.x - 150
            }
            this.enemy.changeAnimation("enemystand")
        }

    }
    if(plrpyro.state === "attack" && this.enemy.isTouching(plrpyro.player)){
        this.life--

        if(plrpyro.player.x > 500){
        this.enemy.x = plrpyro.player.x - 150
        
        this.lrs = "right"
        }
        if(plrpyro.player.x <= 500){
        this.enemy.x = plrpyro.player.x + 150
        this.lrs = "left"
        }
        if(this.attackpattern !== 2){
        this.state = "attack"
         if(this.lrs = "left"){
            this.enemy.changeAnimation("enemyleft") 
         }
         if(this.lrs = "right"){
            this.enemy.changeAnimation("enemyright") 
        }
    }
        else{
            this.state = "normal"
            this.enemy.changeAnimation("enemystand")
        }
        
    //console.log(this.lrs)
    

    //this.enemy.visible = false
}
}
}
