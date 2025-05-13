import { Course } from './Course';
import { ConfigFile } from './ConfigFile';

interface ConfigurationData {
  majorName: string;
  genEdRequirements: Course[];
  majorRequirements: Course[];
  creditRequirement: number;
}

export class Configuration {
  majorName: string;
  genEdRequirements: Course[];
  majorRequirements: Course[];
  creditRequirement: number;

  constructor(config: ConfigurationData) {
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
