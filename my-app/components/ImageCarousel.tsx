'use client';

import { useState } from 'react';

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
    caption: string;
  }[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log('ImageCarousel rendered with', images.length, 'images');

  return (
    <div className="my-8">
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full rounded-lg shadow-md border"
                />
                <p className="text-center text-sm text-muted-foreground mt-2">
                  {image.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-3 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              className="w-3 h-3 rounded-full cursor-pointer border-0 p-0 transition-all hover:scale-110"
              onClick={() => {
                console.log('Dot clicked:', index);
                setCurrentIndex(index);
              }}
              style={{
                backgroundColor: currentIndex === index ? '#3b82f6' : '#9ca3af',
                opacity: currentIndex === index ? 1 : 0.4
              }}
              aria-label={`切换到图片 ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
