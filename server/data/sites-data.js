var q = require('q');

var metaSiteData = [
  {
    metasiteId: 's0',
    siteName: 'name1',
    connectedDomain: 'moses.co.il'
  },
  {
    metasiteId: 's1',
    siteName: 'name2',
    connectedDomain: 'moses-station.co.il'
  },
  {
    metasiteId: 's2',
    siteName: 'name3',
    connectedDomain: null
  }
];

module.exports = function () {
  var deferred = q.defer();
  deferred.resolve(metaSiteData);
  return deferred.promise;
}
