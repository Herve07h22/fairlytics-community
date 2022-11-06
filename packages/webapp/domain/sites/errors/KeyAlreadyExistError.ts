import { Result } from "../../helpers/Result";

export class KeyAlreadyExistsError implements Result<never> {
  public error = "The key is already registered";
}
