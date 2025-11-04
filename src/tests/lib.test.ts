import { describe, expect, test } from '@jest/globals';
import { average, getMin } from './lib';

describe('lib test',() => {
    test('average calcule la moyenne', () => {
        const input1 = [-20, -10, 10, 20];
        const expectedResult = 0;
        expect(average(input1)).toBe(expectedResult);
    });
    test('min nombre', () => {
        const input2 = [5, 3, 9, 1, 4];
        const expectedResult = 1;
        expect(getMin(input2)).toBe(expectedResult);
    });
});

