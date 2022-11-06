import { Result } from "domain/helpers/Result";

export class DatabaseError implements Result<never> {
  public error = "Database error";
}
