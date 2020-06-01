// Setting up the canvas
const $canvas = document.getElementById("cnvs")
$canvas.width = window.innerWidth
$canvas.height = window.innerHeight

const context = $canvas.getContext('2d')
const audio = new Audio('./audio/tap-mellow.mp3')
const winAudio = new Audio('./audio/winning.wav')
context.fillStyle='#fff'
const imgPlayer = document.createElement('img')
imgPlayer.src = './images/wood-player.png'
const imgBall = document.createElement('img')
imgBall.src = './images/ball.png'
imgPlayer.onload = () => {

}

// Declaring global variables
let stickWidth = 40, stickHeight = 200, speed = 5, ballSpeed = 5, goals = [0,0], maxGoals = 10 // changable in the settings menu
let ballX = window.innerWidth / 2, ballY = window.innerHeight / 2, dx = ballSpeed, dy = 0
const isW = window.innerWidth - stickWidth // isW -> inner stick Width

/**
 * Draws an image with rotation
 * @param {image} image 
 * @param {number} x 
 * @param {number} y 
 * @param {number} w 
 * @param {number} h 
 * @param {number} degrees 
 */
function drawImage(image, x, y, w, h, degrees){
    context.save()
    context.translate(x+w/2, y+h/2)
    context.rotate(degrees*Math.PI/180.0)
    context.translate(-x-w/2, -y-h/2)
    context.drawImage(image, x, y, w, h)
    context.restore()
}

// Setting up a Player class
class Player {
    constructor (x, y) {
        this.up = false
        this.down = false
        this.x = x
        this.y = y
    }
}

// Initializing two players
const player1 = new Player(0,$canvas.height / 2 - stickHeight / 2), player2 = new Player(isW, $canvas.height / 2 - stickHeight / 2)
let rotation = 0

const drawBall = () => {
    rotation += 2
    // context.strokeStyle='#fff'
    // context.beginPath()
    // context.arc(ballX, ballY, 20, 0, Math.PI * 2)
    // context.fill()
    // context.stroke()
    drawImage(imgBall, ballX - 20, ballY - 19, 40, 40, rotation)
}

function gameEnd() {
    const playerNr = goals[0] >= maxGoals ? 1 : 2
    winAudio.play()
    pause = true

    document.getElementById('playerName').textContent = 'Player ' + playerNr
    document.getElementById('goalsEnd').textContent = goals[0] + ' : ' + goals[1]

    document.getElementById('finish').classList = 'modal show'
}

function playAgain() {
    resetGame()
    document.getElementById('finish').classList = 'modal hide'
    pause = false
}

/**
 * Resets all goals and the ball
 */
function resetGame() {
    ballX = $canvas.width / 2
    ballY = $canvas.height / 2
    goals[0] = 0
    goals[1] = 0
}

const updateGoals = (p1, p2) => {
    goals[0] += p1
    goals[1] += p2

    document.querySelector("#goals").innerHTML = goals[0] + " : " + goals[1] // display goals

    // Check for win
    if(goals[0] >= maxGoals || goals[1] >= maxGoals) {
        gameEnd()
    }

}

const moveBall = () => {
    //check for bounds
    if(ballY > $canvas.height || ballY < 0) dy = -dy;

    //check if Player 1 blocked
    if(ballX > player1.x && ballX < player1.x + stickWidth && player1.y < ballY && player1.y + stickHeight > ballY) {
        dy = ((ballY + player1.y) / stickHeight)
        dx = -dx
        audio.play()
    }

    //check if Player 2 blocked
    if(ballX < $canvas.width && ballX > player2.x && player2.y < ballY && player2.y + stickHeight > ballY) {
        dy = ((ballY + player2.y) / stickHeight)
        dx = -dx
        audio.play()
    }

    //check for goal
    if(ballX > $canvas.width) { // player 1 won
        updateGoals(1,0)
        ballX = $canvas.width / 2
        ballY = $canvas.height / 2
        dy = 0
        dx = -dx
    }
    if (ballX < 0) { // player 2 won
        updateGoals(0,1)
        ballX = $canvas.width / 2
        ballY = $canvas.height / 2
        dy = 0
        dx = -dx
    }
    
    ballX += dx
    ballY += dy
    drawBall()
}

const drawPlayer = () => {
    context.fillRect(player1.x, player1.y, stickWidth, stickHeight) // drawing Player 1
    context.drawImage(imgPlayer, player1.x, player1.y, stickWidth, stickHeight)
    
    // Second player (right)
    context.fillRect(player2.x, player2.y, stickWidth, stickHeight) // drawing Player 2
    drawImage(imgPlayer, player2.x, player2.y, stickWidth, stickHeight, 180)
}

const movePlayer = () => {
    if(player1.down && player1.y + stickHeight < $canvas.height) player1.y += speed;
    if(player1.up && player1.y > 0) player1.y -= speed;
    if(player2.down && player2.y + stickHeight < $canvas.height) player2.y += speed;
    if(player2.up && player2.y > 0) player2.y -= speed;
    drawPlayer()
}

// check for pressed keys
onkeydown = (evt) => {
    switch (evt.key) {
        case 's':
            player1.down = true
            break
        case 'w':
            player1.up = true
            break
        case 'ArrowDown':
            player2.down = true
            break
        case 'ArrowUp':
            player2.up = true
            break
        default:
            break
    }
}

// stop moving player if key up
onkeyup = (evt) => {
    console.log(evt)
    switch (evt.key) {
        case 's':
            player1.down = false
            break
        case 'w':
            player1.up = false
            break
        case 'ArrowDown':
            player2.down = false
            break
        case 'ArrowUp':
            player2.up = false
            break
        default:
            break
    }
}

// animate and start the game
let pause = false
window.requestAnimationFrame(() => {
    setInterval(() => {
        if (!pause) {
            context.clearRect(0, 0, $canvas.width, $canvas.height)
            movePlayer()
            moveBall()
        }
    }, 1)
})

var $modal = document.getElementById('modal')

function toggleSettings () {
    if (pause) {
        pause = false
        $modal.classList = 'modal hide'
        return;
    }
    pause = true
    $modal.classList = 'modal show'
}

function saveSettings() {
    if (dx < 0) dx = -(new Number(document.getElementById('ballSpeed').value)); else dx = new Number(document.getElementById('ballSpeed').value)
    speed = new Number(document.getElementById('playerSpeed').value)
    stickHeight = new Number(document.getElementById('playerHeight').value)
    stickWidth = new Number(document.getElementById('playerWidth').value)

    player2.x = $canvas.width - stickWidth

    maxGoals = new Number(document.getElementById('maxGoals').value)

    $modal.classList = 'modal hide'
    pause = false
}

// implement mobile use
$canvas.ontouchstart = (evt) => {
    console.log(evt)
    if(evt.changedTouches[0].clientX <= $canvas.width / 2 && evt.changedTouches[0].clientY <= $canvas.height / 2) {
        //left top pressed (Player 1, up)
        player1.up = true
    } else if (evt.changedTouches[0].clientX > $canvas.width / 2 && evt.changedTouches[0].clientY <= $canvas.height / 2) {
        //right top pressed (Player 2, up)
        player2.up = true
    } else if (evt.changedTouches[0].clientX <= $canvas.width / 2 && evt.changedTouches[0].clientY > $canvas.height / 2) {
        // right bottom pressed (Player 1, down)
        player1.down = true
    } else if (evt.changedTouches[0].clientX > $canvas.width / 2 && evt.changedTouches[0].clientY > $canvas.height / 2) {
        // left bottom pressed (Player 2, down)
        player2.down = true
    }
}

$canvas.ontouchend = (evt) => {
    player1.up = false
    player1.down = false

    player2.up = false
    player2.down = false
}