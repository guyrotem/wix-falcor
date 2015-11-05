/// <reference path="../../../reference.ts" />
'use strict';

class WixFalcorUtils {

  /* @ngInject */
  constructor() {
    //
  }

  public parseResult(result: any): any {
    return this.parseRecursive(result.json);
  }

  private parseRecursive(currentItem: any): any {
    if (typeof currentItem === 'object' && currentItem[0]) {
      let array = [], index = 0;
      while (index in currentItem) {
        array.push(this.parseRecursive(currentItem[index++]));
      }

      return array;
    } else if (typeof currentItem === 'string') {
      return currentItem;
    } else {
      return _.transform(currentItem, (acc: any, value: any, key: string) => {
        acc[key] = this.parseRecursive(value);
        return acc;
      });
    }
  }
}

angular
  .module('falcorDemoAppInternal')
  .service('wixFalcorUtils', WixFalcorUtils);
