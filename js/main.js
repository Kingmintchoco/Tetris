(function (){
    main();
})();

function main(){
    mainBlock = createNextBlock();
    nextBlock = createNextBlock();

    rebuild();
    window.addEventListener('resize', resize);
}

function resize(){  
    const WINDOW_INNERWIDTH = (window.innerWidth > 660) ? 660: window.innerWidth;
    const MAIN_CONTENTS_WIDTH = Math.floor(WINDOW_INNERWIDTH * 0.6);
    const BLOCK_SIZE = Math.floor(MAIN_CONTENTS_WIDTH/COLS_MAIN_BOARD);

    ctxMainBoard.canvas.width = BLOCK_SIZE * COLS_MAIN_BOARD;
    ctxMainBoard.canvas.height = BLOCK_SIZE * ROWS_MAIN_BOARD;
    ctxMainBoard.scale(BLOCK_SIZE, BLOCK_SIZE);

    ctxNextBoard.canvas.width = BLOCK_SIZE * COLS_NEXT_BOARD;
    ctxNextBoard.canvas.height = BLOCK_SIZE * ROWS_NEXT_BOARD;
    ctxNextBoard.scale(BLOCK_SIZE, BLOCK_SIZE);

    const FONT_RATIO = WINDOW_INNERWIDTH/350;
    document.querySelector('#side-contents').style.fonrSize = FONT_RATIO + 'rem';
}

function getRandomIndex(length){
    return Math.floor(Math.random() * length);
}

function randomNextBlockMatrix(){
    // block
    const BLOCK_SET = [
        [
            [1,1],
            [1,1]
        ],
        [
            [0,2,0],
            [2,2,2],
            [0,0,0]
        ],
        [
            [0,3,3],
            [3,3,0],
            [0,0,0]
        ],
        [
            [4,4,0],
            [0,4,4],
            [0,0,0]
        ],
        [
            [5,0,0],
            [5,5,5],
            [0,0,0]
        ],
        [
            [0,0,6],
            [6,6,6],
            [0,0,0]
        ],
        [
            [0,0,0,0],
            [7,7,7,7],
            [0,0,0,0],
            [0,0,0,0]
        ]
    ];

    return BLOCK_SET[getRandomIndex(BLOCK_SET.length)];
}

function createNextBlock(){
    const nextBlock = {
        x: 0,
        y: 0,
        shape: randomNextBlockMatrix()
    };

    return nextBlock;
}

function rebuild(){
    resize();
    drawBlock(mainBlock, ctxMainBoard); 
    drawBlock(nextBlock, ctxNextBoard);
}

function drawBlock(block, ctx){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    block.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value > 0){
                ctx.fillStyle = 'white';
                ctx.fillRect(x + block.x, y + block.y, 1, 1);
            }
        });
    });
}