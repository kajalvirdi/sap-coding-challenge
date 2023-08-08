import * as fs from "fs";
import { parse } from "csv-parse/sync";

export type EventLogRow = {
  CaseID: string
  ActivityName: string
  Timestamp: string
}

export function parseEventLog(): EventLogRow[] {
  const testFile = "../samples/Activity_Log_2004_to_2014.csv";
  const fileContent = fs.readFileSync(testFile);
  return parse(fileContent, {
    columns: true,
    delimiter: ";",
  });
}
