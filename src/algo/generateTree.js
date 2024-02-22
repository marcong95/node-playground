function generateTree(regions) {
  const tree = {}
  for (const region of regions) {
    const regionSplited = region.split(' ')
    addIntoTree(tree, regionSplited)
  }
  return tree
}

function addIntoTree(tree, path) {
  if (path.length <= 0) {
    return tree
  }

  const [head, ...tail] = path
  if (tree[head] == null) {
    tree[head] = {}
  }
  return addIntoTree(tree[head], tail)
}

function printTree(tree, depth = 0) {
  for (const node in tree) {
    console.log(new Array(depth).fill('  ').join('') + node)
    printTree(tree[node], depth + 1)
  }
}

const tree = generateTree([
  '中国 浙江 杭州',
  '中国',
  '中国 广东',
  '中国 广东 广州 越秀区',
  '中国 广东 广州 海珠区',
  '中国 广东 珠海'
])
printTree(tree)
console.log(JSON.stringify(tree))
