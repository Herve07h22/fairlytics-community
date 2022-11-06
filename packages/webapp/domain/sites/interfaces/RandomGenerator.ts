export interface RandomGenerator {
  makeRandomString: (size?: number) => Promise<string>;
}
