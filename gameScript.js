var board
var movect = 0
var currSide

function initializeGame(){
  movect = 0
  board = {
  0: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
  1: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
  2: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
  3: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
  4: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
  5: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
  data: {
    pos: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    },
    new: {
      0: -1,
      1: -1,
    }
  },
}
  currSide = 1
  drawBoard()
}

function victory(team){
  var vt
  if(team == 1){ vt = "Player A" } else if(team == -1){ vt = "Player B" }
  document.getElementById('goc').className = ""
  alert('Victory for player ' + vt + "! Press OK to play again.")
  initializeGame()
  setTimeout(() => {document.getElementById('goc').className = "hidden"; setTimeout(() => { document.getElementById('goc').className = "hidden i"}, 2000)}, 750)
}

function drawBoard(){
  document.getElementById('x').innerHTML = ""
  let ids = document.createElement('div')
  ids.setAttribute('class', 'row')

  for(f = 0; f < 7; f++){
    let id = document.createElement('div')
    id.setAttribute('class', 'col inf')
    id.innerHTML = f+1
    ids.appendChild(id)
  }

  document.getElementById('x').appendChild(ids)
  for(i = 6; i > 0; i--){
    let dAdd = document.createElement('div')

    dAdd.setAttribute('class', 'row')

    let v = i;
    for(r = 0; r < 7; r++){
      let d2 = document.createElement('div')
      d2.setAttribute('class', 'col')
      d2.setAttribute('onclick', ('playToken(' + currSide + ', ' + r + ')'))

      d2.innerHTML = board[v-1][r]
      if ( d2.innerHTML == "-1" ){
        d2.innerHTML = "B"
      } else if ( d2.innerHTML == '1'){
        d2.innerHTML = "A"
      }

      if (board[v-1][r] == -1){
        d2.setAttribute('class', 'col team a')
      } else if ( board[v-1][r] == 1 ){
        d2.setAttribute('class', 'col team b')
      } else {
        d2.setAttribute('class', 'col team n')
      }

      if( r == board.data.new[0] && v == board.data.new[1] ){ d2.setAttribute('id', 'new')}

      if( d2.innerHTML == "0"){ d2.innerHTML = "&nbsp" }

      dAdd.appendChild(d2)
    }



    document.getElementById('x').appendChild(dAdd)
  }
  if (movect >= 42){ alert('No Winner! Press OK to play again.'); initializeGame() }
}

function playToken(side, col){
  movect++
  let c = board.data.pos[col];
  if(c < 6){
    board[c][col] = side
    board.data.pos[col]++

    board.data.new[0] = col;
    board.data.new[1] = board.data.pos[col]

    if ( currSide == 1 ){
      currSide = -1
    } else if ( currSide == -1) {
      currSide = 1
    }

    drawBoard()
  } else {
    alert('Invalid Play, try again!')
  }
  checkVictory()
}

function checkVictory(){
  for(i = 6; i > 0; i--){
    let v = i
    for(r = 0; r < 7; r++){
      if (board[v-1][r] != 0){
        //horizontal
        if(board[v-1][r] == board[v-1][r+1] && board[v-1][r] == board[v-1][r+2] && board[v-1][r] == board[v-1][r+3]){ victory(board[v-1][r] ) }
        //vertical
        else if(board[v-2] && board[v-3] && board[v-4] && board[v-1][r] == board[v-2][r] && board[v-1][r] == board[v-3][r] && board[v-1][r] == board[v-4][r]){ victory(board[v-1][r]) }

        //diagonal
        //left
        else if(board[v-2] && board[v-3] && board[v-4] && board[v-1][r] == board[v-2][r+1] && board[v-1][r] == board[v-3][r+2] && board[v-1][r] == board[v-4][r+3]){ victory(board[v-1][r]) }
        //right
        else if(board[v-2] && board[v-3] && board[v-4] && board[v-1][r] == board[v-2][r-1] && board[v-1][r] == board[v-3][r-2] && board[v-1][r] == board[v-4][r-3]){ victory(board[v-1][r]) }
      }
    }
  }
}

initializeGame()

document.body.addEventListener('keyup', (key) => {
  if(key.keyCode >= 49 && key.keyCode <= 55){
    let x = prompt('Play this move? (y to confirm, any other response to cancel)', 'y')
    if(x == 'y'){
      playToken(currSide, (key.key - 1))
    }
  }
}, false)
