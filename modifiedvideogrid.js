import * as React from 'react';
import { Box, Video, Text } from '#vcs-react/components';
import * as layoutFuncs from '../layouts.js';
import { useParams } from '#vcs-react/hooks';
import { PausedPlaceholder } from './PausedPlaceholder.js';
import decorateVideoGridItem from './overrides/decorateVideoGridItem.js';
import { DEFAULT_OFFSET_VIDEO_SINGLE_PX } from '../constants.js';

export default function VideoGrid(gridProps) {
  const params = useParams();
  const layoutMode = (params["mode"] || "grid").toLowerCase(); // 'grid' or 'split'

  const {
    showLabels,
    scaleMode,
    scaleModeForScreenshare,
    videoStyle,
    videoLabelStyle,
    placeholderStyle,
    labelsOffset_px = { x: 0, y: 0 },
    participantDescs,
    highlightDominant = true,
    itemInterval_gu = -1,
    outerPadding_gu = -1,
    preserveItemAspectRatio = true,
    fullScreenHighlightItemIndex = -1,
  } = gridProps;

  const totalNumItems = participantDescs.length;

  function makeGridItem(index, itemProps) {
    const {
      isAudioOnly,
      isScreenshare,
      videoId,
      displayName,
      highlighted,
      paused,
    } = itemProps;
    const key = 'videogriditem_' + index;

    let itemLayout;
    let videoBlend;

    if (fullScreenHighlightItemIndex >= 0) {
      itemLayout = null;
      videoBlend = {
        opacity: fullScreenHighlightItemIndex === index ? 1 : 0,
      };
    } else {
      itemLayout = [
        layoutFuncs.grid,
        {
          index,
          total: totalNumItems,
          innerMargin_gu: itemInterval_gu,
          outerMargin_gu: outerPadding_gu,
          preserveItemAspectRatio,
        },
      ];
    }

    const {
      enableDefaultLabels = true,
      enableDefaultHighlight = true,
      customComponent: customDecoratorComponent,
      clipItem = false,
      customLayoutForVideo,
    } = decorateVideoGridItem(index, itemProps, gridProps);

    let participantLabel;
    if (enableDefaultLabels && showLabels && displayName?.length > 0) {
      const isGrid = totalNumItems > 1;
      const labelLayout = isGrid ? layoutFuncs.gridLabel : layoutFuncs.offset;
      const offsets = isGrid
        ? labelsOffset_px
        : {
            x: DEFAULT_OFFSET_VIDEO_SINGLE_PX + labelsOffset_px.x,
            y: DEFAULT_OFFSET_VIDEO_SINGLE_PX + labelsOffset_px.y,
          };

      participantLabel = (
        <Text
          key={'label_' + displayName}
          style={videoLabelStyle}
          layout={[
            labelLayout,
            { textH: videoLabelStyle.fontSize_px, offsets },
          ]}
          clip
        >
          {displayName}
        </Text>
      );
    }

    const videoScaleMode = isScreenshare ? scaleModeForScreenshare : scaleMode;
    const hasLiveVideo = !isAudioOnly && !paused;

    let highlight;
    if (enableDefaultHighlight && highlightDominant && highlighted) {
      const highlightStyle = {
        strokeColor: videoStyle.highlightColor,
        strokeWidth_px: videoStyle.highlightStrokeWidth_px,
        cornerRadius_px: videoStyle.cornerRadius_px,
      };

      highlight = (
        <Box
          style={highlightStyle}
          key={key + '_highlight'}
          layout={customLayoutForVideo}
        />
      );
    }

    let video;
    if (!hasLiveVideo) {
      video = (
        <PausedPlaceholder
          layout={customLayoutForVideo}
          {...{ placeholderStyle }}
        />
      );
    } else {
      video = (
        <Video
          src={videoId}
          style={videoStyle}
          scaleMode={videoScaleMode}
          layout={customLayoutForVideo}
          blend={videoBlend}
        />
      );
    }

    const containerStyle = clipItem
      ? {
          cornerRadius_px: videoStyle.cornerRadius_px,
        }
      : null;

    return (
      <Box
        key={key}
        id={key}
        layout={itemLayout}
        style={containerStyle}
        clip={clipItem}
      >
        {video}
        {participantLabel}
        {highlight}
        {customDecoratorComponent}
      </Box>
    );
  }

  function makeSplitItems() {
    const limited = participantDescs.slice(0, 2);
    return limited.map((participant, idx) => {
      const key = 'splititem_' + idx;
      return (
        <Box
          key={key}
          id={key}
          layout={[
            layoutFuncs.splitHorizontal,
            { index: idx, total: limited.length, margin_gu: 1 },
          ]}
        >
          {participant.paused ? (
            <PausedPlaceholder placeholderStyle={placeholderStyle} />
          ) : (
            <Video
              src={participant.videoId}
              scaleMode="fill"
              style={videoStyle}
            />
          )}
        </Box>
      );
    });
  }

  const children =
    layoutMode === 'split'
      ? makeSplitItems()
      : participantDescs.map((d, idx) => makeGridItem(idx, d));

  return <Box id="videogrid">{children}</Box>;
}
