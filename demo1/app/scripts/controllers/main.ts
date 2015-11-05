/// <reference path="../../../reference.ts" />
'use strict';

declare var falcor;

class MainController {

  private model: any;
  private lastQuery: string;
  private lastPromise: ng.IPromise<string>;

  public query: string;

  /* @ngInject */
  constructor(private $q: ng.IQService, private $rootScope: ng.IRootScopeService,
  private wixFalcorUtils: WixFalcorUtils) {
    this.query = '';
    this.model = new falcor.Model({source: new falcor.HttpDataSource('/_api/model.json') });
  }

  public traverseVirtualJson(query: string): ng.IPromise<string> {
    if (query !== this.lastQuery) {
      let deferred = this.$q.defer<string>();

      this.lastQuery = query;

      try {
        this.model.get(query)
          .subscribe((value: any) => {
            deferred.resolve(this.wixFalcorUtils.parseResult(value));
            if (!this.$rootScope.$$phase) {
              this.$rootScope.$apply();
            }
          });
      } catch (e) {
        this.lastPromise = deferred.promise;
      }
      this.lastPromise = deferred.promise;
    }
    return this.lastPromise;
  }

  public getFalcorModelValue(): ng.IPromise<string> {

    let query = this.query;

    if (query !== this.lastQuery) {
      let deferred = this.$q.defer<string>();

      this.lastQuery = query;

      try {
        this.model.get(query)
          .subscribe((value: any) => {
            deferred.resolve(this.wixFalcorUtils.parseResult(value));
            if (!this.$rootScope.$$phase) {
              this.$rootScope.$apply();
            }
          });
      } catch (e) {
        this.lastPromise = deferred.promise;
      }
      this.lastPromise = deferred.promise;
    }
    return this.lastPromise;
  }
}

angular
  .module('falcorDemoAppInternal')
  .controller('MainController', MainController);
