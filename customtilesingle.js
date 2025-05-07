import * as React from 'react';
import { Box } from '#vcs-react/components';

export default function decorateVideoSingleItem(itemProps) {
  return {
    enableDefaultLabels: false,
    enableDefaultHighlight: true,
    customComponent: (
      <Box
        style={{
          strokeColor: '#FFFFFF',
          strokeWidth_px: 12,
          cornerRadius_px: 12,
          pointerEvents: 'none',
        }}
      />
    ),
    clipItem: true,
    customLayoutForVideo: null
  };
} 
