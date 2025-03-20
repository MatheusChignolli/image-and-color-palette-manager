/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { HexColorPicker } from 'react-colorful'
import { useState } from 'react'
import { v4 } from 'uuid'
import { Clipboard, X } from 'lucide-react'

import FieldsetError from '@/app/_components/fieldset-error'
import defaultValues from '@/constants/defaults'
import limits from '@/constants/limits'
import shareUtils from '@/utils/share'
import { Color } from '@/types/color-palettes'

interface ColorSelectorProps {
  form: any
  field: any
}

function ColorSelector({ form, field }: ColorSelectorProps) {
  const formColors = form.state.values.colors || []
  const [selectedColor, setSelectedColor] = useState<string>(
    defaultValues.DEFAULT_COLOR_SELECTOR_COLOR
  )
  const [colorName, setColorName] = useState<string>('')

  const addColorDisabled =
    formColors.length >= limits.MAX_COLORS ||
    !colorName ||
    colorName.length > limits.MAX_COLOR_NAME_CHARACTERS

  const handleAddColor = () => {
    if (colorName && formColors.length < 5) {
      const newColor = {
        id: v4(),
        name: colorName,
        hex: selectedColor
      }

      const newColors = [...formColors, newColor]
      form.setFieldValue('colors', newColors)
      form.validateAllFields('submit')

      setColorName('')
    }
  }

  const handleChangeColor = (color: string) => {
    setSelectedColor(color)
  }

  const handleRemoveColor = (colorId: string) => {
    const newColors = formColors.filter((color: Color) => color.id !== colorId)
    form.setFieldValue('colors', newColors)
    form.validateAllFields('submit')
  }

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Colors</legend>
      <div className="mb-2 flex flex-col sm:flex-row gap-2 mt-2">
        <HexColorPicker color={selectedColor} onChange={handleChangeColor} />
        <div className="grid grid-cols-2 gap-2 h-min flex-1">
          {formColors.map((color: Color) => (
            <div
              key={color.id}
              className="w-full flex flex-col"
              title={`${color.name} - ${color.hex}`}
            >
              <div
                className="h-9 rounded-t-lg w-full flex p-1 justify-between"
                style={{
                  backgroundColor: color.hex
                }}
              >
                <button
                  onClick={() => shareUtils.copyToClipboard(color.hex)}
                  className="btn btn-square btn-primary btn-xs tooltip"
                  data-tip="Copy color HEX"
                >
                  <Clipboard size={14} />
                </button>
                <button
                  type="button"
                  className="btn btn-square btn-error btn-xs tooltip"
                  onClick={() => handleRemoveColor(color.id)}
                  data-tip="Remove color"
                >
                  <X size={14} />
                </button>
              </div>
              <span className="bottom-0 left-0 w-full text-xs text-center text-white bg-base-300 rounded-b-lg p-1">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="input"
          placeholder="Color name"
          value={colorName}
          onChange={e => setColorName(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleAddColor}
          disabled={addColorDisabled}
        >
          Add Color
        </button>
      </div>
      {field.state.meta.errors ? (
        <FieldsetError>{field.state.meta.errors.join(', ')}</FieldsetError>
      ) : null}

      <p className="fieldset-label">You can add {limits.MAX_COLORS} colors</p>
    </fieldset>
  )
}

export default ColorSelector
