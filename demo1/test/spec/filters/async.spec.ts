/// <reference path="../../../reference.ts" />
'use strict';

describe('Filter: async', () => {
  let async: Function;
  let $q: ng.IQService;

  beforeEach(() => {
    module('falcorDemoAppInternal');
  });

  beforeEach(inject(($filter: ng.IFilterService, _$q_: ng.IQService) => {
    async = $filter('async');
    $q = _$q_;
  }));

  it('should return "" while promise is not resolved', () => {
    let deferred: ng.IDeferred<string> = $q.defer<string>();
    expect(async(deferred.promise)).toBe('');
  });

  it('should return the resolved data after promise is resolved', () => {
    let deferred: ng.IDeferred<number> = $q.defer<number>();
    deferred.resolve(123);
    expect(async(deferred.promise)).toBe(123);
  });

});
