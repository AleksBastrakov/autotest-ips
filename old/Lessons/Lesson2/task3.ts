type cats = {
    name: string,
    age: number,
    color?: string,
    breed?: string,
    weight?: number,
}

let myCat: cats = {name: 'Barsick', age: 10}
let friendCat: cats = {name: 'Jack', age: 8, color: 'black'}

console.log(myCat.name, myCat.age)
console.log(friendCat)