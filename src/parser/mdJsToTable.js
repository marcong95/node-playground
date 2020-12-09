const { readFile, writeFile } = require('fs').promises
const { join } = require('path')

const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()

const babelParser = require('@babel/parser')

const LINEBREAK_IN_TABLE = '<br>'

function handleMemberExpression(expression) {
  switch (expression.object.name) {
    case 'DataTypes':
      return expression.property.name
    default:
      var exprStr = [
        expression.object.name,
        expression.property.name
      ].join('.')
      console.error(`Unrecognized object property value '${exprStr}'`)
      return exprStr
  }
}

function handleComplexField(expression) {
  const { properties } = expression

  return Object.fromEntries(properties.map(prop => {
    const { key, value } = prop
    switch (value.type) {
      case 'MemberExpression':
        return [key.name, handleMemberExpression(value)]
      case 'ObjectExpression':
        return [key.name, handleComplexField(value)]
      default:
        if (value.type.endsWith('Literal')) {
          return [key.name, value.value]
        }
        console.error(`Unrecognized object property type '${value.type}' in complex field '${key.name}'`)
        return [key.name, `<${value.type}>`]
    }
  }))
}

function handleComments(comments, parent, codeByLines) {
  const commentMeta = {}

  comments.forEach(comment => {
    const { value } = comment
    let commentContent

    switch (comment.type) {
      case 'CommentLine':
        commentContent = value.trim()
        break
      case 'CommentBlock':
        commentContent = value.split('\n')
          .map(ln => ln.trim())
          .join(LINEBREAK_IN_TABLE)
        break
    }
    if (comment.end < parent.start && comment.type === 'CommentLine') {
      // a CommentLine but in leadingComment,
      // which belongs to the PREVIOUS prop
      commentMeta._previousComment = commentMeta._previousComment
        ? commentMeta._previousComment + '\n' + commentContent
        : commentContent
    } else {
      // standalone comment line, which belongs to this prop
      commentMeta.comment = commentMeta.comment
        ? commentMeta.comment + '\n' + commentContent
        : commentContent
    }
  })

  return commentMeta
}

function handleFieldDefinition(prop, codeByLines) {
  const { key, value, leadingComments = [], trailingComments = [] } = prop
  const commentMeta = handleComments(
    [...leadingComments, ...trailingComments],
    prop,
    codeByLines)

  let meta = {}
  switch (value.type) {
    case 'MemberExpression':
      meta.type = handleMemberExpression(value)
      break
    case 'ObjectExpression':
      meta = handleComplexField(value)
      break
    default:
      console.error(`Unrecognized object property type '${value.type}'`)
  }

  return {
    name: key.name,
    ...meta,
    ...commentMeta
  }
}

function handleJsBlock(block) {
  const codeByLines = block.content.split('\n')
  const expression = babelParser.parseExpression(block.content)
  if (expression.type === 'ObjectExpression') {
    const result = expression.properties
      .filter(token => token.type === 'ObjectProperty')
      .map(token => handleFieldDefinition(token, codeByLines))

    // _previousComment -> comment
    result.forEach((row, index, result) => {
      if (row._previousComment != null) {
        if (index > 0) {
          result[index - 1].comment = row._previousComment
        } else {
          console.error('_previousComment is not null in row 0',
            row._previousComment)
        }
        delete row._previousComment
      }
    })

    return result
  } else {
    throw new TypeError('Code block is not an Object expression')
  }
}

function handleMarkdownFile(readBuffer, replaceWithTable = false) {
  const fileContent = readBuffer.toString()
  const fileByLines = fileContent.split('\n')

  md.parse(fileContent.toString())
    .filter(token => token.type === 'fence' && token.info === 'javascript')
    .reverse()
    .forEach(block => {
      const [from, to] = block.map
      const mdTable = formatTable(handleJsBlock(block))
      if (replaceWithTable) {
        fileByLines.splice(from, to - from, mdTable)
      } else {
        fileByLines.splice(from, 0, mdTable + '\n')
      }
    })

  return fileByLines.join('\n')
}

function stringify(obj) {
  if (typeof obj === 'object') {
    return JSON.stringify(obj)
  } else {
    return obj.toString()
  }
}

function formatTable(tableData) {
  let colWidths = tableData.reduce((acc, row) => {
    Object.entries(row)
      .forEach(([key, val]) => {
        acc[key] = Math.max(acc[key] || key.length, stringify(val).length)
      })
    return acc
  }, {})
  const { comment, ...widthsWithoutComment } = colWidths
  colWidths = {
    ...widthsWithoutComment,
    ...(comment && { comment: 'comment'.length })
  }

  const header = Object.entries(colWidths)
    .map(([name, len]) => name.padEnd(len))
    .join(' | ')
  const sep = Object.values(colWidths)
    .map(len => ''.padEnd(len, '-'))
    .join(' | ')
  const body = tableData.map(row =>
    Object.entries(colWidths)
      .map(([name, len]) => stringify(row[name] == null ? '' : row[name]).padEnd(len))
      .join(' | '))

  return [header, sep, ...body]
    .map(line => `| ${line.trimEnd()} |`.replace(/\| \|$/, '|'))
    .join('\n')
}

readFile(String.raw`D:\projects\medthings\doc\数据库架构.md`)
  .then(handleMarkdownFile)
  .then(result => {
    return writeFile(join(__dirname, '../../output/tables.md'), result)
  })
  .catch(console.error)
