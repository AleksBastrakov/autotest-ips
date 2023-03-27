function getRandomText(lenght: number): string {
    const symbols: string = 'AaBbCcDdEeFfGgHhJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'
    let generateText: string = ''
    for (let i = 0; i < lenght; i++) {
        let position: number = Math.floor(Math.random() * symbols.length)
        generateText += symbols.substring(position, position + 1)
    }
    return generateText
}

function getRandomNumber(lenght: number): number {
    const symbols: string = '1234567890'
    let generateText: string = ''
    for (let i = 0; i < lenght; i++) {
        let position: number = Math.floor(Math.random() * symbols.length)
        generateText += symbols.substring(position, position + 1)
    }
    return parseInt(generateText)
}

function getTimeStamp(): number {
    return Date.now()
}

function getUniqueValue(name: string, lenght: number): string {
    return (name + '-' + getTimeStamp() + '-' + getRandomText(lenght))
}

export {
    getRandomNumber,
    getRandomText,
    getTimeStamp,
    getUniqueValue,
}