import { PRONOUNS } from "./constant.data"


function getRandomNumber(lenght: number): number {
    const symbols: string = '1234567890'
    let generateText: string = ''
    for (let i = 0; i < lenght; i++) {
        let position: number = Math.floor(Math.random() * symbols.length)
        generateText += symbols.substring(position, position + 1)
    }
    return parseInt(generateText)
}

function getRandomPronouns(pronounsValues: string[]): string {
    let position: number = Math.floor(Math.random() * pronounsValues.length)
    return pronounsValues[position]
}

function getRandomText(lenght: number): string {
    const symbols: string = 'AaBbCcDdEeFfGgHhJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'
    let generateText: string = ''
    for (let i = 0; i < lenght; i++) {
        let position: number = Math.floor(Math.random() * symbols.length)
        generateText += symbols.substring(position, position + 1)
    }
    return generateText
}

function getTimeStamp(): number {
    return Date.now()
}

function getUniqueValue(name: string, lenght: number): string {
    return (`${name}-${getTimeStamp()}-${getRandomText(lenght)}`)
}

function swapPronounsValue(currentPronouns: string): string {
    let newPronouns: string
    do {
        newPronouns = getRandomPronouns(PRONOUNS)
    }
    while (newPronouns === currentPronouns)
    return newPronouns
}

export {
    getRandomNumber,
    getRandomPronouns,
    getRandomText,
    getTimeStamp,
    getUniqueValue,
    swapPronounsValue,
}