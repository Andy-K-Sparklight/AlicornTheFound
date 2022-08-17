import { Config } from "../var/Config";
import { requestMirror, tellBadURL } from "./Mirror";

export interface DownloadMeta {
  url: string; // Mandatory
  path?: string; // If empty, means download to tmpdir
  hash?: string; // If empty, no hash verification will be performed
}

export enum DownloadResult {
  SUCC, // OK
  TEMP, // Only a temporary failure, just retry might be OK
  BAD, // Do not retry
}

// Also includes mirror apply
export async function requestDownload(meta: DownloadMeta): Promise<boolean> {
  let tries = 0;
  const MAX_TRIES = Config.Download.Tries;
  while (tries < MAX_TRIES) {
    meta.url = requestMirror(meta.url);
    const result = await tryDownloadOnce(meta);
    switch (result) {
      case DownloadResult.SUCC:
        return true;
      case DownloadResult.BAD:
        tellBadURL(meta.url);
        break;
      case DownloadResult.TEMP:
      default:
        continue; // Again
    }
  }
  return false;
}

async function tryDownloadOnce(meta: DownloadMeta): Promise<DownloadResult> {
  return DownloadResult.SUCC;
}
