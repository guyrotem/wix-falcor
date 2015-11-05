var q = require('q');

var googleMailboxesData = [
  {
    domainName: 'moses.co.il',
    userAccounts: [
    	{
    		userName: 'moses',
    		isAdmin: true
    	},
    	{
    		userName: 'agadir',
    		isAdmin: false
    	}
    ],
  }
];

module.exports = function getGoogleMailboxDataPromise(domainName) {
  var deferred = q.defer();
  var result = googleMailboxesData.filter(function (googleData) {
    return googleData.domainName === domainName;
  });
  deferred.resolve(result.length > 0 ? result[0].userAccounts : []);
  return deferred.promise;
}
