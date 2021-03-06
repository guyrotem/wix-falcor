var q = require('q');

var domainsData = [
  {
    domainName: 'moses.co.il',
    domainGuid: 'd1',
    redirectDomain: null
  },
  {
    domainName: 'moses-station.co.il',
    domainGuid: 'd2',
    redirectDomain: null
  },
  {
    domainName: 'moses-new-york.com',
    domainGuid: 'd3',
    redirectDomain: 'moses.co.il'
  }
];

module.exports = function () {
  var deferred = q.defer();
  deferred.resolve(domainsData);
  return deferred.promise;
}