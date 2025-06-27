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

// start
let btnStart = document.createElement('button');
btnStart.textContent = 'START';
content.appendChild(btnStart);
btnStart.addEventListener('click', () => {
    content.removeChild(btnStart);
    generateGrid(16);
    displayNewGridBtn();
});

function generateGrid(sideLength) {
    let total = sideLength**2;
    for (let i = 0; i < total; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        square.style.height = (parseInt(contentCompStyles.height) / sideLength) + 'px';
        square.style.width = (parseInt(contentCompStyles.width) / sideLength) + 'px';
        square.style.flex = `1 1 ${square.style.width}`;
        // color when mouse hover over square, execute only once
        square.addEventListener('mouseenter', () => {
            colorRandom(square);
        }, {once: true});

        content.appendChild(square);
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
    // store color for darkening
    element.id = randomColor;

    element.classList.remove('square');
    element.classList.add('colored-square');
}

function darken(element) {
    // get RBG color value of element
    let RGB = element.style.backgroundColor;
    let r, g, b;

    // isolate red, green, blue values
    values = RGB.split(',');
    for (color of values) {
        values[color] = pareInt(values[color]);
    }
    r = values[0];
    r -= 10;
    r.toString(16);
    g = values[1];
    g -= 10;
    g.toString(16);
    b = values[2];
    b -= 10;
    b.toString(16);

    element.style.backgroundColor = `# + ${r} + ${g} + ${b}`;
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
    header.appendChild(newGridBtn);
}

// darken functionality
let coloredSquares = document.querySelectorAll('.colored-square');
/*
coloredSquares.forEach.addEventListener('mouseenter', () => {

})
*/