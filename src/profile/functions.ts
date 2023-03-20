function textGenerator(lenght: number):string {
    const symbols: string = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789'
    let generateText = ''
    for (let i:number = 0; i < lenght; i++) {
        let position = Math.floor(Math.random() * symbols.length);
        generateText += symbols.substring(position, position + 1);
    }
    return generateText;
}

export {
    textGenerator,
}