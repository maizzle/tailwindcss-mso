const plugin = require('tailwindcss/plugin')
const isObject = require('lodash.isobject')
const forOwn = require('lodash.forown')
const data = require('./data.js')

const mso = plugin(
  ({addUtilities, e, theme}) => {
    const newUtilities = {}

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
      // mso-text-raise
      newUtilities[`.${e(`mso-text-raise-${key}`)}`] = {
        'mso-text-raise': value,
      }

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
      newUtilities[`.${e(`mso-margin-alt-${key}`)}`] = {
        'mso-margin-alt': value,
      }
      newUtilities[`.${e(`mso-margin-top-alt-${key}`)}`] = {
        'mso-margin-top-alt': value,
      }
      newUtilities[`.${e(`mso-margin-right-alt-${key}`)}`] = {
        'mso-margin-right-alt': value,
      }
      newUtilities[`.${e(`mso-margin-bottom-alt-${key}`)}`] = {
        'mso-margin-bottom-alt': value,
      }
      newUtilities[`.${e(`mso-margin-left-alt-${key}`)}`] = {
        'mso-margin-left-alt': value,
      }

      // mso-line-height-alt
      newUtilities[`.${e(`mso-line-height-alt-${key}`)}`] = {
        'mso-line-height-alt': value,
      }

      // mso-text-indent-alt
      newUtilities[`.${e(`mso-text-indent-alt-${key}`)}`] = {
        'mso-text-indent-alt': value,
      }

      // mso-table-lspace
      newUtilities[`.${e(`mso-table-lspace-${key}`)}`] = {
        'mso-table-lspace': value,
      }

      // mso-table-rspace
      newUtilities[`.${e(`mso-table-rspace-${key}`)}`] = {
        'mso-table-rspace': value,
      }

      // mso-font-width
      newUtilities[`.${e(`mso-font-width-${key}`)}`] = {
        'mso-font-width': value,
      }
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
        forOwn(colors, (hex, shade) => {
          // mso-color-alt
          newUtilities[`.${e(`mso-color-alt-${name}-${shade}`)}`] = {
            'mso-color-alt': hex,
          }

          // mso-highlight
          newUtilities[`.${e(`mso-highlight-${name}-${shade}`)}`] = {
            'mso-highlight': hex,
          }

          // text-underline-color
          newUtilities[`.${e(`text-underline-${name}-${shade}`)}`] = {
            'text-underline-color': hex,
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
