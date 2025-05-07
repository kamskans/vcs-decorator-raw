import * as React from "react";
import { Box, Video, Text } from "#vcs-react/components";

// --- Custom Decorator: White Border ---
function decorateVideoGridItem() {
  return {
    enableDefaultLabels: true,
    enableDefaultHighlight: false,
    customComponent: (
      <Box
        style={{
          strokeColor: "#FFFFFF",
          strokeWidth_px: 12,
          cornerRadius_px: 12,
          fillColor: "transparent"
        }}
      />
    ),
    clipItem: false,
    customLayoutForVideo: null
  };
}

// --- Main VideoGrid Component ---
export default function VideoGrid(props) {
  const {
    participantDescs = [],
    labelsOffset_px = 0,
    itemInterval_gu = 0,
    outerPadding_gu = 0,
    preserveItemAspectRatio = false,
    fullScreenHighlightItemIndex = -1
  } = props;

  const totalNumItems = participantDescs.length;

  function makeItem(index, itemProps) {
    const { isAudioOnly, videoId, displayName, paused } = itemProps;
    let key = "videogriditem_" + index;

    // Use the custom decorator
    const {
      enableDefaultLabels = false,
      customComponent: customDecoratorComponent,
      clipItem = false,
      customLayoutForVideo
    } = decorateVideoGridItem(index, itemProps, props);

    let participantLabel;
    if (enableDefaultLabels && displayName && displayName.length > 0) {
      participantLabel = (
        <Text key={"label_" + displayName} style={{ position: "absolute", bottom: 0, left: 0, color: "#fff", background: "rgba(0,0,0,0.5)", padding: 4 }}>
          {displayName}
        </Text>
      );
    }

    const hasLiveVideo = !isAudioOnly && !paused;

    let video;
    if (!hasLiveVideo) {
      video = (
        <Box style={{ background: "#333", width: "100%", height: "100%" }}>
          <Text style={{ color: "#fff" }}>No Video</Text>
        </Box>
      );
    } else {
      video = (
        <Video src={videoId} style={{ width: "100%", height: "100%" }} />
      );
    }

    return (
      <Box
        key={key}
        id={key}
        style={{
          position: "relative",
          width: 320,
          height: 180,
          margin: 8,
          borderRadius: 16,
          overflow: "hidden"
        }}
        clip={clipItem}
      >
        {video}
        {participantLabel}
        {customDecoratorComponent}
      </Box>
    );
  }

  return (
    <Box
      id="videogrid"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        background: "#222"
      }}
    >
      {participantDescs.map((d, idx) => makeItem(idx, d))}
    </Box>
  );
}
