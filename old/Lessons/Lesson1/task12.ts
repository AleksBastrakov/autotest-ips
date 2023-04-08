function isEven(x: number): boolean {
    return x % 2 === 0
}

function printEvenAndOdd(value: number) {
    let evenArray: number[] = []
    let oddArray: number[] = []
    for (let index = 0; index <= value; index++) {
        if (isEven(index))
            evenArray.push(index)
        else
            oddArray.push(index)
    }
    console.log('Четные числа: ' + evenArray.join())
    console.log('Нечетные числа: ' + oddArray.join())
}

printEvenAndOdd(100)