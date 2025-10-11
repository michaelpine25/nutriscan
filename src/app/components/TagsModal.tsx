'use client'

import { XCircle, AlertTriangle } from 'lucide-react'
import { Results } from '../types/types'
import TagImage from './TagImage'

interface TagsModalProps {
  isOpen: boolean
  onClose: () => void
  results: Results
}

export default function TagsModal({ isOpen, onClose, results }: TagsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Etiquetas Requeridas</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:cursor-pointer"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Exceso en Sodio Tag */}
            {results?.sodium && (
              <TagImage
                title="Exceso en Sodio"
                imageSrc="/sodium.JPG"
                imageAlt="Etiqueta de exceso en sodio"
                description="Esta etiqueta debe aparecer cuando el producto excede los límites recomendados de sodio."
              />
            )}

            {/* Exceso en Azúcares Tag */}
            {results?.sugar && (
              <TagImage
                title="Exceso en Azúcares"
                imageSrc="/sugars.jpg"
                imageAlt="Etiqueta de exceso en azúcares"
                description="Esta etiqueta debe aparecer cuando el producto excede los límites recomendados de azúcares."
              />
            )}

            {/* Exceso en Grasas Trans Tag */}
            {results?.transFat && (
              <TagImage
                title="Exceso en Grasas Trans"
                imageSrc="/trans-fat.JPG"
                imageAlt="Etiqueta de exceso en grasas trans"
                description="Esta etiqueta debe aparecer cuando el producto excede los límites recomendados de grasas trans."
              />
            )}

            {/* Exceso en Grasas Saturadas Tag */}
            {results?.saturatedFat && (
              <TagImage
                title="Exceso en Grasas Saturadas"
                imageSrc="/saturated-fat.JPG"
                imageAlt="Etiqueta de exceso en grasas saturadas"
                description="Esta etiqueta debe aparecer cuando el producto excede los límites recomendados de grasas saturadas."
              />
            )}

            {/* Contiene Edulcorantes Tag */}
            {results?.artificialSweeteners && (
              <TagImage
                title="Contiene Edulcorantes"
                imageSrc="/sweeteners.JPG"
                imageAlt="Etiqueta de contiene edulcorantes"
                description="Esta etiqueta debe aparecer cuando el producto tiene edulcorantes."
                showBorder={false}
              />
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="hover:cursor-pointer bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
