const RomTestData = {
  neck: {
    label: '颈椎活动度',
    motions: [{
      id: 0,
      label: '前屈、后伸'
    }, {
      id: 2,
      label: '左旋、右旋'
    }, {
      id: 1,
      label: '左、右侧屈'
    }]
  },
  shoulder: {
    left: {
      label: '左肩活动度',
      motions: [{
        id: 4,
        label: '伸展'
      }, {
        id: 3,
        label: '屈曲'
      }, {
        id: 7,
        label: '内收、外展'
      }, {
        id: 5,
        label: '水平内收、水平外展'
      }, {
        id: 6,
        label: '内旋、外旋'
      }]
    },
    right: {
      label: '右肩活动度',
      motions: [{
        id: 20,
        label: '伸展'
      }, {
        id: 19,
        label: '屈曲'
      }, {
        id: 23,
        label: '内收、外展'
      }, {
        id: 21,
        label: '水平内收、水平外展'
      }, {
        id: 22,
        label: '内旋、外旋'
      }]
    }
  },
  elbow: {
    left: {
      label: '左肘活动度',
      motions: [{
        id: 16,
        label: '屈曲、伸展'
      }, {
        id: 17,
        label: '旋前、旋后'
      }]
    },
    right: {
      label: '右肘活动度',
      motions: [{
        id: 31,
        label: '屈曲、伸展'
      }, {
        id: 32,
        label: '旋前、旋后'
      }]
    }
  },
  wrist: {
    left: {
      label: '左腕活动度',
      motions: [{
        id: 14,
        label: '掌屈、背屈'
      }, {
        id: 13,
        label: '桡偏、尺偏'
      }]
    },
    right: {
      label: '右腕活动度',
      motions: [{
        id: 29,
        label: '掌屈、背屈'
      }, {
        id: 28,
        label: '桡偏、尺偏'
      }]
    }
  },
  hip: {
    left: {
      label: '左髋活动度',
      motions: [{
        id: 11,
        label: '前屈、后伸-仰卧'
      }, {
        id: 8,
        label: '前屈、后伸-俯卧'
      }, {
        id: 9,
        label: '内收、外展'
      }, {
        id: 10,
        label: '内旋、外旋'
      }]
    },
    right: {
      label: '右髋活动度',
      motions: [{
        id: 27,
        label: '前屈、后伸-仰卧'
      }, {
        id: 24,
        label: '前屈、后伸-俯卧'
      }, {
        id: 25,
        label: '内收、外展'
      }, {
        id: 26,
        label: '内旋、外旋'
      }]
    }
  },
  knee: {
    left: {
      label: '左膝活动度',
      motions: [{
        id: 15,
        label: '屈曲、伸展'
      }]
    },
    right: {
      label: '右膝活动度',
      motions: [{
        id: 30,
        label: '屈曲、伸展'
      }]
    }
  },
  ankle: {
    left: {
      label: '左踝活动度',
      motions: [{
        id: 12,
        label: '背屈、跖屈'
      }]
    },
    right: {
      label: '右踝活动度',
      motions: [{
        id: 18,
        label: '背屈、跖屈'
      }]
    }
  }
}

const motionData = new Array(33).fill(null)

const processJoint = joint => {
  return {
    ...joint,
    label: joint.label.replace('活动度', ''),
    motions: joint.motions.map(m => {
      if (motionData[m.id] == null) {
        motionData[m.id] = m
      } else {
        console.log('duplicated motion', m)
      }
      return m.id
    })
  }
}

console.dir(Object.fromEntries(
  Object.entries(RomTestData)
    .reduce((acc, [key, val]) => {
      if (val.motions) {
        return [
          ...acc,
          [key, processJoint(val)]
        ]
      } else {
        const { left, right } = val
        return [
          ...acc,
          [`${key}_left`, processJoint(left)],
          [`${key}_right`, processJoint(right)]
        ]
      }
    }, [])
))

console.dir(motionData)
