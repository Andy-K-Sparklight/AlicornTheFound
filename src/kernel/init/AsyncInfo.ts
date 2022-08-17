let env: Record<string, any> = {
  osType: undefined,
  osArch: undefined,
};

export async function initAsyncInfo(): Promise<void> {
  // Get OS Type Info
  const kernelVariant = (await Neutralino.computer.getKernelInfo()).variant;
  switch (kernelVariant) {
    case "Windows NT":
      env.osType = "windows";
      break;
    case "Darwin":
      env.osType = "osx";
      break;
    case "Linux":
      env.osType = "linux";
      break;
    default:
      env.osType = "";
  }

  // Get OS Arch Info
  const arch = (await Neutralino.computer.getCPUInfo()).architecture;
  switch (arch) {
    case "ia32":
      env.osArch = "x86"; // -Xss=1M
      break;
    default:
      env.osArch = ""; // No special requirements
  }
}

export function getOSType(): string {
  return env.osType || "";
}
