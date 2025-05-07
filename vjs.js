/**
 * decorateVideoSplitItem.js
 *
 * Adds a white border with 6px width (and optional corner radius)
 * to each participant's video in the split layout.
 *
 * This is used by the VideoSplit component via the overrideDecoration prop.
 */

export default function decorateVideoSplitItem(index, participant, props) {
  return {
    style: {
      strokeColor: "#ffffff",     // white border
      strokeWidth_px: 6,          // 6px border width
      cornerRadius_px: 16,        // optional: rounded corners
    },
  };
}
