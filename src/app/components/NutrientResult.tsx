'use client'

import { CheckCircle, XCircle } from 'lucide-react'

interface NutrientResultProps {
  name: string
  isExcessive: boolean
  warningMessage?: string
}

export default function NutrientResult({ name, isExcessive, warningMessage }: NutrientResultProps) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 rounded-lg min-h-[60px] ${
        isExcessive ? 'bg-red-100 border border-red-200' : 'bg-white border border-violet-200'
      }`}
    >
      {isExcessive ? (
        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
      ) : (
        <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0" />
      )}
      <div className="flex-1">
        <p className={`font-medium text-sm ${isExcessive ? 'text-red-900' : 'text-violet-900'}`}>
          {name}
        </p>
        {isExcessive && warningMessage && <p className="text-xs text-red-700">{warningMessage}</p>}
      </div>
    </div>
  )
}
