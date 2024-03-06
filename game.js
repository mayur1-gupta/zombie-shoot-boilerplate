// Iteration 1: Declare variables required for this game
const gameDisplay = document.getElementById("game-body");
const healthDisplay = document.getElementById("lives");
var remainingTime = document.getElementById("timer").textContent;
var enemyCount = 0;
const enemyImages = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png",
];

// Iteration 1.2: Add gunshot sound
const gunshotSound = new Audio("./assets/shotgun.wav");
gunshotSound.volume = 0.2;
gameDisplay.onclick = () => {
    gunshotSound.pause();
    gunshotSound.currentTime = 0;
    gunshotSound.play();
}

// Iteration 1.3: Add background music
const backgroundMusic = new Audio("./assets/bgm.mp3");
backgroundMusic.play();
backgroundMusic.loop = true;

// Iteration 1.4: Add health points
const maxHealth = 4;
var playerHealth = 4;

// Iteration 2: Write a function to create an enemy
function createEnemy() {
    const randomImage = enemyImages[getRandomInt(0, enemyImages.length)];
    gameDisplay.innerHTML += `<img src="./assets/${randomImage}" class="enemy-image" id="enemy${enemyCount}">`;
    let enemy = document.getElementById("enemy" + enemyCount);
    enemy.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
    enemy.style.animationDuration = `${getRandomInt(2, 6)}s`;
    enemy.onclick = () => {
        destroyEnemy(enemy);
    };
}

function checkCollision(enemy) {
    if (enemy.getBoundingClientRect().top <= 0) {
        playerHealth--;
        return true;
    }
    return false;
}

// Iteration 4: Write a function to destroy an enemy when it is shot or missed
function destroyEnemy(enemy) {
    enemy.style.display = "none";
    enemyCount++;
    createEnemy();
}


var countdownTimer = setInterval(function () {
    remainingTime--;
    document.getElementById("timer").textContent = remainingTime;
    let enemy = document.getElementById("enemy" + enemyCount);
    if (checkCollision(enemy) == true) {
        destroyEnemy(enemy);
        if (playerHealth == 0) {
            clearInterval(countdownTimer);
            location.href = "./game-over.html";
        }
    }
    if (remainingTime == 0) {
        clearInterval(countdownTimer);
        location.href = "./win.html";
    }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first enemy
createEnemy();

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
