
function getRandomNumber(): number {
    const max = 40;
    const min = 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isPrime(number: number): boolean {
    for (let i = 2; i < number; i++)
        if (number % i === 0) return false;
    return number > 1;
}

export {
    getRandomNumber,
    isPrime
};