export class FramesPerSecond {

    constructor() {
        this.entries = new Array()
        this.lastTimestamp = performance.now()
    }

    countFrame(timestamp) {
        const timeDifference = timestamp - this.lastTimestamp
        if (timeDifference > 0) {
            this.entries.push({
                timestamp: timestamp,
                estimatedFramesPerSecond: 1000 / timeDifference
            })
        }
        this.lastTimestamp = timestamp
        this.entries = this.entries.filter(count => timestamp - count.timestamp < 1000)
    }

    get average() {
        let average = 0
        this.entries.forEach(entry => average += entry.estimatedFramesPerSecond)
        average = Math.round(average / this.entries.length)
        return average
    }

}
