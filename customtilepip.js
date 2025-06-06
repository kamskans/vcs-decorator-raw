/*
  This is an override point.

  You can replace this function to return custom decorator components
  for video PIP items. The function gets called for each item.

  The default rendering for labels and highlight can also be toggled off here.

  Input arguments:
  * `itemIndex`: the index of the item being decorated.
  * `itemProps`: props passed to create this item (see VideoPip.js).
  * `pipProps`: props passed to the PIP itself (see VideoPip.js).

  Return object props:
  * `enableDefaultLabels`: render the default participant labels.
  * `enableDefaultHighlight`: render the default highlighting.
  * `customComponent`: a custom VCS component to be rendered.
  * `clipItem`: if true, the custom component graphics are clipped inside
                the video item's frame.
  * `customLayoutForVideo`: a layout applied to the item's video element.
  
  If you return a custom component, it gets rendered last,
  on top of the default labels + highlight.
*/

import * as React from 'react';
import { Box, Text } from '#vcs-react/components';
import { placeText } from '../../layouts.js';

// Layout function to position and size the TEST box in the top left corner
function placeTestBox(parentFrame, params) {
  let { x, y } = parentFrame;
  const label = params && params.displayName ? params.displayName : '';
  const chars = label.length || 8;
  const pxPerChar = 12;
  const minWidth = 64;
  const w = Math.max(minWidth, chars * pxPerChar) + 32;
  const h = 40;
  x = parentFrame.x + 8;
  y = parentFrame.y + 8;
  return { x, y, w, h };
}

export default function decorateVideoPipItem(itemIndex, itemProps, pipProps) {
  // Only show the label and box if displayName is present
  if (!itemProps || !itemProps.displayName) {
    return {
      enableDefaultLabels: false,
      enableDefaultHighlight: true,
      customComponent: null,
      clipItem: true,
      customLayoutForVideo: null
    };
  }

  return {
    enableDefaultLabels: false, // We'll render the label ourselves
    enableDefaultHighlight: true,
    customComponent: (
      <Box
        style={{
          strokeColor: '#FFFFFF',
          strokeWidth_px: 12,
          cornerRadius_px: 12,
          pointerEvents: 'none',
        }}
      >
        <Box
          layout={[placeTestBox, { displayName: itemProps.displayName }]}
          style={{
            fillColor: '#FFFFFF',
            opacity: 0,
            cornerRadius_px: 12,
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}
        >
          <Text layout={[placeText, { vAlign: 'center', hAlign: 'center', yOffset_gu: 0.25 }]} style={{ textColor: '#000', fontSize_px: 18, fontWeight: 'bold', textAlign: 'center' }}>{itemProps.displayName}</Text>
        </Box>
      </Box>
    ),
    clipItem: true,
    customLayoutForVideo: null
  };
}

