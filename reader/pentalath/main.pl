/* Game Loop */

/* includes */
:- ensure_loaded('utilities.pl').
:- ensure_loaded('board.pl').
:- ensure_loaded('interface.pl').
:- ensure_loaded('bot.pl').

/**
* Handles and prints errors to the terminal
* @param Log Error log
*/
printError(none).                                   /* no errors, do nothing */
printError(invalidPlay):- write('Invalid play!').   /* invalid play */

/**
* Switch player turn (in case there were no errors)
* @param Player Current player
* @param NewPlayer Next player
* @param Log Error log
*/
switchPlayer(player1, player2, none):- !.
switchPlayer(player1, player1, _):- !.
switchPlayer(player2, player1, none):- !.
switchPlayer(player2, player2, _):- !.

/**
* Get current player
* @param Player Current player
* @param PlayerName Name of the current player
*/
getPlayer(player1, 'Player 1').
getPlayer(player2, 'Player 2').

/**
* Reads the coords from the terminal
* @param Q Hex coords
* @param R Hex coords
*/
readCoords(Q, R):-
  write('Q: '),
  get_code(MinusQ),      /* read Q (or minus signal) */
  getCoord(MinusQ, Q),   /* get real value of Q */
  write('R: '),
  get_code(MinusR),      /* read R (or minus signal) */
  getCoord(MinusR, R).   /* get real value of R */

/**
* Checks if Coord is positive or negative (cause of get_char problems (reading - ))
* after checking if Coord is 'e'
* @param Minus Char read from terminal
* @param Coord Real value of Coord is returned
*/

getCoord(LetterE, _):-        /* input was letter E */
  letterE(LetterE),           /* check letter E */
  halt.                       /* stop execution */

getCoord(Minus, Coord):-      /* Coord is negative */
  minus(Minus),               /* if there was a minus signal */
  getCode(ASCICoord),         /* get Coord ASCI Code (ignoring \n) */
  PosCoord is ASCICoord - 48, /* positive value of Coord = asciQ - '0' */
  Coord is PosCoord * -1,     /* get real Coord */
  !.

getCoord(Minus, Coord):-      /* Coord is positive */
  get_char(_),                /* ignore \n */
  Coord is Minus - 48,        /* Coord = Minus - '0' */
  !.


/**
* Processes user input (while asking questions)
* @param Player Current player
* @param Q Hex Coordinate to insert Piece
* @param R Hex Coordinate to insert Piece
*/
processInput(Player, Q, R):-
  write('\nCurrent Player: '), getPlayer(Player, PlayerName),
  write(PlayerName), nl,
  write('Insert Piece (press E to exit):\n'),
  readCoords(Q, R).


/*
while (gameIsRunning)
{
  processInput();
  update();
  render();
}
*/

/**
* @param Player Current player
* @param Board Game Board
*/
game(Player, Board):-
  processInput(Player, Q, R),                         /* process input */
  placePiece(Player, Board, Q, R, NewBoard, Log),     /* place piece on board */
  printBoard(NewBoard),                               /* display board */
  printError(Log),                                    /* handle errors */
  gameIsRunning(NewBoard),                            /* check if game is over */
  switchPlayer(Player, NewPlayer, Log),               /* switch player turn */
  !, game(NewPlayer, NewBoard).                       /* loop */

/**
* @param Player Current player
* @param Board Game Board
*/
gameBotEasy(Player, Board):-
  processInput(Player, Q, R),                         /* process input */
  placePiece(Player, Board, Q, R, NewBoard, Log),     /* place piece on board */
  printBoard(NewBoard),                               /* display board */
  printError(Log),                                    /* handle errors */
  gameIsRunning(NewBoard),                            /* check if game is over */
  switchPlayer(Player, Player2, Log),                 /* switch player turn */
  waitBot,                                            /* wait for bot */
  playBotEasyMode(NewBoard, Player2, NewNewBoard),    /* calls bot to play */
  printBoard(NewNewBoard),                            /* display board */
  gameIsRunning(NewNewBoard),                         /* check if game is over */
  !, gameBotEasy(Player, NewNewBoard).                /* recursive call */

/**
* @param Player Current player
* @param Board Game Board
*/
gameBotHard(Player, Board):-
  processInput(Player, Q, R),                         /* process input */
  placePiece(Player, Board, Q, R, NewBoard, Log),     /* place piece on board */
  printBoard(NewBoard),                               /* display board */
  printError(Log),                                    /* handle errors */
  gameIsRunning(NewBoard),                            /* check if game is over */
  switchPlayer(Player, Player2, none),                /* switch player turn */
  waitBot,                                            /* wait for bot */
  playBotHardMode(NewBoard, Player2, NewNewBoard),    /* calls bot to play */
  printBoard(NewNewBoard),                            /* display board */
  gameIsRunning(NewNewBoard),                         /* check if game is over */
  !, gameBotHard(Player, NewNewBoard).                /* recursive call */

/**
* @param Player Current player
* @param Board Game Board
*/
gameBotEasyEasy(Player, Board):-
  waitBot,                                            /* wait for bot */
  playBotEasyMode(Board, Player, NewBoard),           /* calls bot to play */
  printBoard(NewBoard),                               /* display board */
  gameIsRunning(NewBoard),                            /* check if game is over */
  switchPlayer(Player, Player2, none),                /* switch player turn */
  waitBot,                                            /* wait for bot */
  playBotEasyMode(NewBoard, Player2, NewNewBoard),    /* calls bot to play */
  printBoard(NewNewBoard),                            /* display board */
  gameIsRunning(NewNewBoard),                         /* check if game is over */
  !, gameBotEasyEasy(Player, NewNewBoard).            /* recursive call */

/**
* @param Player Current player
* @param Board Game Board
*/
gameBotEasyHard(Player, Board):-
  waitBot,                                            /* wait for bot */
  playBotEasyMode(Board, Player, NewBoard),           /* calls bot to play */
  printBoard(NewBoard),                               /* display board */
  gameIsRunning(NewBoard),                            /* check if game is over */
  waitBot,                                            /* wait for bot */
  switchPlayer(Player, Player2, none),                /* switch player turn */
  playBotHardMode(NewBoard, Player2, NewNewBoard),    /* calls bot to play */
  printBoard(NewNewBoard),                            /* display board */
  gameIsRunning(NewNewBoard),                         /* check if game is over */
  !, gameBotEasyHard(Player, NewNewBoard).            /* recursive call */

/**
* @param Player Current player
* @param Board Game Board
*/
gameBotHardHard(Player, Board):-
  waitBot,                                            /* wait for bot */
  playBotHardMode(Board, Player, NewBoard),           /* calls bot to play */
  printBoard(NewBoard),                               /* display board */
  gameIsRunning(NewBoard),                            /* check if game is over */
  switchPlayer(Player, Player2, none),                /* switch player turn */
  waitBot,                                            /* wait for bot */
  playBotHardMode(NewBoard, Player2, NewNewBoard),    /* calls bot to play */
  printBoard(NewNewBoard),                            /* display board */
  gameIsRunning(NewNewBoard),                         /* check if game is over */
  !, gameBotHardHard(Player, NewNewBoard).            /* recursive call */

/**
* Start game.
*/
start:-
  displayMenuInicial.

/** TODO perguntar se o 2º jogar quer trocar com o 1º, na primeira jogada
* Interface to start the game
*/
game:-
  emptyBoard(Board),                            /* get empty board */
  printBoard(Board),                            /* display board */
  \+ game(player1, Board),                      /* start game loop (game fails once it's game over) */
  displayGameOver.                              /* print end game screen */

gameBotEasy:-
  emptyBoard(Board),                            /* get empty board */
  printBoard(Board),                            /* display board */
  \+ gameBotEasy(player1, Board),               /* start game loop (game fails once it's game over) */
  displayGameOver.

gameBotEasyEasy:-
  emptyBoard(Board),                            /* get empty board */
  printBoard(Board),                            /* display board */
  \+ gameBotEasyEasy(player1, Board),           /* start game loop (game fails once it's game over) */
  displayGameOver.

gameBotEasyHard:-
  emptyBoard(Board),                            /* get empty board */
  printBoard(Board),                            /* display board */
  \+ gameBotEasyHard(player1, Board),           /* start game loop (game fails once it's game over) */
  displayGameOver.

gameBotHardHard:-
  emptyBoard(Board),                            /* get empty board */
  printBoard(Board),                            /* display board */
  \+ gameBotHardHard(player1, Board),           /* start game loop (game fails once it's game over) */
  displayGameOver.

gameBotHard:-
  emptyBoard(Board),                            /* get empty board */
  printBoard(Board),                            /* display board */
  \+ gameBotHard(player1, Board),               /* start game loop (game fails once it's game over) */
  displayGameOver.

/**
* Test function for debugging
*/
game(Board):-
  printBoard(Board),                            /* display board */
  \+ game(player1, Board),                      /* start game loop (game fails once it's game over) */
  displayGameOver.                              /* print end game screen */
