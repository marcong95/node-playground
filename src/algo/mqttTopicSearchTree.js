
class MqttTopicMatcher {
  static TREE_LEAF = Symbol('Leaf of MQTT topic match tree')

  constructor(topics = []) {
    this.searchTree = new Map()
    topics.forEach(this.addTopic, this)
  }

  addTopic(topic) {
    const { TREE_LEAF } = MqttTopicMatcher
    let root = this.searchTree
    const splited = topic.split('/')

    for (const level of splited) {
      if (root.has(level)) {
        root = root.get(level)
      } else {
        const subtree = new Map()
        root.set(level, subtree)
        root = subtree
      }
    }
    root.set(TREE_LEAF, topic)
  }

  match(topic) {
    console.log('matching:', topic)

    const { TREE_LEAF } = MqttTopicMatcher
    let root = this.searchTree
    const splited = topic.split('/')

    for (const level of splited) {
      if (root.has(level)) {
        console.log('matched by', level)
        root = root.get(level)
      } else if (root.has('+')) {
        console.log('matched by +')
        root = root.get('+')
      } else if (root.has('#') && root.get('#').has(TREE_LEAF)) {
        console.log('matched by #', level, root.get('#'))
        return root.get('#').get(TREE_LEAF)
      } else if (!root.has('#')) {
        console.log('not match', Array.from(root.keys()), level)
        return undefined
      } else {
        console.log('matched by #', level, Array.from(root.keys()))
      }
    }
    if (root.has(TREE_LEAF)) {
      return root.get(TREE_LEAF)
    }
    return undefined
  }
}

function printTree(tree, prefix = '') {
  const { TREE_LEAF } = MqttTopicMatcher

  for (const [level, subtree] of tree) {
    if (level === TREE_LEAF) {
      continue
    } else if (subtree.has(TREE_LEAF)) {
      console.log(prefix + `${level} (${subtree.get(TREE_LEAF)})`)
    } else {
      console.log(prefix + level)
    }
    printTree(subtree, prefix + '  ')
  }
}

const topics = [
  '$baidu/iot/shadow/+/get',
  '$baidu/iot/shadow/+/get/accepted',
  '$baidu/iot/shadow/+/update',
  // '$baidu/iot/general/+/lastwill/device',
  // '$baidu/iot/general/+/state/device',
  '$baidu/iot/general/WHAT_MARCO_WANTS/#',
  '$baidu/iot/general/#/TESLA',
  '$SYS/broker/log/N'
]
const matcher = new MqttTopicMatcher(topics)
printTree(matcher.searchTree)

const result = [
  '$SYS/broker/log/N',
  '$baidu/iot/shadow/LGT_1300_30624700_TDMF/update',
  '$baidu/iot/general/WHAT_MARCO_WANTS/HUGE_HOUSE/TESLA',
  '$baidu/iot/general/MARCO_WANTS/HUGE_HOUSE/TESLA' // TODO: need backtracking?
].map(topic => ({
  topic,
  matched: matcher.match(topic)
}))
console.table(result)
