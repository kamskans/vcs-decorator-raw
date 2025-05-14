import * as React from 'react';
import { Box, Text } from '#vcs-react/components';

import { placeText } from '../../layouts.js';

// Layout function to position and size the TEST box in the bottom-left corner
function placeTestBox(parentFrame, params) {
  let { x, y } = parentFrame;
  // Estimate width based on label length (if available), else fallback to 15% of parent width
  const label = params && params.displayName ? params.displayName : '';
  const chars = label.length || 8;
  // Estimate: 14px font, bold, plus padding, so ~16px per char, min width 64px
  const pxPerChar = 12;
  const minWidth = 64;
  const w = Math.max(minWidth, chars * pxPerChar) + 32;
  const h = 40; // Match grid item box height
  // Position at bottom-left with an 8px margin
  x = parentFrame.x + 8;
  y = parentFrame.y + parentFrame.h - h - 8;
  return { x, y, w, h };
}

export default function decorateVideoSingleItem(itemProps) {
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
