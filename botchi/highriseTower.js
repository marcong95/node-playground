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
  lines.shift(); // amount of words
  let result = lines.shift();

  findSuffix:
  while (lines.length > 0) {
    const next = lines.shift();
    // iterate from the longest substring for multiple replications
    for (let i = Math.min(next.length, result.length); i >= 0; i--) {
      if (result.endsWith(next.substr(0, i))) {
        result = result + next.substr(i);
        continue findSuffix;
      }
    }

    result = result + next;
  }

  console.log(result);
});
