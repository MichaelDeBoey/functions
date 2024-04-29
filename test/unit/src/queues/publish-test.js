let test = require('tape')
let publish

test('Set up env', t => {
  t.plan(1)

  let arc = require('../../../..')
  publish = arc.queues.publish
  t.ok(publish, 'Got queues.publish method')
})

test('queues.publish should throw if there is no parameter name', t => {
  t.plan(1)
  t.throws(() => { publish({}) }, /missing params.name/, 'throws missing name parameter exception')
})

test('queues.publish should throw if there is no parameter payload', t => {
  t.plan(1)
  t.throws(() => { publish({ name: 'batman' }) }, /missing params.payload/, 'throws missing payload parameter exception')
})

test('Teardown', t => {
  t.plan(1)
  delete process.env.ARC_ENV
  t.pass('Done!')
})
