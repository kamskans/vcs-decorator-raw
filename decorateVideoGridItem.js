/*
  This is an override point for video grid item decoration.
  The function gets called for each item in the grid.
*/

import * as React from 'react';
import { Box, Video } from '#vcs-react/components';

export default function decorateVideoGridItem(itemIndex, itemProps, gridProps) {
  const { videoId, isAudioOnly, paused } = itemProps;
  const hasLiveVideo = !isAudioOnly && !paused;

  return {
    enableDefaultLabels: false,
    enableDefaultHighlight: false,
    customComponent: (
      <Box
        style={{
          strokeColor: '#FFFFFF',
          strokeWidth_px: 12,
          cornerRadius_px: 12,
          fill: 'none'
        }}
      >
        {hasLiveVideo && (
          <Video
            src={videoId}
            scaleMode="fill"
          />
        )}
      </Box>
    ),
    clipItem: true
  };
}