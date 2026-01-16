import React, { useState, useEffect } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { ImageSlideshowInteraction } from './interface';
import { useEventListener } from '../../../hooks/useEventListener';

const processSlideContent = (htmlContent: string): string => {
  return htmlContent
    .replace(/width:\s*\d+px/g, 'width: 100%')
    .replace(/height:\s*\d+px/g, 'height: 100%')
    .replace(
      /style='([^']*display:flex[^']*width:\s*760px[^']*height:\s*520px[^']*)'/g,
      "style='display:flex;align-items:center;justify-content:center;width:100%;height:100%;max-width:85vw;max-height:60vh;border-radius:24px;overflow:hidden;background:#222;'",
    )
    .replace(
      /style='([^']*display:flex[^']*width:\s*900px[^']*height:\s*650px[^']*)'/g,
      "style='display:flex;align-items:center;justify-content:center;width:100%;height:100%;max-width:85vw;max-height:60vh;border-radius:24px;overflow:hidden;background:#222;'",
    )
    .replace(
      /style='([^']*max-width:100%;max-height:100%[^']*)'/g,
      "style='width:100%;height:100%;max-width:85vw;max-height:60vh;object-fit:contain;object-position:center;border-radius:20px;background:#222;'",
    )
    .replace(/style='[^']*'/g, (match) => {
      if (!match.includes('border-radius') && !match.includes('display:flex') && !match.includes('max-width')) {
        return match.replace(/style='/, "style='border-radius:12px;overflow:hidden;max-width:85vw;max-height:60vh;");
      }
      return match;
    })
    .replace(/background:#222/g, 'background:#FFFFFF');
};

interface SlideshowProps {
  interaction: ImageSlideshowInteraction;
  onInteraction: (state: Record<string, string | number | boolean | null>) => void;
}

const InteractiveSlideshow: React.FC<SlideshowProps> = ({ interaction }) => {
  const { t } = useTranslations();
  const { payload } = useEventListener('interactive-slideshow');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [slides, setSlides] = useState<string[]>([]);
  const slidesPrefix = interaction.slidesPrefix || 'scenes.S4.S4_D1_F1_C0';

  const stepToImageKeys: Record<number, string[]> = {
    1: ['img'],
    2: ['img2'],
    3: ['img3'],
    4: ['img4'],
    5: ['img5'],
    6: ['img6'],
    7: ['img7'],
    8: ['img7'],
  };

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      const step = Number(payload.step);

      if (!isNaN(step) && step > 0 && step <= 15) {
        setCurrentStep(step);
        setCurrentSlideIndex(0);
      }
    }
  }, [payload]);

  useEffect(() => {
    const imageKeys = stepToImageKeys[currentStep] || [];

    if (imageKeys.length === 0) {
      setSlides([]);
      return;
    }

    const loadedSlides: string[] = [];

    for (const key of imageKeys) {
      const imgKey = `${slidesPrefix}.${key}`;
      const imgContent = t(imgKey);

      if (imgContent && imgContent !== imgKey) {
        loadedSlides.push(imgContent);
      }
    }

    setSlides(loadedSlides);
  }, [t, slidesPrefix, currentStep]);

  return (
    <div className="slideshow-wrapper">
      <style>{`
        /* Override inline styles for maximum responsive image sizing without overflow */
        .slideshow-wrapper div[style*="width:760px"] {
          width: 100% !important;
          height: 100% !important;
          max-width: 85vw !important;
          max-height: 60vh !important;
        }
        
        .slideshow-wrapper div[style*="height:520px"] {
          width: 100% !important;
          height: 100% !important;
          max-width: 85vw !important;
          max-height: 60vh !important;
        }
        
        /* Special handling for the larger second image */
        .slideshow-wrapper div[style*="width:900px"] {
          width: 100% !important;
          height: 100% !important;
          max-width: 85vw !important;
          max-height: 60vh !important;
        }
        
        .slideshow-wrapper div[style*="height:650px"] {
          width: 100% !important;
          height: 100% !important;
          max-width: 85vw !important;
          max-height: 60vh !important;
        }
        
        .slideshow-wrapper img {
          display: block !important;
          margin: 0 auto !important;
          width: 100% !important;
          height: 100% !important;
          max-width: 85vw !important;
          max-height: 60vh !important;
          object-fit: contain !important;
          object-position: center !important;
        }
        
        /* Special sizing for images in the larger container */
        .slideshow-wrapper div[style*="width:900px"] img {
          width: 100% !important;
          height: 100% !important;
          max-width: 85vw !important;
          max-height: 60vh !important;
        }
        
        /* Thumbnail specific styles */
        .album-thumbnail div[style*="width:760px"],
        .image-thumbnail div[style*="width:760px"],
        .album-thumbnail div[style*="width:900px"],
        .image-thumbnail div[style*="width:900px"] {
          width: 100% !important;
          min-width: 150px !important;
          max-width: 250px !important;
        }
        
        .album-thumbnail div[style*="height:520px"],
        .image-thumbnail div[style*="height:520px"],
        .album-thumbnail div[style*="height:650px"],
        .image-thumbnail div[style*="height:650px"] {
          height: 100% !important;
          min-height: 112px !important;
          max-height: 200px !important;
        }
        
        .album-thumbnail img,
        .image-thumbnail img {
          width: 100% !important;
          height: 100% !important;
          min-width: 150px !important;
          min-height: 112px !important;
          max-width: 250px !important;
          max-height: 200px !important;
          object-fit: contain !important;
          object-position: center !important;
        }
        
        /* Responsive breakpoints - preventing overflow and maintaining dynamic sizing */
        @media (max-width: 768px) {
          .slideshow-wrapper div[style*="width:760px"] {
            width: 100% !important;
            height: 100% !important;
            max-width: 85vw !important;
            max-height: 55vh !important;
          }
          
          .slideshow-wrapper div[style*="height:520px"] {
            width: 100% !important;
            height: 100% !important;
            max-width: 85vw !important;
            max-height: 55vh !important;
          }
          
          .slideshow-wrapper div[style*="width:900px"] {
            width: 100% !important;
            height: 100% !important;
            max-width: 85vw !important;
            max-height: 55vh !important;
          }
          
          .slideshow-wrapper div[style*="height:650px"] {
            width: 100% !important;
            height: 100% !important;
            max-width: 85vw !important;
            max-height: 55vh !important;
          }
          
          .slideshow-wrapper img {
            width: 100% !important;
            height: 100% !important;
            max-width: 85vw !important;
            max-height: 55vh !important;
          }
          
          .slideshow-wrapper div[style*="width:900px"] img {
            width: 100% !important;
            height: 100% !important;
            max-width: 85vw !important;
            max-height: 55vh !important;
          }
          
          .album-thumbnail img,
          .image-thumbnail img {
            min-width: 120px !important;
            min-height: 90px !important;
            max-width: 200px !important;
            max-height: 150px !important;
          }
        }
        
        @media (max-width: 480px) {
          .slideshow-wrapper div[style*="width:760px"] {
            width: 100% !important;
            height: 100% !important;
            max-width: 90vw !important;
            max-height: 50vh !important;
          }
          
          .slideshow-wrapper div[style*="height:520px"] {
            width: 100% !important;
            height: 100% !important;
            max-width: 90vw !important;
            max-height: 50vh !important;
          }
          
          .slideshow-wrapper div[style*="width:900px"] {
            width: 100% !important;
            height: 100% !important;
            max-width: 90vw !important;
            max-height: 50vh !important;
          }
          
          .slideshow-wrapper div[style*="height:650px"] {
            width: 100% !important;
            height: 100% !important;
            max-width: 90vw !important;
            max-height: 50vh !important;
          }
          
          .slideshow-wrapper img {
            width: 100% !important;
            height: 100% !important;
            max-width: 90vw !important;
            max-height: 50vh !important;
          }
          
          .slideshow-wrapper div[style*="width:900px"] img {
            width: 100% !important;
            height: 100% !important;
            max-width: 90vw !important;
            max-height: 50vh !important;
          }
          
          .album-thumbnail img,
          .image-thumbnail img {
            min-width: 100px !important;
            min-height: 75px !important;
            max-width: 150px !important;
            max-height: 112px !important;
          }
        }
      `}</style>
      <div
        className="slideshow-container relative w-full overflow-hidden rounded-lg"
        style={{ height: '80vh', minHeight: '300px', maxHeight: '90vh' }}
      >
        {/* Slides */}
        <div
          className="slides-wrapper h-full w-full"
          style={{
            display: 'flex',
            transition: 'transform 0.5s ease-in-out',
            transform: `translateX(-${currentSlideIndex * 100}%)`,
            width: '100%',
          }}
        >          {slides.map((slideHtml, index) => {
            const titleMatch = slideHtml.match(
              /<div style='font-size:20px;font-weight:600;margin-bottom:8px;'>(.*?)<\/div>/,
            );
            const title = titleMatch ? titleMatch[1] : '';

            const processedHtml = slideHtml
              .replace(/background:#222/g, 'background:#f5f5f5')
              .replace(/<div style='font-size:20px;font-weight:600;margin-bottom:8px;'>(.*?)<\/div>/, '');

            // Get the current image key for this slide
            const imageKeys = stepToImageKeys[currentStep] || [];
            const currentImageKey = imageKeys[index];
            
            // Generate description key based on image key
            const descriptionKey = currentImageKey === 'img' 
              ? `${slidesPrefix}.imgDescription` 
              : `${slidesPrefix}.imgDescription${currentImageKey.replace('img', '')}`;
            
            const description = t(descriptionKey);

            return (
              <div
                key={index}
                className="slide flex-shrink-0 flex flex-col justify-center items-center"
                style={{
                  width: '100%',
                  padding: '10px',
                  height: '100%',
                }}
              >
                {/* Title outside of the image container */}
                {title && <div className="slide-title text-center font-semibold text-2xl mb-2">{title}</div>}
                <div
                  className="slide-content w-full flex-1 flex flex-col justify-center items-center"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: processSlideContent(processedHtml),
                  }}
                />
                {/* Description below the image */}
                {description && description !== descriptionKey && (
                  <div className="slide-description text-center text-gray-700 mt-2 px-4" style={{ fontSize: '16px', lineHeight: '1.4' }}>
                    {description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InteractiveSlideshow;
