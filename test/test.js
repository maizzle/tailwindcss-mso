const fs = require('fs-extra')
const postcss = require('postcss')
const msoPlugin = require('../index.js')
const tailwindcss = require('tailwindcss')
const cssMatcher = require('jest-matcher-css')

const generatePluginCss = (tailwindOptions = {}) => {
  return postcss(
    tailwindcss({
      theme: {
        screens: {
          'sm': '640px',
        },
        colors: {
          black: '#000000',
          gray: {
            100: '#f7fafc'
          }
        },
        spacing: {
          px: '1px',
        },
        fontSize: {
          base: '16px'
        }
      },
      corePlugins: false,
      plugins: [
        msoPlugin(),
      ],
      ...tailwindOptions,
    })
    )
    .process('@tailwind utilities', {
      from: undefined,
    })
    .then(result => result.css)
  };

expect.extend({
  toMatchCss: cssMatcher,
})

test('it generates the correct CSS', () => {
  return generatePluginCss().then(css => {
    const expected = fs.readFileSync('./test/expected/all.css', 'utf8')
    expect(css).toMatchCss(expected)
  })
})
