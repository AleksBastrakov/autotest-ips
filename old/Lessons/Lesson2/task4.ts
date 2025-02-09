type Student = {
    name: string,
    age: number,
}

function printStudentInfo(person: Student): void {
    console.log('Имя: ' + person.name + ', Возраст: ' + person.age)
}

let studentGroup: Student[] = []

studentGroup.push({ 
    name: 'Denis', 
    age: 19,
})
studentGroup.push({ 
    name: 'Max',
    age: 20,
})
studentGroup.push({ 
    name: 'Jennifer',
    age: 18,
})
studentGroup.push({ 
    name: 'Zohan',
    age: 19,
})

studentGroup.forEach((person: Student) => {
    printStudentInfo(person)
})