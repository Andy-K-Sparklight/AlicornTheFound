export function commitMsg(type: string, content: string): string {
  switch (type) {
    case "ping":
      return "Pong! You said " + content + "!";
    default:
      return "Aak! Wrong magic word!";
  }
}
