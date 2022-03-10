const game = document.querySelector('.game')
const result = document.querySelector('.result')
const newGame = document.querySelector('.newGame')
const AI = 'X', player = 'O'


class Game {
    constructor(size = 3){
        this.size = size
        this.turn = Math.floor(Math.random() * 2)
        this.turnCount = 0
        newGame.addEventListener('click', () =>{
            this.resetGame()   
        })
        this.ceilList = []
        this.resetGame()        
    }

    get limit() {
        return this.size * this.size
    }

    init(){        
        for(let i = 1; i < this.limit+1; i++){                                  
            const ceil = document.createElement('div')
            ceil.setAttribute('data-id', i-1)
            ceil.classList.add('ceil')                      
            game.append(ceil)           
            ceil.addEventListener('click', this.humanPlay)    
            this.ceilList.push(ceil)                                 
            setTimeout(function(){
                ceil.classList.add('show')
            },`${9-i}00`)          
        }       
    }

    resetGame(){
        this.board = [...Array(this.limit).keys()]
        this.ceilList = []
        this.turnCount = 0
        result.innerHTML = ''
        game.innerHTML = ''
        this.init()
    }

    humanPlay(){
        return (e) => {
            this.turnCount++
            const id = e.target.getAttribute('data-id')
            this.board[+id] = player
            this.ceilList[+id].innerHTML = `${player}`
            if(this.turnCount === this.limit){
                result.innerHTML = `Draw!`
                return
            }
            if(this.checkWinner(this.board,player)){
                result.innerHTML = `You win!`
                return
            }
        }
    }

    checkWinner(board,who){
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
}

new Game()


 