export function objectValues<T extends Record<string, unknown>>(object: T) {
  return Object.keys(object) as T[keyof T][];
}

export function objectKeys<T extends Record<string, unknown>>(object: T) {
  return Object.keys(object) as (keyof T)[];
}

export function objectEntries<T extends Record<string, unknown>>(object: T) {
  return Object.entries(object) as [(keyof T), T[keyof T]][]
}
