// index.js
var falcorExpress = require('falcor-express');
var Router = require('falcor-router');

var express = require('express');
var q = require('q');
var cors = require('cors');
var app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

var logBind = console.log.bind(console);

var _metaSiteData = require('./data/sites-data.js');
var domainsData = require('./data/domains-data.js');
var mailboxesData = require('./data/mailboxes-data.js');
var _googleMailboxesData = require('./data/google-mailboxes-data.js');

app.use('/model.json', falcorExpress.dataSourceRoute(function (req, res) {
  // create a Virtual JSON resource with user sites
  return new Router([
    {
      route: 'userSites[{integers:siteIndices}]["metasiteId", "siteName"]',
      get: function(pathSet) {
        return getMetaSiteData()
        .then(function (metaSiteData) {
          return pathSet.siteIndices.map(function (index) {
            var returnValue = {};
            pathSet[2].forEach(function (keyName) {
              returnValue[keyName] = metaSiteData[index][keyName];
            });
            return {
              path: ['userSites', index],
              value: returnValue
            };
          });
        });
      }
    },
    {
      route: 'userSites[{integers:siteIndices}].connectedDomains[{integers:domainIndices}]["domainName", "domainGuid"]', 
      get: function(pathSet) {
        return getMetaSiteData()
        .then(function (metaSiteData) {
          var siteResults = [];
          pathSet.siteIndices.forEach(function (siteIndex) {
            getAllConnectedDomains(metaSiteData[siteIndex])
            .forEach(function (siteDomain, domainIndex) {
              pathSet[4].forEach(function (domainKey) {
                siteResults.push({
                  path: ['userSites', siteIndex, 'connectedDomains', domainIndex, domainKey],
                  value: siteDomain[domainKey]
                });              
              });
            });
          });
          return siteResults;
        });
      }
    },
    {
      route: 'userSites[{integers:siteIndices}].connectedDomains[{integers:domainIndices}].mailboxInfo["numberOfMailboxes", "hasSetup"]', 
      get: function(pathSet) {
        return getMetaSiteData()
        .then(function (metaSiteData) {
          var results = [];
          pathSet.siteIndices.forEach(function (siteIndex) {
            getAllConnectedDomains(metaSiteData[siteIndex])
              .forEach(function (siteDomain, domainIndex) {
                var domainMailboxesData = mailboxesData.filter(function (mailboxData) {
                  return mailboxData.domainName === siteDomain.domainName;
                });
                pathSet[5].forEach(function (mailboxKey) {
                  results.push({
                    path: ['userSites', siteIndex, 'connectedDomains', domainIndex, 'mailboxInfo', mailboxKey],
                    value: domainMailboxesData.length > 0 ? domainMailboxesData[0][mailboxKey] : 0
                  });
                });
              });
          });
          return results;
        });
      }
    },
    {
      route: 'userSites[{integers:siteIndices}].connectedDomains[{integers:domainIndices}].mailboxInfo.userAccounts[{integers:googleMailboxIndices}]["userName", "isAdmin"]', 
      get: function(pathSet) {
        return getMetaSiteData()
        .then(function (metaSiteData) {
          var googleMailboxDataPromisesArray = pathSet.siteIndices.map(function (siteIndex) {
            var metaSiteGooglePromises = getAllConnectedDomains(metaSiteData[siteIndex])
            .map(function (connectedDomain) {
                return getGoogleMailboxData(connectedDomain.domainName);
            });
            return q.all(metaSiteGooglePromises);
          });
          return q.all(googleMailboxDataPromisesArray)
          .then(function (googleMailboxDataResolvedArray) {
            var results = [];
            pathSet.siteIndices.forEach(function (siteIndex) {
              getAllConnectedDomains(metaSiteData[siteIndex])
              .forEach(function (siteDomain, domainIndex) {
                pathSet.googleMailboxIndices.forEach(function (googleMailboxIndex) {
                  pathSet[7].forEach(function (googleMailboxKey) {
                    var googleMailboxData = googleMailboxDataResolvedArray[siteIndex][domainIndex];
                    if (googleMailboxData[googleMailboxIndex] && googleMailboxData[googleMailboxIndex][googleMailboxKey]) {                    
                      results.push({
                        path: ['userSites', siteIndex, 'connectedDomains', domainIndex, 'mailboxInfo', 'userAccounts', googleMailboxIndex, googleMailboxKey],
                        value: googleMailboxData[googleMailboxIndex][googleMailboxKey]
                      });
                    }
                  });
                });
              });
            });
            return results;
          });
        });
      }
    }]);
  }));

function getMetaSiteData() {
  var deferred = q.defer();
  deferred.resolve(_metaSiteData);
  return deferred.promise;
}

function getAllConnectedDomains(siteInfo) {
  var primaryDomainName = siteInfo.connectedDomain;
  return primaryDomainName ? domainsData.filter(function (domainData) {
    return domainData.domainName === primaryDomainName ||
    domainData.redirectDomain === primaryDomainName;
  }) : [];
}

function getGoogleMailboxData(domainName) {
  var deferred = q.defer();
  var result = _googleMailboxesData.filter(function (googleData) {
    return googleData.domainName === domainName;
  });
  deferred.resolve(result.length > 0 ? result[0].userAccounts : []);
  return deferred.promise;
}

// serve static files from current directory
app.use(express.static(__dirname + '/'));

var server = app.listen(3000);
