import { useState } from "react"

interface Slide {
  src: string
  width: number
  height: number
}

interface Props {
  images: Slide[]
  alt: string
}

export default function ImageSlideshow({ images, alt }: Props) {
  const [current, setCurrent] = useState(0)

  const shift = (delta: number) => {
    setCurrent(index => (index + delta + images.length) % images.length)
  }

  return (
    <div id="header-photo">
      {images.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          width={image.width}
          height={image.height}
          className={index === current ? "current" : ""}
          alt={alt}
        />
      ))}

      <div className="row">
        <button className="fas fa-angle-left" aria-label="Previous image" onClick={() => shift(-1)} />
        <button className="fas fa-angle-right" aria-label="Next image" onClick={() => shift(1)} />
      </div>
    </div>
  )
}
