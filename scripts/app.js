//Main
makeGrid() ;
makePalette() ;


//Global Variables
//Defines variables for Grid mouse functions
let pastGridSquare = 0;
let clicked = false;


//Pallete Buttons
$('.palette button').click(onPaletteClick);


//Grid Buttons: Drag and Draw Edition

//The implementation here is weird. I tried replicating the draw effect with erasing, but it caused some weird stuff to happen.
//Further, there is a minor bug where if you "click and drag" enough times a cancel image will appear next to the mouse pointer.
//I presume this is because the action is sometimes being recognized as a "drag" as opposed to my implementation of a "mousedown".
//I do not see how to fix this problem besides coding this function using "ondrag" rather than "mousedown/move/up".

$(".grid .cell").mousedown(onGridClick).mousemove(onGridDrag).mouseup(onGridDragEnd);
//Resets drag on mouse leaving the grid
$(".grid").mouseleave(onGridDragEnd);


//Control Buttons
//I attempted to use a "row" and "column" formula to manage grid size, but this proved more difficult than I originaly expected.
//Naturally, I gave up and just used a single number.
//If I was going to follow through with this challenge I would convert the "grid" section into a "display: grid".
$('.controls #submit').click(onApplyNewGridSize);
$('.controls .clear').click(onClearClick);
$('.controls .fill-all').click(onFillAllClick);
$('.controls .fill-empty').click(onFillEmptyClick);
$('.controls .random').click(onRandomColorsClick);
$('.controls #new-color-button').click(onAddNewColor);


//Functions
function makeGrid () {
    //Customizable grid size
    let gridSize = $('#grid-size').val();

    //Fills grid with squares using gridSize
    for (let i = 0; i < gridSize; i++) {
        $(".grid").append($("<div>").attr("class", "cell"))
    }
}

function makePalette() {
    //Declare colors in PALLETE
    const PALLETE = [
        'red',
        'blue',
        'yellow',
        'green'
    ]

    //Adds colors in PALLETE array to .pallete section
    for (let i = 0; i < PALLETE.length; i++) {
        //accesses the color
        $(".palette").append($("<button>").css("background-color", PALLETE[i]))
    }

    $('.palette button').first().addClass('active')
}

function onPaletteClick () {
    //Removes active from current active button
    $('.active').removeClass('active')
    //Adds active to clicked button
    $(this).addClass('active')
}

function onGridClick (evt) {
    //Checks if cell color is same as active palette color
    //If yes, clear cell of color
    if ($(this).css('background-color') == $('.palette .active').css('background-color')) {
        $(this).css('background-color', '')
    }
    //If no, change cell color to active palette color
    else {
        $(this).css('background-color', 
            $('.palette .active').css('background-color')
        )
    }

    //Resets drag variable
    isDragging = false;

    //Stores value for new square check
    pastGridSquare = evt.currentTarget;

    //Sets click for drag check 
    clicked = true;
}

function onGridDrag(evt) {
    //Checks for drag and new square
    if ((clicked == true) && (pastGridSquare !== evt.currentTarget)){
        $(this).css('background-color', 
            $('.palette .active').css('background-color')
        )
    }
}

function onGridDragEnd () {
    clicked = false;
}

function onClearClick () {
    //Clears all cells of color
    $('.grid .cell').css('background-color', '')
}

function onFillAllClick () {
    //Fills cells with active palette button color
    $('.grid .cell').css(
        'background-color', 
        $('.palette .active').css('background-color')
    )
}

function onFillEmptyClick() {
    //Fills empty grid cells with active palette button color
    const gridSquares = $('.cell')

    //Iterates through .cell class
    for (let i = 0; i < gridSquares.length; i++) {
        let nextGridSquare = $( gridSquares[i])

        if (nextGridSquare.css('background-color') == 'rgba(0, 0, 0, 0)') {
            $(nextGridSquare).css(
                'background-color', 
                $('.palette .active').css('background-color')
            )
        }
    }
}

function onRandomColorsClick() {
    //Creates a new, random color palette
    let hue = Math.floor(Math.random() * (360 - 0 + 1)) + 0;
    let sat = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
    let light = Math.floor(Math.random() * (100 - 0 + 1)) + 0;

    $(".palette").append($("<button>").css("background-color",`hsl(${hue}, ${sat}%, ${light}%)`))

    //Applies click same functionality to new button
    $('.palette button').click(onPaletteClick);
}

function onApplyNewGridSize() {
    //Changes grid size to users input number
    //Resets Grid
    $('.cell').remove();

    let gridSize = $('#grid-size').val();

    for (let i = 0; i < gridSize; i++) {
        $(".grid").append($("<div>").attr("class", "cell"))
    }
    //Re-applies click functionality
    $(".grid .cell").mousedown(onGridClick).mousemove(onGridDrag).mouseup(onGridDragEnd);
}

function onAddNewColor() {
    //Adds new palette color from user input color
    $(".palette").append($("<button>").css("background-color", $('#new-color').val()))

    //Applies click same functionality to new button
    $('.palette button').click(onPaletteClick);
}