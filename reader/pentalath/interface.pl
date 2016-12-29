
:- ensure_loaded('utilities.pl').
:- ensure_loaded('main.pl').

getPlayer(player1, 'Player 1').
getPlayer(player2, 'Player 2').

/**
* Prints rules on the terminal
*/
displayRules:-
	write('\n***********************REGRAS***********************\n\n'),
	write('O objetivo do jogo e alinhar 5 pecas da mesma \ncor. \nPara colocar uma peca no tabuleiro basta introduzir \nas coordenadas segundo o referencial apresentado. \nNao e permitido colocar pecas em casas rodeadas de \npecas adversarias. Uma peca rodeada de pecas \nadversarias e capturada.\n'),
	write('\n****************************************************\n\n'),
	write('Prima enter para voltar ao menu inicial.\n'),
 	get_char(_),
 	displayMenuInicial.

/**
* Prints start menu on the terminal
*/
displayMenuInicial:-
	write('\n********************MENU INICIAL********************\n\n'),
	write('(1) Jogar contra utilizador\n'),
	write('(2) Jogar contra bot\n'),
	write('(3) Observar jogo entre bots\n'),
	write('(4) Consultar regras\n'),
	write('(5) Terminar\n'),
	write('\n****************************************************\n\n'),

	waitMenuInicial.

/**
* Prints choose mode menu on the terminal
*/
displayChooseMode:-
	write('\n*********************MODO DE JOGO*********************\n\n'),
	write('Em que modo pretende jogar?\n\n'),
	write('(1) Modo facil\n'),
	write('(2) Modo dificil\n'),
	write('\n******************************************************\n\n'),

	waitPlayMode.

/**
* Prints choose watch mode menu on the terminal
*/
displayChooseWatchMode:-
	write('\n******************MODO DE OBSERVACAO******************\n\n'),
	write('Que modo de jogo prentende obeservar?\n\n'),
	write('(1) Modo facil vs Modo facil\n'),
	write('(2) Modo facil vs Modo dificil\n'),
	write('(3) Modo dificil vs Modo dificil\n'),
	write('\n******************************************************\n\n'),

	waitWatchMode.

/**
* Play against bot easy mode
*/
ifInputWatchMode(Input):-
	Input =:= 1,
	gameBotEasyEasy.
	/*facil vs facil*/

/**
* Play against bot easy mode
*/
ifInputWatchMode(Input):-
	Input =:= 2,
	gameBotEasyHard.
	/*facil vs dificil*/

/**
* Play against bot easy mode
*/
ifInputWatchMode(Input):-
	Input =:= 3,
	gameBotHardHard.
	/*dificil vs dificil*/

/**
* Wait input on choose watch mode menu
*/
waitWatchMode:-
	getInt(In),
	ifInputWatchMode(In).

/**
* Play against bot easy mode
*/
ifInputPlayMode(Input):-
	Input =:= 1,
	gameBotEasy.
	/*jogo facil*/

/**
* Play against bot hard mode
*/
ifInputPlayMode(Input):-
	Input =:= 2,
	gameBotHard.
	/*jogo dificil*/

/**
* Wait input on choose mode menu
*/
waitPlayMode:-
	getInt(In),
	ifInputPlayMode(In).

/**
* Play against other user
*/
ifInputInicial(Input):-
	Input =:= 1,
	game.

/**
* Play against bot (show choose mode menu)
*/
ifInputInicial(Input):-
	Input =:= 2,
	!, displayChooseMode.

/**
* Watch bot (show choose mode menu)
*/
ifInputInicial(Input):-
	Input =:= 3,
	!, displayChooseWatchMode.

/**
* Display rules
*/
ifInputInicial(Input):-
	Input =:= 4,
	!, displayRules.

/**
* Leave
*/
ifInputInicial(Input):-
	Input =:= 5.
	/*sair*/

/**
* Wait input on start menu
*/
waitMenuInicial:-
	getInt(In),
	ifInputInicial(In).

/**
* Print the game over screen to the terminal
*/
displayGameOver:-
	write('\n***********************FIM DE JOGO***********************\n\n'),
 	write('\n Prima enter para voltar ao menu inicial.\n'),
 	get_char(_),
 	displayMenuInicial.
