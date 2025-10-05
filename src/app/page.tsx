'use client'

import { useState } from 'react'
import { Sparkles, TrendingUp, Activity, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

type Results = {
  isRecommended: boolean
  sodium: boolean
  sugar: boolean
  saturatedFat: boolean
  transFat: boolean
  artificialSweeteners: boolean
} | null

type FormData = {
  sodium: string | number
  transFat: string | number
  saturatedFat: string | number
  sugars: string | number
  artificialSweeteners: string | number
  calories: string | number
  volume: string | number
}

export default function Home() {
  const [measurementType, setMeasurementType] = useState('calories')
  const [results, setResults] = useState<Results>(null)
  const [formData, setFormData] = useState<FormData>({
    sodium: '',
    transFat: '',
    saturatedFat: '',
    sugars: '',
    artificialSweeteners: '',
    calories: '',
    volume: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: Number(value),
    })
  }

  const calculate = () => {
    const sodium = calculateSodium()
    const sugar = calculateSugar()
    const saturatedFat = calculateSaturatedFat()
    const transFat = calculateTransFat()
    const artificialSweeteners = Number(formData.artificialSweeteners) > 0

    const isRecommended = !sodium && !sugar && !saturatedFat && !transFat && !artificialSweeteners

    setResults({
      isRecommended,
      sodium,
      sugar,
      saturatedFat,
      transFat,
      artificialSweeteners,
    })
  }

  const calculateSodium = () => {
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

  const calculateSugar = () => {
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

  const calculateSaturatedFat = () => {
    const satFat = Number(formData.saturatedFat)
    const calories = Number(formData.calories)

    if (calories === 0) return false

    return (satFat * 9) / calories >= 0.1
  }

  const calculateTransFat = () => {
    const transFat = Number(formData.transFat)
    const calories = Number(formData.calories)

    if (calories === 0) return false

    return (transFat * 9) / calories >= 0.01
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-2xl shadow-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">
            NutriScan
          </h1>
          <p className="text-gray-600 text-lg font-light">
            Análisis nutricional instantáneo impulsado por la ciencia
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-semibold text-gray-800">
              Ingresa los valores nutricionales
            </h2>
          </div>

          {/* Measurement Type Toggle */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de medida</label>
            <div className="relative inline-flex bg-gray-200 rounded-full p-1 w-full max-w-sm">
              <button
                type="button"
                onClick={() => setMeasurementType('calories')}
                className={`flex-1 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  measurementType === 'calories'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:cursor-pointer'
                }`}
              >
                Calorías
              </button>
              <button
                type="button"
                onClick={() => setMeasurementType('volume')}
                className={`flex-1 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  measurementType === 'volume'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:cursor-pointer'
                }`}
              >
                Volumen (0 cal)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Sodium */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sodio <span className="text-gray-400 font-normal">(mg)</span>
              </label>
              <input
                type="number"
                name="sodium"
                value={formData.sodium}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300 group-hover:border-gray-300"
                placeholder="0"
              />
            </div>

            {/* Trans Fat */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grasas Trans <span className="text-gray-400 font-normal">(g)</span>
              </label>
              <input
                type="number"
                name="transFat"
                value={formData.transFat}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300 group-hover:border-gray-300"
                placeholder="0"
              />
            </div>

            {/* Saturated Fat */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grasas Saturadas <span className="text-gray-400 font-normal">(g)</span>
              </label>
              <input
                type="number"
                name="saturatedFat"
                value={formData.saturatedFat}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300 group-hover:border-gray-300"
                placeholder="0"
              />
            </div>

            {/* Sugars */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Azúcares <span className="text-gray-400 font-normal">(g)</span>
              </label>
              <input
                type="number"
                name="sugars"
                value={formData.sugars}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300 group-hover:border-gray-300"
                placeholder="0"
              />
            </div>

            {/* Artificial Sweeteners */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Edulcorantes artificiales <span className="text-gray-400 font-normal">(mg)</span>
              </label>
              <input
                type="number"
                name="artificialSweeteners"
                value={formData.artificialSweeteners}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300 group-hover:border-gray-300"
                placeholder="0"
              />
            </div>

            {/* Total Calories or Volume */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {measurementType === 'calories' ? (
                  <>
                    Calorias <span className="text-gray-400 font-normal">(kcal)</span>
                  </>
                ) : (
                  <>
                    Volumen <span className="text-gray-400 font-normal">(ml)</span>
                  </>
                )}
              </label>
              <input
                type="number"
                name={measurementType === 'calories' ? 'calories' : 'volume'}
                value={measurementType === 'calories' ? formData.calories : formData.volume}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300 group-hover:border-gray-300"
                placeholder="0"
              />
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={calculate}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group hover:cursor-pointer"
          >
            <TrendingUp className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Analizar nutrición
          </button>

          {/* Results Section */}
          {results && (
            <div className="mt-6 animate-fade-in">
              {/* Overall Verdict */}
              <div
                className={`p-6 rounded-2xl border-2 ${
                  results.isRecommended
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  {results.isRecommended ? (
                    <>
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                      <div>
                        <h3 className="text-xl font-bold text-emerald-900">¡Recomendado!</h3>
                        <p className="text-sm text-emerald-700">
                          Este alimento cumple con las guías nutricionales
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-8 h-8 text-amber-600" />
                      <div>
                        <h3 className="text-xl font-bold text-amber-900">No Recomendado</h3>
                        <p className="text-sm text-amber-700">Contiene nutrientes en exceso</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Nutrient Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {/* Sodium */}
                  <div
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg min-h-[60px] ${
                      results.sodium
                        ? 'bg-red-100 border border-red-200'
                        : 'bg-white border border-emerald-200'
                    }`}
                  >
                    {results.sodium ? (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p
                        className={`font-medium text-sm ${
                          results.sodium ? 'text-red-900' : 'text-emerald-900'
                        }`}
                      >
                        Sodio
                      </p>
                      {results.sodium && (
                        <p className="text-xs text-red-700">Excede el límite recomendado</p>
                      )}
                    </div>
                  </div>

                  {/* Sugars */}
                  <div
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg min-h-[60px] ${
                      results.sugar
                        ? 'bg-red-100 border border-red-200'
                        : 'bg-white border border-emerald-200'
                    }`}
                  >
                    {results.sugar ? (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p
                        className={`font-medium text-sm ${
                          results.sugar ? 'text-red-900' : 'text-emerald-900'
                        }`}
                      >
                        Azúcares
                      </p>
                      {results.sugar && (
                        <p className="text-xs text-red-700">Excede el 10% de las calorías</p>
                      )}
                    </div>
                  </div>

                  {/* Saturated Fat */}
                  <div
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg min-h-[60px] ${
                      results.saturatedFat
                        ? 'bg-red-100 border border-red-200'
                        : 'bg-white border border-emerald-200'
                    }`}
                  >
                    {results.saturatedFat ? (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p
                        className={`font-medium text-sm ${
                          results.saturatedFat ? 'text-red-900' : 'text-emerald-900'
                        }`}
                      >
                        Grasas Saturadas
                      </p>
                      {results.saturatedFat && (
                        <p className="text-xs text-red-700">Excede el 10% de las calorías</p>
                      )}
                    </div>
                  </div>

                  {/* Trans Fat */}
                  <div
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg min-h-[60px] ${
                      results.transFat
                        ? 'bg-red-100 border border-red-200'
                        : 'bg-white border border-emerald-200'
                    }`}
                  >
                    {results.transFat ? (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p
                        className={`font-medium text-sm ${
                          results.transFat ? 'text-red-900' : 'text-emerald-900'
                        }`}
                      >
                        Grasas Trans
                      </p>
                      {results.transFat && (
                        <p className="text-xs text-red-700">Excede el 1% de las calorías</p>
                      )}
                    </div>
                  </div>

                  {/* Artificial Sweeteners */}
                  <div
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg sm:col-span-2 min-h-[60px] ${
                      results.artificialSweeteners
                        ? 'bg-red-100 border border-red-200'
                        : 'bg-white border border-emerald-200'
                    }`}
                  >
                    {results.artificialSweeteners ? (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p
                        className={`font-medium text-sm ${
                          results.artificialSweeteners ? 'text-red-900' : 'text-emerald-900'
                        }`}
                      >
                        Edulcorantes Artificiales
                      </p>
                      {results.artificialSweeteners && (
                        <p className="text-xs text-red-700">Contiene edulcorantes artificiales</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Resultados basados en las guías nutricionales y recomendaciones dietéticas de Colombia
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-sm font-medium text-gray-700">Análisis Instantáneo</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-sm font-medium text-gray-700">Respaldado por la Ciencia</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
            <div className="text-2xl mb-2">💚</div>
            <p className="text-sm font-medium text-gray-700">Enfocado en la Salud</p>
          </div>
        </div>
      </div>
    </div>
  )
}
