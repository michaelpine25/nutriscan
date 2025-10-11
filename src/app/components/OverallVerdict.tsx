'use client'

import { CheckCircle, AlertTriangle } from 'lucide-react'

interface OverallVerdictProps {
  isRecommended: boolean
  children?: React.ReactNode
}

export default function OverallVerdict({ isRecommended, children }: OverallVerdictProps) {
  return (
    <div
      className={`p-6 rounded-2xl border-2 ${
        isRecommended ? 'bg-violet-50 border-violet-200' : 'bg-amber-50 border-amber-200'
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        {isRecommended ? (
          <>
            <CheckCircle className="w-8 h-8 text-violet-600" />
            <div>
              <h3 className="text-xl font-bold text-violet-900">¡Recomendado!</h3>
              <p className="text-sm text-violet-700">
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
      {children}
    </div>
  )
}
