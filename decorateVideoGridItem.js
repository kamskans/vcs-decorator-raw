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
import { Box } from '#vcs-react/components';
import * as layoutFuncs from '../layouts.js';

export default function decorateVideoGridItem(itemIndex, itemProps, gridProps) {
  return {
    enableDefaultLabels: true,
    enableDefaultHighlight: false,
    customComponent: (
      <Box
        style={{
          strokeColor: '#FFFFFF',
          strokeWidth_px: 12,
          cornerRadius_px: 12,
          fillColor: 'transparent'
        }}
        layout={[layoutFuncs.fit]}
      />
    ),
    clipItem: false,
    customLayoutForVideo: null
  };
}