import { FormData } from '../types/types'

export const calculateSodium = (formData: FormData) => {
  const { sodium, calories, volume = 0 } = formData

  if (Number(sodium) === 0) return false
  let threshold = 0
  if (Number(calories) === 0) {
    threshold = (40 * Number(volume)) / 100
  } else {
    threshold = 1 * Number(calories)
  }
  return Number(sodium) >= threshold
}

export const calculateSugar = (formData: FormData) => {
  const sugar = Number(formData.sugars)
  const calories = Number(formData.calories)

  if (calories === 0 && sugar > 0) {
    return true
  }

  if (calories > 0 && (sugar * 4) / calories >= 0.1) {
    return true
  }

  return false
}

export const calculateSaturatedFat = (formData: FormData) => {
  const satFat = Number(formData.saturatedFat)
  const calories = Number(formData.calories)

  if (calories === 0) return false

  return (satFat * 9) / calories >= 0.1
}

export const calculateTransFat = (formData: FormData) => {
  const transFat = Number(formData.transFat)
  const calories = Number(formData.calories)

  if (calories === 0) return false

  return (transFat * 9) / calories >= 0.01
}
