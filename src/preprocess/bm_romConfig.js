/* eslint-disable no-sequences */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
/*
以关节细节来分：带*是不在ROM-TEST报告范围内
0 - 颈椎前屈和后伸
1 - 颈椎左侧屈和右侧屈
2 - 颈椎左旋和右旋

3 - 左肩关节屈曲(*)
4 - 左肩关节伸展(*)
5 - 左肩关节水平屈曲和伸展
6 - 左肩关节外旋和内旋
7 - 左肩关节外展和内收
8 - 左髋关节后伸(*)
9 - 左髋关节内收和外展
10- 左髋关节内旋和外旋
11- 左髋关节前屈(*)
12- 左踝关节背屈和跖屈
13- 左腕关节桡偏和尺偏
14- 左腕关节掌屈和背屈
15- 左膝关节屈曲和伸展
16- 左肘关节屈曲和伸展
17- 左肘关节旋前和旋后

18- 右踝关节背屈和跖屈
19- 右肩关节屈曲(*)
20- 右肩关节伸展(*)
21- 右肩关节水平屈曲和伸展
22- 右肩关节外旋和内旋
23- 右肩关节外展和内收
24- 右髋关节后伸(*)
25- 右髋关节内收和外展
26- 右髋关节内旋和外旋
27- 右髋关节前屈(*)
28- 右腕关节桡偏和尺偏
29- 右腕关节掌屈和背屈
30- 右膝关节屈曲和伸展
31- 右肘关节屈曲和伸展
32- 右肘关节旋前和旋后
----------------------
33- 腰椎前屈和后伸
34- 腰椎左侧屈和右侧屈
35- 左踝关节内收和外展
36- 右踝关节内收和外展

----------------------
40- 左手推拉动作(*)
41- 左手捶打动作(*)
42- 右手推拉动作(*)
43- 右手捶打动作(*)
44- 左手平面运动
45- 右手平面运动
----------------------
50- 左肩关节屈曲和伸展(3,4)
51- 左髋关节前屈和后伸(11,8)
52- 右肩关节屈曲和伸展(19,20)
53- 右髋关节前屈和后伸(27,24)

54- 左膝关节前伸和后屈
55- 右膝关节前伸和后屈
56- 左踝关节内翻和外翻
57- 右踝关节内翻和外翻
----------------------
60- 踏步训练（左髋、右髋）

以关节位置来分：
0 - 颈椎系列
1 - 肩关节系列
2 - 髋关节系列
3 - 踝关节系列
4 - 腕关节系列
5 - 膝关节系列
6 - 肘关节系列
7 - 腰椎系列
8 - 手臂系列
*/

/* eslint-diabled no-unused-expressions */
const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

const MotionData = [
  { index: 0, label: '前屈、后伸' },
  { index: 1, label: '左、右侧屈' },
  { index: 2, label: '左旋、右旋' },
  { index: 3, label: '屈曲' },
  { index: 4, label: '伸展' },
  { index: 5, label: '水平内收、水平外展' },
  { index: 6, label: '内旋、外旋' },
  { index: 7, label: '内收、外展' },
  { index: 8, label: '前屈、后伸-俯卧' },
  { index: 9, label: '内收、外展' },
  { index: 10, label: '内旋、外旋' },
  { index: 11, label: '前屈、后伸-仰卧' },
  { index: 12, label: '背屈、跖屈' },
  { index: 13, label: '桡偏、尺偏' },
  { index: 14, label: '掌屈、背屈' },
  { index: 15, label: '屈曲、伸展' },
  { index: 16, label: '屈曲、伸展' },
  { index: 17, label: '旋前、旋后' },
  { index: 18, label: '背屈、跖屈' },
  { index: 19, label: '屈曲' },
  { index: 20, label: '伸展' },
  { index: 21, label: '水平内收、水平外展' },
  { index: 22, label: '内旋、外旋' },
  { index: 23, label: '内收、外展' },
  { index: 24, label: '前屈、后伸-俯卧' },
  { index: 25, label: '内收、外展' },
  { index: 26, label: '内旋、外旋' },
  { index: 27, label: '前屈、后伸-仰卧' },
  { index: 28, label: '桡偏、尺偏' },
  { index: 29, label: '掌屈、背屈' },
  { index: 30, label: '屈曲、伸展' },
  { index: 31, label: '屈曲、伸展' },
  { index: 32, label: '旋前、旋后' }
]

function getBmRomTestConfig() {
  var JCONFIGCOUNT = 33 // ROM-TEST关节测试个数，不是最终的关节信息数目，还有其他的
  var BmRomTestJoint = new Array(JCONFIGCOUNT)

  var selectProtractor = function(obj, index) {
    obj.protractorImg = index
    obj.pointerStyle = 'height: 260px;-webkit-transform-origin:50% 255px;'
    obj.radius = 262
    switch (index) {
      case 1: // 90-0-90
        obj.protractorStyle = 'width: 645px;'
        break

      case 2: // 180-0-90
        obj.protractorStyle = 'width: 640px;'
        break

      case 3: // 180-0
        obj.protractorStyle = 'width:625px;'
        break

      case 4: // 100-0-100
        obj.protractorStyle = 'width:640px;'
        break

      case 5: // 0-180
        obj.protractorStyle = 'width:625px;'
        break

      case 6: // 30-150
        obj.protractorStyle = 'width:563px;'
        break

      case 7: // 90-0-90 vertical
        obj.protractorStyle = 'width:317px;'
        break

      case 8: // 90-0-90 horizintal
        obj.protractorStyle = 'width:597px;'
        break

      case 9: // 90-0-90 skew
        obj.protractorStyle = 'width:460px;'
        break

      case 10: // 90-0-90 skew
        obj.protractorStyle = 'width:316px;'
        break

      case 11: // 30-150
        obj.protractorStyle = 'width:406px;'
        break

      case 12: // 150-30
        obj.protractorStyle = 'width:480px;'
        break

      case 13: // 90-0-90 skew
        obj.protractorStyle = 'width:460px;'
        break

      case 14: // 150-0-30
        obj.protractorStyle = 'width:561px;'
        break

      case 15: // 150-0-30
        obj.protractorStyle = 'width:624px;'
        break

      case 16: // 30-150
        obj.protractorStyle = 'width:414px;'
        break

      case 17: // 150-30
        obj.protractorStyle = 'width:468px;'
        break
    }
  }

  /** 前33个为ROM-TEST关节信息
   *
   */
  var i, j
  for (i = 0; JCONFIGCOUNT > i; i++) {
    var jConfig = {
      index: -1,
      thumbnailTitle: '',
      mattersTitle: '',
      mattersImg1: '',
      mattersPara: '',
      mattersItems: [],
      mattersImg2: '',
      action1: '',
      action2: '',
      sketchMapClass: '',
      protractorImg: '',
      protractorStyle: '',
      pointerStyle: '',
      bindTo: null, // 关联1：与另一关节进行绑定
      mergeTo: null, // 关联1：合并到哪个关节
      singleFor: null, // 关联1：它属于positive还是negative
      whichBetter: null, // 更适用于哪个传感器 'A' || 'B'
      radius: -1, // 绘制扇形图的半径
      pointerBaseRotate: 0, // 以指针竖直向上为0°基准
      restrictArea: [], // 活动的极限范围饼图设置, 以图片序列的运动方向为正方向
      activeArea: [], // 用户活动区域范围饼图设置，同上
      anticlockwise: false, // 脚本写法以顺时针的运动为正方向，是否启用逆时针
      motionRange: null, // 活动范围的极值
      isPlaneMove: false, // 是否是平面运动的动作
      needBothBm: false // 是否需要两个BM同时连接
    }

    // 读取小受之前的Data.xml有关关节设定的配置
    var handleSuccess = function($) {
      var $data = $('Content_CN')
      jConfig.thumbnailTitle = MotionData[i].label
      jConfig.mattersTitle = $data.find('actionName').text(),
      jConfig.mattersPara = $data.find('Instruction').find('caption').text(),
      jConfig.action1 = $data.find('positiveMotionName').text(),
      jConfig.action2 = $data.find('negativeMotionName').text(),
      jConfig.sketchMapClass = 'joint-' + i,
      $data.find('Instruction').find('item').each(function(i, e) {
        jConfig.mattersItems.push($(e).text())
      }),
      jConfig.mattersImg1 = '_bm/resources/bm_rom_test_joint/' + i + '/matters-1.gif',
      jConfig.mattersImg2 = '_bm/resources/bm_rom_test_joint/' + i + '/matters-2.png'

      var motionRange = {
        positive: [+$('PositivePassLowerAngle').text(),
          +$('PositivePassUpperAngle').text()],
        negative: [+$('NegativePassLowerAngle').text(),
          +$('NegativePassUpperAngle').text()]
      }

      if (i == 15 || i == 30) {
        motionRange = {
          positive: [70, 90],
          negative: [30, 45]
        }
      };
      jConfig.motionRange = motionRange

      switch (i) {
        case 0:// 0 - 颈椎前屈和后伸
          selectProtractor(jConfig, 1), jConfig.pointerBaseRotate = 0,
          jConfig.restrictArea.push({ rotate: 145, angle: motionRange.positive[1] - motionRange.positive[0] }),
          jConfig.restrictArea.push({ rotate: 35, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 90, flip: false })
          jConfig.activeArea.push({ rotate: 90, flip: 'X' })
          jConfig.rangeTypeVals = ['18,15', '30,25', '48,40']
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 1:// 1 - 颈椎左侧屈和右侧屈
          selectProtractor(jConfig, 1), jConfig.pointerBaseRotate = 0,
          jConfig.restrictArea.push({ rotate: 135, angle: motionRange.positive[1] - motionRange.positive[0] }),
          jConfig.restrictArea.push({ rotate: 35, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 90, flip: false })
          jConfig.activeArea.push({ rotate: 90, flip: 'X' })
          jConfig.rangeTypeVals = ['21,21', '35,35', '56,56']
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'x'
          break

        case 2:// 2 - 颈椎左旋和右旋
          selectProtractor(jConfig, 1), jConfig.pointerBaseRotate = 0,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: 155, angle: motionRange.positive[1] - motionRange.positive[0] }),
          jConfig.restrictArea.push({ rotate: 15, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 90, flip: 'X' })
          jConfig.activeArea.push({ rotate: 90, flip: false })
          jConfig.rangeTypeVals = ['15,15', '25,25', '40,40']
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'x'
          break

        case 3:// 3 - 左肩关节屈曲(*)
          selectProtractor(jConfig, 5), jConfig.pointerBaseRotate = -90,
          jConfig.restrictArea.push({ rotate: 170, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.activeArea.push({ rotate: 0, flip: false })
          jConfig.bindTo = 4,
          jConfig.mergeTo = 50,
          jConfig.singleFor = 'positive'
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 4:// 4 - 左肩关节伸展(*)
          selectProtractor(jConfig, 3), jConfig.pointerBaseRotate = 90,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: 130, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.activeArea.push({ rotate: 180, flip: 'Y' })
          jConfig.bindTo = 3,
          jConfig.mergeTo = 50,
          jConfig.singleFor = 'negative'
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 5:// 5 - 左肩关节水平屈曲和伸展
          selectProtractor(jConfig, 6), jConfig.pointerBaseRotate = -90,
          jConfig.restrictArea.push({ rotate: 120, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: -30, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 0, flip: false }),
          jConfig.activeArea.push({ rotate: 0, flip: 'Y' })
          jConfig.rangeTypeVals = ['40,9', '68,15', '108,24']
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'Z'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'x'
          break

        case 6:// 6 - 左肩关节外旋和内旋
          selectProtractor(jConfig, 7), jConfig.pointerBaseRotate = -90,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: 80, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: -90, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 0, flip: 'Y' })
          jConfig.activeArea.push({ rotate: 0, flip: false })
          jConfig.rangeTypeVals = ['27,27', '45,45', '72,72']
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'Z'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 7:// 7 - 左肩关节外展和内收
          selectProtractor(jConfig, 2), jConfig.pointerBaseRotate = 180
          jConfig.restrictArea.push({ rotate: 335, angle: motionRange.positive[1] - motionRange.positive[0] }),
          jConfig.restrictArea.push({ rotate: 90, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 270, flip: false }),
          jConfig.activeArea.push({ rotate: 270, flip: 'X' })
          jConfig.rangeTypeVals = ['22,54', '38,90', '60,144']
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'x'
          break

        case 8:// 8 - 左髋关节后伸(*)
          selectProtractor(jConfig, 3), jConfig.pointerBaseRotate = 90,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: 150, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.activeArea.push({ rotate: 180, flip: 'Y' })
          jConfig.bindTo = 11,
          jConfig.mergeTo = 51,
          jConfig.singleFor = 'negative'
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 9:// 9 - 左髋关节内收外展
          selectProtractor(jConfig, 8), jConfig.pointerBaseRotate = -180,
          jConfig.restrictArea.push({ rotate: -75, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: -140, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: -90, flip: false })
          jConfig.activeArea.push({ rotate: -90, flip: 'X' })
          jConfig.rangeTypeVals = ['6,14', '10,22', '16,36']
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'x'
          break

        case 10:// 10- 左髋关节内旋和外旋
          selectProtractor(jConfig, 8), jConfig.pointerBaseRotate = -180,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: -50, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: -140, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: -90, flip: 'X' })
          jConfig.activeArea.push({ rotate: -90, flip: false })
          jConfig.rangeTypeVals = ['14,14', '22,22', '36,36']
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'x'
          break

        case 11:// 11- 左髋关节前屈(*)
          selectProtractor(jConfig, 5), jConfig.pointerBaseRotate = -90,
          jConfig.restrictArea.push({ rotate: 110, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.activeArea.push({ rotate: 0, flip: false })
          jConfig.bindTo = 8,
          jConfig.mergeTo = 51,
          jConfig.singleFor = 'positive'
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 12:// 12- 左踝关节背屈和跖屈
          selectProtractor(jConfig, 9), jConfig.pointerBaseRotate = -60,
          jConfig.restrictArea.push({ rotate: 45, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: -25, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 30, flip: false })
          jConfig.activeArea.push({ rotate: -30, flip: 'Y' })
          jConfig.rangeTypeVals = ['6,15', '10,25', '16,40']
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'Y'
          jConfig.refAngle = 0
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 13:// 13- 左腕关节桡偏和尺偏
          selectProtractor(jConfig, 1), jConfig.pointerBaseRotate = 0,
          jConfig.restrictArea.push({ rotate: 110, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: 30, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 90, flip: false })
          jConfig.activeArea.push({ rotate: 90, flip: 'X' })
          jConfig.rangeTypeVals = ['8,16', '12,28', '20,44']
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'Z'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'x'
          break

        case 14:// 14- 左腕关节掌屈和背屈
          selectProtractor(jConfig, 10), jConfig.pointerBaseRotate = 90,
          jConfig.restrictArea.push({ rotate: 260, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: 110, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 180, flip: false })
          jConfig.activeArea.push({ rotate: 180, flip: 'Y' })
          jConfig.rangeTypeVals = ['27,21', '45,35', '72,56']
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'Z'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 15:// 15- 左膝关节屈曲和伸展
          selectProtractor(jConfig, 11), jConfig.pointerBaseRotate = -45,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: -90, angle: 15 })
          jConfig.restrictArea.push({ rotate: 50, angle: 5 })
          jConfig.activeArea.push({ rotate: 135, flip: 'X' })
          jConfig.activeArea.push({ rotate: 45, flip: false })
          jConfig.rangeTypeVals = ['30,10', '45,20', '75,30']
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'

          jConfig.mattersTitle = '左膝关节前伸和后屈(初始位置屈曲90°)'
          jConfig.action1 = '前伸'
          jConfig.action2 = '后屈'
          break

        case 16:// 16- 左肘关节屈曲和伸展
          selectProtractor(jConfig, 12), jConfig.pointerBaseRotate = -180,
          jConfig.restrictArea.push({ rotate: 50, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: -100, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: -90, flip: false })
          jConfig.activeArea.push({ rotate: -90, flip: 'X' })
          jConfig.rangeTypeVals = ['45,0.1', '75,0.1', '120,0.1']
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 17:// 17- 左肘关节旋前和旋后
          selectProtractor(jConfig, 4), jConfig.pointerBaseRotate = 0,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: -5, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: 175, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 90, flip: 'X' })
          jConfig.activeArea.push({ rotate: 90, flip: false })
          jConfig.rangeTypeVals = ['27,27', '45,45', '72,72']
          jConfig.whichBetter = 'A'
          jConfig.refAxisName = 'Y'
          jConfig.refAngle = -90
          jConfig.axisNum = 1
          jConfig.axis = 'x'
          break

        case 18:// 18- 右踝关节背屈和跖屈
          selectProtractor(jConfig, 13), jConfig.pointerBaseRotate = 60,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: 195, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: 125, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 210, flip: 'Y' })
          jConfig.activeArea.push({ rotate: 150, flip: false })
          jConfig.whichBetter = 'B'
          jConfig.refAxisName = 'Y'
          jConfig.refAngle = 0
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 19:// 19- 右肩关节屈曲(*)
          selectProtractor(jConfig, 3), jConfig.pointerBaseRotate = 90,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: 0, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.activeArea.push({ rotate: -180, flip: 'Y' })
          jConfig.bindTo = 20,
          jConfig.mergeTo = 52,
          jConfig.singleFor = 'positive'
          jConfig.whichBetter = 'B'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 20:// 20- 右肩关节伸展(*)
          selectProtractor(jConfig, 5), jConfig.pointerBaseRotate = -90,
          jConfig.restrictArea.push({ rotate: 40, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.activeArea.push({ rotate: 0, flip: false })
          jConfig.bindTo = 19,
          jConfig.mergeTo = 52,
          jConfig.singleFor = 'negative'
          jConfig.whichBetter = 'B'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 21:// 21- 右肩关节水平屈曲和伸展
          selectProtractor(jConfig, 14), jConfig.pointerBaseRotate = 90,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: 45, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: 200, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 180, flip: 'Y' })
          jConfig.activeArea.push({ rotate: 180, flip: false })
          jConfig.whichBetter = 'B'
          jConfig.refAxisName = 'Z'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'x'
          break

        case 22:// 22- 右肩关节外旋和内旋
          selectProtractor(jConfig, 10), jConfig.pointerBaseRotate = 90,
          jConfig.restrictArea.push({ rotate: 90, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: 260, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 180, flip: false })
          jConfig.activeArea.push({ rotate: 180, flip: 'Y' })
          jConfig.whichBetter = 'B'
          jConfig.refAxisName = 'Z'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 23:// 23- 右肩关节外展和内收
          selectProtractor(jConfig, 15), jConfig.pointerBaseRotate = 180,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: 195, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: 70, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 270, flip: 'X' })
          jConfig.activeArea.push({ rotate: 270, flip: false })
          jConfig.whichBetter = 'B'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'x'
          break

        case 24:// 24- 右髋关节后伸(*)
          selectProtractor(jConfig, 5), jConfig.pointerBaseRotate = -90,
          jConfig.restrictArea.push({ rotate: 20, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.activeArea.push({ rotate: 0, flip: false })
          jConfig.bindTo = 27,
          jConfig.mergeTo = 53,
          jConfig.singleFor = 'negative'
          jConfig.whichBetter = 'B'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 25:// 25- 右髋关节内收和外展
          selectProtractor(jConfig, 8), jConfig.pointerBaseRotate = -180,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: -50, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: -115, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: -90, flip: 'X' })
          jConfig.activeArea.push({ rotate: -90, flip: false })
          jConfig.whichBetter = 'B'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'x'
          break

        case 26:// 26- 右髋关节内旋和外旋
          selectProtractor(jConfig, 8), jConfig.pointerBaseRotate = -180,
          jConfig.restrictArea.push({ rotate: -50, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: -140, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: -90, flip: false })
          jConfig.activeArea.push({ rotate: -90, flip: 'X' })
          jConfig.whichBetter = 'B'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'x'
          break

        case 27:// 27- 右髋关节前屈(*)
          selectProtractor(jConfig, 3), jConfig.pointerBaseRotate = 90,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: 60, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.activeArea.push({ rotate: 180, flip: 'Y' })
          jConfig.bindTo = 24,
          jConfig.mergeTo = 53,
          jConfig.singleFor = 'positive'
          jConfig.whichBetter = 'B'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 28:// 28- 右腕关节桡偏和尺偏
          selectProtractor(jConfig, 1), jConfig.pointerBaseRotate = 0,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: 140, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: 60, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 90, flip: 'X' })
          jConfig.activeArea.push({ rotate: 90, flip: false })
          jConfig.whichBetter = 'B'
          jConfig.refAxisName = 'Z'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'x'
          break

        case 29:// 29- 右腕关节掌屈和背屈
          selectProtractor(jConfig, 7), jConfig.pointerBaseRotate = -90,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: 60, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: -90, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 0, flip: 'Y' })
          jConfig.activeArea.push({ rotate: 0, flip: false })
          jConfig.whichBetter = 'B'
          jConfig.refAxisName = 'Z'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 30:// 30- 右膝关节屈曲和伸展
          selectProtractor(jConfig, 16), jConfig.pointerBaseRotate = 45,
          jConfig.restrictArea.push({ rotate: 255, angle: 15 })
          jConfig.restrictArea.push({ rotate: 125, angle: 5 })
          jConfig.activeArea.push({ rotate: 135, flip: false })
          jConfig.activeArea.push({ rotate: -135, flip: 'Y' })
          jConfig.whichBetter = 'B'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'

          jConfig.mattersTitle = '右膝关节前伸和后屈(初始位置屈曲90°)'
          jConfig.action1 = '前伸'
          jConfig.action2 = '后屈'
          break

        case 31:// 31- 右肘关节屈曲和伸展
          selectProtractor(jConfig, 17), jConfig.pointerBaseRotate = 180,
          jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: 120, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: 275, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: -90, flip: 'X' })
          jConfig.activeArea.push({ rotate: -90, flip: false })
          jConfig.whichBetter = 'B'
          jConfig.refAxisName = 'X'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'y'
          break

        case 32:// 32- 右肘关节旋前和旋后
          selectProtractor(jConfig, 4), jConfig.pointerBaseRotate = 0,
          // jConfig.anticlockwise = true,
          jConfig.restrictArea.push({ rotate: -5, angle: motionRange.positive[1] - motionRange.positive[0] })
          jConfig.restrictArea.push({ rotate: 175, angle: motionRange.negative[1] - motionRange.negative[0] })
          jConfig.activeArea.push({ rotate: 90, flip: false })
          jConfig.activeArea.push({ rotate: 90, flip: 'X' })
          jConfig.whichBetter = 'B'
          jConfig.refAxisName = 'Y'
          jConfig.refAngle = 90
          jConfig.axisNum = 1
          jConfig.axis = 'x'
          break
      }

      BmRomTestJoint[i] = jConfig
    }

    var xmlPath = path.resolve(__dirname, '../../input/bm_rom_test_joint', i.toString(), 'Data.xml')
    var file = fs.readFileSync(xmlPath)
    handleSuccess(cheerio.load(file.toString(), { xmlMode: true }))
  }

  BmRomTestJoint[18].rangeTypeVals = [].concat(BmRomTestJoint[12].rangeTypeVals),
  BmRomTestJoint[21].rangeTypeVals = [].concat(BmRomTestJoint[5].rangeTypeVals),
  BmRomTestJoint[22].rangeTypeVals = [].concat(BmRomTestJoint[6].rangeTypeVals),
  BmRomTestJoint[23].rangeTypeVals = [].concat(BmRomTestJoint[7].rangeTypeVals),
  BmRomTestJoint[25].rangeTypeVals = [].concat(BmRomTestJoint[9].rangeTypeVals),
  BmRomTestJoint[26].rangeTypeVals = [].concat(BmRomTestJoint[10].rangeTypeVals),
  BmRomTestJoint[28].rangeTypeVals = [].concat(BmRomTestJoint[13].rangeTypeVals),
  BmRomTestJoint[29].rangeTypeVals = [].concat(BmRomTestJoint[14].rangeTypeVals),
  BmRomTestJoint[30].rangeTypeVals = [].concat(BmRomTestJoint[15].rangeTypeVals),
  BmRomTestJoint[31].rangeTypeVals = [].concat(BmRomTestJoint[16].rangeTypeVals),
  BmRomTestJoint[32].rangeTypeVals = [].concat(BmRomTestJoint[17].rangeTypeVals)

  /** 以下为后补的关节信息
   *
   */
  // 33- 腰椎前屈和后伸
  BmRomTestJoint[33] = {
    action1: '前屈',
    action2: '后伸',
    motionRange: {
      positive: [60, 60],
      negative: [60, 60]
    },
    mattersTitle: '腰椎前屈和后伸',
    rangeTypeVals: ['15,15', '25,25', '40,40'],
    whichBetter: 'A',
    refAxisName: 'X',
    refAngle: 90,
    axisNum: 1,
    axis: 'y'
  },
  // 34- 腰椎左侧屈和右侧屈
  BmRomTestJoint[34] = {
    action1: '左侧屈',
    action2: '右侧屈',
    motionRange: {
      positive: [60, 60],
      negative: [60, 60]
    },
    mattersTitle: '腰椎左侧屈和右侧屈',
    rangeTypeVals: ['15,15', '25,25', '40,40'],
    whichBetter: 'A',
    refAxisName: 'X',
    refAngle: 90,
    axisNum: 1,
    axis: 'x'
  },
  // 35- 左踝关节内收和外展
  BmRomTestJoint[35] = {
    action1: '内旋',
    action2: '外旋',
    motionRange: {
      positive: [30, 30],
      negative: [15, 15]
    },
    mattersTitle: '左踝关节内旋和外旋',
    rangeTypeVals: ['6,3', '10,5', '16,8'],
    whichBetter: 'A',
    refAxisName: 'Y',
    refAngle: 0,
    axisNum: 1,
    axis: 'x'
  },
  // 36- 右踝关节内收和外展
  BmRomTestJoint[36] = {
    action1: '内旋',
    action2: '外旋',
    motionRange: {
      positive: [30, 30],
      negative: [15, 15]
    },
    mattersTitle: '右踝关节内旋和外旋',
    rangeTypeVals: ['6,3', '10,5', '16,8'],
    whichBetter: 'B',
    refAxisName: 'Y',
    refAngle: 0,
    axisNum: 1,
    axis: 'x'
  },
  // 40- 左手推拉动作(*)
  BmRomTestJoint[40] = {
    action1: '推动作',
    action2: '拉动作',
    motionRange: {
      positive: [70, 70],
      negative: [60, 60]
    },
    mattersTitle: '左手推拉动作',
    rangeTypeVals: ['18,15', '30,25', '48,40'],
    whichBetter: 'A',
    refAxisName: 'X',
    refAngle: 90,
    axisNum: 1,
    axis: 'x'
  },
  // 41- 左手捶打动作(*)
  BmRomTestJoint[41] = {
    action1: '捶提',
    action2: '捶打',
    motionRange: {
      positive: [80, 80],
      negative: [40, 40]
    },
    mattersTitle: '左手捶打动作',
    rangeTypeVals: ['24,9', '40,15', '64,24'],
    whichBetter: 'A',
    refAxisName: 'Y',
    refAngle: -90,
    axisNum: 1,
    axis: 'y'
  },
  // 42- 右手推拉动作(*)
  BmRomTestJoint[42] = {
    action1: '推动作',
    action2: '拉动作',
    motionRange: {
      positive: [80, 80],
      negative: [60, 60]
    },
    mattersTitle: '右手推拉动作',
    rangeTypeVals: ['18,15', '30,25', '48,40'],
    whichBetter: 'B',
    refAxisName: 'X',
    refAngle: 90,
    axisNum: 1,
    axis: 'x'
  },
  // 43- 右手捶打动作(*)
  BmRomTestJoint[43] = {
    action1: '捶提',
    action2: '捶打',
    motionRange: {
      positive: [80, 80],
      negative: [40, 40]
    },
    mattersTitle: '右手捶打动作',
    rangeTypeVals: ['24,9', '40,15', '64,24'],
    whichBetter: 'B',
    refAxisName: 'Y',
    refAngle: 90,
    axisNum: 1,
    axis: 'y'
  },
  // 44- 左手平面运动
  BmRomTestJoint[44] = {
    action1: '提',
    action2: '打',
    motionRange: {
      positive: [],
      negative: []
    },
    mattersTitle: '左手二维平面运动',
    rangeTypeVals: [],
    isPlaneMove: true,
    refAxisName: 'Z',
    refAngle: 90,
    axisNum: 1
  },
  // 45- 右手平面运动
  BmRomTestJoint[45] = {
    action1: '提',
    action2: '打',
    motionRange: {
      positive: [],
      negative: []
    },
    mattersTitle: '右手二维平面运动',
    rangeTypeVals: [],
    isPlaneMove: true,
    refAxisName: 'Z',
    refAngle: 90,
    axisNum: 1
  }

  var mergeJointConfig = function(jinx1, jinx2) {
    var jConfig1 = BmRomTestJoint[jinx1]
    var jConfig2 = BmRomTestJoint[jinx2]

    var jConfig = JSON.parse(JSON.stringify(jConfig1))

    jConfig.action2 = jConfig2.action1,
    jConfig.mattersTitle += '和' + jConfig2.action1,
    jConfig.motionRange.negative = jConfig2.motionRange.positive

    return jConfig
  }

  // 50- 左肩关节屈曲和伸展(3,4)
  // 51- 左髋关节前屈和后伸(11,8)
  // 52- 右肩关节屈曲和伸展(19,20)
  // 53- 右髋关节前屈和后伸(27,24)
  BmRomTestJoint[50] = mergeJointConfig(3, 4),
  BmRomTestJoint[51] = mergeJointConfig(11, 8),
  BmRomTestJoint[52] = mergeJointConfig(19, 20),
  BmRomTestJoint[53] = mergeJointConfig(27, 24)

  BmRomTestJoint[50].rangeTypeVals = ['54,15', '90,25', '144,40']
  BmRomTestJoint[51].rangeTypeVals = ['36,9', '60,15', '96,24']
  BmRomTestJoint[52].rangeTypeVals = ['54,15', '90,25', '144,40']
  BmRomTestJoint[53].rangeTypeVals = ['9,36', '60,15', '96,24']

  BmRomTestJoint[50].whichBetter = 'A',
  BmRomTestJoint[51].whichBetter = 'A',
  BmRomTestJoint[52].whichBetter = 'B',
  BmRomTestJoint[53].whichBetter = 'B'

  BmRomTestJoint[60] = {
    rangeTypeVals: ['20,0', '40,0', '60,0'],
    action1: '屈曲',
    action2: null,
    mattersTitle: '踏步训练（左髋、右髋）',
    motionRange: {
      positive: [90, 90],
      negative: [-90, -90]
    },
    needBothBm: true,
    refAxisName: 'Y',
    refAngle: 0,
    axisNum: 1,
    axis: 'y'
  }

  // 为每个关节信息添加索引信息
  for (i = 0, j = BmRomTestJoint.length, jConfig; j > i; i++) {
    jConfig = BmRomTestJoint[i]
    if (jConfig) jConfig.index = i
  }

  /** 添加判断关节的函数 */
  // 获取Series的9大类
  BmRomTestJoint.getSeriesByJinx = function(jinx) {
    var series, dir, text1, text2
    switch (jinx) {
      case 0:
      case 1:
      case 2:
        series = 0, dir = 0,
        text1 = '颈椎关节',
        text2 = '颈椎关节'
        break

      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        series = 1, dir = -1
        text1 = '肩关节',
        text2 = '左肩关节'
        break

      case 8:
      case 9:
      case 10:
      case 11:
        series = 2, dir = -1
        text1 = '髋关节',
        text2 = '左髋关节'
        break

      case 12:
        series = 3, dir = -1
        text1 = '踝关节',
        text2 = '左踝关节'
        break

      case 13:
      case 14:
        series = 4, dir = -1
        text1 = '腕关节',
        text2 = '左腕关节'
        break

      case 15:
        series = 5, dir = -1
        text1 = '膝关节',
        text2 = '左膝关节'
        break

      case 16:
      case 17:
        series = 6, dir = -1
        text1 = '肘关节',
        text2 = '左肘关节'
        break

      case 18:
        series = 3, dir = -1
        text1 = '踝关节',
        text2 = '右踝关节'
        break

      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
        series = 1, dir = 1
        text1 = '肩关节',
        text2 = '右肩关节'
        break

      case 24:
      case 25:
      case 26:
      case 27:
        series = 2, dir = 1
        text1 = '髋关节',
        text2 = '右髋关节'
        break

      case 28:
      case 29:
        series = 4, dir = 1
        text1 = '腕关节',
        text2 = '右腕关节'
        break

      case 30:
        series = 5, dir = 1
        text1 = '膝关节',
        text2 = '右膝关节'
        break

      case 31:
      case 32:
        series = 6, dir = 1
        text1 = '肘关节',
        text2 = '右肘关节'
        break

      case 33:
      case 34:
        series = 7, dir = 0
        text1 = '腰椎',
        text2 = '腰椎'
        break

      case 35:
        series = 3, dir = -1
        text1 = '踝关节',
        text2 = '左踝关节'
        break

      case 36:
        series = 3, dir = 1
        text1 = '踝关节',
        text2 = '右踝关节'
        break

      case 40:
      case 41:
        series = 8, dir = -1
        text1 = '手臂',
        text2 = '左臂'
        break

      case 42:
      case 43:
        series = 8, dir = 1
        text1 = '手臂',
        text2 = '右臂'
        break

      case 44:
        series = 8, dir = -1
        text1 = '手臂',
        text2 = '左臂'
        break

      case 45:
        series = 8, dir = 1
        text1 = '手臂',
        text2 = '右臂'
        break

      case 50:
        series = 1, dir = -1
        text1 = '肩关节',
        text2 = '左肩关节'
        break

      case 51:
        series = 2, dir = -1
        text1 = '髋关节',
        text2 = '左髋关节'
        break

      case 52:
        series = 1, dir = 1
        text1 = '肩关节',
        text2 = '右肩关节'
        break

      case 53:
        series = 2, dir = 1
        text1 = '髋关节',
        text2 = '右髋关节'
        break

      case 60:
        series = 9, dir = 0,
        text1 = '多关节',
        text2 = '多关节'
        break
    }

    return [series, dir, text1, text2]
  }

  return BmRomTestJoint
}

// fs.writeFile(
//   path.resolve(__dirname, '../../output/out.json'),
//   JSON.stringify(getBmRomTestConfig()),
//   err => {
//     err && console.error(err)
//   })
console.dir(getBmRomTestConfig(), { depth: 10 })
