const game = document.querySelector('.game')
const result = document.querySelector('.result')
const newGame = document.querySelector('.newGame')
const ai = 'O', player = 'X'


class Game {
    constructor(size = 3){
        this.size = size
        this.turn = Math.floor(Math.random() * 2)
        this.turnCount = 0

        newGame.addEventListener('click', () =>{
            this.resetGame()
        })

        this.cellList = []
        this.resetGame()
    }

    get limit() {
        return this.size * this.size
    }

    init(){
        for(let i = 1; i < this.limit+1; i++){
            const cell = document.createElement('div')
            cell.setAttribute('data-id', i-1)
            cell.classList.add('cell')
            game.appendChild(cell)
            cell.addEventListener('click', this.humanPlay())
            this.cellList.push(cell)
            setTimeout(function(){
                cell.classList.add('show')
            },`${9-i}00`)
        }
    }

    resetGame(){
        this.board = [...Array(this.limit).keys()]
        result.innerHTML = ''
        game.innerHTML = ''
        this.turnCount = 0
        this.cellList = []
        this.init()
    }

    humanPlay(){
        return e => {
            this.turnCount += 1
            const id = e.target.getAttribute('data-id')
            this.board[+id] = player
            this.cellList[+id].innerHTML = `${player}`
            this.cellList[+id].classList.add('active')
            if(this.turnCount >= this.limit){
                result.innerHTML = `Draw!`
                return
            }
            if(this.checkWinner(this.board,player)){
                result.innerHTML = `You win!`
                return
            }
            const bestMove = this.minimax(this.board, ai)
            console.log(bestMove)
        }
    }

    makeAiTurn() {
        this.turnCount += 1
        const bestMove = this.minimax(this.board, ai)
        this.board[bestMove.idx] = ai
        this.cellList[bestMove.idx].innerHTML = `<span>${ai}</span>`
        if (this.turnCount >= this.limit) {
          result.innerHTML = `Draw!`
          return
        }
        if (this.checkWinner(this.board, ai)) {
          result.innerHTML = `AI win!`
          return
        }
      }

    checkWinner(board, who){
        if( board[0] === who && board[1] === who && board[2] === who ||
            board[3] === who && board[4] === who && board[5] === who ||
            board[6] === who && board[7] === who && board[8] === who ||
            board[0] === who && board[3] === who && board[6] === who ||
            board[1] === who && board[4] === who && board[7] === who ||
            board[2] === who && board[5] === who && board[8] === who ||
            board[0] === who && board[4] === who && board[8] === who ||
            board[2] === who && board[4] === who && board[6] === who ){
            return true
        }
        return false
    }

    minimax(board, who){
        const emptyCells = this.findEmptyCells(board)

        if(this.checkWinner(board, player)){
            return {score: -1}
        }
        if(this.checkWinner(board, ai)){
            return {score: 1}
        }

        if(emptyCells.length === 0){
            return {score: 0}
        }

        let moves = []

        for(let i = 0; i < emptyCells.length; i++){
            let move = {}
            board[emptyCells[i]] = who
            move.index = emptyCells[i]
            if (who === player){
                const res = this.minimax(board, ai)
                move.score = res.score
            }
            if (who === ai){
                const res = this.minimax(board, player)
                move.score = res.score
            }
            board[emptyCells[i]] = move.index
            moves.push(move)
        }

        let bestMove = null

        if (who === ai) {
            let bestScore = -Infinity
            for (let i = 0; i < moves.length; i++) {
              if (moves[i].score > bestScore) {
                bestScore = moves[i].score
                bestMove = i
              }
            }
          } else {
            let bestScore = Infinity
            for (let i = 0; i < moves.length; i++) {
              if (moves[i].score < bestScore) {
                bestScore = moves[i].score
                bestMove = i
              }
            }
          }



        return moves[bestMove]
    }

    findEmptyCells(board){
        return board.filter(c => c !== ai && c !== player)
    }
}

new Game()



