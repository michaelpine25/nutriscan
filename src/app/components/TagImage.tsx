'use client'

interface TagImageProps {
  title: string
  imageSrc: string
  imageAlt: string
  description: string
  showBorder?: boolean
}

export default function TagImage({
  title,
  imageSrc,
  imageAlt,
  description,
  showBorder = true,
}: TagImageProps) {
  return (
    <div className={`text-center ${showBorder ? 'border-b pb-4' : ''}`}>
      <h4 className="text-lg font-semibold text-gray-700 mb-3">{title}</h4>
      <div className="shadow-lg rounded-xl p-6 w-[70%] mx-auto">
        <img src={imageSrc} alt={imageAlt} className="w-full h-auto rounded-lg" />
      </div>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  )
}
