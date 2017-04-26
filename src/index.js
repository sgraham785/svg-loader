export default function (content) {
  this.cacheable && this.cacheable()

  const match = content.match(/<svg([^>]+)+>([\s\S]+)<\/svg>/i)
  let attrs = {}

  if (match) {
    attrs = match[1] + match[2]
    if (attrs) {
      attrs = attrs.match(/([\w-:]+)(=)?("[^<>"]*"|'[^<>']*'|[\w-:]+)/g)
        .reduce((obj, attr) => {
          const split = attr.split('=')
          const name = split[0]
          let value = true
          if (split && split[1]) {
            value = split[1].replace(/['"]/g, '')
          }
          obj[name] = value
          return obj
        }, {})
    }
  };

  // console.log('content --> ' + JSON.stringify(attrs))

  return `module.exports = ${JSON.stringify(attrs)}`
};

export var seperable = true
