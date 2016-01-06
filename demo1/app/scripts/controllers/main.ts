/// <reference path="../../../reference.ts" />
'use strict';

declare var falcor;

class MainController {

  private model: any;

  public query: string;
  public result: any;

  /* @ngInject */
  constructor(private $q: ng.IQService, private $timeout,
              private wixFalcorUtils: WixFalcorUtils) {

    this.query = '';
    this.model = new falcor.Model({source: new falcor.HttpDataSource('/_api/model.json') });

  }

  fetch() {
    // 'userSites[0..3].connectedDomains[0..2].mailboxInfo.userAccounts[0..1].userName'
    this.model.get.apply(this.model, this.query.split(';'))
      .subscribe((value: any) => {
        this.$timeout(() => {
          this.result = JSON.stringify(value, null , '  ');
        });
      });
  }

  watchInput(e) {
    if (e.keyCode === 13) {
      this.fetch();
    }
  }
}

angular
  .module('falcorDemoAppInternal')
  .controller('MainController', MainController);
