import * as React from 'react';
import { Box, Video, Text } from '#vcs-react/components';
import * as layoutFuncs from '../layouts.js';
import { useParams } from '#vcs-react/hooks';
import { PausedPlaceholder } from './PausedPlaceholder.js';
import decorateVideoGridItem from './overrides/decorateVideoGridItem.js';
import { DEFAULT_OFFSET_VIDEO_SINGLE_PX } from '../constants.js';

export default function VideoGrid(gridProps) {
  const params = useParams();
  const layoutMode = (params["mode"] || "grid").toLowerCase();

  const {
    showLabels,
    scaleMode = 'fit',
    scaleModeForScreenshare = 'fit',
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

  // Define scale modes based on mode
  const videoScaleModeGrid = scaleMode;
  const videoScaleModeSplit = 'fill'; // zoom in for split mode

  // Optional: Adjust videoStyle per mode if needed
  // For example, remove highlightColor or cornerRadius on split if that causes zoom
  const adjustedVideoStyle = React.useMemo(() => {
    if (layoutMode === 'split') {
      // Example: remove highlight or adjust as needed
      return {
        ...videoStyle,
        // override anything here if needed to avoid zoom issues
      };
    }
    return videoStyle;
  }, [layoutMode, videoStyle]);

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

    // Choose scaleMode depending on mode and if screenshare
    const chosenScaleMode = isScreenshare
      ? scaleModeForScreenshare
      : layoutMode === 'split'
      ? videoScaleModeSplit
      : videoScaleModeGrid;

    const hasLiveVideo = !isAudioOnly && !paused;

    let highlight;
    if (enableDefaultHighlight && highlightDominant && highlighted) {
      const highlightStyle = {
        strokeColor: adjustedVideoStyle.highlightColor,
        strokeWidth_px: adjustedVideoStyle.highlightStrokeWidth_px,
        cornerRadius_px: adjustedVideoStyle.cornerRadius_px,
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
          style={adjustedVideoStyle}
          scaleMode={chosenScaleMode}
          layout={customLayoutForVideo}
          blend={videoBlend}
        />
      );
    }

    const containerStyle = clipItem
      ? {
          cornerRadius_px: adjustedVideoStyle.cornerRadius_px,
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

  // Render hidden participant videos off-screen (very small + opacity 0)
  function renderHiddenParticipant(participant, index) {
    const key = `hidden_participant_${index}`;
    return (
      <Box
        key={key}
        layout={[() => ({ x: -9999, y: -9999, w: 1, h: 1 })]}
        style={{ opacity: 0 }}
      >
        {!participant.paused ? (
          <Video src={participant.videoId} scaleMode="fill" />
        ) : (
          <PausedPlaceholder placeholderStyle={placeholderStyle} />
        )}
      </Box>
    );
  }

  if (layoutMode === 'split') {
    // Show only first 2 participants in split mode visibly
    const visibleParticipants = participantDescs.slice(0, 2);
    const hiddenParticipants = participantDescs.slice(2);

    return (
      <Box id="videogrid">
        {visibleParticipants.map((p, i) => makeGridItem(i, p))}
        {hiddenParticipants.map(renderHiddenParticipant)}
      </Box>
    );
  } else {
    // Grid mode - show all participants normally
    return (
      <Box id="videogrid">
        {participantDescs.map((p, i) => makeGridItem(i, p))}
      </Box>
    );
  }
}
