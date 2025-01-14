/** Styled Components */
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  position: relative;
  width: 210px;
`;

export const ProgressContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  cursor: pointer;
`;

export const ProgressBackground = styled(motion.div)`
  background: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
`;

export const ProgressCurrent = styled(motion.div)`
  background: #ff5722; /* 주황색 */
  height: 100%;
  width: 0%;
`;

export const ProgressIndicator = styled(motion.div)`
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  background: #ff5722; /* 주황색 */
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

export const HoverTimeContainer = styled(motion.div)`
  position: absolute;
  background: #333;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
`;

export const HoverTimeLabel = styled.span`
  font-size: 12px;
`;

export const TimeLabelGroup = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`;

export const TimeLabel = styled.span`
  font-size: 12px;
`;
