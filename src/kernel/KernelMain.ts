import { initAsyncInfo } from "./init/AsyncInfo";

export async function kernelMain(): Promise<void> {
  initAsyncInfo();
}
