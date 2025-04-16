import React from 'react';

const Video = () => {
  return (
    <div className="relative h-[500px] overflow-hidden bg-black">
    
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="w-screen h-full"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100vw',
            height: '56.25vw', 
            maxHeight: '170vh',
            objectFit: 'cover',
          }}
          src="https://player.vimeo.com/video/902870417?muted=1&autoplay=1&loop=1&background=1&app_id=122963"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

  
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
    </div>
  );
};

export default Video;








