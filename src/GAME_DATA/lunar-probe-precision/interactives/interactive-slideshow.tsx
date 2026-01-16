import React, { useState, useEffect } from 'react';
import { useTranslations } from '../../../hooks/useTranslations';
import { ImageSlideshowInteraction } from './interface';
import { useEventListener } from '../../../hooks/useEventListener';

const processSlideContent = (htmlContent: string): string => {
  return htmlContent
    .replace(/width:\s*\d+px/g, 'width: 100%')
    .replace(/height:\s*\d+px/g, 'height: auto')
    .replace(/border-radius:\s*\d+px/g, 'border-radius: 0')
    .replace(
      /style='([^']*display:flex[^']*width:\s*760px[^']*height:\s*520px[^']*)'/g,
      "style='display:flex;align-items:center;justify-content:center;width:100%;height:100%;overflow:hidden;background:#000;'",
    )
    .replace(
      /style='([^']*display:flex[^']*width:\s*900px[^']*height:\s*650px[^']*)'/g,
      "style='display:flex;align-items:center;justify-content:center;width:100%;height:100%;overflow:hidden;background:#000;'",
    )
    // here is the important part for the <img> itself
    .replace(
      /style='([^']*max-width:100%;max-height:100%[^']*)'/g,
      "style='width:auto;height:auto;max-width:100%;max-height:100%;object-fit:contain;object-position:center;background:#000;display:block;margin:0 auto;'",
    );
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

  const slidesPrefix = interaction.slidesPrefix || 'scenes.S2.S2_D0_FSQ2_C0';

  const stepToImageKeys: Record<number, string[]> = {
    1: ['img'],
    2: ['img2'],
    3: ['img3'],
    4: ['img4'],
    5: ['img5'],
    6: ['img6'],
    7: ['img7'],
    8: ['img8'],
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

  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(autoScrollInterval);
  }, [slides.length]);

  return (
    <div className="slideshow-wrapper">
      <style>{`
        .slideshow-wrapper img {
          display: block !important;
          margin: 0 auto !important;

          /* let the wrapper control max size */
          width: auto !important;
          height: auto !important;
          max-width: 100% !important;
          max-height: 100% !important;

          object-fit: contain !important;
          object-position: center !important;
        }

        .slide-media {
          flex: 1;
          min-height: 0;        /* important in flex layouts */
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000;
        }
        
        .slide-content > div {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .slide-content > div > div {
          max-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .slideshow-container {
          position: relative;
          width: 100%;
          height: 80vh;
          min-height: 300px;
          max-height: 90vh;
          overflow: hidden;
          border-radius: 0;
          background: #000;
        }
        
        .slide {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column; /* text on top, image below */
        }

        .slide-media-inner {
          width: 100%;
          height: 100%;
          max-width: 900px;   /* adjust as you like */
          max-height: 600px;  /* adjust as you like */
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        /* slide-content just fills that inner box */
        .slide-content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .slide-text {
          padding: 24px 32px 16px;
          background: #000;
          z-index: 10;
          flex-shrink: 0;
        }

        .slide-media {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000;
        }

        .slideshow-wrapper div[style*="background:#222"] {
          background: #000 !important;
        }
        
        .slide-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 24px 32px;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.85) 0%,
            rgba(0, 0, 0, 0.6) 40%,
            transparent 100%
          );
          z-index: 10;
          pointer-events: none;
          display: none;
        }
        
        .slide-title {
          color: white;
          font-size: 32px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 16px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
        }
        
        .slide-description {
          color: white;
          font-size: 18px;
          line-height: 1.6;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        }
        
        @media (max-width: 768px) {
          .slideshow-container {
            height: 65vh;
            min-height: 600px !important;
          }
          
          .slide-overlay {
            padding: 16px 24px;
          }
          
          .slide-title {
            font-size: 22px;
            margin-bottom: 10px;
          }
          
          .slide-description {
            font-size: 15px;
            line-height: 1.5;
          }
        }
        
        @media (max-width: 480px) {
          .slideshow-container {
            height: 60vh;
            min-height: 500px !important;
          }
          
          .slide-overlay {
            padding: 12px 16px;
          }
          
          .slide-title {
            font-size: 18px;
            margin-bottom: 8px;
          }
          
          .slide-description {
            font-size: 13px;
            line-height: 1.4;
          }
        }
      `}</style>
      <div
        className="slideshow-container relative w-full overflow-hidden rounded-lg"
        style={{ height: '65vh', minHeight: '850px', maxHeight: '90vh' }}
      >
        {/* Slides */}
        <div
          className="slides-wrapper h-full w-full"
          style={{
            display: 'flex',
            transition: 'transform 0.5s ease-in-out',
            transform: `translateX(-${currentSlideIndex * 100}%)`,
            width: '100%',
            height: '100%',
          }}
        >
          {slides.map((slideHtml, index) => {
            const titleMatch = slideHtml.match(
              /<div style='font-size:20px;font-weight:600;margin-bottom:8px;'>(.*?)<\/div>/,
            );
            const title = titleMatch ? titleMatch[1] : '';

            const processedHtml = slideHtml
              .replace(/<div style='font-size:20px;font-weight:600;margin-bottom:8px;'>(.*?)<\/div>/, '')
              .replace(
                /<div style='display:flex;justify-content:center;align-items:center;margin-top:16px;gap:8px;'>.*?<\/div>/,
                '',
              );

            const imageKeys = stepToImageKeys[currentStep] || [];
            const currentImageKey = imageKeys[index];

            const descriptionKey =
              currentImageKey === 'img'
                ? `${slidesPrefix}.imgDescription`
                : `${slidesPrefix}.imgDescription${currentImageKey.replace('img', '')}`;

            const description = t(descriptionKey);

            {
              return (
                <div key={index} className="slide flex-shrink-0">
                  {/* TEXT FIRST: title + subtitle */}
                  <div className="slide-text">
                    {title && <div className="slide-title">{title}</div>}
                    {description && description !== descriptionKey && (
                      <div className="slide-description">{description}</div>
                    )}
                  </div>

                  {/* THEN THE IMAGE / HTML CONTENT */}
                  <div className="slide-media">
                    <div className="slide-media-inner">
                      <div
                        className="slide-content"
                        dangerouslySetInnerHTML={{
                          __html: processSlideContent(processedHtml),
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            }

          })}

        </div>
      </div>
    </div>
  );
};

export default InteractiveSlideshow;
