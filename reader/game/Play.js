/**
 * A class that represents a play
 *
 * @param player Player that made this play (player1 or player2)
 * @param pieceId Id of the played piece
 * @param game Game object
 */
function Play(player, pieceId, game) {

  this.player = player;

  if (this.player === "player1") {
    // get white piece
    this.piece = game.getPieceWhite(pieceId);
  }
  else if (this.player === "player2") {
    // get black piece
    this.piece = game.getPieceBlack(pieceId);
  }

}
