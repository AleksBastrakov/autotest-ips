let addition = (oper1: number, oper2: number) => oper1 + oper2
let subtraction = (oper1: number, oper2: number) => oper1 - oper2
let multiplication = (oper1: number, oper2: number) => oper1 * oper2
let division = (oper1: number, oper2: number) => oper1 / oper2

function calc(oper1: number, oper2: number, operand: Function)
{
    return operand(oper1, oper2)
}

let oper1 = 10
let oper2 = 2

console.log('Сложение ' + oper1 + ' + ' + oper2 + ' = '+ calc(oper1, oper2, addition))
console.log('Вычитание ' + oper1 + ' - ' + oper2 + ' = '+ calc(oper1, oper2, subtraction))
console.log('Умножение ' + oper1 + ' * ' + oper2 + ' = '+ calc(oper1, oper2, multiplication))
console.log('Деление ' + oper1 + ' / ' + oper2 + ' = '+ calc(oper1, oper2, division))