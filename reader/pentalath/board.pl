/**
Board is a 2D array (9x9!) (list of lists) that should ALWAYS be access like this:
board[Y][X]
*/

/* includes */
:- ensure_loaded('utilities.pl').
:- use_module(library(lists)).

/* Board radius N = max(abs(x), abs(z)) = 4  */
boardRadius(4).

/* Number of pieces in a row required to win the game */
maxPiecesInRow(5).

/**
* Hexagonal to array coordinates mapping: array[R + N][Q + N + min(0, R)], N = board radius
* @param Q Hexagonal coordinate (SW - NE)
* @param R Hexagonal coordinate (N - S)
* @param X Array coordinate (columns)
* @param Y Array coordinate (rows)
*/
map(Q, R, X, Y):-
  boardRadius(N), /* get board radius and store it in variable N */
  Y is R + N,
  X is Q + N + min(0, R).

/**
* Array to hexagonal coordinates mapping: array[R + N][Q + N + min(0, R)], N = board radius
* @param Q Hexagonal coordinate (SW - NE)
* @param R Hexagonal coordinate (N - S)
* @param X Array coordinate (columns)
* @param Y Array coordinate (rows)
*/
reverseMap(Q, R, X, Y):-
  boardRadius(N), /* get board radius and store it in variable N */
  R is Y - N,
  Q is X - N - min(0, R).

/* game pieces */
piece(whitePiece).
piece(blackPiece).

/* check if two pieces are the same */
checkSamePiece(whitePiece, whitePiece).
checkSamePiece(blackPiece, blackPiece).

/* players */
player(player1).
player(player2).

/* translation rules between players and their respective pieces */
toPiece(player1, whitePiece).
toPiece(player2, blackPiece).

/* translation rules used for printing the board */
toChar(emptyCell, '   |').
toChar(blackPiece, ' B |').
toChar(whitePiece, ' W |').
toChar(nullCell, '').

/* board (2D array) measures */
boardWidth(9).
boardHeight(9).

/* empty board */
emptyBoard([
[emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell, nullCell, nullCell, nullCell],
[emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell, nullCell, nullCell],
[emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell, nullCell],
[emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell],
[emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
[emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell],
[emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell, nullCell],
[emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell, nullCell, nullCell],
[emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell, nullCell, nullCell, nullCell]]).

/* final board (example of game over)*/
finalBoard([
[blackPiece, blackPiece, blackPiece, emptyCell, emptyCell, nullCell, nullCell, nullCell, nullCell],
[emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell, nullCell, nullCell],
[emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell, nullCell],
[emptyCell, emptyCell, blackPiece, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell],
[emptyCell, blackPiece, emptyCell, blackPiece, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell],
[blackPiece, blackPiece, blackPiece, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell],
[emptyCell, emptyCell, blackPiece, emptyCell, emptyCell, emptyCell, emptyCell, nullCell, nullCell],
[emptyCell, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, nullCell, nullCell, nullCell],
[emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell, nullCell, nullCell, nullCell]]).

/* on-going board (example of an on-going game) */
gameBoard([
[emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell, nullCell, nullCell, nullCell],
[emptyCell, blackPiece, emptyCell, emptyCell, emptyCell, emptyCell, nullCell, nullCell, nullCell],
[emptyCell, whitePiece, emptyCell, blackPiece, emptyCell, emptyCell, emptyCell, nullCell, nullCell],
[emptyCell, blackPiece, whitePiece, whitePiece, emptyCell, emptyCell, emptyCell, emptyCell, nullCell],
[emptyCell, emptyCell, emptyCell, whitePiece, whitePiece, blackPiece, emptyCell, emptyCell, emptyCell],
[emptyCell, emptyCell, whitePiece, blackPiece, blackPiece, emptyCell, emptyCell, emptyCell, nullCell],
[emptyCell, whitePiece, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell, nullCell],
[blackPiece, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell, nullCell, nullCell],
[emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, nullCell, nullCell, nullCell, nullCell]]).

/* test board */
testBoard([
[whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, nullCell, nullCell, nullCell, nullCell],
[whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, nullCell, nullCell, nullCell],
[whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, nullCell, nullCell],
[whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, nullCell],
[whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece],
[whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, nullCell],
[whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, nullCell, nullCell],
[whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, nullCell, nullCell, nullCell],
[whitePiece, whitePiece, whitePiece, whitePiece, whitePiece, nullCell, nullCell, nullCell, nullCell]]).

/**
* Interface for printing nullCells to terminal
* @param LineIndex Index of lines
* @param Offset Value to subtract from the final N value
*/
printNullCells(LineIndex, Offset):-
  numberCells(LineIndex, NCells),     /* get number of cells to draw */
  boardWidth(Width),                  /* get board width */
  N is Width - NCells,                /* number of nullCells */
  N2 is div(N, 2),                    /* number of nullCells on the left side */
  N3 is N2*4,                         /* number of sapces left side nullCells are worth */
  N4 is N3 - Offset,                  /* offset N4 */
  printSpace(N4).                     /* print spaces to the terminal */

/**
* How many cells to draw on given line
* @param LineIndex Index of the current line
* @param X Storage for the number of cells to draw
*/

/* If above (or at) the equator */
numberCells(LineIndex, X):-
  boardRadius(Radius),
  LineIndex < Radius + 1,
  boardWidth(Width),
  X is Width - Radius + LineIndex.

/* If below the equator */
numberCells(LineIndex, X):-
  boardRadius(Radius),
  LineIndex > Radius,
  boardWidth(Width),
  X is Width - LineIndex + Radius.

/**
* Prints one piece to the terminal
* @param Piece Element of a line of the board to print (will call translation rules)
* @param Index Set to '0' if it's the first element of a line.
*/

/* If it's the first element of a line */
printPiece(Piece, 0):-
  write('|'),
  printPiece(Piece, 1).

/* If it's not the first element of a line */
printPiece(Piece, _Index):-
  toChar(Piece, C),         /* char C to print */
  write(C).

/**
* Offsets the given line by either '  ', '/' or '\\'
* @param LineIndex Line of offset
* @param Char Char to offset with
*/

/* If above the equator */
offset(LineIndex, Char):-
  boardHeight(Height),      /* get board height */
  Equa is div(Height, 2),   /* get the equator */
  LineIndex < Equa,         /* make sure it's above the equator */
  write(' '), write(Char).  /* write either '/' or '\\' */

/* If below (or at) the equator */
offset(LineIndex, _Char):-
  boardHeight(Height),      /* get board height */
  Equa is div(Height, 2),   /* get the equator */
  LineIndex > Equa - 1,     /* make sure it's below (or at) the equator */
  write('  ').              /* write spaces */

/**
* Prints one line of the board (a list) to the terminal
* @param [Piece|Tail] List to print
* @param LineIndex Index of the current line being iterated
* @param ElemIndex Index of the current line element being iterated. ALWAYS set to 0 when called the 1st time.
*/

/* base case | stop condition */
printLineMid(_List, LineIndex, ElemIndex):-
  numberCells(LineIndex, NCells),           /* get number of cells to draw */
  ElemIndex =:= NCells.                     /* stop if all cells have been drawn */

/* main loop */
printLineMid([Piece|Tail], LineIndex, ElemIndex):-
  numberCells(LineIndex, NCells),              /* get number of cells to draw */
  ElemIndex > -1, ElemIndex < NCells,          /* while (i >= 0 && i <= nCells) */
  printPiece(Piece, ElemIndex),                /* print char */
  NewElemIndex is ElemIndex + 1,               /* i++ */
  printLineMid(Tail, LineIndex, NewElemIndex). /* recursive call */

/**
* Prints the bottom of a line of the board to the terminal
* @param LineIndex Index of the current line being iterated
* @param ElemIndex Index of the current line element being iterated. ALWAYS set to 0 when called the 1st time.
*/

/* base case | stop condition */
printLineBot(LineIndex, ElemIndex):-
  numberCells(LineIndex, NCells),           /* get number of cells to draw */
  ElemIndex =:= NCells.                     /* stop if all cells have been drawn */

/* main loop */
printLineBot(LineIndex, ElemIndex):-
  numberCells(LineIndex, NCells),           /* get number of cells to draw */
  ElemIndex > -1, ElemIndex < NCells,       /* while (i >= 0 && i <= nCells) */
  write(' \\ /'),                           /* print bottom of line */
  NewElemIndex is ElemIndex + 1,            /* get ready for next ite */
  printLineBot(LineIndex, NewElemIndex).    /* recursive call */

/**
* Prints the top of a line of the board to the terminal
* @param LineIndex Index of the current line being iterated
* @param ElemIndex Index of the current line element being iterated. ALWAYS set to 0 when called the 1st time.
*/

/* base case | stop condition */
printLineTop(LineIndex, ElemIndex):-
  numberCells(LineIndex, NCells),           /* get number of cells to draw */
  ElemIndex =:= NCells.                     /* stop if all cells have been drawn */

/* main loop */
printLineTop(LineIndex, ElemIndex):-
  numberCells(LineIndex, NCells),           /* get number of cells to draw */
  ElemIndex > -1, ElemIndex < NCells,       /* while (i >= 0 && i <= nCells) */
  write(' / \\'),                           /* print top of line */
  NewElemIndex is ElemIndex + 1,            /* get ready for next ite */
  printLineTop(LineIndex, NewElemIndex).    /* recursive call */

/**
* Translater for printing coords
* @param LineIndex Index of Line
*/
printVerticalCoord(LineIndex):-   /* when it's above the equator */
  boardRadius(Radius),
  Coord is LineIndex - Radius,
  Coord < 0,
  write(Coord),
  write(' ').

printVerticalCoord(LineIndex):-   /* when it's below (or at) the equator */
  boardRadius(Radius),
  Coord is LineIndex - Radius,
  Coord >= 0,
  write(' '),
  write(Coord),
  write(' ').

/**
* Prints the coordinates to the terminal
* @param LineIndex Index of line (either 0 or lastLine)
* @param Count Counter. Always set to 0 when first call
*/

printCoord(0, Count):-      /* stop condition - when it's the last coord of top line */
  boardRadius(Radius),      /* get board radius */
  Count = Radius,           /* check it's the last coord */
  write(Count).             /* print coord */

printCoord(0, Count):-      /* when it's the top line */
  boardRadius(Radius),      /* get board radius */
  Count < Radius,           /* make sure it's not the last coord */
  write(Count),             /* print coord */
  write('   '),             /* print spaces */
  NewCount is Count + 1,    /* prepare next ite */
  printCoord(0, NewCount).  /* recursive call */

printCoord(_, Count):-              /* stop condition - when it's the last coord of bottom line */
  boardRadius(Radius),              /* get board radius */
  Count = Radius,                   /* make sure it's the last coord */
  write(' '),                       /* print spaces */
  write(0).                         /* print coord */

printCoord(LineIndex, Count):-      /* when it's the bottom line */
  boardRadius(Radius),              /* get board radius */
  Count < Radius,                   /* make sure it's not the last coord */
  CoordToWrite is Count - 4,        /* get coord to print */
  write(CoordToWrite),              /* print coord */
  write('  '),                      /* print spaces */
  NewCount is Count + 1,            /* prepare next ite */
  printCoord(LineIndex, NewCount).  /* recursive call */

/**
* Interface for printCoord
* @param LineIndex Index of line (either 0 or lastLine)
*/

printCoord(0):-                   /* when it's the top line */
  printNullCells(0, -3),          /* print null cells and offset */
  printCoord(0, 0).               /* print coords */

printCoord(LineIndex):-           /* when it's the bottom line */
  printNullCells(LineIndex, -3),  /* print null cells and offset */
  write('   '),                   /* print spaces */
  printCoord(LineIndex, 0).       /* print coords */

/**
* Interface for printing a line of the board to the terminal
* @param Line Line (list) to print
* @param LineIndex Index of the line to print
*/

/* print first line */
printLine(Line, 0):-
  printCoord(0), nl,                          /* print coods */
  printNullCells(0, -3),                      /* print left side null cells */
  printLineTop(0, 0), nl,                     /* print top */
  printVerticalCoord(0),                      /* print coord */
  printNullCells(0, 0),                       /* print left side null cells */
  printLineMid(Line, 0, 0), nl,               /* print middle of line */
  printNullCells(0, -1),                       /* print left side null cells (offset by 2 */
  offset(0, '/'),                             /* print top of 1st element of next line */
  printLineBot(0, 0),                         /* print bottom of line */
  offset(0, '\\').                            /* print top of last element of next line */

/* print last line */
printLine(Line, LineIndex):-
  boardHeight(Height),                        /* get height */
  LineIndex =:= Height - 1,                   /* make sure it's the last line */
  printVerticalCoord(LineIndex),              /* print coord */
  printNullCells(LineIndex, 0),               /* print left side null cells */
  printLineMid(Line, LineIndex, 0), nl,       /* print middle of line */
  printNullCells(LineIndex, -3),              /* print left side null cells */
  printLineBot(LineIndex, 0), nl,             /* print bottom of line */
  printCoord(LineIndex).                      /* print coords */

/* print odd lines */
printLine(Line, LineIndex):-
  \+even(LineIndex),                      /* check it's an odd line */
  printVerticalCoord(LineIndex),          /* print coord */
  printNullCells(LineIndex, 0),           /* print left side null cells */
  write('  '),                            /* offset */
  printLineMid(Line, LineIndex, 0), nl,   /* print middle of line */
  printNullCells(LineIndex, -3),          /* print left side null cells */
  offset(LineIndex, '/'),                 /* print top of 1st element of next line (default!) */
  printLineBot(LineIndex, 0),             /* print bottom of line */
  offset(LineIndex, '\\').                /* print top of last element of next line */

/* print line index 4, cause reasons */
printLine(Line, 4):-
  printVerticalCoord(4),         /* print coord */
  printNullCells(4, 0),          /* print left side null cells */
  printLineMid(Line, 4, 0), nl,  /* print middle of line */
  printNullCells(4, -3),         /* print left side null cells (offset by 2) */
  printLineBot(4, 0).            /* print bottom of line */

/* print even lines */
printLine(Line, LineIndex):-
  even(LineIndex),                       /* check it's an even line */
  printVerticalCoord(LineIndex),         /* print coord */
  printNullCells(LineIndex, 0),          /* print left side null cells */
  printLineMid(Line, LineIndex, 0), nl,  /* print middle of line */
  printNullCells(LineIndex, -1),         /* print left side null cells (offset by 2) */
  offset(LineIndex, '/'),                /* print top of 1st element of next line (default!) */
  printLineBot(LineIndex, 0),            /* print bottom of line */
  offset(LineIndex, '\\').               /* print top of last element of next line */

/**
* Prints Board to the terminal
* @param [Line|Tail] Board to print - 2D Array (list of lists) representing the game board
* @param Index Index of the current line being iterated (range: [0, board.height])
*/

/* base case | stop condition */
printBoard([], _Index):- !.

/* main loop */
printBoard([Line|Tail], Index):-
  boardHeight(Height),              /* get board height */
  Index > -1, Index < Height,       /* while (i >= 0 && i < board.height) */
  printLine(Line, Index), nl,       /* print line */
  NewIndex is Index + 1,            /* i++ */
  printBoard(Tail, NewIndex), !.    /* recursive call */

/**
* Interface for printing any board
*/
printBoard(Board):-
  nl,
  printBoard(Board, 0).

/**
* Get one of the adjacent pieces of a piece
* @param QPiece Hexagonal coordinate of the piece
* @param RPiece Hexagonal coordinate of the piece
* @param QAdj returns hexagonal coordinate of the next cell to compare
* @param RAdj returns hexagonal coordinate of the next cell to compare
* @param Dir Direction
*/
getAdjacent(QPiece, RPiece, QPiece, RAdj, 0):- RAdj is RPiece - 1.
getAdjacent(QPiece, RPiece, QPiece, RAdj, 1):- RAdj is RPiece + 1.
getAdjacent(QPiece, RPiece, QAdj, RPiece, 2):- QAdj is QPiece - 1.
getAdjacent(QPiece, RPiece, QAdj, RAdj, 3):- QAdj is QPiece - 1, RAdj is RPiece + 1.
getAdjacent(QPiece, RPiece, QAdj, RPiece, 4):- QAdj is QPiece + 1.
getAdjacent(QPiece, RPiece, QAdj, RAdj, 5):- QAdj is QPiece + 1, RAdj is RPiece - 1.

/**
* Check if there is an emptyCell adjacent to Piece
* @param Board Game Board
* @param QPiece Hexagonal coordinate of the piece
* @param RPiece Hexagonal coordinate of the piece
*/
checkEmptyAdjacent(Board, QPiece, RPiece):-
  getAdjacent(QPiece, RPiece, QAdj, RAdj, _),     /* get Adj */
  map(QAdj, RAdj, XAdj, YAdj),                    /* get array coordinates of the adjacent piece */
  find(Board, XAdj, YAdj, Adj),                   /* get adjacent cell */
  Adj = emptyCell.                                /* check if it's not empty or null cell */

/**
*
* @param List List containig the adj found
*/
getSameColorAdj(Board, QPiece, RPiece, Color, List):-
  getAdjacent(QPiece, RPiece, QAdj0, RAdj0, 0),
  getAdjacent(QPiece, RPiece, QAdj1, RAdj1, 1),
  getAdjacent(QPiece, RPiece, QAdj2, RAdj2, 2),
  getAdjacent(QPiece, RPiece, QAdj3, RAdj3, 3),
  getAdjacent(QPiece, RPiece, QAdj4, RAdj4, 4),
  getAdjacent(QPiece, RPiece, QAdj5, RAdj5, 5),
  AuxList = [QAdj0-RAdj0, QAdj1-RAdj1, QAdj2-RAdj2, QAdj3-RAdj3, QAdj4-RAdj4, QAdj5-RAdj5],
  deleteDifColorAdj(Board, Color, List, AuxList, AuxList).

deleteDifColorAdj(_, _, List, AuxList, []):-            /* stop condition */
  List = AuxList.

deleteDifColorAdj(Board, Color, List, AuxList, [QAdj-RAdj|T]):- /* if same color, delete it */
  map(QAdj, RAdj, XAdj, YAdj),                                  /* get array coordinates of the adjacent piece */
  find(Board, XAdj, YAdj, Adj),                                 /* get adjacent cell */
  Adj \= Color,                                                 /* delete if different color */
  delete(AuxList, QAdj-RAdj, NewAuxList),                       /* delete element */
  deleteDifColorAdj(Board, Color, List, NewAuxList, T).         /* recursive call */

deleteDifColorAdj(Board, Color, List, AuxList, [_H|T]):-        /* if different color (dont delete, just iterate to next) */
  deleteDifColorAdj(Board, Color, List, AuxList, T).            /* recursive call */

/**
* Checks if there are N pieces of the same color in a row.
* @param Board Game Board
* @param XPiece Array Coordinate of piece
* @param YPiece Array Coordinate of piece
* @param N number of pieces of the same color in a row found until now
* @param Line List containing the corrent pieces that are in row
* @param Dir Direction (this makes sure only pieces in a row are actually accounted for)
*/
checkNInRow(Board, XPiece, YPiece, 1, [QAdj-RAdj|_], _):-         /* stop condition */
  boardWidth(Width), boardHeight(Height),                         /* get board width and height */
  XPiece >= 0, XPiece < Width,                                    /* make sure X is valid */
  YPiece >= 0, YPiece < Height,                                   /* make sure Y is valid */
  find(Board, XPiece, YPiece, Piece),                             /* get piece */
  piece(Piece),                                                   /* check if it's not empty or null cell */
  map(QAdj, RAdj, XAdj, YAdj),                                    /* get array coordinates of last piece */
  find(Board, XAdj, YAdj, Adj),                                   /* get last piece */
  Piece = Adj,                                                    /* check if both pieces are the same color */
  !.

checkNInRow(Board, XPiece, YPiece, N, Line, Dir):-
  N > 1,                                                          /* make sure N is valid */
  boardWidth(Width), boardHeight(Height),                         /* get board width and height */
  XPiece >= 0, XPiece < Width,                                    /* make sure X is valid */
  YPiece >= 0, YPiece < Height,                                   /* make sure Y is valid */
  find(Board, XPiece, YPiece, Piece),                             /* get piece */
  piece(Piece),                                                   /* check if it's not empty or null cell */
  reverseMap(QPiece, RPiece, XPiece, YPiece),                     /* get hexagonal coordinates of Piece */
  !, getAdjacent(QPiece, RPiece, QAdj, RAdj, Dir),                /* get an adjacent piece */
  map(QAdj, RAdj, XAdj, YAdj),                                    /* get array coordinates of the adjacent piece */
  find(Board, XAdj, YAdj, Adj),                                   /* get adjacent cell */
  piece(Adj),                                                     /* check if it's not empty or null cell */
  Piece = Adj,                                                    /* check if both pieces are the same color */
  \+ memberchk(QAdj-RAdj, Line),                                  /* check if Adj is not already part of Line */
  NewN is N - 1,                                                  /* prepare next ite */
  checkNInRow(Board, XAdj, YAdj, NewN, [QPiece-RPiece|Line], Dir).    /* recursive call */

/**
* Checks if the game is finished.
* @param Board Game Board
* @param XPiece Array coordiante of current piece being iterated
* @param YPiece Array coordiante of current piece being iterated
* @param XLast Array coordinate of last piece
* @param YLast Array coordinate of last piece
* @param N Number of pieces in a row required to win
*/
gameIsRunning(Board, XLast, YLast, XLast, YLast, N):-         /* stop condition (call for last cell of board) */
  \+checkNInRow(Board, XLast, YLast, N, [], _Dir),            /* check if there are N pieces in a row and negate it's result. If there are N pieces in a row, then gameIsRunning fails (since game is over) */
  !.

gameIsRunning(Board, XLast, YPiece, XLast, YLast, N):-        /* move to next line */
  YPiece =< YLast,                                            /* make sure YPiece is valid */
  \+checkNInRow(Board, XLast, YPiece, N, [], _Dir),           /* check if there are N pieces in a row and negate it's result. If there are N pieces in a row, then gameIsRunning fails (since game is over) */
  NewYPiece is YPiece + 1,                                    /* prepare next ite */
  gameIsRunning(Board, 0, NewYPiece, XLast, YLast, N), !.     /* loop */

gameIsRunning(Board, XPiece, YPiece, XLast, YLast, N):-          /* main loop */
  XPiece =< XLast, YPiece =< YLast,                              /* make sure XPiece and YPiece are valid */
  \+checkNInRow(Board, XPiece, YPiece, N, [], _Dir),             /* check if there are N pieces in a row and negate it's result. If there are N pieces in a row, then gameIsRunning fails (since game is over) */
  NewXPiece is XPiece + 1,                                       /* move to next piece */
  gameIsRunning(Board, NewXPiece, YPiece, XLast, YLast, N), !.   /* loop */

/**
* Interface for gameIsRunning.
* @param Board Game Board
*/
gameIsRunning(Board):-
  maxPiecesInRow(N),                              /* get number of pieces in a row required to win */
  boardWidth(Width), boardHeight(Height),         /* get board width and height */
  XLast is Width - 1,                             /* array coordiante of last piece */
  YLast is Height - 1,                            /* array coordinate of last piece */
  gameIsRunning(Board, 0, 0, XLast, YLast, N).    /* start iterating (starting on the 1st cell)*/

/** TODO acabar isto! comer peças checkBoard calls checkPiece
* Checks if a piece (and all of it's adjacents of same color are free (aka, are not going to be eaten)
* This is super non-efficient (since it checks adjs, and adjs of adjs, etc), but hopefully it will work!
* This is called for every Cell on Board, which means every cell will be evaluated muuuuuuuuultiple times, cause of adjacency
* @param Board Game Board
* @param XPiece Array Coordinate of piece
* @param YPiece Array Coordinate of piece
* @param List List containing the pieces to be removed.
*/
checkPiece2(Board, XPiece, YPiece, List):-                 /* main loop */
  boardWidth(Width), boardHeight(Height),                 /* get board width and height */
  XPiece >= 0, XPiece < Width,                            /* make sure X is valid */
  YPiece >= 0, YPiece < Height,                           /* make sure Y is valid */
  find(Board, XPiece, YPiece, Piece),                     /* get piece */
  piece(Piece),                                           /* check if it's not empty or null cell */
  reverseMap(QPiece, RPiece, XPiece, YPiece),             /* get hexagonal coordinates of Piece */
  getAdjacent(QPiece, RPiece, QAdj, RAdj, _),             /* get an adjacent piece */
  map(QAdj, RAdj, XAdj, YAdj),                            /* get array coordinates of the adjacent piece */
  find(Board, XAdj, YAdj, Adj),                           /* get adjacent cell */
  piece(Adj),                                             /* check if it's not empty or null cell */
  Piece = Adj,                                            /* check if both pieces are the same color */
  \+ memberchk(QAdj-RAdj, List),                          /* check if Adj is not already part of List */
  checkPiece2(Board, XAdj, YAdj, [QPiece-RPiece|List]).    /* recursive call */

checkPiece2(Board, XPiece, YPiece, _List):-                /* if Piece doesn't have any Adj of same color */
  boardWidth(Width), boardHeight(Height),                 /* get board width and height */
  XPiece >= 0, XPiece < Width,                            /* make sure X is valid */
  YPiece >= 0, YPiece < Height,                           /* make sure Y is valid */
  find(Board, XPiece, YPiece, Piece),                     /* get piece */
  piece(Piece),                                           /* check if it's not empty or null cell */
  reverseMap(QPiece, RPiece, XPiece, YPiece),             /* get hexagonal coordinates of Piece */
  !, getAdjacent(QPiece, RPiece, QAdj, RAdj, _),          /* get an adjacent piece (again... #efficient) */
  map(QAdj, RAdj, XAdj, YAdj),                            /* get array coordinates of the adjacent piece */
  find(Board, XAdj, YAdj, Adj),                           /* get adjacent cell */
  Adj = emptyCell.                                        /* check if it's emtpyCell (otherwise fail) */

/* -----------------------------------------------*/

checkPiece(Board, XPiece, YPiece, _List):-
  boardWidth(Width), boardHeight(Height),                 /* get board width and height */
  XPiece >= 0, XPiece < Width,                            /* make sure X is valid */
  YPiece >= 0, YPiece < Height,                           /* make sure Y is valid */
  find(Board, XPiece, YPiece, Piece),                     /* get piece */
  piece(Piece),                                           /* check if it's not empty or null cell */
  reverseMap(QPiece, RPiece, XPiece, YPiece),             /* get hexagonal coordinates of Piece */
  getAdjacent(QPiece, RPiece, _QAdj, _RAdj, _).             /* get an adjacent piece */


/*checkPiece(Board, XPiece, YPiece, List):-                 /* if Piece doesn't have any Adj of same color */

/** TODO game rules
* Game Rules
* @param Piece whitePiece or blackPiece
* @param Board Game Board
* @param X Array Coordinate to insert Piece
* @param Y Array Coordinate to insert Piece
*/
validatePlay(emptyCell).                  /* can only place a piece in an empty cell */
validatePlay(_Piece, Board, X, Y):-
  boardWidth(Width), boardHeight(Height), /* get board width and height */
  X >= 0, X < Width,                      /* make sure X is valid */
  Y >= 0, Y < Height,                     /* make sure Y is valid */
  find(Board, X, Y, BoardCell),!,         /* get board cell on that position */
  validatePlay(BoardCell).                /* can only place a piece in an empty cell */

/**
* Places a piece on the board
* @param Player player1 or player2
* @param Board Game Board
* @param Q Hex Coordinate to insert Piece
* @param R Hex Coordinate to insert Piece
* @param NewBoard GameBoard after piece is played
* @param Log Error log
*/
placePiece(Player, Board, Q, R, NewBoard, none):-
  map(Q, R, X, Y),                        /* get mapping for the coordinates */
  toPiece(Player, Piece),                 /* get player's piece (whitePiece or blackPiece) */
  validatePlay(Piece, Board, X, Y), !,    /* make sure it's a valid play */
  replace(Board, X, Y, Piece, NewBoard).  /* insert piece on the board */

/* In case the play is invalid (validatePlay failed), NewBoard = Board */
placePiece(_, Board, _, _, Board, invalidPlay).


/**
* Interface for printing an empty board
*/
printEmptyBoard:-
  emptyBoard(Board),
  printBoard(Board, 0).

/**
* Interface for printing the final board
*/
printFinalBoard:-
  finalBoard(Board),
  printBoard(Board, 0).

/**
* Interface for printing the test board
*/
printTestBoard:-
  testBoard(Board),
  printBoard(Board, 0).

/**
* Interface for printing the game board
*/
printGameBoard:-
  gameBoard(Board),
  printBoard(Board, 0).
