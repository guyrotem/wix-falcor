/// <reference path="../../../reference.ts" />
'use strict';

describe('Service: wixFalcorUtils', () => {
  let wixFalcorUtils: WixFalcorUtils;

  beforeEach(() => {
    module('falcorDemoAppInternal');
  });

  beforeEach(inject((_wixFalcorUtils_: WixFalcorUtils) => {
    wixFalcorUtils = _wixFalcorUtils_;
  }));

  it('should remove json cover', () => {
    let result = {
      json: 'abc'
    };

    expect(wixFalcorUtils.parseResult(result)).toBe('abc');
  });

  it('should convert array-like data to an array', () => {
    let result = {
      json: {
        0: 'a',
        1: 'b',
        2: 'c'
      }
    };

    expect(wixFalcorUtils.parseResult(result)).toEqual(['a', 'b', 'c']);
  });

  it('should convert recursively', () => {
    let result = {
      json: {
        data1: {
          0: 'a',
          1: 'b'
        },
        data2: {
          0: 'd',
          1: 'e'
        }
      }
    };

    let parsedResult = {
      data1: ['a', 'b'],
      data2: ['d', 'e']
    };

    let transformed = wixFalcorUtils.parseResult(result);

    expect(transformed).toEqual(parsedResult);
    expect(Array.isArray(transformed.data1)).toBe(true);
  });

  it('should convert arrays recursively', () => {
    let result = {
      json: {
        0: {
          0: 'a',
          1: 'b'
        },
        1: {
          0: 'd',
          1: 'e'
        }
      }
    };

    let parsedResult = [
      ['a', 'b'],
      ['d', 'e']
    ];

    let transformed = wixFalcorUtils.parseResult(result);

    expect(transformed).toEqual(parsedResult);

    expect(Array.isArray(transformed[0])).toBe(true);
    expect(Array.isArray(transformed[1])).toBe(true);
  });

});
