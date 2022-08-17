// Request a mirror to be applied.
// Mirror should auto decide which mirror to give, usually the fastest, but if a URL is broken, then use the second, etc.
export function requestMirror(url: string): string {
  return url;
}

export function tellBadURL(url: string): void {}
