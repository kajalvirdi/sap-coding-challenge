import { expect } from "chai";
import { analyzeProcess } from '../src/main';


describe('analyzeProcess', () => {
  it('should correctly analyze and identify top variants', () => {
    const eventLogRows = [
      { ActivityName: 'create purchase request', CaseID: 'case1', Timestamp: '2023-08-01T10:00:00' },
      { ActivityName: 'request approved', CaseID: 'case1', Timestamp: '2023-08-01T11:00:00' },
      { ActivityName: 'create purchase order', CaseID: 'case1', Timestamp: '2023-08-01T12:00:00' },
      { ActivityName: 'select supplier', CaseID: 'case1', Timestamp: '2023-08-01T13:00:00' },
      { ActivityName: 'receive goods', CaseID: 'case1', Timestamp: '2023-08-01T14:00:00' },
      { ActivityName: 'pay invoice', CaseID: 'case1', Timestamp: '2023-08-01T15:00:00' },
    ];

    const expectedOutput = [
      {
        sequence: [
          'create purchase request',
          'request approved',
          'create purchase order',
          'select supplier',
          'receive goods',
          'pay invoice',
        ],
        caseCount: 1,
      }
    ];

    const result = analyzeProcess(eventLogRows);
    expect(result).to.deep.equal(expectedOutput);
  });

  it('should handle multiple cases with the same activity sequence', () => {
    const eventLogRows = [
      { ActivityName: 'create purchase request', CaseID: 'case1', Timestamp: '2023-08-01T10:00:00' },
      { ActivityName: 'request approved', CaseID: 'case1', Timestamp: '2023-08-01T11:00:00' },
      { ActivityName: 'create purchase order', CaseID: 'case1', Timestamp: '2023-08-01T12:00:00' },
      { ActivityName: 'select supplier', CaseID: 'case1', Timestamp: '2023-08-01T13:00:00' },
      { ActivityName: 'receive goods', CaseID: 'case1', Timestamp: '2023-08-01T14:00:00' },
      { ActivityName: 'pay invoice', CaseID: 'case1', Timestamp: '2023-08-01T15:00:00' },
      
      // Duplicate case with the same activity sequence
      { ActivityName: 'create purchase request', CaseID: 'case2', Timestamp: '2023-08-01T16:00:00' },
      { ActivityName: 'request approved', CaseID: 'case2', Timestamp: '2023-08-01T17:00:00' },
      { ActivityName: 'create purchase order', CaseID: 'case2', Timestamp: '2023-08-01T18:00:00' },
      { ActivityName: 'select supplier', CaseID: 'case2', Timestamp: '2023-08-01T19:00:00' },
      { ActivityName: 'receive goods', CaseID: 'case2', Timestamp: '2023-08-01T20:00:00' },
      { ActivityName: 'pay invoice', CaseID: 'case2', Timestamp: '2023-08-01T21:00:00' },
    ];

    const expectedOutput = [
      {
        sequence: [
          'create purchase request',
          'request approved',
          'create purchase order',
          'select supplier',
          'receive goods',
          'pay invoice',
        ],
        caseCount: 2,
      }
    ];

    const result = analyzeProcess(eventLogRows);
    expect(result).to.deep.equal(expectedOutput);
  });

  it('should correctly handle cases with single activities', () => {
    const eventLogRows = [
      { ActivityName: 'create purchase request', CaseID: 'case1', Timestamp: '2023-08-01T10:00:00' },
      { ActivityName: 'request approved', CaseID: 'case2', Timestamp: '2023-08-01T11:00:00' },
      { ActivityName: 'create purchase order', CaseID: 'case3', Timestamp: '2023-08-01T12:00:00' }
    ];

    const expectedOutput = [
      { sequence: ['create purchase request'], caseCount: 1 },
      { sequence: ['request approved'], caseCount: 1 },
      { sequence: ['create purchase order'], caseCount: 1 }
    ];

    const result = analyzeProcess(eventLogRows);
    expect(result).to.deep.equal(expectedOutput);
  });

  it('should handle different activity sequences with the same case count', () => {
    const eventLogRows = [
      { ActivityName: 'create purchase request', CaseID: 'case1', Timestamp: '2023-08-01T10:00:00' },
      { ActivityName: 'request approved', CaseID: 'case1', Timestamp: '2023-08-01T11:00:00' },
      { ActivityName: 'create purchase order', CaseID: 'case1', Timestamp: '2023-08-01T12:00:00' },
      { ActivityName: 'select supplier', CaseID: 'case1', Timestamp: '2023-08-01T13:00:00' },
      { ActivityName: 'receive goods', CaseID: 'case1', Timestamp: '2023-08-01T14:00:00' },
      { ActivityName: 'pay invoice', CaseID: 'case1', Timestamp: '2023-08-01T15:00:00' },
      // Different activity sequence with the same case count
      { ActivityName: 'create purchase request', CaseID: 'case2', Timestamp: '2023-08-01T16:00:00' },
      { ActivityName: 'select supplier', CaseID: 'case2', Timestamp: '2023-08-01T17:00:00' },
      { ActivityName: 'create purchase order', CaseID: 'case2', Timestamp: '2023-08-01T18:00:00' },
      { ActivityName: 'request approved', CaseID: 'case2', Timestamp: '2023-08-01T19:00:00' },
      { ActivityName: 'receive goods', CaseID: 'case2', Timestamp: '2023-08-01T20:00:00' },
      { ActivityName: 'pay invoice', CaseID: 'case2', Timestamp: '2023-08-01T21:00:00' },
    ];

    const expectedOutput = [
      {
        sequence: [
          'create purchase request',
          'request approved',
          'create purchase order',
          'select supplier',
          'receive goods',
          'pay invoice',
        ],
        caseCount: 1,
      },
      {
        sequence: [
          'create purchase request',
          'select supplier',
          'create purchase order',
          'request approved',
          'receive goods',
          'pay invoice',

        ],
        caseCount: 1,
      }
    ];

    const result = analyzeProcess(eventLogRows);
    expect(result).to.deep.equal(expectedOutput);
  });
});

