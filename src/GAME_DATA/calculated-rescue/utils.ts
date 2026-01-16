export function format<T extends Record<string, string | number>>(
  template: string,
  values: T,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(values, key) ? values[key].toString() : match,
  );
}
