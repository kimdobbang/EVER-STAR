import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import toggleOnImage from 'assets/icons/toggle-on.svg';
import toggleOffImage from 'assets/icons/toggle-off.svg';

interface ToggleProps {
  status: 'off' | 'on';
  className?: string;
  onChange?: (status: 'off' | 'on') => void;
}

interface State {
  status: 'off' | 'on';
}

interface Action {
  type: 'toggle';
}

export const Toggle: React.FC<ToggleProps> = ({
  status,
  className,
  onChange,
}: ToggleProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, { status });

  useEffect(() => {
    if (onChange && state.status !== status) {
      onChange(state.status);
    }
  }, [state.status, onChange]);

  useEffect(() => {
    if (state.status !== status) {
      dispatch({ type: 'toggle' });
    }
  }, [status]);

  const handleClick = () => {
    dispatch({ type: 'toggle' });
  };

  return (
    <div
      className={`w-[85px] h-[33px] relative cursor-pointer bg-no-repeat bg-contain ${className}`}
      style={{
        backgroundImage: `url(${state.status === 'on' ? toggleOnImage : toggleOffImage})`,
      }}
      onClick={handleClick}
    >
      <div
        className={`absolute top-0.5 h-[29px] ${
          state.status === 'on' ? 'w-[38px] left-11' : 'w-8 left-0.5'
        }`}
      >
        <div className="absolute w-[29px] h-[29px] bg-white rounded-[14.35px]"></div>
      </div>
    </div>
  );
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'toggle':
      return { status: state.status === 'off' ? 'on' : 'off' };
    default:
      return state;
  }
}

Toggle.propTypes = {
  status: PropTypes.oneOf(['off', 'on']) as PropTypes.Validator<'off' | 'on'>,
  className: PropTypes.string,
  onChange: PropTypes.func,
};
