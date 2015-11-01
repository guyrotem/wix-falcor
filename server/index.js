// index.js
var falcorExpress = require('falcor-express');
var Router = require('falcor-router');

var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

var logBind = console.log.bind(console);

var metaSiteData = require('./data/sites-data.js');
var domainsData = require('./data/domains-data.js');
var mailboxesData = require('./data/mailboxes-data.js');

app.use('/model.json', falcorExpress.dataSourceRoute(function (req, res) {
  // create a Virtual JSON resource with single key ("greeting")
  return new Router([
    {
      // match a request for the key "greeting"
      route: 'userSites[{integers:siteIndices}]["metasiteId", "siteName"]',
      // respond with a PathValue with the value of "Hello World."
      get: function(pathSet) {
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
      }
    },
    {
      route: 'userSites[{integers:siteIndices}].connectedDomains[{integers:domainIndices}]["domainName", "domainGuid"]', 
      get: function(pathSet) {
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
      }
    },
    {
      route: 'userSites[{integers:siteIndices}].connectedDomains[{integers:domainIndices}].mailboxInfo.numberOfMailboxes', 
      get: function(pathSet) {
        var results = [];
        pathSet.siteIndices.forEach(function (siteIndex) {
          getAllConnectedDomains(metaSiteData[siteIndex])
          .forEach(function (siteDomain, domainIndex) {
            var domainMailboxesData = mailboxesData.filter(function (mailboxData) {
                return mailboxData.domainName === siteDomain.domainName;
              });
            results.push({
              path: ['userSites', siteIndex, 'connectedDomains', domainIndex, 'mailboxInfo', 'numberOfMailboxes'],
              value: domainMailboxesData.length > 0 ? domainMailboxesData[0].numberOfMailboxes : 0
            });
          });
        });
        return results;
      }
    }
  ]);
}));

function getAllConnectedDomains(siteInfo) {
  var primaryDomainName = siteInfo.connectedDomain;
  return primaryDomainName ? domainsData.filter(function (domainData) {
    return domainData.domainName === primaryDomainName ||
    domainData.redirectDomain === primaryDomainName;
  }) : [];
}

// serve static files from current directory
app.use(express.static(__dirname + '/'));

var server = app.listen(3000);
