export class Randomizer {
    
    static generateInteger(minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
    }

}