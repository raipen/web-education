Array.prototype.mapSync = async function (fn) {
    const result = [];
    for(let i = 0; i < this.length; i++) {
        result.push(await fn(this[i]));
    }
    return result;
}

String.prototype.lengthOfBytes = function () {
    return this.split('')
    .map((e) => e.charCodeAt(0))
    .map((e) => e > 255 ? 2 : 1)
    .reduce((a, b) => a + b);
}

String.prototype.padStart = function (length, padString) {
    let result = this;
    while(result.lengthOfBytes() < length) {
        result = padString + result;
    }
    return result;
}

String.prototype.padEnd = function (length, padString) {
    let result = this;
    while(result.lengthOfBytes() < length) {
        result += padString;
    }
    return result;
}