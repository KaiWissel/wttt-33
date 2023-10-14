export function addFilterOptionsToRequest(
  query: string,
  filterOptions: Object | undefined
) {
  for (const key in filterOptions) {
    // @ts-ignore
    const element = filterOptions[key];
    if (!element) continue;
    query += `&${key}=${element}`;
  }
  return query;
}
