const _ = require('lodash')
const data = require('./data')

module.exports = function() {
  return function({ addUtilities, e, theme }) {

    const newUtilities = {}

    // Utilities with predefined values
    _.forOwn(data, (value, key) => {
      _.forOwn(value, (v, k) => {
        newUtilities[`.${key}-${v}`] = {
          [key]: v
        }
      })
    })

    // Spacing utilities
    _.forOwn(theme('spacing'), (value, key) => {
      // mso-text-raise
      newUtilities[`.${e(`mso-text-raise-${key}`)}`] = {
        'mso-text-raise': value
      }

      // mso-padding-alt
      newUtilities[`.${e(`mso-padding-alt-${key}`)}`] = {
        'mso-padding-alt': value
      }
      newUtilities[`.${e(`mso-padding-top-alt-${key}`)}`] = {
        'mso-padding-top-alt': value
      }
      newUtilities[`.${e(`mso-padding-right-alt-${key}`)}`] = {
        'mso-padding-right-alt': value
      }
      newUtilities[`.${e(`mso-padding-bottom-alt-${key}`)}`] = {
        'mso-padding-bottom-alt': value
      }
      newUtilities[`.${e(`mso-padding-left-alt-${key}`)}`] = {
        'mso-padding-left-alt': value
      }

      // mso-margin-alt
      newUtilities[`.${e(`mso-margin-alt-${key}`)}`] = {
        'mso-margin-alt': value
      }
      newUtilities[`.${e(`mso-margin-top-alt-${key}`)}`] = {
        'mso-margin-top-alt': value
      }
      newUtilities[`.${e(`mso-margin-right-alt-${key}`)}`] = {
        'mso-margin-right-alt': value
      }
      newUtilities[`.${e(`mso-margin-bottom-alt-${key}`)}`] = {
        'mso-margin-bottom-alt': value
      }
      newUtilities[`.${e(`mso-margin-left-alt-${key}`)}`] = {
        'mso-margin-left-alt': value
      }

      // mso-line-height-alt
      newUtilities[`.${e(`mso-line-height-alt-${key}`)}`] = {
        'mso-line-height-alt': value
      }

      // mso-text-indent-alt
      newUtilities[`.${e(`mso-text-indent-alt-${key}`)}`] = {
        'mso-text-indent-alt': value
      }

      // mso-table-lspace
      newUtilities[`.${e(`mso-table-lspace-${key}`)}`] = {
        'mso-table-lspace': value
      }

      // mso-table-rspace
      newUtilities[`.${e(`mso-table-rspace-${key}`)}`] = {
        'mso-table-rspace': value
      }
    })

    // Font utilities
    _.forOwn(theme('fontSize'), (value, key) => {
      // ANSI font size
      newUtilities[`.${e(`mso-ansi-font-size-${key}`)}`] = {
        'mso-ansi-font-size': value
      }

      // BIDI font size
      newUtilities[`.${e(`mso-bidi-font-size-${key}`)}`] = {
        'mso-bidi-font-size': value
      }
    })

    // Color utilities
    _.forOwn(theme('colors'), (colors, name) => {
      if (_.isObject(colors)) {
        _.forOwn(colors, (hex, shade) => {
          // mso-color-alt
          newUtilities[`.${e(`mso-color-alt-${name}-${shade}`)}`] = {
            'mso-color-alt': hex
          }

          // mso-highlight
          newUtilities[`.${e(`mso-highlight-${name}-${shade}`)}`] = {
            'mso-highlight': hex
          }
        })
      } else {
        // mso-color-alt
        newUtilities[`.${e(`mso-color-alt-${name}`)}`] = {
          'mso-color-alt': colors
        }

        // mso-highlight
        newUtilities[`.${e(`mso-highlight-${name}`)}`] = {
          'mso-highlight': colors
        }
      }
    })

    addUtilities(newUtilities, {
      respectImportant: false,
    })

  }
}
