let addition = (op1: number, op2: number): number => op1 + op2
let subtraction = (op1: number, op2: number): number => op1 - op2
let multiplication = (op1: number, op2: number): number => op1 * op2
let division = (op1: number, op2: number): number => op1 / op2

function calc(num1: number, num2: number, operand: Function) {
    return operand(num1, num2)
}

let num1 = 10
let num2 = 4

console.log('Сложение ' + num1 + ' + ' + num2 + ' = ' + calc(num1, num2, addition))
console.log('Вычитание ' + num1 + ' - ' + num2 + ' = ' + calc(num1, num2, subtraction))
console.log('Умножение ' + num1 + ' * ' + num2 + ' = ' + calc(num1, num2, multiplication))
console.log('Деление ' + num1 + ' / ' + num2 + ' = ' + calc(num1, num2, division))