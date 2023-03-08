const myPromise = new Promise((resolve) => {
    setTimeout(() => resolve('resolve'), 1000);
})

async function print(): Promise <void> {
    console.log('Fulfilled: ', await myPromise)
}

print()

