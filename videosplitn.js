import * as React from "react";
import { Box, Video } from "#vcs-react/components";

// Custom decorator: white border, 4px thick
function decorateVideoSplitItem() {
  return {
    customComponent: (
      <Box
        style={{
          strokeColor: "#FFFFFF",
          strokeWidth_px: 4,
          cornerRadius_px: 8,
          fillColor: "transparent"
        }}
      />
    ),
    clipItem: false,
  };
}

// Minimal split layout: show up to 2 participant videos side by side
export default function SimpleSplit(props) {
  const { participantDescs = [] } = props;
  const totalItems = Math.max(1, Math.min(participantDescs.length, 2));

  function makeItem(idx) {
    const participant = participantDescs[idx];
    if (!participant) return null;
    const { videoId, isAudioOnly, paused } = participant;
    const hasLiveVideo = !isAudioOnly && !paused;

    const { customComponent, clipItem } = decorateVideoSplitItem();

    return (
      <Box
        key={idx}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          margin: 8,
          borderRadius: 8,
          overflow: "hidden",
          flex: 1,
        }}
        clip={clipItem}
      >
        {hasLiveVideo ? (
          <Video src={videoId} style={{ width: "100%", height: "100%" }} />
        ) : (
          <Box style={{ background: "#333", width: "100%", height: "100%" }} />
        )}
        {customComponent}
      </Box>
    );
  }

  return (
    <Box
      id="split"
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        background: "#111",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Array.from({ length: totalItems }).map((_, idx) => makeItem(idx))}
    </Box>
  );
}
