// Xử lý click để vào trang
const clickToEnter = document.querySelector('.click-to-enter');
const container = document.querySelector('.container');
const backgroundMusic = document.getElementById('background-music');
let isMusicPlaying = false;

if (clickToEnter && container) {
  clickToEnter.addEventListener('click', function() {
    // Phát nhạc nền
    if (backgroundMusic) {
      backgroundMusic.muted = false;
      backgroundMusic.play()
        .then(() => {
          isMusicPlaying = true;
          console.log("Nhạc nền đã được phát thành công!");
        })
        .catch((error) => {
          console.error("Lỗi khi phát nhạc nền:", error);
        });
    }

    // Ẩn "Click to Enter" và hiển thị nội dung chính
    clickToEnter.classList.add('hidden');
    setTimeout(() => {
      container.classList.add('visible');
    }, 500);
  });
}

// View counter
let viewCount = localStorage.getItem("viewCounter");
if (!viewCount) viewCount = 0;
viewCount++;
localStorage.setItem("viewCounter", viewCount);
document.getElementById("viewCount").textContent = viewCount;

// Xử lý khi tab bị ẩn hoặc hiển thị lại
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (backgroundMusic && !backgroundMusic.paused) {
      backgroundMusic.pause();
    }
  } else {
    if (isMusicPlaying && backgroundMusic.paused) {
      backgroundMusic.play();
    }
  }
});

// Tạo hiệu ứng trái tim xung quanh avatar
const heartContainer = document.querySelector('.heart-animation-container');

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = Math.random() > 0.5 ? '❤' : '💖';
  
  const size = Math.random() * 20 + 10;
  heart.style.fontSize = `${size}px`;
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.top = `${Math.random() * 100}%`;
  
  // Random màu sắc từ hồng nhạt đến hồng đậm
  const hue = Math.floor(Math.random() * 20 + 330); // 330-350 độ trong HSL
  heart.style.color = `hsl(${hue}, 100%, 70%)`;
  
  heartContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 3000);
}

setInterval(createHeart, 300);

// Tạo hiệu ứng trái tim nền
const floatingHearts = document.querySelector('.floating-hearts-container');

function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = '❤';
  
  const size = Math.random() * 30 + 10;
  const duration = Math.random() * 10 + 10;
  const delay = Math.random() * 5;
  
  heart.style.fontSize = `${size}px`;
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.top = `100vh`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.animationDelay = `${delay}s`;
  heart.style.opacity = Math.random() * 0.5 + 0.1;
  
  floatingHearts.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// Tạo 20 trái tim nền ban đầu
for (let i = 0; i < 20; i++) {
  createFloatingHeart();
}

// Tiếp tục tạo trái tim nền mỗi giây
setInterval(createFloatingHeart, 1000);



















class UserStatus {
  constructor() {
    this.userStatus = document.querySelector('.user-status');
    this.statusDot = this.userStatus.querySelector('.status-dot');
    this.statusText = this.userStatus.querySelector('.status-text');
    this.lastSeenElement = this.userStatus.querySelector('.last-seen');
    this.lastOnlineTime = new Date();
    
    this.init();
  }
  
  init() {
    this.updateOnlineStatus();
    this.setupEventListeners();
    this.startStatusMonitor();
  }
  
  updateOnlineStatus() {
    if (navigator.onLine) {
      this.setOnline();
    } else {
      this.setOffline();
    }
  }
  
  setOnline() {
    this.userStatus.classList.remove('status-offline');
    this.statusText.textContent = 'ONLINE';
    this.lastSeenElement.textContent = '';
    this.lastOnlineTime = new Date();
  }
  
  setOffline() {
    this.userStatus.classList.add('status-offline');
    this.statusText.textContent = 'OFFLINE';
    this.updateLastSeenTime();
  }
  
  updateLastSeenTime() {
    const now = new Date();
    const diffInMinutes = Math.floor((now - this.lastOnlineTime) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      this.lastSeenElement.textContent = 'last seen just now';
    } 
    else if (diffInMinutes < 60) {
      this.lastSeenElement.textContent = `last seen ${diffInMinutes} min ago`;
    } 
    else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      this.lastSeenElement.textContent = `last seen ${diffInHours} hours ago`;
    }
  }
  
  setupEventListeners() {
    window.addEventListener('online', () => this.setOnline());
    window.addEventListener('offline', () => this.setOffline());
  }
  
  startStatusMonitor() {
    setInterval(() => {
      if (!navigator.onLine) {
        this.updateLastSeenTime();
      }
    }, 60000); // Update every minute
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new UserStatus();
});