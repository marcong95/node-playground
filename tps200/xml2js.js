const _ = require('lodash')
const { Parser } = require('xml2js')

const MAX_OSCLASS_COUNT = 4;

class ResultHandler {
  constructor(xml) {
    this.xml = xml;
    this.parser = new Parser();
  }

  parse() {
    return new Promise((resolve, reject) => {
      this.parser.parseString(this.xml, (err, result) => {
        if (err) {
          console.error('Caught error when parsing NMAP result:');
          console.error(err);
          reject(err);
        } else {
          const host = diveInto(result, 'nmaprun', 'host');

          let addrs = diveInto(host, 'address');
          if (!(addrs instanceof Array)) {
            addrs = [addrs];
          }
          const ip = getAttr('addr')(addrs.find(byAttr('addrtype', 'ipv4')));
          const mac = getAttr('addr')(addrs.find(byAttr('addrtype', 'mac')));

          const os = diveInto(host, 'os');
          const openPorts = diveInto(host, 'ports', 'port')
            .map(getAttr('portid'));

          const osMatches = [];
          let osClasses = [];
          for (let match of diveInto(os, 'osmatch')) {
            const classes = diveInto(match, 'osclass');
            osClasses = osClasses.concat(classes);
            osMatches.push(match);

            if (osClasses.length >= MAX_OSCLASS_COUNT) {
              osClasses = osClasses.slice(0, MAX_OSCLASS_COUNT);
              break;
            }
          }

          const name = _.chain(osMatches)
            .map(getAttr('name'))
            .uniq()
            .join(' | ')
            .value();
          const guesses = {};
          ['type', 'vendor', 'osfamily', 'osgen'].forEach(attr => {
            const getter = getAttr(attr);
            guesses[attr] = osClasses.map(cls => getter(cls));
          });
          guesses.osdetail = new Array(osClasses.length)
            .fill(null)
            .map((_val, idx) =>
              [guesses.osfamily[idx], guesses.osgen[idx]].join(' '));

          const getGuessResult = (attr) =>
            _.uniq(guesses[attr]).join(' | ');

          const device = {
            ip,
            mac,
            name,
            manufacturer: getGuessResult('vendor'),
            devType: getGuessResult('type'),
            system: getGuessResult('osfamily'),
            guessSystem: getGuessResult('osdetail'),
            openPort: openPorts.join(',')
          };
          // console.log('NmapHandler:', device);
          resolve(device);
        }
      });
    });
  }
}

function diveInto(obj, ...indexes) {
  if (obj == null || indexes.length === 0) {
    return obj || [];
  }

  if (obj instanceof Array) {
    // return obj.map(child => diveInto(child, ...indexes));
    // return ([] as any[]).concat(
    //   ...obj.map(child => diveInto(child, ...indexes)));
    return _.flatMap(obj, child => diveInto(child, ...indexes));
  }

  if (indexes[0] != null) {
    const next = indexes.shift();
    return diveInto(obj[next], ...indexes);
  }

  return [];
}

function byAttr(attrName, predicate) {
  return node => node.$ && node.$[attrName] === predicate;
}

function getAttr(attrName) {
  return node => node && node.$ && node.$[attrName];
}

module.exports = async data => {
  return await new ResultHandler(data).parse();
}
module.exports.__class = ResultHandler;
