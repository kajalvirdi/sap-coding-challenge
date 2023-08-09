import { performance } from "perf_hooks";
import { EventLogRow, parseEventLog } from "./event-log-parser";

const eventLogRows: EventLogRow[] = parseEventLog();

// Sort the data by timestamp
eventLogRows.sort((a, b) => a.Timestamp.localeCompare(b.Timestamp));

const startTime = performance.now()

// call your implementation here

interface Variant {
  sequence: string[];
  caseCount: number;
}

// function to analze process to extracts the top variants 
export function analyzeProcess(data: EventLogRow[]): Variant[] {
  const cases: Map<string, string[]> = new Map();

  // Group activities by case ID and order
  data.forEach((entry) => {
    if (!cases.has(entry.CaseID)) {
      cases.set(entry.CaseID, []);
    }
    cases.get(entry.CaseID)!.push(entry.ActivityName);
  });

  // Count occurrences of each sequence
  const variantCounts: Map<string, number> = new Map();
  cases.forEach((sequence) => {
    const variantKey = sequence.join('->');
    variantCounts.set(variantKey, (variantCounts.get(variantKey) || 0) + 1);
  });

  // Sort and select top variants
  const sortedVariants: Variant[] = Array.from(variantCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([sequence, caseCount]) => ({
      sequence: sequence.split('->'),
      caseCount,
    }));

  return sortedVariants;
}

// Analyze process and get top variants
const topVariants: Variant[] = analyzeProcess(eventLogRows);

// Prepare JSON output
const output = {
  topVariants,
};

console.log(JSON.stringify(output, null, 2));


const endTime = performance.now()
console.log(`Duration: ${endTime - startTime} milliseconds`)
