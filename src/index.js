const plugin = require('tailwindcss/plugin')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default
const msoBorderColors = require('./msoColors.js')

module.exports = plugin.withOptions(
  function (options = {}) {
    const respectImportant = Boolean(options.respectImportant)

    return function ({ matchUtilities, theme }) {
      /*
      |-------------------------------------------------------------------------------
      | Utilities with predefined values
      |-------------------------------------------------------------------------------
      |
      | These utilities use predefined values, and some also support values from
      | your config, like spacing or colors.
      |
      */

      // mso-ansi-font-size, mso-bidi-font-size
      matchUtilities(
        {
          'mso-ansi-font-size': value => ({
            'mso-ansi-font-size': value
          }),
          'mso-bidi-font-size': value => ({
            'mso-bidi-font-size': value
          }),
        },
        {
          values: {
            large: 'large',
            larger: 'larger',
            medium: 'medium',
            small: 'small',
            smaller: 'smaller',
            'x-large': 'x-large',
            'x-small': 'x-small',
            'xx-large': 'xx-large',
            'xx-small': 'xx-small',
            ...theme('spacing'),
          },
          respectImportant,
        }
      )

      // mso-ansi-font-style, mso-ansi-font-style
      matchUtilities(
        {
          'mso-ansi-font-style': value => ({
            'mso-ansi-font-style': value
          }),
          'mso-bidi-font-style': value => ({
            'mso-bidi-font-style': value
          }),
        },
        {
          values: {
            italic: 'italic',
            normal: 'normal',
            oblique: 'oblique',
          },
          respectImportant,
        }
      )

      // mso-ansi-font-weight, mso-bidi-font-weight
      matchUtilities(
        {
          'mso-ansi-font-weight': value => ({
            'mso-ansi-font-weight': value
          }),
          'mso-bidi-font-weight': value => ({
            'mso-bidi-font-weight': value
          }),
        },
        {
          values: {
            lighter: 'lighter',
            normal: 'normal',
            bold: 'bold',
            bolder: 'bolder',
          },
          respectImportant,
        }
      )

      // mso-ascii-font-family, mso-bidi-font-family
      matchUtilities(
        {
          'mso-ascii-font-family': value => ({
            'mso-ascii-font-family': value
          }),
          'mso-bidi-font-family': value => ({
            'mso-bidi-font-family': value
          }),
          'mso-arabic-font-family': value => ({
            'mso-arabic-font-family': value
          }),
        },
        {
          values: {
            auto: 'auto',
            cursive: 'cursive',
            fantasy: 'fantasy',
            monospace: 'monospace',
            'sans-serif': 'sans-serif',
            serif: 'serif',
          },
          respectImportant,
        }
      )

      // mso-bidi-flag
      matchUtilities(
        {
          'mso-bidi-flag': value => ({
            'mso-bidi-flag': value
          }),
        },
        {
          values: {
            on: 'on',
            off: 'off',
          },
          respectImportant,
        }
      )

      // mso-highlight
      matchUtilities(
        {
          'mso-highlight': value => ({
            'mso-highlight': value
          }),
        },
        {
          values: {
            auto: 'auto',
            windowtext: 'windowtext',
            ...flattenColorPalette(theme('colors')),
          },
          respectImportant,
        }
      )

      // mso-generic-font-family
      matchUtilities(
        {
          'mso-generic-font-family': value => ({
            'mso-generic-font-family': value
          }),
        },
        {
          values: {
            auto: 'auto',
            decorative: 'decorative',
            modern: 'modern',
            roman: 'roman',
            script: 'script',
            swiss: 'swiss',
          },
          respectImportant,
        }
      )

      // mso-font-alt
      matchUtilities(
        {
          'mso-font-alt': value => ({
            'mso-font-alt': value.toString()
          }),
        },
        {
          values: {
            ...theme('fontFamily')
          },
          respectImportant,
        }
      )

      // mso-element-frame-width, mso-element-frame-height
      matchUtilities(
        {
          'mso-element-frame-width': value => ({
            'mso-element-frame-width': value
          }),
          'mso-element-frame-height': value => ({
            'mso-element-frame-height': value
          }),
        },
        {
          values: {
            auto: 'auto',
            ...theme('spacing'),
          },
          respectImportant,
        }
      )

      // mso-element
      matchUtilities(
        {
          'mso-element': value => ({
            'mso-element': value
          }),
        },
        {
          values: {
            comment: 'comment',
            'comment-list': 'comment-list',
            'dropcap-dropped': 'dropcap-dropped',
            'dropcap-in-margin': 'dropcap-in-margin',
            endnote: 'endnote',
            'endnote-continuation-notice': 'endnote-continuation-notice',
            'endnote-continuation-separator': 'endnote-continuation-separator',
            'endnote-list': 'endnote-list',
            'endnote-separator': 'endnote-separator',
            'field-begin': 'field-begin',
            'field-end': 'field-end',
            'field-separator': 'field-separator',
            footer: 'footer',
            footnote: 'footnote',
            'footnote-continuation-notice': 'footnote-continuation-notice',
            'footnote-continuation-separator': 'footnote-continuation-separator',
            'footnote-list': 'footnote-list',
            'footnote-separator': 'footnote-separator',
            frame: 'frame',
            header: 'header',
            none: 'none',
            'paragraph-mark-properties': 'paragraph-mark-properties',
            'table-head': 'table-head',
          },
          respectImportant,
        }
      )

      // mso-element-wrap
      matchUtilities(
        {
          'mso-element-wrap': value => ({
            'mso-element-wrap': value
          }),
        },
        {
          values: {
            around: 'around',
            auto: 'auto',
            none: 'none',
            'no-wrap-beside': 'no-wrap-beside',
          },
          respectImportant,
        }
      )

      // mso-element-left
      matchUtilities(
        {
          'mso-element-left': value => ({
            'mso-element-left': value
          }),
        },
        {
          values: {
            center: 'center',
            inside: 'inside',
            left: 'left',
            outside: 'outside',
            right: 'right',
            ...theme('spacing'),
          },
          supportsNegativeValues: true,
          respectImportant,
        }
      )

      // mso-element-top
      matchUtilities(
        {
          'mso-element-top': value => ({
            'mso-element-top': value
          }),
        },
        {
          values: {
            bottom: 'bottom',
            inside: 'inside',
            middle: 'middle',
            outside: 'outside',
            top: 'top',
            ...theme('spacing'),
          },
          supportsNegativeValues: true,
          respectImportant,
        }
      )

      // mso-hide
      matchUtilities(
        {
          'mso-hide': value => ({
            'mso-hide': value
          }),
        },
        {
          values: {
            all: 'all',
            none: 'none',
            screen: 'screen',
          },
          respectImportant,
        }
      )

      // mso-color-alt
      matchUtilities(
        {
          'mso-color-alt': value => ({
            'mso-color-alt': value
          }),
        },
        {
          values: {
            auto: 'auto',
            windowtext: 'windowtext',
            ...flattenColorPalette(theme('colors')),
          },
          respectImportant,
        }
      )

      // mso-line-height-rule
      matchUtilities(
        {
          'mso-line-height-rule': value => ({
            'mso-line-height-rule': value
          }),
        },
        {
          values: {
            'at-least': 'at-least',
            exactly: 'exactly',
          },
          respectImportant,
        }
      )

      // mso-line-height-alt
      matchUtilities(
        {
          'mso-line-height-alt': value => ({
            'mso-line-height-alt': value
          }),
        },
        {
          values: {
            normal: 'normal',
            ...theme('spacing'),
          },
          supportsNegativeValues: true,
          respectImportant,
        }
      )

      // text-underline, text-underline-style
      matchUtilities(
        {
          'text-underline': value => ({
            'text-underline': value
          }),
          'text-underline-style': value => ({
            'text-underline-style': value
          }),
        },
        {
          values: {
            auto: 'auto',
            dash: 'dash',
            'dash-dot-dot-heavy': 'dash-dot-dot-heavy',
            'dash-dot-heavy': 'dash-dot-heavy',
            'dashed-heavy': 'dashed-heavy',
            'dash-long': 'dash-long',
            'dash-long-heavy': 'dash-long-heavy',
            'dot-dash': 'dot-dash',
            'dot-dot-dash': 'dot-dot-dash',
            dotted: 'dotted',
            'dotted-heavy': 'dotted-heavy',
            double: 'double',
            'double-accounting': 'double-accounting',
            none: 'none',
            single: 'single',
            'single-accounting': 'single-accounting',
            thick: 'thick',
            wave: 'wave',
            'wavy-double': 'wavy-double',
            'wavy-heavy': 'wavy-heavy',
            windowtext: 'windowtext',
            word: 'word',
          },
          respectImportant,
        }
      )

      // text-underline-color
      matchUtilities(
        {
          'text-underline-color': value => ({
            'text-underline-color': value
          }),
        },
        {
          values: {
            auto: 'auto',
            windowtext: 'windowtext',
            ...flattenColorPalette(theme('colors')),
          },
          respectImportant,
        }
      )

      // mso-special-format
      matchUtilities(
        {
          'mso-special-format': value => ({
            'mso-special-format': value
          }),
        },
        {
          values: {
            bullet: 'bullet',
          },
          respectImportant,
        }
      )

      /*
      |-------------------------------------------------------------------------------
      | Spacing utilities
      |-------------------------------------------------------------------------------
      |
      | These utilities are based on the spacing scale from your config. Some also
      | support negative values.
      |
      */

      // mso-text-raise
      matchUtilities(
        {
          'mso-text-raise': value => ({
            'mso-text-raise': value
          }),
        },
        {
          values: theme('spacing'),
          supportsNegativeValues: true,
          respectImportant,
        }
      )

      // mso-padding-alt
      matchUtilities(
        {
          'mso-padding-alt': value => ({
            'mso-padding-alt': value
          }),
          'mso-padding-top-alt': value => ({
            'mso-padding-top-alt': value
          }),
          'mso-padding-right-alt': value => ({
            'mso-padding-right-alt': value
          }),
          'mso-padding-bottom-alt': value => ({
            'mso-padding-bottom-alt': value
          }),
          'mso-padding-left-alt': value => ({
            'mso-padding-left-alt': value
          }),
        },
        {
          values: theme('spacing'),
          respectImportant,
        }
      )

      // mso-margin-alt
      matchUtilities(
        {
          'mso-margin-alt': value => ({
            'mso-margin-alt': value
          }),
          'mso-margin-top-alt': value => ({
            'mso-margin-top-alt': value
          }),
          'mso-margin-right-alt': value => ({
            'mso-margin-right-alt': value
          }),
          'mso-margin-bottom-alt': value => ({
            'mso-margin-bottom-alt': value
          }),
          'mso-margin-left-alt': value => ({
            'mso-margin-left-alt': value
          }),
        },
        {
          values: theme('spacing'),
          supportsNegativeValues: true,
          respectImportant,
        }
      )

      // mso-para-margin
      matchUtilities(
        {
          'mso-para-margin': value => ({
            'mso-para-margin': value
          }),
          'mso-para-margin-top': value => ({
            'mso-para-margin-top': value
          }),
          'mso-para-margin-right': value => ({
            'mso-para-margin-right': value
          }),
          'mso-para-margin-bottom': value => ({
            'mso-para-margin-bottom': value
          }),
          'mso-para-margin-left': value => ({
            'mso-para-margin-left': value
          }),
        },
        {
          values: theme('spacing'),
          supportsNegativeValues: true,
          respectImportant,
        }
      )

      // mso-text-indent-alt
      matchUtilities(
        {
          'mso-text-indent-alt': value => ({
            'mso-text-indent-alt': value
          }),
        },
        {
          values: theme('spacing'),
          supportsNegativeValues: true,
          respectImportant,
        }
      )

      // mso-table-{?}space
      matchUtilities(
        {
          'mso-table-tspace': value => ({
            'mso-table-tspace': value
          }),
          'mso-table-rspace': value => ({
            'mso-table-rspace': value
          }),
          'mso-table-bspace': value => ({
            'mso-table-bspace': value
          }),
          'mso-table-lspace': value => ({
            'mso-table-lspace': value
          }),
        },
        {
          values: theme('spacing'),
          supportsNegativeValues: true,
          respectImportant,
        }
      )

      // mso-font-width
      matchUtilities(
        {
          'mso-font-width': value => ({
            'mso-font-width': value
          }),
        },
        {
          values: theme('width'),
          respectImportant,
        }
      )

      // mso-shading
      matchUtilities(
        {
          'mso-shading': value => ({
            'mso-shading': value
          }),
        },
        {
          values: {
            auto: 'auto',
            windowtext: 'windowtext',
            transparent: 'transparent',
            ...flattenColorPalette(theme('colors')),
          },
          respectImportant,
        }
      )

      // mso-shadow-color
      matchUtilities(
        {
          'mso-shadow-color': value => ({
            'mso-shadow-color': value
          }),
        },
        {
          values: {
            auto: 'auto',
            windowtext: 'windowtext',
            ...flattenColorPalette(theme('colors')),
          },
          respectImportant,
        }
      )

      // mso-element-frame-vspace, mso-element-frame-hspace
      matchUtilities(
        {
          'mso-element-frame-vspace': value => ({
            'mso-element-frame-vspace': value
          }),
          'mso-element-frame-hspace': value => ({
            'mso-element-frame-hspace': value
          }),
        },
        {
          values: theme('spacing'),
          supportsNegativeValues: true,
          respectImportant,
        }
      )

      // mso-border colors
      matchUtilities(
        {
          'mso-border-alt': value => ({
            'mso-border-alt': value
          }),
          'mso-border-between': value => ({
            'mso-border-between': value
          }),
          'mso-border-bottom-alt': value => ({
            'mso-border-bottom-alt': value
          }),
          'mso-border-left-alt': value => ({
            'mso-border-left-alt': value
          }),
          'mso-border-right-alt': value => ({
            'mso-border-right-alt': value
          }),
          'mso-border-top-alt': value => ({
            'mso-border-top-alt': value
          }),
        },
        {
          values: {
            ...msoBorderColors,
            ...flattenColorPalette(theme('colors')),
          },
          respectImportant,
        }
      )

      // mso-border widths
      matchUtilities(
        {
          'mso-border-between-width': value => ({
            'mso-border-between-width': value
          }),
          'mso-border-width-alt': value => ({
            'mso-border-width-alt': value
          }),
          'mso-border-bottom-width-alt': value => ({
            'mso-border-bottom-width-alt': value
          }),
          'mso-border-left-width-alt': value => ({
            'mso-border-left-width-alt': value
          }),
          'mso-border-right-width-alt': value => ({
            'mso-border-right-width-alt': value
          }),
          'mso-border-top-width-alt': value => ({
            'mso-border-top-width-alt': value
          }),
        },
        {
          values: {
            medium: 'medium',
            thick: 'thick',
            thin: 'thin',
            ...theme('spacing'),
          },
          respectImportant,
        }
      )

      // mso-border-*-source
      matchUtilities(
        {
          'mso-border-bottom-source': value => ({
            'mso-border-bottom-source': value
          }),
          'mso-border-left-source': value => ({
            'mso-border-left-source': value
          }),
          'mso-border-right-source': value => ({
            'mso-border-right-source': value
          }),
          'mso-border-top-source': value => ({
            'mso-border-top-source': value
          }),
        },
        {
          values: {
            auto: 'auto',
            background: 'background',
            foreground: 'foreground',
          },
          respectImportant,
        }
      )

      // mso-border-shadow
      matchUtilities(
        {
          'mso-border-shadow': value => ({
            'mso-border-shadow': value
          }),
        },
        {
          values: {
            no: 'no',
            yes: 'yes',
          },
          respectImportant,
        }
      )

      // mso-border-effect
      matchUtilities(
        {
          'mso-border-effect': value => ({
            'mso-border-effect': value
          }),
        },
        {
          values: {
            '3d': '3d',
            box: 'box',
          },
          respectImportant,
        }
      )
    }
  }
)
