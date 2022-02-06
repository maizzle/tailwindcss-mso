const plugin = require('tailwindcss/plugin')
const isObject = require('lodash.isobject')
const forOwn = require('lodash.forown')
const data = require('./data.js')

const negate = require('./node_modules/tailwindcss/lib/util/negateValue.js').default

const mso = plugin(
  ({addUtilities, e, theme}) => {
    const newUtilities = {}

    const createUtilities = (name, rule, key, value, negative = false) => {
      let utility = `.${e(`${name}-${key}`)}`
      newUtilities[utility] = {}
      newUtilities[utility][rule] = value

      if (negative && !value.startsWith('0') && !value.startsWith('-')) {
        utility = `.-${e(`${name}-${key}`)}`
        newUtilities[utility] = {}
        newUtilities[utility][rule] = negate(value)
      }
    }

    // Utilities with predefined values
    forOwn(data, (value, key) => {
      forOwn(value, (v, k) => { // eslint-disable-line no-unused-vars
        newUtilities[`.${key}-${v}`] = {
          [key]: v,
        }
      })
    })

    // Spacing utilities
    forOwn(theme('spacing'), (value, key) => {
      createUtilities('mso-text-raise', 'mso-text-raise', key, value, true)

      // mso-padding-alt
      newUtilities[`.${e(`mso-padding-alt-${key}`)}`] = {
        'mso-padding-alt': value,
      }
      newUtilities[`.${e(`mso-padding-top-alt-${key}`)}`] = {
        'mso-padding-top-alt': value,
      }
      newUtilities[`.${e(`mso-padding-right-alt-${key}`)}`] = {
        'mso-padding-right-alt': value,
      }
      newUtilities[`.${e(`mso-padding-bottom-alt-${key}`)}`] = {
        'mso-padding-bottom-alt': value,
      }
      newUtilities[`.${e(`mso-padding-left-alt-${key}`)}`] = {
        'mso-padding-left-alt': value,
      }

      // mso-margin-alt
      createUtilities('mso-margin-alt', 'mso-margin-alt', key, value, true)

      // mso-margin-top-alt
      createUtilities('mso-margin-top-alt', 'mso-margin-top-alt', key, value, true)

      // mso-margin-right-alt
      createUtilities('mso-margin-right-alt', 'mso-margin-right-alt', key, value, true)

      // mso-margin-bottom-alt
      createUtilities('mso-margin-bottom-alt', 'mso-margin-bottom-alt', key, value, true)

      // mso-margin-left-alt
      createUtilities('mso-margin-left-alt', 'mso-margin-left-alt', key, value, true)

      // mso-line-height-alt
      createUtilities('mso-line-height-alt', 'mso-line-height-alt', key, value, true)

      // mso-text-indent-alt
      createUtilities('mso-text-indent-alt', 'mso-text-indent-alt', key, value, true)

      // mso-table-lspace
      createUtilities('mso-table-lspace', 'mso-table-lspace', key, value, true)

      // mso-table-rspace
      createUtilities('mso-table-rspace', 'mso-table-rspace', key, value, true)

      // mso-font-width
      createUtilities('mso-font-width', 'mso-font-width', key, value, true)
    })

    // Font utilities
    forOwn(theme('fontSize'), (value, key) => {
      // ANSI font size
      newUtilities[`.${e(`mso-ansi-font-size-${key}`)}`] = {
        'mso-ansi-font-size': Array.isArray(value) ? value[0] : value,
      }

      // BIDI font size
      newUtilities[`.${e(`mso-bidi-font-size-${key}`)}`] = {
        'mso-bidi-font-size': Array.isArray(value) ? value[0] : value,
      }
    })

    // Color utilities
    forOwn(theme('colors'), (colors, name) => {
      if (isObject(colors)) {
        forOwn(colors, (value, shade) => {
          // mso-color-alt
          newUtilities[`.${e(`mso-color-alt-${name}-${shade}`)}`] = {
            'mso-color-alt': value,
          }

          // mso-highlight
          newUtilities[`.${e(`mso-highlight-${name}-${shade}`)}`] = {
            'mso-highlight': value,
          }

          // text-underline-color
          newUtilities[`.${e(`text-underline-${name}-${shade}`)}`] = {
            'text-underline-color': value,
          }
        })
      } else {
        // mso-color-alt
        newUtilities[`.${e(`mso-color-alt-${name}`)}`] = {
          'mso-color-alt': colors,
        }

        // mso-highlight
        newUtilities[`.${e(`mso-highlight-${name}`)}`] = {
          'mso-highlight': colors,
        }

        // text-underline-color
        newUtilities[`.${e(`text-underline-${name}`)}`] = {
          'text-underline-color': colors,
        }
      }
    })

    addUtilities(newUtilities, {
      respectImportant: false,
    })
  },
)

module.exports = mso
