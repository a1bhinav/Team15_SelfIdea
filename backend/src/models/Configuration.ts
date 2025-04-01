import { Course } from './Course';
import { ConfigFile } from './ConfigFile';

export class Configuration {
  majorName: string;
  genEdRequirements: Course[];
  majorRequirements: Course[];
  creditRequirement: number;

  constructor(config: any) {
    this.majorName = config.majorName;
    this.genEdRequirements = config.genEdRequirements;
    this.majorRequirements = config.majorRequirements;
    this.creditRequirement = config.creditRequirement;
  }

  loadConfig(c: ConfigFile): void {
    const config = c.parse();
    Object.assign(this, config);
  }
}
