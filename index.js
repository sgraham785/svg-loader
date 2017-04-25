module.exports = function (content) {
  this.cacheable && this.cacheable()

  var match = content.match(/<svg([^>]+)+>([\s\S]+)<\/svg>/i)
  var attrs = {}

  if (match) {
    attrs = match[1] + match[2]
    if (attrs) {
      attrs = attrs.match(/([\w-:]+)(=)?("[^<>"]*"|'[^<>']*'|[\w-:]+)/g)
        .reduce(function (obj, attr) {
          // console.log('attrs obj -> ' + JSON.stringify(obj))
          // console.log('attrs attr -> ' + attr)
          var split = attr.split('=')
          var name = split[0]
          var value = true
          if (split && split[1]) {
            value = split[1].replace(/['"]/g, '')
          }
          obj[name] = value
          return obj
        }, {})
    }
  }

  // console.log('content --> ' + JSON.stringify(attrs))

  return 'module.exports = ' + JSON.stringify(attrs)
}
module.exports.seperable = true
