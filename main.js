/*
Pseudocode
DECLARE start function
    PROMPT user to start
    IF yes
        CALL generate grid (16x16)
    ENDIF
DECLARE generate grid function
    FOR 0 to squares per side
        CREATE square element
        SET visited count to 0
        APPEND square to grid
    ENDFOR
DECLARE color function
    SET square color random RGB
DECLARE darken function
    SET square color darker shade
IF mouse over square
    IF visited equal 0
        CALL color function
    ELSEIF visited less than 10
        CALL darken function
    ELSE
        RETURN
    ENDIF
CREATE new grid button
IF new grid pressed
    CALL generate grid function (#x#)
ENDIF
*/

// initialize document
let content = document.querySelector('.content');
let contentCompStyles = window.getComputedStyle(content);

// initialize header
displayNewGridBtn();

// start
let btnStart = document.createElement('button');
btnStart.textContent = 'START';
content.appendChild(btnStart);
btnStart.addEventListener('click', () => {
    content.removeChild(btnStart);
    generateGrid(16);
});

function generateGrid(sideLength) {
    let total = sideLength**2;
    for (let i = 0; i < total; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        square.style.height = (parseInt(contentCompStyles.height) / sideLength) + 'px';
        square.style.width = (parseInt(contentCompStyles.width) / sideLength) + 'px';
        square.style.flex = `1 1 ${square.style.width}`;

        content.appendChild(square);
        // color when mouse hover over square, execute only once
        let coloring = new Promise((resolve, reject) => {
            square.addEventListener('mouseenter', () => {
                colorRandom(square);
                resolve();
            }, {once: true});
            reject();
        })

        coloring.then(
            square.addEventListener('mouseenter', () => {
            darken(square);
        }));
        // opacity/fully colored solution
        /*
        // darken every time user interact with square up to 10 times (100% opacity)
        square.addEventListener('mouseenter', () => {
            darken(square);
        })
        */
    }
}

function colorRandom(element) {
    console.log(element);
    // exit if null input
    if (!!!element) {
        return;
    }
    // assign random RGB value

    // generate hex color value until at least 5 digits (hex)
    do {
        randomColorVal = (Math.floor(Math.random() * (256**3)))
    } while (randomColorVal < 1048575);
    // if hex color value less than 5 digits increase to 6 digits
    randomColorVal < 1048575 ? randomColorVal *= 16 : null;
    randomColor = `#` + randomColorVal.toString(16);

    element.style.backgroundColor = randomColor;

    // opacity/fully colored solution
    // element.style.opacity = 0.0;

    // store color for darkening
    element.id = randomColor;

    element.classList.remove('square');
    element.classList.add('colored-square');
}

function darken(element) {
    // opacity/fully colored solution
    /*
    opacityVal = parseFloat(element.style.opacity);
    opacityVal += 0.1;
    element.style.opacity = `${opacityVal}`;
    */

    // computed/black solution
    // get RBG color value of element
    let RGB = element.style.backgroundColor;
    let r, g, b;

    // isolate red, green, blue values
    let values = RGB.split(',');
    for (let i = 0; i < values.length; i++) {
        // use regex to extract number/s from strings in array
        const match = values[i].match(/\d+/g);
        // convert string value to number
        values[i] = Number(match[0]);
    }

    // calculate r, g, b subtrahends from original random rgb value (before darkening)
    let rSubtrahend = (parseInt(element.id.slice(1, 3), 16)) / 10;
    let gSubtrahend = (parseInt(element.id.slice(3, 5), 16)) / 10;
    let bSubtrahend = (parseInt(element.id.slice(5), 16)) / 10;

    r = values[0];
    r -= rSubtrahend;

    g = values[1];
    g -= gSubtrahend;

    b = values[2];
    b -= bSubtrahend;

    element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// new grid functionality
function displayNewGridBtn() {
    newGridBtn = document.createElement('button');
    newGridBtn.textContent = 'NEW GRID'
    newGridBtn.addEventListener('click', () => {
        // clear grid
        content.replaceChildren();
        let sideLength = prompt('What size grid? Max 100 (#x#)', 16);
        if (!(sideLength <= 100)) {
            return;
        }
        generateGrid(sideLength);
    })
    newGridBtn.classList.add('new-grid')

    let header = document.querySelector('.header');
    // empty div to center layout
    let emptyDiv = document.createElement('div');
    emptyDiv.classList.add('empty-div');
    header.prepend(emptyDiv);
    header.appendChild(newGridBtn);
}

// darken functionality
let coloredSquares = document.querySelectorAll('.colored-square');
/*
coloredSquares.forEach.addEventListener('mouseenter', () => {

})
*/