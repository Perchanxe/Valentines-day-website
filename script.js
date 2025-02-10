document.addEventListener("DOMContentLoaded", () => {

// #region variables
let paragraph = document.querySelector('p');
let header = document.querySelector('h1');

//counters
let yesCounter = 0;
let noCounter = 0;
let movingNoCounter = 0;
let heartCounter = 1;
let poemCounter = 0;

let hearts = [];

//#endregion

// #region constants
const heartCounterText = document.getElementById('counter');
const heartsText = document.getElementById('counterText');
const heartContainer = document.getElementById('container');
const poemText = document.getElementById('poems');
const container = document.getElementById("container");

//#endregion

//#region visibility
movingNoButton.style.display = 'none';
poemText.style.display = 'none';

//#endregion

//#region event listeners
yesButton.addEventListener('click', () => {
    document.body.classList.add('bg-change');
    yesCounter++;

    if(yesCounter == 1)
    {
    paragraph.textContent = 'Are you sure? No take backs';
    document.body.classList.add('bg-change2');
    document.body.classList.remove('bg-change');
    }
    if(yesCounter == 2)
    {
        paragraph.textContent = 'You cant change your mind seriously';
        document.body.classList.add('bg-change3');
        document.body.classList.remove('bg-change2');
    }
    if(yesCounter == 3)
    {
        paragraph.textContent = 'You will be stuck with the decision';
        document.body.classList.add('bg-change4');
        document.body.classList.remove('bg-change3');
    }
    if(yesCounter == 4)
    {
        paragraph.textContent = 'LETS GO CHAT SHE SAID YES!'
        document.body.classList.add('bg-change5');
        document.body.classList.remove('bg-change4');
    }
    if(yesCounter == 5)
    {
        paragraph.textContent = 'I LOOOOOOVE YOU';
        createHearts(20);
        heartCounter += 20;
        heartCounterText.textContent = `${heartCounter}`;
        poemCounter++;

        yesButton.style.display = 'none';
        noButton.style.display = 'none';
    }

    if(yesCounter >= 6)
        {
            header.textContent = 'Unexplainable Love'
            yesButton.style.display = 'none';
            noButton.style.display = 'none';
            createHeart.style.display = 'none';
            clearHeart.style.display = 'none';
    
            heartCounterText.style.display = 'none';
            paragraph.style.display = 'none';
            heartsText.style.display = 'none';
            heartContainer.style.display = 'none';

            poemText.style.display = 'block';

            clearHearts();

            document.body.classList.add('bg-poem');
            document.body.classList.remove('bg-change5');
        }

});

noButton.addEventListener('click', () => {
    noCounter++;
    document.body.classList.remove('bg-change');

    if(noCounter == 1)
    {
    paragraph.textContent = 'fr?';
    }

    if(noCounter == 2)
    {
        paragraph.textContent = 'please reconsider'
    }

    if(noCounter == 3) {
        paragraph.textContent = 'why not?';
    }

    if(noCounter == 4) {
        paragraph.textContent = 'Catch the button >:D';
        noButton.style.display = 'none';
        movingNoButton.style.display = 'block';
    }
});

movingNoButton.addEventListener('mouseenter', () => {
    let newX = Math.random() * (window.innerWidth - movingNoButton.clientWidth);
    let newY = Math.random() * (window.innerHeight - movingNoButton.clientHeight);

    movingNoButton.style.left = `${newX}px`;
    movingNoButton.style.top = `${newY}px`;

    movingNoCounter++;

    if(movingNoCounter == 1)
    {
        paragraph.textContent = 'no please';
    }

    if(movingNoCounter == 2)
    {
        paragraph.textContent = 'you suck at this';
    }
    
    if(movingNoCounter == 3)
    {
        paragraph.textContent = 'I cant handle rejection so you get no button';
        movingNoButton.style.display = 'none';
    }
});

createHeart.addEventListener('click', () => {

    createHearts(1);
    heartCounter += 1;

    heartCounterText.textContent = `${heartCounter}`;
    if(heartCounter >= 50 && poemCounter == 1)
        {
            paragraph.textContent = 'Would you like a secret poem?';
            noButton.style.display = 'block';

            createHeart.style.display = 'none';
            movingNoButton.style.display = 'none';
            poemCounter++;
            yesButton.style.display = 'block';
        }
});

    clearHeart.addEventListener('click' , () => {
    clearHearts();
});

//#endregion

//#region classes

class Heart {
    constructor(x, y, dx, dy) {
        this.element = document.createElement("div");
        this.element.classList.add("heart");
        container.appendChild(this.element);

        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.speed = 2;

        const randomColor = this.getRandomColor();
        const randomColor2 = this.getRandomColor2();

        this.element.style.setProperty("--heart-color", randomColor);
        this.element.style.setProperty("--heart-color2", randomColor2);

        this.updatePosition();
        hearts.push(this);
    }

    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    move() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;

        if (this.x <= 0 || this.x + 40 >= container.clientWidth) {
            this.dx *= -1;
        }

        if (this.y <= 0 || this.y + 40 >= container.clientHeight) {
            this.dy *= -1;
        }

        for (let heart of hearts) {
            if (heart !== this && this.collidesWith(heart)) {
                this.dx *= -1;
                this.dy *= -1;
                break;
            }
        }

        this.updatePosition();
    }

    collidesWith(other) {
        return (
            this.x < other.x + 40 &&
            this.x + 30 > other.x &&
            this.y < other.y + 40 &&
            this.y + 30 > other.y
        );
    }

    getRandomColor() {
        return `hsl(${Math.random() * 360}, 100%, 70%)`;
    }

    getRandomColor2() {
        return `hsl(${Math.random() * 360}, 100%, 70%)`;
    }
}

//#endregion

//#region functions

function animate() {
    hearts.forEach((heart) => heart.move());
    requestAnimationFrame(animate);
}

function createHearts(count) {
    for (let i = 0; i < count; i++) {
        new Heart(Math.random() * container.clientWidth, Math.random() * container.clientHeight, 1, 1);
    }
}

function clearHearts() {
    hearts = [];
    document.querySelectorAll(".heart").forEach((heart) => heart.remove());

    heartCounter = 0;
    heartCounterText.textContent = `${heartCounter}`;
}

//#endregion

createHearts(1);

animate();
});