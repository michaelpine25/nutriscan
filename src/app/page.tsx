'use client'

import { useState } from 'react'
import { Sparkles, TrendingUp, Activity, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import TagsModal from './components/TagsModal'
import Input from './components/Input'
import OverallVerdict from './components/OverallVerdict'
import NutrientResult from './components/NutrientResult'
import { Results, FormData } from './types/types'
import {
  calculateSaturatedFat,
  calculateSodium,
  calculateSugar,
  calculateTransFat,
} from './functions/functions'

export default function Home() {
  const [measurementType, setMeasurementType] = useState('calories')
  const [results, setResults] = useState<Results>(null)
  const [showModal, setShowModal] = useState(false)
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
      [name]: value,
    })
  }

  const calculate = () => {
    const sodium = calculateSodium(formData)
    const sugar = calculateSugar(formData)
    const saturatedFat = calculateSaturatedFat(formData)
    const transFat = calculateTransFat(formData)
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

  const displayTags = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-3 rounded-2xl shadow-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            NutriScan
          </h1>
          <p className="text-gray-600 text-lg font-light">
            Análisis nutricional instantáneo impulsado por la ciencia
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-violet-500" />
            <h2 className="text-xl font-semibold text-gray-800">
              Ingresa los valores nutricionales
            </h2>
          </div>

          {/* Measurement Type Toggle */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de medida</label>
            <div className="relative inline-flex bg-gray-100 rounded-full p-1 w-full max-w-sm">
              <button
                type="button"
                onClick={() => setMeasurementType('calories')}
                className={`flex-1 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  measurementType === 'calories'
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md'
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
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:cursor-pointer'
                }`}
              >
                Volumen (0 cal)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Sodium */}
            <Input
              name="sodium"
              value={formData.sodium}
              onChange={handleChange}
              label="Sodio"
              unit="mg"
            />

            {/* Trans Fat */}
            <Input
              name="transFat"
              value={formData.transFat}
              onChange={handleChange}
              label="Grasas Trans"
              unit="g"
            />

            {/* Saturated Fat */}
            <Input
              name="saturatedFat"
              value={formData.saturatedFat}
              onChange={handleChange}
              label="Grasas Saturadas"
              unit="g"
            />

            {/* Sugars */}
            <Input
              name="sugars"
              value={formData.sugars}
              onChange={handleChange}
              label="Azúcares"
              unit="g"
            />

            {/* Artificial Sweeteners */}
            <Input
              name="artificialSweeteners"
              value={formData.artificialSweeteners}
              onChange={handleChange}
              label="Edulcorantes artificiales"
              unit="mg"
            />

            {/* Total Calories or Volume */}
            <Input
              name={measurementType === 'calories' ? 'calories' : 'volume'}
              value={measurementType === 'calories' ? formData.calories : formData.volume}
              onChange={handleChange}
              label={measurementType === 'calories' ? 'Calorias' : 'Volumen'}
              unit={measurementType === 'calories' ? 'kcal' : 'ml'}
            />
          </div>

          {/* Analyze Button */}
          <button
            onClick={calculate}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group hover:cursor-pointer"
          >
            <TrendingUp className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Analizar nutrición
          </button>

          {/* Results Section */}
          {results && (
            <div className="mt-6 animate-fade-in">
              {/* Overall Verdict */}
              <OverallVerdict isRecommended={results.isRecommended}>
                {/* Nutrient Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {/* Sodium */}
                  <NutrientResult
                    name="Sodio"
                    isExcessive={results.sodium}
                    warningMessage="Excede el límite recomendado"
                  />

                  {/* Sugars */}
                  <NutrientResult
                    name="Azúcares"
                    isExcessive={results.sugar}
                    warningMessage="Excede el 10% de las calorías"
                  />

                  {/* Saturated Fat */}
                  <NutrientResult
                    name="Grasas Saturadas"
                    isExcessive={results.saturatedFat}
                    warningMessage="Excede el 10% de las calorías"
                  />

                  {/* Trans Fat */}
                  <NutrientResult
                    name="Grasas Trans"
                    isExcessive={results.transFat}
                    warningMessage="Excede el 1% de las calorías"
                  />

                  {/* Artificial Sweeteners */}
                  <div className="sm:col-span-2">
                    <NutrientResult
                      name="Edulcorantes Artificiales"
                      isExcessive={results.artificialSweeteners}
                      warningMessage="Contiene edulcorantes artificiales"
                    />
                  </div>
                </div>
              </OverallVerdict>
              {!results.isRecommended && (
                <div className="w-full flex justify-center">
                  <div className="mt-5">
                    <button
                      className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group hover:cursor-pointer"
                      onClick={displayTags}
                    >
                      Ver etiquetas requeridas
                    </button>
                  </div>
                </div>
              )}
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

      {/* Tags Modal */}
      <TagsModal isOpen={showModal} onClose={closeModal} results={results} />
    </div>
  )
}
