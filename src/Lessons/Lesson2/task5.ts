class Car {
    private speed: number = 0
    private state: boolean = false

    public turnOn(): void {
        this.state = true
    }

    public turnOff(): void {
        this.state = false
    }

    public getState(): void {
        if (this.state) {
            console.log('State of engine is: ON')
        }
        else {
            console.log('State of engine is: OFF')
        }
    }

    public setSpeed(speed: number): void {
        if (!this.state) {
            console.log('You can not set speed because engine is OFF')
        }
        else if ((speed < 0) || (speed > 100)) {
            console.log(`Speed limit must be in [0..100] Your value is incorrect: ${speed}`)
        }
        else {
            this.speed = speed
        }
    }
}

const myCar: Car = new Car()

myCar.getState()
//myCar.turnOn()
myCar.getState()
myCar.setSpeed(0)
console.log(myCar)