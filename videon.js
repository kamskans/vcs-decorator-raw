import * as React from "react";
import { Box, Video } from "#vcs-react/components";
import { useParams } from "#vcs-react/hooks";
import * as layoutFuncs from "../layouts.js";

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

export default function MinimalSplit(props) {
  const { participantDescs = [] } = props;
  const params = useParams();
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
        layout={[layoutFuncs.splitAcrossLongerDimension, { index: idx, margin_gu: 0, pos: 1 / totalItems }]}
        clip={clipItem}
      >
        {hasLiveVideo ? (
          <Video src={videoId} scaleMode="fill" />
        ) : (
          <Box style={{ background: "#333", width: "100%", height: "100%" }} />
        )}
        {customComponent}
      </Box>
    );
  }

  return (
    <Box id="split">
      {Array.from({ length: totalItems }).map((_, idx) => makeItem(idx))}
    </Box>
  );
}
