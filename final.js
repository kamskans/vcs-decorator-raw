/*
  This is an override point.

  You can replace this function to return custom decorator components
  for video grid items. The function gets called for each item.

  The default rendering for labels and highlight can also be toggled off here.

  Input arguments:
  * `itemIndex`: the index of the item being decorated.
  * `itemProps`: props passed to create this item (see VideoGrid.js).
  * `gridProps`: props passed to the grid itself (see VideoGrid.js).

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

export default function decorateVideoGridItem(itemIndex, itemProps, gridProps) {
  // Log the itemProps to the browser console for inspection
  if (typeof window !== "undefined" && window.console) {
    console.log("decorateVideoGridItem itemProps:", itemProps);
  }

  const label = itemProps?.participant?.user_name || itemProps?.participant?.userName || 'Unknown';
  return {
    enableDefaultLabels: false,
    enableDefaultHighlight: true,
    customComponent: (
      <>
        <Box
          style={{
            strokeColor: '#FFFFFF',
            strokeWidth_px: 12,
            cornerRadius_px: 12,
            fillColor: 'none',
            pointerEvents: 'none',
          }}
        />
        <Text
          style={{
            textColor: '#FF00FF',
            fontSize_px: 48,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {label}
        </Text>
      </>
    ),
    clipItem: true,
    customLayoutForVideo: null
  };
}
