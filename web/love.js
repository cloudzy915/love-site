let audioContext;
let musicBuffer;
let musicSource;

async function initAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Tải file nhạc
    const response = await fetch('/audio/love-song.mp3');
    const arrayBuffer = await response.arrayBuffer();
    musicBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Tự động phát nhạc
    playMusic();
    
    // Resume audio context khi có interaction (fallback)
    document.addEventListener('click', () => {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    });
  } catch (error) {
    console.error('Lỗi audio:', error);
  }
}

function playMusic() {
  if (musicSource) {
    musicSource.stop();
  }
  
  musicSource = audioContext.createBufferSource();
  musicSource.buffer = musicBuffer;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start(0);
  
  // Thêm class để style khi nhạc phát
  document.body.classList.add('music-playing');
}

// Xử lý khi tab được active lại
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && audioContext && musicSource) {
    audioContext.resume();
  }
});

// Khởi động audio khi trang load
window.addEventListener('load', initAudio);











