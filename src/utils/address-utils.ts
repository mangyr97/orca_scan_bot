export function extractEthAddress(text: string): string | undefined {
    const pattern = /0x[a-fA-F0-9]{40}/;
    const match = text.match(pattern);
    if (match) {
      return match[0];
    } else {
      return undefined;
    }
}