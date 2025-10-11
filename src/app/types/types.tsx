export type Results = {
  isRecommended: boolean
  sodium: boolean
  sugar: boolean
  saturatedFat: boolean
  transFat: boolean
  artificialSweeteners: boolean
} | null

export type FormData = {
  sodium: string | number
  transFat: string | number
  saturatedFat: string | number
  sugars: string | number
  artificialSweeteners: string | number
  calories: string | number
  volume: string | number
}
