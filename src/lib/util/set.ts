export function symmetricDifference(arr1: any[], arr2: any[]) {
  return arr1.filter((item) => !arr2.includes(item))
      .concat(arr2.filter((item) => !arr1.includes(item)));
}

export function union<T>(arr1: T[], arr2: T[]): T[] {
  return Array.from(new Set([...arr1, ...arr2]));
}
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.some(otherItem => item === otherItem));
}
