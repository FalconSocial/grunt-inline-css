'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.inline_css = {
  tearDown: function (done) {
    grunt.util.spawn({
      grunt: true,
      args: ['clean']
    }, function() {
      done();
    });
  },

  first_test: function (test) {
    test.expect(1);
    test.ok(true, 'this has to work');
    test.done();
  },

  single_file: function (test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['test:specific_file']
    }, function(err, result) {
      console.log('RESULT', result, '\n\n\n');
      var actual = grunt.file.read('tmp/out.html');
      var expected = grunt.file.read('test/expected/out.html');
      test.equal(actual, expected, 'should inline css');

      test.done();
    });
  },

  expanded_file: function (test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['test:expanded_file']
    }, function(err, result, code) {
      var actual = grunt.file.read('tmp/in.html');
      var expected = grunt.file.read('test/expected/out.html');

      test.equal(actual, expected, 'should inline css');
      test.done();
    });
  }
};
