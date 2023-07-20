export function separateIntoParts(content) {
    const parts = content.split('&').map(part => part.trim());
    return parts;
  }