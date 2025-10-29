//aqui colocamos as funcoes auxiliares oara o codigo principal 

export function getRandomNumberByDate(){
    return new Date().getTime()
    //possivel tbm faer usando Math 
}

export function getRandomEmail(){
    return `qa-tester-${getRandomNumberByDate()}@test.com`
}