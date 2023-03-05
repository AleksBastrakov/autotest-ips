let str = (n: number):string => {
    return n < 18 ? 'Страница не доступна' : 'Страница доступна'
}

let n: number = 18
console.log(str(n))