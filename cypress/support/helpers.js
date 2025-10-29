//aqui colocamos as funcoes auxiliares oara o codigo principal 
import { faker } from '@faker-js/faker'
export function getRandomNumber(){
    //return new Date().getTime()
    //possivel tbm faer usando Math 
    return faker.number.bigInt()
}

export function getRandomEmail(){
    return `qa-tester-${getRandomNumberByDate()}@test.com`
}