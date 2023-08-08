import { performance } from "perf_hooks";
import { EventLogRow, parseEventLog } from "./event-log-parser";


const eventLogRows: EventLogRow[] = parseEventLog();
const startTime = performance.now()

// call your implementation here

const endTime = performance.now()
console.log(`Duration: ${endTime - startTime} milliseconds`)
