function info() {
  console.log('INFO');
  const response = {
    apiversion: '1',
    author: 'jlengstorf',
    color: '#c10b7e',
    head: 'silly',
    tail: 'round-bum',
  };
  return response;
}

function start(gameState) {
  console.log(`${gameState.game.id} START`);
}

function end(gameState) {
  console.log(`${gameState.game.id} END\n`);
}

function move(gameState) {
  let possibleMoves = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  // Step 0: Don't let your Battlesnake move back on it's own neck
  const myHead = gameState.you.head;
  const myNeck = gameState.you.body[1];
  if (myNeck.x < myHead.x) {
    possibleMoves.left = false;
  } else if (myNeck.x > myHead.x) {
    possibleMoves.right = false;
  } else if (myNeck.y < myHead.y) {
    possibleMoves.down = false;
  } else if (myNeck.y > myHead.y) {
    possibleMoves.up = false;
  }

  // TODO: Step 1 - Don't hit walls.
  // Use information in gameState to prevent your Battlesnake from moving beyond the boundaries of the board.
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  console.log({
    boardWidth,
    boardHeight,
    snakeX: myHead.x,
    snakeY: myHead.y,
  });

  if (myHead.y === 0) {
    possibleMoves.down = false;
  }

  if (myHead.x === 0) {
    possibleMoves.left = false;
  }

  if (myHead.y === boardHeight - 1) {
    possibleMoves.up = false;
  }

  if (myHead.x === boardWidth - 1) {
    possibleMoves.right = false;
  }

  // TODO: Step 2 - Don't hit yourself.
  // Use information in gameState to prevent your Battlesnake from colliding with itself.
  const mybody = gameState.you.body;

  mybody.forEach((b) => {
    if (myHead.x === b.x - 1 && myHead.y === b.y) {
      possibleMoves.right = false;
    }
    if (myHead.x === b.x + 1 && myHead.y === b.y) {
      possibleMoves.left = false;
    }
    if (myHead.y === b.y - 1 && myHead.x === b.x) {
      possibleMoves.up = false;
    }
    if (myHead.y === b.y + 1 && myHead.x === b.x) {
      possibleMoves.down = false;
    }
  });

  // TODO: Step 3 - Don't collide with others.
  // Use information in gameState to prevent your Battlesnake from colliding with others.
  const snakes = gameState.board.snakes;
  snakes.forEach((snake) => {
    const snakeBody = snake.body;

    snakeBody.forEach((b) => {
      if (myHead.x === b.x - 1 && myHead.y === b.y) {
        possibleMoves.right = false;
      }
      if (myHead.x === b.x + 1 && myHead.y === b.y) {
        possibleMoves.left = false;
      }
      if (myHead.y === b.y - 1 && myHead.x === b.x) {
        possibleMoves.up = false;
      }
      if (myHead.y === b.y + 1 && myHead.x === b.x) {
        possibleMoves.down = false;
      }
    });
  });

  // TODO: Step 4 - Find food.
  // Use information in gameState to seek out and find food.

  // Avoid food until we need it
  if (Object.values(possibleMoves).filter(Boolean).length > 1) {
    const food = gameState.board.food;

    if (gameState.you.health > 25) {
      food.forEach((f) => {
        if (myHead.x === f.x - 1 && myHead.y === f.y) {
          possibleMoves.right = false;
        }
        if (myHead.x === f.x + 1 && myHead.y === f.y) {
          possibleMoves.left = false;
        }
        if (myHead.y === f.y - 1 && myHead.x === f.x) {
          possibleMoves.up = false;
        }
        if (myHead.y === f.y + 1 && myHead.x === f.x) {
          possibleMoves.down = false;
        }
      });
    } else {
      food.forEach((f) => {
        if (myHead.x === f.x - 1 && myHead.y === f.y) {
          possibleMoves.right = true;
          possibleMoves.left = false;
          possibleMoves.up = false;
          possibleMoves.down = false;
        }
        if (myHead.x === f.x + 1 && myHead.y === f.y) {
          possibleMoves.right = false;
          possibleMoves.left = true;
          possibleMoves.up = false;
          possibleMoves.down = false;
        }
        if (myHead.y === f.y - 1 && myHead.x === f.x) {
          possibleMoves.right = false;
          possibleMoves.left = false;
          possibleMoves.up = true;
          possibleMoves.down = false;
        }
        if (myHead.y === f.y + 1 && myHead.x === f.x) {
          possibleMoves.right = false;
          possibleMoves.left = false;
          possibleMoves.up = false;
          possibleMoves.down = true;
        }
      });
    }
  }

  // Finally, choose a move from the available safe moves.
  // TODO: Step 5 - Select a move to make based on strategy, rather than random.
  console.log({ possibleMoves });
  const safeMoves = Object.keys(possibleMoves).filter(
    (key) => possibleMoves[key],
  );
  const response = {
    move: safeMoves[Math.floor(Math.random() * safeMoves.length)],
  };

  console.log(`${gameState.game.id} MOVE ${gameState.turn}: ${response.move}`);
  return response;
}

module.exports = {
  info: info,
  start: start,
  move: move,
  end: end,
};
