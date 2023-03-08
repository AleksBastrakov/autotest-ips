const myPromise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('resolve'), 1000)
    setTimeout(() => reject('reject'), 200)
    
})

async function print(): Promise <void> {
    try {
        console.log('Fulfilled: ', await myPromise2)
    }
    catch (err) {
        console.log('Rejected: Error! ', err)
    }
    
}

print()

