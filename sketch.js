
var splashScreen, play, next, bgimg
var gameState = "wait"
var playbutton, musicbutton, mutebutton, nextbutton, bgSound, player

function preload() {
    splashScreen = loadImage("splash.gif")
    bgimg = loadImage("bgImg2.png")

    bgSound = loadSound("backgroundmusic.mp3")

}

function setup() {
    createCanvas(windowWidth, windowHeight)

    playbutton = createImg("play.png")
    playbutton.position(width / 2 - 200, height - 200)
    playbutton.size(150, 150)

    musicbutton = createImg("music.png")
    musicbutton.position(playbutton.x + 200, height - 200)
    musicbutton.size(160, 150)
    musicbutton.mouseClicked(mute)

    // musicbutton.hide()

    mutebutton = createImg("mute.png")
    mutebutton.position(playbutton.x + 200, height - 200)
    mutebutton.size(160, 150)
    mutebutton.mouseClicked(mute)


    push()
    // imageMode(CENTER)
    ground = createSprite(width / 4, height / 150)
    // ground.x = ground.width /2;
    ground.addImage("ground", bgimg)
    ground.scale = 1.25
    ground.visible = false
    pop()


    invisibleGround = createSprite(width / 2, height - 10, width, 20)
    invisibleGround.visible = false

    mutebutton.hide()
    player = new Player()


}

function draw() {

    if (gameState == "wait") {
        background(splashScreen)
    }

    playbutton.mousePressed(() => {
        gameState = "about"
    })


    if (gameState == "about") {
        popabout()
        playbutton.hide()
        musicbutton.hide()
    }


    if (gameState == "level1") {
        background(bgimg)
        ground.visible = true
        ground.velocityX = -4
        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }
        player.show()
        player.move()
    }

}



class Player {
    constructor() {
        this.x = width / 2
        this.y = height - 250
        this.image = loadImage("zombie.png")
    }


    move() {
        if (keyIsDown(LEFT_ARROW) && this.x > 0) {
            this.x -= 5
        }

        if (keyIsDown(RIGHT_ARROW) && this.x < width) {
            this.x += 5
        }

        if (keyIsDown(UP_ARROW) && this.x <= height-100) {
            this.velocityY = -5
        }
    }

    show() {
        fill(0, 0, 255)
        image(this.image, this.x, this.y, 250, 250)
    }
}



function popabout() {
    swal({
        title: "Zombie Survival!!",
        text: "Let the Zobmie collect .. self help Items!!",
        imageUrl: "skull.png",
        imageSize: "200x200",
        confirmButtonText: "START ",
        confirmButtonColor: "green"

    },
        function () {
            gameState = "level1"
        })


}

function mute() {
    if (bgSound.isPlaying()) {
        bgSound.stop();
        musicbutton.show();
        mutebutton.hide();
        console.log("mute")
    }
    else {
        mutebutton.show()
        musicbutton.hide();
        bgSound.play();
        console.log("unmute")
    }
}