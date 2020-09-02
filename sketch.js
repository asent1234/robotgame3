var startGamebackground
var gameState
var startGamebutton, textbutton, textcbutton
var currentObjects = []
var ground, groundflag
var startflag, textflag, groundflag, choosenflag
var pedasl, pedasr, pedasimg
var swordimgup, swordchoose
var chooseBackground
var gunchoose, gunimg
var player
var choosegun, chooseblaster
var leftwalk
var movecheck
var playertype
var groundpyro, plrpyro, pyroflag, pyro
function preload() {
    startGamebackground = loadImage("images/startgameback.png", 1000, 1000)
    startGamebimg = loadAnimation("images/start.png", "images/start.png", "images/blank.png", "images/blank.png", "images/blank.png")
    choosebimg = loadAnimation("images/continue.png", "images/continue.png", "images/blank.png", "images/blank.png", "images/blank.png")
    starttextimg = loadImage("images/startext.png", 1000, 1000)
    pedasimg = loadImage("images/pedas.png", 100, 200)
    swordimgup = loadImage("images/swordup.png", 100, 100)
    gunimg = loadImage("images/gun.png", 100, 100)
    chooseBackground = loadImage("images/chooseability.png", 1000, 1000)
    choosensword = loadImage("images/choosesword.png", 1000, 1000)
    choosenblaster = loadImage("images/chooseblaster.png", 1000, 1000)
    leftwalk = loadAnimation("images/leftwalk/leftwalk1.png", "images/leftwalk/leftwalk2.png")
}
function setup() {
    canvas = createCanvas(1000, 1000);
    gameState = "start"
    startflag = 0
    textflag = 0
    groundflag = 0
    choosenflag = 0
    pyroflag = 0
    //startGamebutton.scale = 2

}
function draw() {

    if (gameState === "start") {
        background(startGamebackground);
        if (startflag === 0) {
            startDisplay();
        }
        drawSprites();
        if (mousePressedOver(startGamebutton)) {
            clear();
            gameState = "starttext"
            startGamebutton.destroy();
        }
    }

    if (gameState === "starttext") {
        clear();
        background(starttextimg);
        if (textflag === 0) {
            textDisplay();
        }
        drawSprites();
        if (mousePressedOver(textbutton)) {
            clear();
            gameState = "firstchoose"
            textbutton.destroy();
        }
    }

    if (gameState === "firstchoose") {
        clear();
        background(chooseBackground);
        if (groundflag === 0) {
            chooseDisplay();
        }

        player.player.collide(ground);
        player.player.collide(pedasl);
        player.player.collide(pedasr);
        player.player.setVelocity(0, 30)

        player.display();

        drawSprites();
        createEdgeSprites();

        if (player.player.isTouching(swordchoose)) {
            clear();
            gameState = "choosensword"
            ground.destroy()
            pedasl.destroy()
            pedasr.destroy()
            swordchoose.destroy()
            gunchoose.destroy()
            ground.destroy()
            player.player.destroy()

        }
        if (player.player.isTouching(gunchoose)) {
            clear();
            gameState = "choosenblaster"
            ground.destroy()
            pedasl.destroy()
            pedasr.destroy()
            swordchoose.destroy()
            gunchoose.destroy()
            ground.destroy()
            player.player.destroy()
        }
    }

    if (gameState === "choosenblaster") {
        background(choosenblaster)

        if (choosenflag === 0) {
            choosenDisplay();
              choosenflag = 1
        }
        drawSprites();

        if (mousePressedOver(textbutton)) {
            clear();
            gameState = "developments"
            textbutton.destroy();
            playertype = "blaster"
        }
    }
    if (gameState === "choosensword") {
        background(choosensword)

        if (choosenflag === 0) {
            choosenDisplay();
            choosenflag = 1
        }
        drawSprites();
        if (mousePressedOver(textcbutton)) {
            clear();
            gameState = "pyrobattle"
            textcbutton.destroy();
            textcbutton = null
            playertype = "sword"
        }
    }
    if (gameState === "pyrobattle") {
        clear();
        background(chooseBackground);
        if (pyroflag === 0) {
            pyrobattledisplay();
        }

        plrpyro.player.collide(groundpyro);

        plrpyro.player.setVelocity(0, 30)

        plrpyro.display();

        pyro.enemy.collide(groundpyro);
        pyro.enemy.setVelocity(0, 30)
        pyro.display();
        textSize(40)
        text("Your Life:"+ plrpyro.life, 100, 100)
        text("Pyro's Life:"+ pyro.life, 700, 100)
        text("Press Space to Attack", 300, 500)
        console.log(pyro.lrs + "  " + plrpyro.life)
        drawSprites();
        createEdgeSprites();

        if (plrpyro.life <= 0) {
            clear();
            pyro.enemy.destroy()
            ground.destroy()
            plrpyro.player.destroy()
            gameState = "loss"
        }
        if (pyro.life <= 0) {
            clear();
            pyro.enemy.destroy()
            ground.destroy()
            plrpyro.player.destroy()
            gameState = "win"
        }

    }
    if (gameState === "win") {
        textSize(20)
        text("You Have Won. You defeated Pyro with "+ plrpyro.life + " HP left", 100, 100)
        text("Good Job, Please reload to play again. Keep tuned for new developments", 100, 400)
    }
    if (gameState === "loss") {
        clear();
        textSize(20)
        text("You Have Lost. Pyro defeated you with "+ pyro.life + " HP left", 100, 100)
        text("Good Try, Please reload to play again. Keep tuned for new developments", 100, 400)
    }

    if (gameState === "developments") {
        clear();
        textSize(17)
        text("Sorry Blaster mode is in production. Keep tuned for new developments. Please reload and try Sword mode. ", 100, 400)
    }
    }


function startDisplay() {
    startGamebutton = createSprite(500, 600, 1, 1);
    startGamebutton.addAnimation("startbutton", startGamebimg)
    startflag = 1
}

function textDisplay() {
    textbutton = createSprite(500, 800, 1, 1);
    textbutton.addAnimation("textbutton", choosebimg)
    textflag = 1
}

function chooseDisplay() {
    ground = createSprite(500, 970, 1000, 50);
    ground.shapeColor = "black"
    groundflag = 1

    pedasl = createSprite(100, 870, 1, 1);
    pedasl.addImage("ped", pedasimg)
    pedasr = createSprite(900, 870, 1, 1);
    pedasr.addImage("peda", pedasimg)

    swordchoose = createSprite(900, 730, 1, 1)
    swordchoose.addImage("swordup", swordimgup)
    gunchoose = createSprite(100, 730, 1, 1)
    gunchoose.addImage("swordup", gunimg)

    player = new Player(500, 730, "noweapon")

    swordchoose.debug = true
    gunchoose.debug = true
}

function choosenDisplay(){
    textcbutton = createSprite(500, 800, 1, 1);
    textcbutton.addAnimation("textcbutton", choosebimg)
    choosenflag = 1

}
function pyrobattledisplay() {
    groundpyro = createSprite(500, 970, 1000, 50);
    ground.shapeColor = "black"
    pyroflag = 1
    plrpyro = new Player(500, 730, playertype);

    pyro = new Pyro(500, 730)
}