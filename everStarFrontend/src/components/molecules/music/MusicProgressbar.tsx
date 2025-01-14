/** React */
import React, { useEffect, useState } from 'react';

/** Styled Components */
import {
  Container,
  HoverTimeContainer,
  HoverTimeLabel,
  ProgressBackground,
  ProgressContainer,
  ProgressCurrent,
  ProgressIndicator,
  TimeLabel,
  TimeLabelGroup,
} from './MusicProgressbar.styled';

/** Libs */
import useMeasure from 'react-use-measure';

/** Animation */
import {
  MotionConfig,
  useMotionValue,
  useTransform,
  type PanInfo,
} from 'framer-motion';

export type MusicProgressbarProp = {
  musicDuration?: number;
  initialValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  initialHeight?: number;
  expandedHeight?: number;
  heightBuffer?: number;
};

const MusicProgressbar: React.FC<MusicProgressbarProp> = ({
  musicDuration = 2,
  initialValue = 0,
  value,
  onChange,
  initialHeight = 2,
  expandedHeight = 4,
  heightBuffer = 12,
}) => {
  const [containerRef, { left: containerLeft, width: containerWidth }] =
    useMeasure();
  const [hoverTimeRef, { width: hoverTimeWidth }] = useMeasure();

  /** Hover Time Label */
  const hoverProgress = useMotionValue(initialValue);
  const hoverLeft = useTransform(hoverProgress, (v) => {
    const calcuatedPercent = v - hoverTimeWidth / 2 / containerWidth;
    const maxPercent = (containerWidth - hoverTimeWidth) / containerWidth;
    return `${clamp(calcuatedPercent, 0, maxPercent) * 100}%`;
  });

  const roundedHoverProgress = useTransform(hoverProgress, (v) =>
    roundTo(v, 3)
  );
  const [hoverTimeProgress, setHoverTimeProgress] = useState(
    roundedHoverProgress.get()
  );

  /** Progress */
  const progress = useMotionValue(initialValue);
  const currentWidth = useTransform(progress, (v) => `${v * 100}%`);
  const indicatorLeft = useTransform(
    progress,
    (v) => `calc(${v * 100}% - 6px)`
  );

  const roundedProgress = useTransform(progress, (v) => roundTo(v, 3));
  const [currentProgress, setCurrentProgress] = useState(roundedProgress.get());

  const [isPanning, setIsPanning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  /** Animation State */
  const animateState = isPanning ? 'panning' : isHovered ? 'hovered' : 'idle';

  useEffect(() => {
    roundedProgress.on('change', (v) => setCurrentProgress(v));
    roundedHoverProgress.on('change', (v) => setHoverTimeProgress(v));
  }, [roundedProgress, roundedHoverProgress]);

  useEffect(() => {
    if (value !== undefined) {
      progress.set(value);
    }
  }, [value]);

  /** Get Percent by event */
  const getProgressWithEvent = (
    pageX: number,
    containerLeft: number,
    containerWidth: number
  ) => {
    const newPercent = (pageX - containerLeft) / containerWidth;
    return clamp(newPercent, 0, 1);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const newPercent = getProgressWithEvent(
      e.pageX,
      containerLeft,
      containerWidth
    );
    progress.set(newPercent);
    hoverProgress.set(newPercent);
    setIsPanning(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanning) {
      const newPercent = getProgressWithEvent(
        e.pageX,
        containerLeft,
        containerWidth
      );
      hoverProgress.set(newPercent);
    }
  };

  const handlePan = (event: PointerEvent, info: PanInfo) => {
    const deltaInPercent = info.delta.x / containerWidth;
    const newPercent = clamp(progress.get() + deltaInPercent, 0, 1);
    progress.set(newPercent);
    hoverProgress.set(newPercent);
  };

  const handlePanEnd = () => {
    setIsPanning(false);
    if (onChange) onChange(progress.get());
  };

  return (
    <MotionConfig transition={motionTransition}>
      <Container>
        <ProgressContainer
          animate={animateState}
          onPointerDown={handlePointerDown}
          onPointerUp={() => setIsPanning(false)}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
          onPointerMove={handlePointerMove}
          onPanEnd={handlePanEnd}
          onPan={handlePan}
          style={{ height: initialHeight + heightBuffer }}
          ref={containerRef}
        >
          <ProgressBackground
            style={{ height: initialHeight }}
            variants={{
              hovered: { height: expandedHeight },
              panning: { height: expandedHeight },
            }}
          >
            <ProgressCurrent style={{ width: currentWidth }} />
          </ProgressBackground>

          <ProgressIndicator
            style={{ left: indicatorLeft }}
            variants={indicatorVariants}
          />

          <HoverTimeContainer
            style={{ left: hoverLeft }}
            variants={hoverTimeVariants}
            ref={hoverTimeRef}
          >
            <HoverTimeLabel>
              {formattedTime(musicDuration * hoverTimeProgress)}
            </HoverTimeLabel>
          </HoverTimeContainer>
        </ProgressContainer>

        <TimeLabelGroup
          animate={animateState}
          variants={timeLabelGroupVariants}
        >
          <TimeLabel>
            {formattedTime(musicDuration * currentProgress)}
          </TimeLabel>
          <TimeLabel>{formattedTime(musicDuration)}</TimeLabel>
        </TimeLabelGroup>
      </Container>
    </MotionConfig>
  );
};

/* #region Animation Const */
const motionTransition = { type: 'spring', bounce: 0, duration: 0.5 };

const indicatorVariants = {
  hovered: { opacity: 1 },
  panning: { opacity: 1, scale: 1.5 },
};

const hoverTimeVariants = {
  hovered: { opacity: 1 },
  panning: { opacity: 1 },
};

const timeLabelGroupVariants = {
  hovered: { color: '#FFF' },
  panning: { color: '#FFF' },
};
/* #endregion */

/* #region Utils */
const clamp = (num: number, min: number, max: number) =>
  Math.max(Math.min(num, max), min);

const roundTo = (number: number, decimalPlaces: number) => {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(number * multiplier) / multiplier;
};

const formattedTime = (duration: number) => {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration % 60);
  return `${min.toString()}:${sec.toString().padStart(2, '0')}`;
};
/* #endregion */

export default MusicProgressbar;
