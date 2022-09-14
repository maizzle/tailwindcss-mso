/* eslint-env jest */
// From https://github.com/tailwindlabs/tailwindcss-line-clamp/blob/master/jest/customMatchers.js
const prettier = require('prettier')
const { diff } = require('jest-diff')

function format(input) {
  return prettier.format(input, {
    parser: 'css',
    printWidth: 100,
  })
}

expect.extend({
  // Compare two CSS strings with all whitespace removed
  // This is probably naive but it's fast and works well enough.
  toMatchCss(received, argument) {
    function stripped(string_) {
      return string_.replace(/\s/g, '').replace(/;/g, '')
    }

    const options = {
      comment: 'stripped(received) === stripped(argument)',
      isNot: this.isNot,
      promise: this.promise,
    }

    const pass = stripped(received) === stripped(argument)

    const message = pass
      ? () => { // eslint-disable-line
        return (
          this.utils.matcherHint('toMatchCss', undefined, undefined, options)
            + '\n\n'
            + `Expected: not ${this.utils.printExpected(format(received))}\n`
            + `Received: ${this.utils.printReceived(format(argument))}`
        )
      }
      : () => {
        const actual = format(received)
        const expected = format(argument)

        const diffString = diff(expected, actual, {
          expand: this.expand,
        })

        return (
          this.utils.matcherHint('toMatchCss', undefined, undefined, options)
          + '\n\n'
          + (diffString && diffString.includes('- Expect')
            ? `Difference:\n\n${diffString}`
            : `Expected: ${this.utils.printExpected(expected)}\n`
              + `Received: ${this.utils.printReceived(actual)}`)
        )
      }

    return { actual: received, message, pass }
  },
  toIncludeCss(received, argument) {
    const options = {
      comment: 'stripped(received).includes(stripped(argument))',
      isNot: this.isNot,
      promise: this.promise,
    }

    const actual = format(received)
    const expected = format(argument)

    const pass = actual.includes(expected)

    const message = pass
      ? () => { // eslint-disable-line
        return (
          this.utils.matcherHint('toIncludeCss', undefined, undefined, options)
          + '\n\n'
          + `Expected: not ${this.utils.printExpected(format(received))}\n`
          + `Received: ${this.utils.printReceived(format(argument))}`
        )
      }
      : () => {
        const diffString = diff(expected, actual, {
          expand: this.expand,
        })

        return (
          this.utils.matcherHint('toIncludeCss', undefined, undefined, options)
          + '\n\n'
          + (diffString && diffString.includes('- Expect')
            ? `Difference:\n\n${diffString}`
            : `Expected: ${this.utils.printExpected(expected)}\n`
              + `Received: ${this.utils.printReceived(actual)}`)
        )
      }

    return { actual: received, message, pass }
  },
})

expect.extend({
  // Compare two CSS strings with all whitespace removed
  // This is probably naive but it's fast and works well enough.
  toMatchFormattedCss(received, argument) {
    function format(input) {
      return prettier.format(input.replace(/\n/g, ''), {
        parser: 'css',
        printWidth: 100,
      })
    }

    const options = {
      comment: 'stripped(received) === stripped(argument)',
      isNot: this.isNot,
      promise: this.promise,
    }

    const formattedReceived = format(received)
    const formattedArgument = format(argument)

    const pass = formattedReceived === formattedArgument

    const message = pass
      ? () => { // eslint-disable-line
        return (
          this.utils.matcherHint('toMatchCss', undefined, undefined, options)
          + '\n\n'
          + `Expected: not ${this.utils.printExpected(formattedReceived)}\n`
          + `Received: ${this.utils.printReceived(formattedArgument)}`
        )
      }
      : () => {
        const actual = formattedReceived
        const expected = formattedArgument

        const diffString = diff(expected, actual, {
          expand: this.expand,
        })

        return (
          this.utils.matcherHint('toMatchCss', undefined, undefined, options)
          + '\n\n'
          + (diffString && diffString.includes('- Expect')
            ? `Difference:\n\n${diffString}`
            : `Expected: ${this.utils.printExpected(expected)}\n`
              + `Received: ${this.utils.printReceived(actual)}`)
        )
      }

    return { actual: received, message, pass }
  },
})
