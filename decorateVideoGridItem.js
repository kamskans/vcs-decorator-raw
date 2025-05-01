/*
  This is an override point for video grid item decoration.
  The function gets called for each item in the grid.
*/

import * as React from 'react';
import { Box } from '#vcs-react/components';

export default function decorateVideoGridItem(itemIndex, itemProps, gridProps) {
  return (
    <Box
      style={{
        strokeColor: '#FFFFFF',
        strokeWidth_px: 12,
        cornerRadius_px: 12,
        fill: 'none'
      }}
    />
  );
}