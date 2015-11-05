/// <reference path="../../../reference.ts" />
'use strict';

class Async {
  /* @ngInject */
  constructor() {
    //
  }

  filter(promise: ng.IPromise<any>, defaultValue?: any): any {
    if (promise.$$state.status === 0) {
      return angular.isDefined(defaultValue) ? defaultValue : '';
    } else if (promise.$$state.status === 1) {
      return promise.$$state.value;
    }
  }
}

angular
  .module('falcorDemoAppInternal')
  .filter('async', $injector => {
    let async = $injector.instantiate(Async);
    return async.filter.bind(async);
  });
