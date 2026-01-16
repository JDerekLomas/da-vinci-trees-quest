import { useState, useEffect, useMemo, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';
import interactive0Config from '../configs/interactive-0';
import './interactive-0.css';
import { ArrowLeft, ArrowRight } from './common-icons';

interface Payload {
  target: string;
  step: number;
}

const SlimePresentation = () => {
  const { t } = useTranslations();

  const { dialogIndex } = useGameContext();
  const { payload } = useEventListener('interactive0') as { payload: Payload };

  const [currentSlide, setCurrentSlide] = useState(dialogIndex === 1 ? 0 : interactive0Config.slides.length - 1);
  const [animationKey, setAnimationKey] = useState(0);

  const [isSlideOverviewFocused, setIsSlideOverviewFocused] = useState(false);

  const currentStep = useRef(0);

  const { slimeVarieties, slimeProperties, year1Data, year2Data, slides } = interactive0Config;

  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // handle slide change
  useEffect(() => {
    if (payload && payload.step) {
      currentStep.current = payload.step - 1;
      setCurrentSlide(payload.step - 1); // 0-based index
    }
  }, [payload]);

  // Function to generate slide overview text
  const getSlideOverview = (slideIndex: number) => {
    const slide = slides[slideIndex];
    const { translations } = slide || {};

    switch (slide?.id) {
      case 'title-slide':
        return `${t(translations?.heading || '')} - ${t(translations?.description || '')}. ${t('scenes.S4.S4_D0_FX_C9.slideOverviewIntro')} ${t(translations?.presentedBy || '')}. ${t('scenes.S4.S4_D0_FX_C9.keyAreasInclude')} ${t(translations?.label1 || '')}, ${t(translations?.label2 || '')}, ${t('scenes.S4.S4_D0_FX_C9.and')} ${t(translations?.label3 || '')}.`;

      case 'product-slide':
        return `${t(translations?.heading || '')} - ${t(translations?.subheading || '')}. ${t('scenes.S4.S4_D0_FX_C9.featuresKeyProperties')} ${slimeProperties.length} ${t('scenes.S4.S4_D0_FX_C9.keyProperties')} ${slimeProperties.map((p) => t(p.heading)).join(', ')}. ${t('scenes.S4.S4_D0_FX_C9.availableIn')} ${slimeVarieties.length} ${t('scenes.S4.S4_D0_FX_C9.varietiesIncluding')} ${slimeVarieties
          .slice(0, 4)
          .map((v) => t(v.name))
          .join(', ')}.`;

      case 'year1-slide':
        return `${t(translations?.heading || '')} - ${t('scenes.S4.S4_D0_FX_C9.firstYearResults')} ${year1Data.unitsSold} ${t(translations?.jarsTotal || '')}, $${year1Data.revenue} ${t(translations?.totalSales || '')}, $${year1Data.costs} ${t(translations?.materials || '')}, $${year1Data.profit} ${t(translations?.netIncome || '')}. ${t(translations?.jarDescription || '')}`;

      case 'year2-slide':
        return `${t(translations?.heading || '')} - ${t('scenes.S4.S4_D0_FX_C9.growthComparison')} ${t(translations?.year1 || '')} ${t('scenes.S4.S4_D0_FX_C9.had')} ${year1Data.unitsSold} ${t('scenes.S4.S4_D0_FX_C9.units')} ${t('scenes.S4.S4_D0_FX_C9.and')} $${year1Data.revenue} ${t('scenes.S4.S4_D0_FX_C9.revenue')}. ${t(translations?.year2 || '')} ${t('scenes.S4.S4_D0_FX_C9.achieved')} ${year2Data.unitsSold}+ ${t('scenes.S4.S4_D0_FX_C9.units')} ${t('scenes.S4.S4_D0_FX_C9.and')} $${year2Data.revenue} ${t('scenes.S4.S4_D0_FX_C9.revenue')}. ${t(translations?.graphDescription || '')}`;

      case 'online-slide':
        return `${t(translations?.heading || '')} - ${t('scenes.S4.S4_D0_FX_C9.twoStrategiesCompared')} ${t(translations?.strategyTitle1 || '')} ${t('scenes.S4.S4_D0_FX_C9.with')} ${t(translations?.strategyCost1 || '')} ${t('scenes.S4.S4_D0_FX_C9.and')} ${t(translations?.strategyTitle2 || '')} ${t('scenes.S4.S4_D0_FX_C9.with')} ${t(translations?.strategyCost2 || '')}. ${t('scenes.S4.S4_D0_FX_C9.videoPerformanceShows')} ${t('scenes.S4.S4_D0_FX_C9.thousandPlus')} ${t(translations?.videoPerformanceMatric1 || '')}, ${t('scenes.S4.S4_D0_FX_C9.percent')} ${t(translations?.videoPerformanceMatric2 || '')}, ${t('scenes.S4.S4_D0_FX_C9.and')} ${t('scenes.S4.S4_D0_FX_C9.fiveHundredPlus')} ${t(translations?.videoPerformanceMatric3 || '')}. ${t(translations?.opportunityDescription || '')}`;

      default:
        return `${t('scenes.S4.S4_D0_FX_C9.slideOf')} ${slideIndex + 1} ${t('scenes.S4.S4_D0_FX_C9.of')} ${slides.length}`;
    }
  };

  // Slide content components
  const TitleSlide = () => {
    const { translations } = slides.find((slide) => slide.id === 'title-slide') || {};
    const { heading, presentedBy, description, label1, label2, label3 } = translations || {};
    return (
      <div className="flex flex-col justify-center items-center relative py-8 flex-grow">
        {/* Animated Background */}
        <div
          key={`bg-${animationKey}`}
          className="w-full h-full absolute"
          style={{
            background: 'linear-gradient(45deg, #7c3aed, #1d4ed8, #0f766e)',
            backgroundSize: '100% 100%',
            animation: 'gradientShift 8s ease infinite',
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-yellow-300 rounded-full opacity-40"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`,
                animationName: 'bounce',
                animationDuration: `${3 + Math.random() * 2}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content with Animation */}
        <div
          key={`content-${animationKey}`}
          className="relative z-10 text-center text-white"
          style={{ animation: 'fadeInUp 1s ease-out' }}
        >
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div
                className="w-full h-full bg-gradient-to-br from-purple-300 via-pink-300 to-indigo-400 rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
                style={{ animation: 'spinSlow 15s linear infinite' }}
              >
                <span className="text-6xl" role="img" aria-label="slime blob">
                  🟣
                </span>
              </div>
              <div
                className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center"
                style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}
              >
                <span className="text-lg" role="img" aria-label="sparkles">
                  ✨
                </span>
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
            {t(heading!)}
          </h2>

          <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-6 m-8 border border-white border-opacity-30">
            <p className="text-2xl md:text-3xl font-bold mb-3 text-yellow-200">{t(presentedBy!)}</p>
            <p className="text-lg md:text-xl text-white">{t(description!)}</p>
          </div>

          <div className="flex justify-center text-lg flex-wrap gap-2">
            <div className="px-4 py-3 bg-black bg-opacity-40 rounded-full backdrop-blur-sm border border-white border-opacity-30">
              <span role="img" aria-label="rainbow">
                🌈
              </span>{' '}
              {t(label1!)}
            </div>
            <div className="px-4 py-3 bg-black bg-opacity-40 rounded-full backdrop-blur-sm border border-white border-opacity-30">
              <span role="img" aria-label="chart">
                📈
              </span>{' '}
              {t(label2!)}
            </div>
            <div className="px-4 py-3 bg-black bg-opacity-40 rounded-full backdrop-blur-sm border border-white border-opacity-30">
              <span role="img" aria-label="target">
                🎯
              </span>{' '}
              {t(label3!)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProductSlide = () => {
    const { translations } = slides.find((slide) => slide.id === 'product-slide') || {};
    const { heading, subheading, varietyTitle } = translations || {};
    return (
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 flex flex-col gap-4 flex-grow">
        <div className="text-center flex flex-col gap-2 mt-6">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">{t(heading!)}</h2>
          <p className="text-lg md:text-2xl text-gray-700">{t(subheading!)}</p>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {slimeProperties.map((property, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-3xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
            >
              <div className="text-4xl md:text-6xl mb-2 md:mb-4" role="img" aria-label="girl playing">
                {property.emoji}
              </div>
              <div className={`md:text-lg font-bold ${property.color} mb-1 md:mb-2`}>{t(property.heading)}</div>
              <div
                className={`w-full h-2 md:h-3 bg-gradient-to-r ${property.backgroundColor} rounded-full mb-1 md:mb-2`}
              ></div>
              <div className="md:text-base text-gray-600">{t(property.description)}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-xl">
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-4">{t(varietyTitle!)}</h2>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
            {slimeVarieties.map((variety, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${variety.color} p-3 md:p-4 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <div className="text-2xl md:text-3xl mb-1 md:mb-2" role="img" aria-label={variety.name}>
                  {variety.emoji}
                </div>
                <div className="font-bold">{t(variety.name)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const Year1Slide = () => {
    const { translations } = slides.find((slide) => slide.id === 'year1-slide') || {};
    const {
      heading,
      unitsSold,
      revenue,
      costs,
      profit,
      jarsTotal,
      totalSales,
      materials,
      netIncome,
      jarHeading,
      jarDescription,
    } = translations || {};
    return (
      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 flex-grow flex flex-col gap-4">
        <div className="text-center mt-6">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t(heading!)}</h1>
          <div className="w-24 h-2 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full bg-white rounded-3xl p-4 shadow-xl text-center border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300">
            <div className="md:text-gray-600 mb-2 text-xl font-bold">{t(unitsSold!)}</div>
            <div className="text-2xl md:text-4xl font-black text-blue-600 mb-1 md:mb-2">{year1Data.unitsSold}</div>
            <div className="md:text-gray-500">{t(jarsTotal!)}</div>
          </div>

          <div className="w-full bg-white rounded-3xl p-4 shadow-xl text-center border-l-4 border-green-500 transform hover:scale-105 transition-all duration-300">
            <div className="md:text-gray-600 mb-2 text-xl font-bold">{t(revenue!)}</div>
            <div className="text-2xl md:text-4xl font-black text-green-600 mb-1 md:mb-2">${year1Data.revenue}</div>
            <div className="md:text-gray-500">{t(totalSales!)}</div>
          </div>

          <div className="w-full bg-white rounded-3xl p-4 shadow-xl text-center border-l-4 border-orange-500 transform hover:scale-105 transition-all duration-300">
            <div className="md:text-gray-600 mb-2 text-xl font-bold">{t(costs!)}</div>
            <div className="text-2xl md:text-4xl font-black text-orange-600 mb-1 md:mb-2">${year1Data.costs}</div>
            <div className="md:text-gray-500">{t(materials!)}</div>
          </div>

          <div className="w-full bg-white rounded-3xl p-4 shadow-xl text-center border-l-4 border-purple-500 transform hover:scale-105 transition-all duration-300">
            <div className="md:text-gray-600 mb-2 text-xl font-bold">{t(profit!)}</div>
            <div className="text-2xl md:text-4xl font-black text-purple-600 mb-1 md:mb-2">${year1Data.profit}</div>
            <div className="md:text-gray-500">{t(netIncome!)}</div>
          </div>
        </div>
        <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-black mb-2 md:mb-4">{t(jarHeading!)}</div>
          <div className="text-lg md:text-xl opacity-90">{t(jarDescription!)}</div>
        </div>
      </div>
    );
  };

  const Year2Slide = () => {
    const { translations } = slides.find((slide) => slide.id === 'year2-slide') || {};
    const {
      heading,
      year1,
      year2,
      unitsSold,
      revenue,
      profit,
      graphTitle,
      xAxisLabel,
      yAxisLabel,
      graphDescription,
    } = translations || {};
    const revenueTimelineData = [
      { period: '1', revenue: 20, color: '#ef4444' },
      { period: '1.25', revenue: 150, color: '#f97316' },
      { period: '1.5', revenue: 500, color: '#eab308' },
      { period: '1.75', revenue: 1200, color: '#84cc16' },
      { period: '2', revenue: 2000, color: '#10b981' },
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-2 rounded-lg shadow-md border border-gray-200 text-start">
            <p>{`${t(xAxisLabel!)}: ${label}`}</p>
            <p>{`${t(revenue!)}: $${payload[0].value}`}</p>
          </div>
        );
      }
      return null;
    };

    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 flex-grow flex flex-col gap-8">
        <div className="text-center mt-6">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t(heading!)}</h1>
          <div className="w-24 h-2 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-4 shadow-md border border-red-400">
            <h2 className="text-lg font-semibold text-red-900 mb-3 pb-2 border-b border-red-400">{t(year1!)}</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-red-800">{t(unitsSold!)}</span>
                <span className="text-xl font-bold text-red-900">{year1Data.unitsSold}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-800">{t(revenue!)}</span>
                <span className="text-xl font-bold text-red-900">${year1Data.revenue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-800">{t(profit!)}</span>
                <span className="text-xl font-bold text-red-900">${year1Data.profit}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-4 shadow-md border border-green-400">
            <h2 className="text-lg font-semibold text-green-900 mb-3 pb-2 border-b border-green-400">
              {t(year2!)}
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-green-800">{t(unitsSold!)}</span>
                <span className="text-xl font-bold text-green-900">{year2Data.unitsSold}+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-800">{t(revenue!)}</span>
                <span className="text-xl font-bold text-green-900">${year2Data.revenue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-800">{t(profit!)}</span>
                <span className="text-xl font-bold text-green-900">${year2Data.profit}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-6">{t(graphTitle!)}</h2>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueTimelineData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis
                  dataKey="period"
                  interval={0}
                  label={{ value: t(xAxisLabel!), position: 'insideBottom', offset: -10 }}
                />
                <YAxis
                  label={{
                    value: t(yAxisLabel!),
                    angle: -90,
                    offset: -10,
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: '#6b7280' },
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                  {revenueTimelineData.map((data, index) => {
                    return <Cell key={`cell-${index}`} fill={data.color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-lg md:text-xl font-bold text-green-600">{t(graphDescription!)}</div>
        </div>
      </div>
    );
  };

  const OnlineSlide = () => {
    const { translations } = slides.find((slide) => slide.id === 'online-slide') || {};
    const {
      heading,
      strategyTitle1,
      strategyHeading1,
      strategySubheading1,
      strategyDescription1,
      strategyCost1,
      strategyTitle2,
      strategyHeading2,
      strategySubheading2,
      strategyDescription2,
      strategyCost2,
      videoPerformanceHeading,
      videoPerformanceMatric1,
      videoPerformanceMatric2,
      videoPerformanceMatric3,
      opportunityHeading,
      opportunityDescription,
      opportunityAction,
    } = translations || {};
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 flex-grow flex flex-col gap-8">
        <div className="text-center mt-6">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t(heading!)}</h1>
          <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl text-center hover:shadow-2xl transition-all duration-300">
            <div className="text-6xl md:text-8xl mb-4" role="img" aria-label={t(strategyTitle1 ?? '')}>
              🚜
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">{t(strategyTitle1!)}</h2>
            <div className="bg-green-100 p-4 rounded-2xl mb-4">
              <div className="md:text-lg font-bold text-green-900">{t(strategyHeading1!)}</div>
              <div className="md:text-base text-green-700">{t(strategySubheading1!)}</div>
            </div>
            <div className="md:text-base text-gray-600">{t(strategyDescription1!)}</div>
            <div className="font-bold pt-2">{t(strategyCost1!)}</div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl text-center hover:shadow-2xl transition-all duration-300">
            <div className="text-6xl md:text-8xl mb-4" role="img" aria-label={t(strategyTitle2 ?? '')}>
              🎥
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-purple-800 mb-4">{t(strategyTitle2!)}</h2>
            <div className="bg-purple-100 p-4 rounded-2xl mb-4">
              <div className="md:text-lg font-bold text-purple-900">{t(strategyHeading2!)}</div>
              <div className="md:text-base text-purple-700">{t(strategySubheading2!)}</div>
            </div>
            <div className="md:text-base text-gray-600">{t(strategyDescription2!)}</div>
            <div className="font-bold pt-2">{t(strategyCost2!)}</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-6 md:p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{t(videoPerformanceHeading!)}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-black mb-2">12,000+</div>
                <div className="md:text-lg opacity-90">{t(videoPerformanceMatric1!)}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-black mb-2">85%</div>
                <div className="md:text-lg opacity-90">{t(videoPerformanceMatric2!)}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-black mb-2">500+</div>
                <div className="md:text-lg opacity-90">{t(videoPerformanceMatric3!)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 md:p-8 text-white text-center mb-8">
          <div className="text-2xl md:text-3xl font-bold mb-4">{t(opportunityHeading!)}</div>
          <div className="text-lg md:text-2xl mb-4">{t(opportunityDescription!)}</div>
          <div className="mt-6">
            <div className="inline-block bg-white text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-lg md:text-xl">
              {t(opportunityAction!)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const slideComponents = useMemo(() => [TitleSlide, ProductSlide, Year1Slide, Year2Slide, OnlineSlide], []);
  const CurrentSlideComponent = slideComponents[currentSlide];

  return (
    <div className="w-full relative flex flex-col gap-4 pb-4">
      {/* Scrollable content area */}
      <div className="min-h-[calc(100vh-13rem)] flex flex-col relative">
        {/* Invisible focus button for slide overview */}
        <button
          className="absolute top-4 left-4 w-8 h-8 opacity-0 focus:opacity-100 focus:bg-blue-500 focus:rounded-full focus:outline-2 focus:outline-blue-600 focus:outline-offset-2 z-50"
          onFocus={() => setIsSlideOverviewFocused(true)}
          onBlur={() => setIsSlideOverviewFocused(false)}
          aria-label={`Slide ${currentSlide + 1} overview: ${getSlideOverview(currentSlide)}`}
          tabIndex={0}
        >
          <span className="sr-only">Press to hear slide overview</span>
        </button>
        {/* Visual indicator when slide overview is focused */}
        {isSlideOverviewFocused && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 pointer-events-none">
            <div className="text-sm font-semibold">
              Slide {currentSlide + 1} of {slides.length}
            </div>
            <div className="text-xs opacity-90">Press Tab to continue</div>
          </div>
        )}{' '}
        <CurrentSlideComponent />
      </div>

      {/* Fixed navigation at bottom */}
      <div className="flex justify-between">
        <button
          onClick={prevSlide}
          aria-label={t('dialog..button.back')}
          disabled={currentSlide === 0}
          className={`px-2 py-1 lg:px-4 lg:py-2 rounded text-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white ${
            currentSlide === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#006BE0] hover:bg-blue-600'
          }`}
        >
          <ArrowLeft className={''}></ArrowLeft>
        </button>

        <div className="flex space-x-3 mt-2">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                index === currentSlide ? 'bg-[#006BE0] scale-125' : 'bg-gray-400 bg-opacity-40 hover:bg-opacity-60'
              }`}
              aria-label={`Go to slide ${index + 1}: ${slide?.id || 'slide'}`}
              disabled={index > currentStep.current}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label={t('dialog..button.next')}
          disabled={currentSlide === currentStep.current}
          className={`px-2 py-1 lg:px-4 lg:py-2 rounded text-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 text-white ${
            currentSlide === currentStep.current
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#006BE0] hover:bg-blue-600'
          }`}
        >
          <ArrowRight className={''}></ArrowRight>
        </button>
      </div>
    </div>
  );
};

export default SlimePresentation;
