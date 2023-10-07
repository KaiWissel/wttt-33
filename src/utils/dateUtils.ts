export function retrieveLocaleTime(date: Date | string) {
  // This transfers also UTC to local time
  return ensureDateObject(date).toLocaleTimeString("de-DE").substring(0, 5);
}

export function retrieveLocaleDate(date: Date | string) {
  return ensureDateObject(date).toISOString().substring(0, 10);
}

function ensureDateObject(date: Date | string) {
  return new Date(date);
}
