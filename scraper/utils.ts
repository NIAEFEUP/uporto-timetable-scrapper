export function deleteUntilFirstOccurence(str: string, char: string): string {
  return str.substring(str.indexOf(char) + 1);
}
