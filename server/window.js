class SlidingWindow {
    constructor(size) {
        this.size = size;
        this.data = [];
    }
    addNumbers(numbers) {
        const uniqueNewNumbers = numbers.filter(n => !this.data.includes(n));
        for (let num of uniqueNewNumbers) {
            if (this.data.length >= this.size) {
                this.data.shift();
            }
            this.data.push(num);
        }
    }
    getWindow() {
        return [...this.data];
    }
    getAverage() {
        if (this.data.length === 0) return 0;
        const sum = this.data.reduce((acc, val) => acc + val, 0);
        return Number((sum / this.data.length).toFixed(2));
    }
}
module.exports = SlidingWindow;
