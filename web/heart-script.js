const channel = new BroadcastChannel('music-control');
let audioContext, source;

// Khởi tạo Audio Context kế thừa user gesture
window.onload = () => {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  fetch('/audio/bdtnr.mp3')
    .then(response => response.arrayBuffer())
    .then(data => audioContext.decodeAudioData(data))
    .then(buffer => {
      source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(audioContext.destination);
      source.start(0);
      console.log("[HEART] Nhạc tự động phát thành công");
      channel.postMessage('heart-active');
    })
    .catch(err => console.error("[HEART] Lỗi phát nhạc:", err));
};

// Xử lý khi đóng tab
window.addEventListener('beforeunload', () => {
  channel.postMessage('heart-closed');
  if (source) source.stop();
});