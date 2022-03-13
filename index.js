const link = document.querySelectorAll('.link')
const gameLink = document.querySelector('.Game')
const scoreLink = document.querySelector('.Score')
const settingsLink = document.querySelector('.Settings')
const gameInner = document.querySelector('.game__inner')
const scoreInner = document.querySelector('.score__inner')
const settingsInner = document.querySelector('.settings__inner')












link.forEach(el=> el.addEventListener('click', function(){
    link.forEach(element => element.classList.remove('by') )
    this.classList.add('by')
}))

link.forEach(el=> el.addEventListener('click', function(){
    if(gameLink.classList.contains('by')){
        gameInner.classList.remove('left')
        scoreInner.classList.add('right')
        settingsInner.classList.add('right')
    }
    if(scoreLink.classList.contains('by')){
        gameInner.classList.add('left')
        scoreInner.classList.remove('right','left')
        settingsInner.classList.add('right')
    }
    if(settingsLink.classList.contains('by')){
        gameInner.classList.add('left')
        scoreInner.classList.add('left')
        settingsInner.classList.remove('right')
    }
}))