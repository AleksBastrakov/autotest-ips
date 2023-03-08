class Car {
    private manufacturer: string
    private model: string
    private engine: number
    private color: string
    private fuelSystem: string
    private speed: number = 0
    private state: boolean = false

    constructor(manufacturer: string, model: string, engine: number, color: string, fuelSystem: string) {
        this.manufacturer = manufacturer
        this.model = model
        this.engine = engine
        this.color = color
        this.fuelSystem = fuelSystem
    }

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
            console.log('Speed limit must be in [0..100] Your value is incorrect: ' + speed)
        }
        else {
            this.speed = speed
        }
    }
}

let myCar = new Car('Mazda', '3', 1.6, 'red', 'petrol')

myCar.getState()
myCar.turnOn()
myCar.getState()
myCar.setSpeed(50)
console.log(myCar)