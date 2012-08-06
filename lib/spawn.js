var Spawn = Block.extend(function(board, opts) {
  Spawn.base.call(this, board, opts);
  this.board = board;
  this.clip = false;
});