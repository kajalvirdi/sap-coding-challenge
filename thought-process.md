# Thought Process

_Please add your thought process here as described in the [Readme file](README.md)._

#### Understanding the Problem: 
The first step is to understand the problem statement thoroughly. We have a dataset representing the procure-to-pay process with three columns: activity name, case id, and timestamp. The goal is to aggregate cases with the same event execution order and list the top 10 variants by case count.

#### Data Preparation: 
I noticed that the sample data is not sorted by timestamp. To ensure correct order, I then sorted the data by timestamp. 

#### Grouping and Aggregation:
To identify variants, I used a Map to group cases by their event execution order. I created a variant key by concatenating activities for each case and used this key to track the case count for each variant.

#### Selecting Top Variants: 
After creating the map of variants and case counts, I converted it into an array and sorted it based on case count in descending order. I then selected the top 10 variants.

 #### Output Format: 
 To meet the requirement of well under 50 milliseconds, I focused on optimizing the core processing logic. I prepared the output in a JSON format that includes the variant (sequence of activities) and the case count for each variant.

#### Testing and Verification: 
To test correctness, I would compare the generated JSON output with the expected output for the provided sample data.

#### Scope and Future Improvements:
While the core requirements were addressed, I also considered aspects that were put out of scope, such as error handling for invalid data and larger-scale performance optimizations. For the future, potential improvements could include better error handling, additional testing, and interactive components for user input.


## Data
Which properties of the data did you check for? Which assumptions did you make? Which edge cases are worth considering?

I checked for the properties of each row in the CSV: activity, caseId, and timestamp.

Assumptions: I assumed that the provided CSV data is correctly formatted and that each row contains valid data.

Edge cases: Duplicates in activities for the same case were handled by grouping and counting them together.
    
    
## Performance
Which performance considerations did you make?

To achieve sub-50 millisecond results, I focused on optimizing the data processing logic.

While the file reading time is not counted, the main processing logic is optimized for performance.

Also for sorting i have used the "localeCompare" function, this approach aims to optimize memory allocation and use a stable sorting algorithm. 

## Scope
Which aspects did you consider but put out of scope? What could be potential improvements or extensions in the future?

I considered the core requirements: processing data, aggregating cases, and generating the top 10 variants. the reading data and parsing from samples was already given.

Out of scope: Error handling for invalid data, extensive testing, and user interactions.

Future improvements: Error handling, better optimization for larger datasets, and interactive components for user input.
    
    

## Correctness
How do you test your solution for correctness? What are potential improvements from your point of view?

To test correctness, I would compare the generated JSON output with the expected output for the provided sample data.

Potential improvements: Additional testing with different datasets and edge cases, more structured error handling, and optimizations for larger datasets.


------------------------------------OUTPUT-------------------------------------------

#### npm run main
```
{
  "topVariants": [
    {
      "sequence": [
        "Create FI invoice by vendor",
        "Post invoice in FI",
        "Clear open item"
      ],
      "caseCount": 3201
    },
    {
      "sequence": [
        "Create MM invoice by vendor",
        "Create purchase order item",
        "Enter goods receipt",
        "Post invoice in MM",
        "Clear open item"
      ],
      "caseCount": 402
    },
    {
      "sequence": [
        "Create MM invoice by vendor",
        "Post invoice in MM",
        "Clear open item"
      ],
      "caseCount": 309
    },
    {
      "sequence": [
        "Create purchase order item",
        "Change purchase order item",
        "Record order confirmation",
        "Change purchase order item",
        "Create MM invoice by vendor",
        "Enter goods receipt",
        "Post invoice in MM",
        "Clear open item"
      ],
      "caseCount": 249
    },
    {
      "sequence": [
        "Create purchase order item",
        "Change purchase order item",
        "Change purchase order item",
        "Record order confirmation",
        "Create MM invoice by vendor",
        "Enter goods receipt",
        "Post invoice in MM",
        "Clear open item"
      ],
      "caseCount": 227
    },
    {
      "sequence": [
        "Create purchase order item",
        "Record order confirmation",
        "Change purchase order item",
        "Change purchase order item",
        "Create MM invoice by vendor",
        "Enter goods receipt",
        "Post invoice in MM",
        "Clear open item"
      ],
      "caseCount": 221
    },
    {
      "sequence": [
        "Create purchase order item",
        "Create MM invoice by vendor",
        "Enter goods receipt",
        "Post invoice in MM",
        "Clear open item"
      ],
      "caseCount": 73
    },
    {
      "sequence": [
        "Create purchase order item",
        "Change purchase order item",
        "Record order confirmation",
        "Change purchase order item",
        "Enter goods receipt",
        "Create MM invoice by vendor",
        "Post invoice in MM",
        "Clear open item"
      ],
      "caseCount": 59
    },
    {
      "sequence": [
        "Create purchase order item",
        "Change purchase order item",
        "Change purchase order item",
        "Record order confirmation",
        "Enter goods receipt",
        "Create MM invoice by vendor",
        "Post invoice in MM",
        "Clear open item"
      ],
      "caseCount": 54
    },
    {
      "sequence": [
        "Create purchase order item",
        "Record order confirmation",
        "Change purchase order item",
        "Change purchase order item",
        "Enter goods receipt",
        "Create MM invoice by vendor",
        "Post invoice in MM",
        "Clear open item"
      ],
      "caseCount": 53
    }
  ]
}
Duration: 56.239000000059605 milliseconds

```
----------------------------------------------------------------------

#### npm run test

```
  analyzeProcess
    ✔ should correctly analyze and identify top variants
    ✔ should handle multiple cases with the same activity sequence
    ✔ should correctly handle cases with single activities
    ✔ should handle different activity sequences with the same case count


  4 passing (13ms)

```
-------------------------------------------------------------------------------------

