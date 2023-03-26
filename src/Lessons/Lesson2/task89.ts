{
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('resolve'), 1000)
        setTimeout(() => reject('reject'), 100)

    })

    async function print(): Promise<void> {
        try {
            console.log('Fulfilled: ', await myPromise)
        }
        catch (error) {
            console.log('Rejected: Error! ', error)
        }
    }
    print()
}