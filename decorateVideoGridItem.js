import * as React from 'react';
import { Box, Video } from '#vcs-react/components';

export default function VideoGrid({ participantDescs = [] }) {
  return (
    <Box id="videogrid">
      {participantDescs.map((participant, idx) => (
        <Box
          key={idx}
          style={{
            strokeColor: '#FFFFFF',
            strokeWidth_px: 12,
            cornerRadius_px: 12,
            fillColor: 'transparent',
          }}
        >
          <Video src={participant.videoId} />
        </Box>
      ))}
    </Box>
  );
}
