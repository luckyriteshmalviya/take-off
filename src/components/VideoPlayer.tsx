const VideoPlayer = ({ src }) => {
  return (
    <video
      width="100%"
      controls
      autoPlay={false}
      preload="metadata"
      style={{ borderRadius: "12px" }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;