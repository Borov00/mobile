import { Item } from "../Print"

export class PrintService {
  static getStringAsHex() {
    return 
  }

  static utf8ToHex(string: string)
  {
    return encodeURIComponent(string).replace(/%/g, "");
  }

  static hexToUtf8(string: string)
  {
    return decodeURIComponent(
      string.replace(/\s+/g, '')
        .replace(/[0-9a-f]{2}/g, '%$&')
    );
  }

  static getZplCode(width: number, user: string, positionName: string, company: string): string {
    return `^XA
            ^FO0,30
            ^FB${width},2,10,C,0
            ^ATN,50,50
            ^FH^FD${this.utf8ToHex(user)}^FS
            ^FO0,240
            ^FB${width},2,10,C,0
            ^ASN,10,10
            ^FH^FD${this.utf8ToHex(positionName)}^FS
            ^FO0,420
            ^FB${width},1,10,C,0
            ^AQN,2,2
            ^FH^FD${this.utf8ToHex(company)}^FS
            ^XZ`
  }

  static getPrintItems(items: Item[]) {
    return items.reduce((accum: Item[], item: Item) => {
      const newItem: Item[] = Array.from({ length: item.numberOfRequests }).map(() => item);

      return [...accum, ...newItem];
    }, [])
  }
}