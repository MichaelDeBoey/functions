let cache
module.exports = function getPorts (callback) {
  let { ARC_SANDBOX } = process.env
  let notFound = ReferenceError('Sandbox internal port not found')
  if (cache) {
    return callback(null, cache)
  }
  // Sandbox env var is the happy path for Lambda runs
  if (ARC_SANDBOX) {
    let { ports } = JSON.parse(ARC_SANDBOX)
    if (!ports) {
      return callback(notFound)
    }
    cache = ports
    callback(null, ports)
  }
  // Fall back to an internal SSM query in case Functions is running as a bare module
  else {
    // Require in here or circular dep warnings may occur

    let discovery = require('../discovery')
    discovery((err, services) => {
      if (err) callback(err)
      else {
        if (!services.ARC_SANDBOX || !services.ARC_SANDBOX.ports) {
          return callback(notFound)
        }
        let ports = JSON.parse(services.ARC_SANDBOX.ports)
        cache = ports
        callback(null, ports)
      }
    })
  }
}
