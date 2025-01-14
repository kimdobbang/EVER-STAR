import PropTypes from 'prop-types';
import React from 'react';
import {
  ButtonText,
  ButtonTextProps,
} from '../../atoms/icons/inputfiled/ButtonText';
import './Placeholder.css';

interface PlaceholderProps extends ButtonTextProps {
  showLeftIcon: boolean;
  state: 'default' | 'disable' | 'focus';
}

export const Placeholder = ({
  showLeftIcon = true,
  state,
  className,
  ...ButtonTextProps
}: PlaceholderProps): JSX.Element => {
  return (
    <div className={`w-72 flex items-center gap-1 relative ${className}`}>
      {showLeftIcon && (
        <svg
          className={`${className}`}
          fill='none'
          height='24'
          viewBox='0 0 24 24'
          width='24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            clipRule='evenodd'
            d='M11 5C7.68629 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17C14.3137 17 17 14.3137 17 11C17 7.68629 14.3137 5 11 5ZM3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11C19 12.8487 18.3729 14.551 17.3199 15.9056L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L15.9056 17.3199C14.551 18.3729 12.8487 19 11 19C6.58172 19 3 15.4183 3 11Z'
            fill='black'
            fillRule='evenodd'
          />
        </svg>
      )}
      <ButtonText
        color='black'
        show={true}
        showIcon={true}
        className={!className ? '!flex-1 !flex !grow' : `${className}`}
        divClassName={
          state === 'default'
            ? '!text-[#8c929d] !flex-1 ![text-align:unset] !w-[unset]'
            : state === 'disable'
              ? '!text-[#c3c9d3] !flex-1 ![text-align:unset] !w-[unset]'
              : '!flex-1 ![colorBlackColor] !w-[unset]'
        }
        prop={ButtonTextProps.prop}
        size={ButtonTextProps.size}
      />
    </div>
  );
};

Placeholder.propTypes = {
  showLeftIcon: PropTypes.bool,
  state: PropTypes.oneOf(['default', 'disable', 'focus']),
  ...ButtonText.propTypes, // ButtonText 컴포넌트의 propTypes를 전부 사용
};

export type { PlaceholderProps };
