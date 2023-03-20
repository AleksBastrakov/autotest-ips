function getRandomString(lenght: number): string {
    const symbols: string = 'abcdefghjklmnoprstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ123456789'
    let generateText: string = ''
    for (let i = 0; i < lenght; i++) {
        let position: number = Math.floor(Math.random() * symbols.length)
        generateText += symbols.substring(position, position + 1)
    }
    return generateText
}

export {
    getRandomString,
}
