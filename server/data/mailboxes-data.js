var q = require('q');

var mailboxesData = [
  {
    domainName: 'moses.co.il',
    numberOfMailboxes: 4,
    hasSetup: true
  }
];

module.exports = function () {
  var deferred = q.defer();
  deferred.resolve(mailboxesData);
  return deferred.promise;
}