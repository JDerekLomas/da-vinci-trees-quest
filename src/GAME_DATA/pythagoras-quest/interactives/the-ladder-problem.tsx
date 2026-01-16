import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';
import { TheLadderProblemProps, LadderProblemPayload } from './interface';
import InfoPopover from './info-popover';
import parse from 'html-react-parser';

const LadderProblem: React.FC<TheLadderProblemProps> = ({ interaction }) => {
  const { t } = useTranslations();
  const { translations } = interaction;
  const { payload } = useEventListener('the-ladder-problem') as { payload: LadderProblemPayload };
  const { interactiveResponses, setInteractiveResponses } = useGameContext();

  // Determine current step (default to step 1 if no payload)
  const currentStep = payload?.step || 1;

  // Info popover state
  const [isInfoPopoverOpen, setIsInfoPopoverOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const infoButtonRef = useRef<HTMLDivElement>(null);

  // Get saved state for step 2 challenge
  const savedState =
    interactiveResponses?.the_ladder_problem && typeof interactiveResponses?.the_ladder_problem === 'object'
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (interactiveResponses?.the_ladder_problem as any)
      : undefined;

  // Step 1: Ladder Problem State
  const [ladderLength, setLadderLength] = useState(17);
  const [distanceFromWall, setDistanceFromWall] = useState(8);
  const [distanceFeedback, setDistanceFeedback] = useState('');

  // Step 2: Coordinate Distance Challenge State
  const [challengeStep, setChallengeStep] = useState(savedState?.challengeStep || 'deltaX');
  const [deltaXValue, setDeltaXValue] = useState(savedState?.deltaXValue || '');
  const [deltaYValue, setDeltaYValue] = useState(savedState?.deltaYValue || '');
  const [hypotenuseValue, setHypotenuseValue] = useState(savedState?.hypotenuseValue || '');
  const [feedbackMessage, setFeedbackMessage] = useState(savedState?.feedbackMessage || '');
  const [feedbackColor, setFeedbackColor] = useState(savedState?.feedbackColor || '');
  const [showDeltaX, setShowDeltaX] = useState(savedState?.showDeltaX || false);
  const [showDeltaY, setShowDeltaY] = useState(savedState?.showDeltaY || false);
  const [showHypotenuse, setShowHypotenuse] = useState(savedState?.showHypotenuse || false);

  // Step 2 Constants
  const PADDING = 30;
  const GRID_SIZE = 25;
  const MAX_X = 12;
  const MAX_Y = 9;
  const SVG_WIDTH = MAX_X * GRID_SIZE + PADDING * 2;
  const SVG_HEIGHT = MAX_Y * GRID_SIZE + PADDING * 2;

  const HARBOR = { x: 2, y: 1, label: t(translations.harbor) };
  const MARKET = { x: 10, y: 7, label: t(translations.market) };

  // Correct answers for step 2
  const correctDeltaX = Math.abs(MARKET.x - HARBOR.x); // 8
  const correctDeltaY = Math.abs(MARKET.y - HARBOR.y); // 6
  const correctHypotenuse = Math.sqrt(correctDeltaX ** 2 + correctDeltaY ** 2); // 10

  const heightOnWall = Math.sqrt(ladderLength * ladderLength - distanceFromWall * distanceFromWall);

  // Update slider background styling with accessible colors
  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007BFF ${percent}%, #949494 ${percent}%)`;
  }, []);

  useEffect(() => {
    const ladderSlider = document.getElementById('slider-ladderLength') as HTMLInputElement;
    const distanceSlider = document.getElementById('slider-distanceFromWall') as HTMLInputElement;

    if (ladderSlider) updateSliderBackground(ladderSlider);
    if (distanceSlider) updateSliderBackground(distanceSlider);
  }, [ladderLength, distanceFromWall, updateSliderBackground, currentStep]);

  // Save step 2 challenge state to interactiveResponses
  useEffect(() => {
    if (!setInteractiveResponses) return;

    const currentState = {
      challengeStep,
      deltaXValue,
      deltaYValue,
      hypotenuseValue,
      feedbackMessage,
      feedbackColor,
      showDeltaX,
      showDeltaY,
      showHypotenuse,
    };

    setInteractiveResponses((prev) => ({
      ...prev,
      the_ladder_problem: currentState,
    }));
  }, [
    challengeStep,
    deltaXValue,
    deltaYValue,
    hypotenuseValue,
    feedbackMessage,
    feedbackColor,
    showDeltaX,
    showDeltaY,
    showHypotenuse,
    setInteractiveResponses,
  ]);

  const handleLadderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newLength = parseFloat(e.target.value);
      const maxAllowedDistance = newLength - 0.5;

      // Only update ladder length if it doesn't violate current distance
      if (distanceFromWall <= maxAllowedDistance) {
        setLadderLength(newLength);
        setDistanceFeedback(''); // Clear any existing feedback
        updateSliderBackground(e.target as HTMLInputElement);
      } else {
        // Don't allow ladder length to go below what would make current distance invalid
        const minRequiredLength = distanceFromWall + 0.5;
        e.target.value = minRequiredLength.toString();
        setLadderLength(minRequiredLength);
        updateSliderBackground(e.target as HTMLInputElement);

        setDistanceFeedback(t(translations.ladderFeedback));
      }
    },
    [distanceFromWall, t, translations.ladderFeedback, updateSliderBackground],
  );

  const handleDistanceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDistance = parseFloat(e.target.value);
      const maxAllowedDistance = ladderLength - 0.5;

      if (newDistance <= maxAllowedDistance) {
        setDistanceFromWall(newDistance);
        setDistanceFeedback(''); // Clear feedback when moving to valid range
        updateSliderBackground(e.target as HTMLInputElement);
      } else {
        // Don't update the value, keep it at max allowed
        e.target.value = maxAllowedDistance.toString();
        setDistanceFromWall(maxAllowedDistance);
        updateSliderBackground(e.target as HTMLInputElement);

        // Show persistent feedback message
        setDistanceFeedback(t(translations.distanceFeedback));
      }
    },
    [ladderLength, t, translations.distanceFeedback, updateSliderBackground],
  );

  // Info button click handler
  const handleInfoClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + 10,
    });
    setIsInfoPopoverOpen(true);
  };

  // Step 2: Coordinate Distance Challenge Functions
  const toSvgCoords = (x: number, y: number) => ({
    x: PADDING + x * GRID_SIZE,
    y: SVG_HEIGHT - PADDING - y * GRID_SIZE,
  });

  const handleCheck = () => {
    if (challengeStep === 'deltaX') {
      const userDeltaX = parseFloat(deltaXValue);

      if (userDeltaX === correctDeltaX) {
        setFeedbackMessage(t(translations.deltaXCorrect));
        setFeedbackColor('#16a34a');
        setShowDeltaX(true);
        setTimeout(() => {
          setChallengeStep('deltaY');
          setFeedbackMessage('');
        }, 1500);
      } else {
        setFeedbackMessage(t(translations.deltaXIncorrect));
        setFeedbackColor('#dc2626');
      }
    } else if (challengeStep === 'deltaY') {
      const userDeltaY = parseFloat(deltaYValue);

      if (userDeltaY === correctDeltaY) {
        setFeedbackMessage(t(translations.deltaYCorrect));
        setFeedbackColor('#16a34a');
        setShowDeltaY(true);
        setTimeout(() => {
          setChallengeStep('hypotenuse');
          setFeedbackMessage('');
        }, 1500);
      } else {
        setFeedbackMessage(t(translations.deltaYIncorrect));
        setFeedbackColor('#dc2626');
      }
    } else if (challengeStep === 'hypotenuse') {
      const userHypotenuse = parseFloat(hypotenuseValue);
      if (userHypotenuse === correctHypotenuse) {
        setFeedbackMessage(t(translations.hypotenuseCorrect));
        setFeedbackColor('#16a34a');
        setShowHypotenuse(true);
        setChallengeStep('done');
      } else {
        setFeedbackMessage(t(translations.hypotenuseIncorrect));
        setFeedbackColor('#dc2626');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  // Get info content based on current step
  const getInfoContent = () => {
    if (currentStep === 1) {
      return t(translations.problem1InfoBody);
    } else {
      return t(translations.problem2InfoBody);
    }
  };

  const getInfoHeading = () => {
    if (currentStep === 1) {
      return t(translations.problem1InfoHeading);
    } else {
      return t(translations.problem2InfoHeading);
    }
  };

  // Generate data for the triangle visualization with right angle marker (Step 1)
  const chartData = useMemo(() => {
    const data = [];

    // Ground line (x-axis from 0 to distance) - exclude endpoints to avoid overlap
    for (let x = 0.1; x < distanceFromWall; x += 0.1) {
      data.push({
        x: x,
        ground: 0,
        wall: null,
        ladder: null,
      });
    }

    // Wall line (y-axis from 0 to height) - exclude endpoints to avoid overlap
    for (let y = 0.1; y < heightOnWall; y += 0.1) {
      data.push({
        x: 0,
        ground: null,
        wall: y,
        ladder: null,
      });
    }

    // Add corner points separately to avoid conflicts
    data.push({
      x: 0,
      ground: 0,
      wall: 0,
      ladder: null,
    });

    data.push({
      x: distanceFromWall,
      ground: 0,
      wall: null,
      ladder: null,
    });

    data.push({
      x: 0,
      ground: null,
      wall: heightOnWall,
      ladder: null,
    });

    // Ladder line (diagonal from (distance, 0) to (0, height)) - clean diagonal
    for (let t = 0; t <= 1; t += 0.01) {
      const x = distanceFromWall * (1 - t);
      const y = heightOnWall * t;
      data.push({
        x: x,
        ground: null,
        wall: null,
        ladder: y,
      });
    }

    // Right angle marker - small square at the corner
    const markerSize = Math.min(distanceFromWall, heightOnWall) * 0.1; // 10% of the smaller side
    const markerSteps = 20;

    // Bottom side of right angle marker
    for (let i = 0; i <= markerSteps; i++) {
      const x = (i / markerSteps) * markerSize;
      data.push({
        x: x,
        ground: null,
        wall: null,
        ladder: null,
        rightAngle: markerSize,
      });
    }

    // Right side of right angle marker
    for (let i = 0; i <= markerSteps; i++) {
      const y = (i / markerSteps) * markerSize;
      data.push({
        x: markerSize,
        ground: null,
        wall: null,
        ladder: null,
        rightAngle: y,
      });
    }

    // Top side of right angle marker
    for (let i = 0; i <= markerSteps; i++) {
      const x = markerSize - (i / markerSteps) * markerSize;
      data.push({
        x: x,
        ground: null,
        wall: null,
        ladder: null,
        rightAngle: markerSize,
      });
    }

    return data;
  }, [distanceFromWall, heightOnWall]);

  const maxAxisValue = Math.max(ladderLength, distanceFromWall, heightOnWall) + 1;
  const maxDistance = 15;

  // Calculate dynamic label positions based on current triangle dimensions
  const getLabelPositions = () => {
    // Chart dimensions and margins
    const chartWidth = 400;
    const chartHeight = 300;
    const margin = { top: 20, right: 30, left: 40, bottom: 60 };

    // Available plot area
    const plotWidth = chartWidth - margin.left - margin.right;
    const plotHeight = chartHeight - margin.top - margin.bottom;

    // Scale factors
    const xScale = plotWidth / maxAxisValue;
    const yScale = plotHeight / maxAxisValue;

    // Calculate positions as percentages of the chart area
    const hLabelX = ((margin.left + 10) / chartWidth) * 100; // Right of vertical line
    const hLabelY = ((margin.top + heightOnWall * yScale - 20) / chartHeight) * 100; // Middle of height

    const dLabelX = ((margin.left + (distanceFromWall / 2) * xScale) / chartWidth) * 100; // Middle of distance
    const dLabelY = ((margin.top + plotHeight + margin.bottom - 40) / chartHeight) * 100; // Below horizontal line

    const lLabelX = ((margin.left + (distanceFromWall / 2) * xScale) / chartWidth) * 100; // Middle of ladder
    const lLabelY = ((margin.top + (heightOnWall / 2) * yScale) / chartHeight) * 100; // Middle of ladder

    return { hLabelX, hLabelY, dLabelX, dLabelY, lLabelX, lLabelY };
  };

  // Step 2: Generate grid lines
  const generateGridLines = () => {
    const lines = [];

    // Vertical lines and labels
    for (let i = 0; i <= MAX_X; i++) {
      const { x: svgX } = toSvgCoords(i, 0);
      lines.push(
        <line
          key={`v-${i}`}
          x1={svgX}
          y1={PADDING}
          x2={svgX}
          y2={SVG_HEIGHT - PADDING}
          className={i === 0 ? 'stroke-gray-400 stroke-2' : 'stroke-gray-300 stroke-1'}
        />,
      );
      if (i > 0) {
        lines.push(
          <text
            key={`vl-${i}`}
            x={svgX}
            y={SVG_HEIGHT - PADDING + 15}
            className="text-sm fill-gray-600 font-medium text-center"
            textAnchor="middle"
          >
            {i}
          </text>,
        );
      }
    }

    // Horizontal lines and labels
    for (let i = 0; i <= MAX_Y; i++) {
      const { y: svgY } = toSvgCoords(0, i);
      lines.push(
        <line
          key={`h-${i}`}
          x1={PADDING}
          y1={svgY}
          x2={SVG_WIDTH - PADDING}
          y2={svgY}
          className={i === 0 ? 'stroke-gray-400 stroke-2' : 'stroke-gray-300 stroke-1'}
        />,
      );
      if (i > 0) {
        lines.push(
          <text
            key={`hl-${i}`}
            x={PADDING - 15}
            y={svgY}
            className="text-sm fill-gray-600 font-medium"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {i}
          </text>,
        );
      }
    }

    return lines;
  };

  // Step 2: Generate points
  const generatePoints = () => {
    const points = [];

    // Harbor point
    const harborCoords = toSvgCoords(HARBOR.x, HARBOR.y);
    points.push(
      <g key="harbor">
        <circle cx={harborCoords.x} cy={harborCoords.y} r={6} fill="#3b82f6" />
        {/* Pill-shaped label */}
        <g>
          <rect
            x={harborCoords.x - 32}
            y={harborCoords.y - 42}
            width={64}
            height={28}
            rx={14}
            ry={14}
            fill="rgba(59, 130, 246, 0.1)"
            stroke="#3b82f6"
            strokeWidth={1}
          />
          <text
            x={harborCoords.x}
            y={harborCoords.y - 32}
            className="text-xs font-medium fill-blue-600"
            textAnchor="middle"
          >
            {HARBOR.label}
          </text>
          <text x={harborCoords.x} y={harborCoords.y - 21} className="text-xs fill-blue-500" textAnchor="middle">
            ({HARBOR.x},{HARBOR.y})
          </text>
        </g>
      </g>,
    );

    // Market point
    const marketCoords = toSvgCoords(MARKET.x, MARKET.y);
    points.push(
      <g key="market">
        <circle cx={marketCoords.x} cy={marketCoords.y} r={6} fill="#ef4444" />
        {/* Pill-shaped label */}
        <g>
          <rect
            x={marketCoords.x - 32}
            y={marketCoords.y - 42}
            width={64}
            height={28}
            rx={14}
            ry={14}
            fill="rgba(239, 68, 68, 0.1)"
            stroke="#ef4444"
            strokeWidth={1}
          />
          <text
            x={marketCoords.x}
            y={marketCoords.y - 32}
            className="text-xs font-medium fill-red-600"
            textAnchor="middle"
          >
            {MARKET.label}
          </text>
          <text x={marketCoords.x} y={marketCoords.y - 21} className="text-xs fill-red-500" textAnchor="middle">
            ({MARKET.x},{MARKET.y})
          </text>
        </g>
      </g>,
    );

    return points;
  };

  // Step 2: Generate triangle components
  const generateTriangleComponents = () => {
    const components = [];
    const p1 = toSvgCoords(HARBOR.x, HARBOR.y);
    const p3 = toSvgCoords(MARKET.x, HARBOR.y);
    const p2 = toSvgCoords(MARKET.x, MARKET.y);

    // Get foot points on axes
    const harborFootX = toSvgCoords(HARBOR.x, 0);
    const marketFootX = toSvgCoords(MARKET.x, 0);
    const harborFootY = toSvgCoords(0, HARBOR.y);
    const marketFootY = toSvgCoords(0, MARKET.y);

    // Show helper lines for Delta X visualization (only when on deltaX step)
    if (challengeStep === 'deltaX') {
      // Vertical line from Harbor to X-axis (foot of blue point)
      components.push(
        <line
          key="harborFootX"
          x1={p1.x}
          y1={p1.y}
          x2={harborFootX.x}
          y2={harborFootX.y}
          stroke="#0061FC"
          strokeWidth={2}
          strokeDasharray="2 2"
          opacity={0.7}
        />,
      );

      // Vertical line from Market to X-axis (foot of red point)
      components.push(
        <line
          key="marketFootX"
          x1={p2.x}
          y1={p2.y}
          x2={marketFootX.x}
          y2={marketFootX.y}
          stroke="#E0002B"
          strokeWidth={2}
          strokeDasharray="2 2"
          opacity={0.7}
        />,
      );

      // Horizontal line showing Delta X (using blue formula color)
      components.push(
        <line
          key="deltaXVisualization"
          x1={harborFootX.x}
          y1={harborFootX.y - 15}
          x2={marketFootX.x}
          y2={marketFootX.y - 15}
          stroke="#DB0072"
          strokeWidth={3}
          opacity={0.8}
        />,
      );
    }

    // Show helper lines for Delta Y visualization (only when on deltaY step)
    if (challengeStep === 'deltaY') {
      // Horizontal line from Harbor to Y-axis (foot of blue point)
      components.push(
        <line
          key="harborFootY"
          x1={p1.x}
          y1={p1.y}
          x2={harborFootY.x}
          y2={harborFootY.y}
          stroke="#0061FC"
          strokeWidth={2}
          strokeDasharray="2 2"
          opacity={0.7}
        />,
      );

      // Horizontal line from Market to Y-axis (foot of red point)
      components.push(
        <line
          key="marketFootY"
          x1={p2.x}
          y1={p2.y}
          x2={marketFootY.x}
          y2={marketFootY.y}
          stroke="#E0002B"
          strokeWidth={2}
          strokeDasharray="2 2"
          opacity={0.7}
        />,
      );

      // Vertical line showing Delta Y (using teal formula color)
      components.push(
        <line
          key="deltaYVisualization"
          x1={PADDING + 15}
          y1={harborFootY.y}
          x2={PADDING + 15}
          y2={marketFootY.y}
          stroke="#8E24AA"
          strokeWidth={3}
          opacity={0.8}
        />,
      );
    }

    // Show hypotenuse line when on step 3
    if (challengeStep === 'hypotenuse') {
      components.push(
        <line
          key="hypotenuseVisualization"
          x1={p1.x}
          y1={p1.y}
          x2={p2.x}
          y2={p2.y}
          stroke="#008217"
          strokeWidth={3}
          opacity={0.9}
        />,
      );
    }

    // Show Delta X (horizontal leg) - only show in step 3 and after
    if (showDeltaX && (challengeStep === 'hypotenuse' || challengeStep === 'done')) {
      components.push(
        <g key="deltaX">
          <line x1={p1.x} y1={p1.y} x2={p3.x} y2={p3.y} stroke="#DB0072" strokeWidth={2} strokeDasharray="4 4" />
          <text
            x={p1.x + (p3.x - p1.x) / 2}
            y={p1.y + 18}
            className="text-sm fill-[#DB0072] font-besley font-bold italic"
            textAnchor="middle"
          >
            {`Δx = ${correctDeltaX}`}
          </text>
        </g>,
      );
    }

    // Show Delta Y (vertical leg) - only show in step 3 and after
    if (showDeltaY && (challengeStep === 'hypotenuse' || challengeStep === 'done')) {
      components.push(
        <g key="deltaY">
          <line x1={p3.x} y1={p3.y} x2={p2.x} y2={p2.y} stroke="#8E24AA" strokeWidth={2} strokeDasharray="4 4" />
          <text
            x={p3.x + 18}
            y={p3.y + (p2.y - p3.y) / 2}
            className="text-sm fill-[#8E24AA] font-besley font-bold italic"
            textAnchor="start"
            dominantBaseline="middle"
          >
            {`Δy = ${correctDeltaY}`}
          </text>
        </g>,
      );
    }

    return components;
  };

  // Step 2: Generate hypotenuse
  const generateHypotenuse = () => {
    if (!showHypotenuse) return null;

    const p1 = toSvgCoords(HARBOR.x, HARBOR.y);
    const p2 = toSvgCoords(MARKET.x, MARKET.y);

    return (
      <line
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        stroke="#008217"
        strokeWidth={3}
        className="drop-shadow-sm"
        style={{
          filter: 'drop-shadow(0 0 5px #008217)',
          transition: 'all 0.3s ease-in-out',
        }}
      />
    );
  };

  // Render Step 1: Ladder Problem
  if (currentStep === 1) {
    return (
      <div className="w-full bg-white text-lg">
        <div className="flex items-center justify-start mb-8">
          <h1 className="text-xl text-slate-800">{parse(t(translations.proof1Title))}</h1>
          <div
            ref={infoButtonRef}
            className="relative flex cursor-pointer ml-2"
            aria-label="Show information about the ladder problem"
            tabIndex={0}
            role="button"
            onClick={handleInfoClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleInfoClick(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }}
            aria-expanded={isInfoPopoverOpen}
            aria-haspopup="dialog"
          >
            <span
              className="w-5 h-5 p-3 rounded-full transition-colors flex items-center justify-center text-white text-m"
              style={{ backgroundColor: '#006BE0', textDecorationLine: 'none' }}
            >
              i
            </span>
          </div>
        </div>
        <div className="w-full flex gap-4 flex-col lg:flex-row">
          <div className="w-full slider-first">
            <label className="block font-bold">
              {t(translations.ladderLengthLabel)}{' '}
              <span className="font-besley">
                (<span className="italic text-[#8E24AA]">l</span>)
              </span>
              : <span className="text-[#8E24AA] font-besley">{ladderLength.toFixed(1)} ft</span>
            </label>
            <div className="relative">
              <input
                type="range"
                min="5"
                max="20"
                step="0.5"
                value={ladderLength}
                id="slider-ladderLength"
                onChange={handleLadderChange}
                className="global-slider w-full"
                aria-valuetext={`${t(translations.ladderLengthSliderLabel)}: ${ladderLength.toFixed(1)} ft`}
                aria-label={t(translations.ladderLengthSliderAriaLabel)}
              />
            </div>
          </div>
          <div className="w-full slider-first">
            <label className="block font-bold">
              {t(translations.distanceFromWallLabel)}{' '}
              <span className="font-besley">
                (<span className="italic text-[#CA8A04]">d</span>)
              </span>
              : <span className="text-[#CA8A04] font-besley">{distanceFromWall.toFixed(1)} ft</span>
            </label>
            <div className="relative">
              <input
                type="range"
                min="1"
                max={maxDistance}
                step="0.5"
                value={distanceFromWall}
                id="slider-distanceFromWall"
                onChange={handleDistanceChange}
                className="global-slider w-full"
                aria-valuetext={`Distance from Wall: ${distanceFromWall.toFixed(1)} ft`}
                aria-label={t(translations.distanceFromWallSliderAriaLabel)}
              />
            </div>
          </div>
        </div>
        {distanceFeedback && (
          <div className="text-sm text-red-600 font-medium text-center mt-4">{distanceFeedback}</div>
        )}
        <div>
          {/* Result Panel */}
          <div className={`p-4 rounded-lg border-2 border-[#006BE2] mt-4`}>
            <div className="gap-6 text-center">
              <div className="flex items-center justify-center gap-x-1">
                <span className="text-base">
                  {/* Height Result Label */}
                  {t(translations.heightOnWallLabel)}{' '}
                  <span className="font-besley font-bold">
                    (<span className="italic text-[#1E40AF]">h</span>)
                  </span>
                  :
                </span>
                <span className="text-xl font-bold text-[#1E40AF] font-besley">{heightOnWall.toFixed(1)} ft</span>
              </div>
              <div className="text-center mt-2">
                <div className="text-lg font-bold font-besley">
                  <span className="text-[#1E40AF] italic">
                    h<sup>2</sup>
                  </span>{' '}
                  +{' '}
                  <span className="text-[#CA8A04] italic">
                    d<sup>2</sup>
                  </span>{' '}
                  ={' '}
                  <span className="text-[#8E24AA] italic">
                    l<sup>2</sup>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Graph Section - Using LineChart */}
          <div className="relative w-full h-[300px] sm:h-[400px] bg-white rounded-lg overflow-visible mt-4">
            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#949494" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    domain={[0, maxAxisValue]}
                    tickCount={8}
                    label={{
                      value: t(translations.distanceFromWallLabel),
                      position: 'insideBottom',
                      offset: -10,
                      style: { textAnchor: 'middle', fill: '#374151', fontSize: '14px' },
                    }}
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis
                    domain={[0, maxAxisValue]}
                    label={{
                      value: t(translations.heightOnWallLabel),
                      angle: -90,
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fill: '#374151', fontSize: '14px' },
                    }}
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />

                  {/* Wall Line - Blue */}
                  <Line
                    type="monotone"
                    dataKey="wall"
                    stroke="#1E40AF"
                    strokeWidth={6}
                    name={t(translations.wall)}
                    dot={false}
                    connectNulls={false}
                    strokeLinecap="round"
                    isAnimationActive={false}
                  />

                  {/* Ground Line - Yellow */}
                  <Line
                    type="monotone"
                    dataKey="ground"
                    stroke="#CA8A04"
                    strokeWidth={6}
                    name={t(translations.ground)}
                    dot={false}
                    connectNulls={false}
                    strokeLinecap="round"
                    isAnimationActive={false}
                  />

                  {/* Ladder Line - Purple */}
                  <Line
                    type="monotone"
                    dataKey="ladder"
                    stroke="#8E24AA"
                    strokeWidth={4}
                    name={t(translations.ladder)}
                    dot={false}
                    connectNulls={false}
                    strokeLinecap="round"
                    isAnimationActive={false}
                  />

                  {/* Right Angle Marker */}
                  <Line
                    type="monotone"
                    dataKey="rightAngle"
                    stroke="#6B7280"
                    strokeWidth={2}
                    name={t(translations.rightAngleMarker)}
                    dot={false}
                    connectNulls={false}
                  />

                  {/* Reference lines for better visualization */}
                  <ReferenceLine x={0} stroke="#6B7280" strokeWidth={1} strokeDasharray="2 2" />
                  <ReferenceLine y={0} stroke="#6B7280" strokeWidth={1} strokeDasharray="2 2" />
                </LineChart>
              </ResponsiveContainer>

              {/* Triangle Side Labels Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="relative w-full h-full">
                  {(() => {
                    const positions = getLabelPositions();
                    return (
                      <>
                        {/* 'h' label for height (wall) - positioned to the right of the vertical line */}
                        <div
                          className="absolute text-2xl font-bold font-besley italic text-[#1E40AF] pointer-events-none"
                          style={{
                            left: `${positions.hLabelX}%`,
                            top: `${positions.hLabelY}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                        >
                          h
                        </div>

                        {/* 'd' label for distance (ground) - positioned above the horizontal line */}
                        <div
                          className="absolute text-2xl font-bold font-besley italic text-[#CA8A04] pointer-events-none"
                          style={{
                            left: `${positions.dLabelX}%`,
                            top: `${positions.dLabelY}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                        >
                          d
                        </div>

                        {/* 'l' label for ladder (hypotenuse) - positioned below the diagonal line */}
                        <div
                          className="absolute text-2xl font-bold font-besley italic text-[#8E24AA] pointer-events-none"
                          style={{
                            left: `${positions.lLabelX}%`,
                            top: `${positions.lLabelY}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                        >
                          l
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* InfoPopover component for Problem 1 */}
        <InfoPopover
          isOpen={isInfoPopoverOpen}
          onClose={() => setIsInfoPopoverOpen(false)}
          content={getInfoContent()}
          heading={getInfoHeading()}
          position={popoverPosition}
          triggerRef={infoButtonRef}
        />
      </div>
    );
  }

  // Render Step 2: Coordinate Distance Challenge
  return (
    <div className="w-full bg-white text-lg">
      <div className="flex items-center justify-start mb-8">
        <h1 className="text-xl text-slate-800">{parse(t(translations.proof2Title))}</h1>
        <div
          ref={infoButtonRef}
          className="relative flex cursor-pointer ml-2"
          aria-label="Show information about the coordinate distance challenge"
          tabIndex={0}
          role="button"
          onClick={handleInfoClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleInfoClick(e as unknown as React.MouseEvent<HTMLDivElement>);
            }
          }}
          aria-expanded={isInfoPopoverOpen}
          aria-haspopup="dialog"
        >
          <span
            className="w-5 h-5 p-3 rounded-full transition-colors flex items-center justify-center text-white text-m"
            style={{ backgroundColor: '#006BE0', textDecorationLine: 'none' }}
          >
            i
          </span>
        </div>
      </div>
      <div className="text-center mb-4">
        <div className="text-slate-600 mt-2">
          <span
            dangerouslySetInnerHTML={{
              __html:
                challengeStep === 'deltaX'
                  ? t(translations.step1Description)
                  : challengeStep === 'deltaY'
                    ? t(translations.step2Description)
                    : challengeStep === 'hypotenuse'
                      ? t(translations.step3Description)
                      : t(translations.challengeCompleted),
            }}
          />
        </div>
      </div>

      {/* SVG Map Container */}
      <div className="w-[70%] mx-auto bg-white rounded-lg overflow-hidden border border-gray-400 p-6">
        <svg width="100%" height="100%" viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="block">
          {generateGridLines()}
          {generatePoints()}
          {generateTriangleComponents()}
          {generateHypotenuse()}
        </svg>
      </div>

      {/* Input Section */}
      <div className="mt-6 flex flex-col items-center gap-4">
        {/* Input Row - Label, Input, and Button in same row */}
        <div className="flex items-center gap-4 justify-center">
          {/* Step 1: Delta X Input */}
          {challengeStep === 'deltaX' && (
            <>
              <label htmlFor="deltaX-input" className="text-lg font-medium text-[#DB0072]">
                Horizontal Distance <span className="font-bold italic font-besley">(Δx)</span>:
              </label>
              <input
                type="number"
                id="deltaX-input"
                value={deltaXValue}
                onChange={(e) => setDeltaXValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-32 text-center text-lg font-mono border-2 border-slate-300 rounded-md p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
            </>
          )}

          {/* Step 2: Delta Y Input */}
          {challengeStep === 'deltaY' && (
            <>
              <label htmlFor="deltaY-input" className="text-lg font-medium text-[#8E24AA]">
                Vertical Distance <span className="font-bold italic font-besley">(Δy)</span>:
              </label>
              <input
                type="number"
                id="deltaY-input"
                value={deltaYValue}
                onChange={(e) => setDeltaYValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-32 text-center text-lg font-mono border-2 border-slate-300 rounded-md p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
            </>
          )}

          {/* Step 3: Hypotenuse Input */}
          {challengeStep === 'hypotenuse' && (
            <>
              <label htmlFor="hypotenuse-input" className="text-lg font-medium text-[#008217]">
                Direct Distance <span className="font-bold italic font-besley">(d)</span>:
              </label>
              <input
                type="number"
                id="hypotenuse-input"
                value={hypotenuseValue}
                onChange={(e) => setHypotenuseValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-32 text-center text-lg font-mono border-2 border-slate-300 rounded-md p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
            </>
          )}

          {challengeStep !== 'done' && (
            <button
              onClick={handleCheck}
              className="py-3 px-6 flex justify-center items-center gap-x-[6px] rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#006BE0]"
            >
              {challengeStep === 'deltaX'
                ? t(translations.checkDeltaX)
                : challengeStep === 'deltaY'
                  ? t(translations.checkDeltaY)
                  : t(translations.checkDistance)}
            </button>
          )}
        </div>

        {/* Feedback Message Row */}
        <div className="h-6 text-lg font-medium text-center" style={{ color: feedbackColor }}>
          <span dangerouslySetInnerHTML={{ __html: feedbackMessage }} />
        </div>
      </div>
      {/* InfoPopover component for Problem 2 */}
      <InfoPopover
        isOpen={isInfoPopoverOpen}
        onClose={() => setIsInfoPopoverOpen(false)}
        content={getInfoContent()}
        heading={getInfoHeading()}
        position={popoverPosition}
        triggerRef={infoButtonRef}
      />
    </div>
  );
};

export default LadderProblem;
