'use client'

interface InputProps {
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  unit: string
  placeholder?: string
  type?: string
}

export default function Input({
  name,
  value,
  onChange,
  label,
  unit,
  placeholder = '0',
  type = 'number',
}: InputProps) {
  return (
    <div className="group">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-gray-400 font-normal">({unit})</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-2 border-gray-200 px-4 py-3 bg-white/40 rounded-xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 group-hover:border-gray-300"
        placeholder={placeholder}
      />
    </div>
  )
}
