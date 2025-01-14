import React from 'react';
import { SearchStar } from 'components/organics/searchStar/SearchStar';

interface EverStarSearchStarProps {}

export const EverStarSearchStar: React.FC<EverStarSearchStarProps> = () => {
  return (
    <div>
      <SearchStar />
    </div>
  );
};

export type { EverStarSearchStarProps };
