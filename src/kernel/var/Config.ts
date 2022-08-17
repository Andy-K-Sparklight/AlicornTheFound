const CONFIG_KEY = "AFConfig";

// User cofigurations in AF are stored in DIFF mode, only changes will be stored.
// As AF won't receive much updates, we don't need config cleanup.
export const Config = {
  Dev: {
    DevMode: false,
  },
  Download: {
    Tries: 3,
  },
};

let Diff = {};

export async function loadConfig(): Promise<void> {
  const content = await Neutralino.storage.getData(CONFIG_KEY);
  if (content) {
    Diff = JSON.parse(content);
    Object.assign(Config, Diff);
  }
}

export function saveConfig(): Promise<void> {
  return Neutralino.storage.setData(CONFIG_KEY, JSON.stringify(Diff));
}

export function setDiff(k: string, data: any): void {
  const keys = k.split(".");
  const finalKey = keys.pop() || "";
  let cur: any = Diff;
  for (const mk of keys) {
    if (cur[mk] === undefined) {
      cur[mk] = {};
    }
    cur = cur[mk];
  }
  cur[finalKey] = data;
}
