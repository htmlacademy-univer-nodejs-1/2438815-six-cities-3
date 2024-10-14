export function generateRandomValue(min:number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[], count = 0):T[] {
  if (count === 0){
    const startPosition = generateRandomValue(0, items.length - 1);
    const endPosition = startPosition + generateRandomValue(startPosition, items.length);
    return items.slice(startPosition, endPosition);
  } else {
    const givenLengthSlice: T[] = [];
    for (let i = 0; i < count; i++) {
      givenLengthSlice.push(items[generateRandomValue(0, items.length - 1)]);
    }
    return givenLengthSlice;
  }
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function getTSVString(items: string[]):string {
  return items.join(';');
}
