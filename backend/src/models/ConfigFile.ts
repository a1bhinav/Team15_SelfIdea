export class ConfigFile {
    constructor(
      private filename: string,
      private content: string
    ) {}
  
    parse(): any {
      return JSON.parse(this.content);
    }
  }
  