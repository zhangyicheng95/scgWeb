// 完全复刻4d-bios.cn风格的开屏动画逻辑
window.addEventListener('DOMContentLoaded', function () {
  // 开屏动画逻辑
  const loadDir = './assets/load/';
  const totalFrames = 120;
  const framePad = n => n.toString().padStart(6, '0');
  const ext = '.png.webp';
  const canvas = document.querySelector('.loadFrame');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const loadSum = document.getElementById('loadSum');
  const loadingBox = document.getElementById('loading');
  const mainContent = document.getElementById('fullpage');
  let images = new Array(totalFrames);
  let percent = 0;
  let lastDrawn = -1;
  let timer = null;
  let startTime = Date.now();
  const duration = 4000;

  if (!canvas || !ctx || !loadSum || !loadingBox || !mainContent) {
    console.error('Loading animation elements not found.');
    if (loadingBox) loadingBox.style.display = 'none';
    unlockScroll();
    return;
  }

  // 主内容初始透明且下移
  mainContent.style.opacity = 0;
  mainContent.style.transform = 'translateY(40px)';
  mainContent.style.transition = 'none';

  // 预加载所有图片
  for (let i = 0; i < totalFrames; i++) {
    const img = new window.Image();
    img.src = loadDir + framePad(i) + ext;
    img.onload = img.onerror = () => {
      images[i] = img;
    };
  }

  // canvas自适应
  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 百分比和帧同步递增
  function animatePercentAndFrame() {
    timer = setInterval(() => {
      let elapsed = Date.now() - startTime;
      let progress = Math.min(elapsed / duration, 1);
      percent = Math.round(progress * 100);
      if (loadSum) loadSum.innerText = percent;
      // 计算当前应该显示的帧
      let frameIdx = Math.floor(progress * (totalFrames - 1));
      if (images[frameIdx]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[frameIdx], 0, 0, canvas.width, canvas.height);
        lastDrawn = frameIdx;
      } else if (lastDrawn >= 0 && images[lastDrawn]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[lastDrawn], 0, 0, canvas.width, canvas.height);
      }
      if (percent >= 100) {
        clearInterval(timer);
      }
    }, 30);
  }
  animatePercentAndFrame();

  // 4秒后淡出动画，显示首页内容
  setTimeout(() => {
    clearInterval(timer);
    if (loadSum) loadSum.innerText = 100;
    if (loadingBox) loadingBox.classList.add('hide');
    if (mainContent) {
      mainContent.style.opacity = 1;
      mainContent.style.transform = 'none';
    }
  }, duration);

  function unlockScroll() {
    document.body.style.overflow = '';
  }

  // 如需水波纹等特效可在此实现
  function initWaterEffectsIfNeeded() { }
});

// 首页全屏轮播
window.addEventListener('DOMContentLoaded', function () {
  // 首页轮播数据结构
  const banners = [
    {
      title: '发展主线',
      desc: '加快高质量发展，打造全新陕文投',
      backUrl: 'https://oss.allintrip.cn/shanwentou/upfiles/onepage/202410211744430256.jpg'
    },
    {
      title: '文旅科技',
      desc: '三大文旅科技',
      backUrl: 'https://oss.allintrip.cn/shanwentou/upfiles/onepage/202506251731499857.png'
    },
    {
      title: '赳赳大秦',
      desc: '《赳赳大秦》演艺——华夏，从此中国',
      backUrl: 'https://oss.allintrip.cn/shanwentou/upfiles/onepage/20240493219698881.jpeg'
    },
    {
      title: '长安十二时辰',
      desc: '长安十二时辰主题街区-一日长安，邂逅唐“潮”',
      backUrl: 'https://oss.allintrip.cn/shanwentou/upfiles/onepage/20240473832641532.jpg'
    },
    {
      title: '数娱综合体',
      desc: '构建多元数字娱乐空间',
      backUrl: 'https://oss.allintrip.cn/shanwentou/upfiles/onepage/20240441592859734.jpg'
    },
    {
      title: '帝国密码',
      desc: '《帝国密码——秦始皇陵》',
      backUrl: 'https://oss.allintrip.cn/shanwentou/upfiles/onepage/WechatIMG2328.jpg'
    }
  ];

  // 动态渲染banner结构
  const bannerCarousel = document.getElementById('banner-carousel');
  if (bannerCarousel) {
    // 渲染按钮
    const titlesDiv = document.createElement('div');
    titlesDiv.className = 'banner-titles';
    banners.forEach((item, idx) => {
      const btn = document.createElement('button');
      btn.className = 'banner-title-btn' + (idx === 0 ? ' active' : '');
      btn.textContent = item.title.replace(/-.*/, '').replace(/《.*?》/, '').replace(/主题街区.*/, '').replace(/演艺.*/, '').replace(/——.*/, '').replace(/“.*?”/, '').replace(/\s+/g, '');
      titlesDiv.appendChild(btn);
    });
    bannerCarousel.appendChild(titlesDiv);
    // 渲染内容区
    const contentDiv = document.createElement('div');
    contentDiv.className = 'banner-content';
    contentDiv.innerHTML = `<p class="banner-desc">${banners[0].desc}</p>`;
    bannerCarousel.appendChild(contentDiv);
    // 渲染轮播图
    banners.forEach((item, idx) => {
      const slide = document.createElement('div');
      slide.className = 'banner-slide' + (idx === 0 ? ' active' : '');
      slide.style.backgroundImage = `url('${item.backUrl}')`;
      bannerCarousel.appendChild(slide);
    });
  }

  // 轮播逻辑
  const slides = document.querySelectorAll('.banner-slide');
  const titleBtns = document.querySelectorAll('.banner-title-btn');
  const contentDesc = document.querySelector('.banner-content .banner-desc');
  let current = 0;
  let timer = null;
  if (!slides.length) return;

  function showSlide(idx) {
    slides[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    // 按钮高亮
    titleBtns.forEach((btn, btnIdx) => {
      if (btnIdx === idx) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    // 只更新描述
    if (contentDesc && banners[idx]) contentDesc.textContent = banners[idx].desc;
    resetTimer();
  }
  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }
  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSlide, 5000);
  }
  resetTimer();
  // 按钮点击切换
  titleBtns.forEach((btn, idx) => {
    btn.addEventListener('click', function () {
      showSlide(idx);
    });
  });

  // 右下角按钮点击滚动到下一个全屏模块（.r2）
  const firstGoBtn = document.querySelector('#firstGo');
  const r1 = document.querySelector('.r1');
  const r2 = document.querySelector('.r2');

  if (firstGoBtn && r1 && r2) {
    firstGoBtn.addEventListener('click', function (e) {
      e.preventDefault();

      // 顺滑过渡效果
      gsap.to(r1, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          r1.style.display = 'none';
          r2.style.display = 'block';

          // 显示公共左侧侧边栏
          const sidebar = document.querySelector('.public-sidebar');
          if (sidebar) {
            sidebar.style.display = 'block';
            gsap.fromTo(sidebar,
              { x: -250, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            );
          }

          // 设置侧边栏高亮状态 - 进入r2时高亮"走进文投"
          const sidebarLinks = document.querySelectorAll('.sidebar-link');
          sidebarLinks.forEach(link => {
            link.classList.remove('active');
          });
          const r2Link = document.querySelector('.sidebar-link[href="#r2"]');
          if (r2Link) {
            r2Link.classList.add('active');
          }

          // 切换背景到r2的视频
          const fullPage = document.querySelector('.fullPage');
          if (fullPage) {
            fullPage.innerHTML = '';
            const video = document.createElement('video');
            video.src = 'https://oss.allintrip.cn/shanwentou/SCG6.mp4';
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            fullPage.appendChild(video);
          }

          // r2 淡入效果
          gsap.fromTo(r2,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
          );
        }
      });
    });
  }
});

// 侧边栏点击事件处理
window.addEventListener('DOMContentLoaded', function () {
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const r2 = document.querySelector('.r2');
  const r3 = document.querySelector('.r3');
  const r4 = document.querySelector('.r4');
  const r5 = document.querySelector('.r5');
  const fullPage = document.querySelector('.fullPage');

  // 背景切换函数
  function switchBackground(moduleType) {
    if (!fullPage) return;

    // 清除现有内容
    fullPage.innerHTML = '';

    switch (moduleType) {
      case 'r2':
        // r2显示视频
        const video = document.createElement('video');
        video.src = 'https://oss.allintrip.cn/shanwentou/SCG6.mp4';
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        fullPage.appendChild(video);
        break;

      case 'r3':
        // r3时不清空fullPage内容，避免背景层和内容被清除
        break;
      case 'r4':
        // 显示指定图片
        fullPage.style.backgroundImage = 'url(https://oss.allintrip.cn/shanwentou/upfiles/onepage/20240481399209812.jpeg)';
        fullPage.style.backgroundSize = 'cover';
        fullPage.style.backgroundPosition = 'center';
        fullPage.style.backgroundRepeat = 'no-repeat';
        break;

      case 'r5':
        // r5显示互联网风格渐变背景（更深色，适配侧边栏阴影）
        fullPage.style.backgroundImage = 'none';
        fullPage.style.background = 'linear-gradient(135deg, #e3ecf7 0%, #c2d3e6 100%)';
        break;

      default:
        // 默认显示视频
        const defaultVideo = document.createElement('video');
        defaultVideo.src = 'https://oss.allintrip.cn/shanwentou/SCG6.mp4';
        defaultVideo.autoplay = true;
        defaultVideo.muted = true;
        defaultVideo.loop = true;
        fullPage.appendChild(defaultVideo);
        break;
    }
  }

  sidebarLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // 移除所有active类
      sidebarLinks.forEach(l => l.classList.remove('active'));

      // 添加active类到当前点击的链接
      this.classList.add('active');

      // 隐藏所有模块
      [r2, r3, r4, r5].forEach(module => {
        if (module) {
          module.style.display = 'none';
        }
      });

      // 显示对应的模块
      const targetId = this.getAttribute('href').substring(1);
      const targetModule = document.querySelector('.' + targetId);
      if (targetModule) {
        targetModule.style.display = 'block';

        // 切换背景
        switchBackground(targetId);

        gsap.fromTo(targetModule,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );
      }
    });
  });
});

// 文旅科技自动轮播
// 优化背景切换为科技感顺滑动画
// 需配合.r3-bg样式

// document.addEventListener('DOMContentLoaded', function () {
//   const techItems = document.querySelectorAll('.tech-carousel .tech-item');
//   if (!techItems.length) return;
//   let current = 0;
//   // r3背景图数组
//   const r3BgArr = [
//     'https://oss.allintrip.cn/shanwentou/upfiles/solution/GQVMZVPJN3ND.png',
//     'https://oss.allintrip.cn/shanwentou/upfiles/solution/NGJ305SJ7XT8.jpg',
//     'https://oss.allintrip.cn/shanwentou/upfiles/solution/M69VK2DAQAMG.jpg'
//   ];
//   function setR3Bg(idx) {
//     const r3 = document.querySelector('.r3');
//     const fullPage = document.querySelector('.fullPage');
//     if (!r3 || !fullPage || r3.style.display === 'none') return;

//     // 当前背景层
//     let bgDiv = fullPage.querySelector('.r3-bg');
//     // 新的背景层
//     let nextDiv = document.createElement('div');
//     nextDiv.className = 'r3-bg r3-bg-next tech-fade';
//     nextDiv.style.backgroundImage = `url('${r3BgArr[idx % r3BgArr.length]}')`;
//     fullPage.insertBefore(nextDiv, bgDiv || fullPage.firstChild);

//     // 动画：新图淡入+清晰，旧图淡出
//     setTimeout(() => {
//       nextDiv.classList.remove('tech-fade');
//       if (bgDiv) bgDiv.classList.add('tech-fade');
//     }, 20);

//     // 动画结束后移除旧层
//     setTimeout(() => {
//       if (bgDiv && bgDiv.parentNode) bgDiv.parentNode.removeChild(bgDiv);
//       nextDiv.classList.remove('r3-bg-next');
//     }, 950);
//   }
//   function showTech(idx) {
//     techItems.forEach((item, i) => {
//       item.classList.toggle('active', i === idx);
//     });
//     setR3Bg(idx);
//   }
//   // r3初始时设置背景
//   setR3Bg(0);
//   setInterval(() => {
//     current = (current + 1) % techItems.length;
//     showTech(current);
//   }, 4000);
//   // 点击item手动切换
//   techItems.forEach((item, idx) => {
//     item.addEventListener('click', () => {
//       current = idx;
//       showTech(current);
//     });
//   });
// }); 