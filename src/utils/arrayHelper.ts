export function removeObjectFromArrayByProperty<T>(
  array: T[],
  propertyName: keyof T,
  propertyValue: T[keyof T]
): void {
  // find the index of the object with the specified property value
  let index = array.findIndex((obj) => obj[propertyName] === propertyValue);

  // if an object with the specified property value is in the array, remove it
  if (index > -1) {
    array.splice(index, 1);
  }
}
