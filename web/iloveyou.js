//reset animations
setInterval(()=>{
    let el = document.getElementById('love')
    var newone = el.cloneNode(true);
    el.parentNode.replaceChild(newone, el);
  }, 4000)
  



  const audio = document.getElementById('bgMusic');

  // 1. Tự động phát nhạc khi trang load (muted trước)
  window.addEventListener('load', () => {
    audio.muted = true; // Bắt đầu bằng muted để vượt qua autoplay policy
    audio.play()
      .then(() => {
        // Sau 1 giây bỏ muted
        setTimeout(() => audio.muted = false, 1000);
      })
      .catch(e => showPlayButton());
  });
  
  // 2. Xử lý chuyển tab
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Khi chuyển tab khác - tắt nhạc
      audio.pause();
    } else {
      // Khi quay lại tab - bật nhạc
      if (!audio.paused) return;
      audio.play().catch(e => console.log("Lỗi phát lại:", e));
    }
  });
  
  // 3. Fallback khi autoplay bị chặn
  function showPlayButton() {
    const btn = document.createElement('button');
    btn.innerHTML = '🔊 Bật nhạc';
    btn.style.position = 'fixed';
    btn.style.bottom = '20px';
    btn.style.right = '20px';
    btn.style.zIndex = '1000';
    btn.onclick = () => {
      audio.muted = false;
      audio.play();
      btn.remove();
    };
    document.body.appendChild(btn);
  }


  