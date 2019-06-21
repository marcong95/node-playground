process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！

var lines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  lines.push(line);
});
reader.on('close', () => {
  const teamAmount = parseInt(lines.shift());
  const matchResult = [];

  let bestTeam = null;
  lines.forEach((team, index) => {
    const result = team.split('');
    const stats = { W: 0, D: 0, L: 0 };
    result.forEach(val => {
      stats[val] !== undefined && stats[val]++;
    })
    const points = stats.W * 2 + stats.D;

    matchResult[index] = { index, result, stats, points };
    // console.log(matchResult[index]);
    if (!bestTeam || bestTeam.points < points) {
      bestTeam = matchResult[index];
    }
  });

  console.log([
    bestTeam.index + 1,
    bestTeam.points,
    bestTeam.stats.W,
    bestTeam.stats.D,
    bestTeam.stats.L
  ].join(' '));
});
