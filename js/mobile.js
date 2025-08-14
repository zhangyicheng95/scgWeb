// 移动端适配JavaScript
(function() {
  'use strict';

  // 检测是否为移动设备
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // 移动端初始化
  function initMobile() {
    if (!isMobile) return;

    console.log('移动端适配已启用');
    
    // 设置移动端视口
    setMobileViewport();
    
    // 初始化触摸手势
    initTouchGestures();
    
    // 优化移动端滚动
    optimizeMobileScroll();
    
    // 移动端菜单处理
    initMobileMenu();
    
    // 移动端图片懒加载
    initLazyLoading();
    
    // 移动端性能优化
    optimizeMobilePerformance();
  }

  // 设置移动端视口
  function setMobileViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    }
  }

  // 初始化触摸手势
  function initTouchGestures() {
    if (!isTouch) return;

    // 触摸滑动支持
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    // 触摸开始
    document.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    // 触摸移动
    document.addEventListener('touchmove', function(e) {
      currentX = e.touches[0].clientX;
      currentY = e.touches[0].clientY;
    }, { passive: true });

    // 触摸结束
    document.addEventListener('touchend', function(e) {
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      const minSwipeDistance = 50;

      // 检查是否在移动端菜单上滑动
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        // 在菜单上向下滑动关闭菜单
        if (deltaY > 0 && Math.abs(deltaY) > minSwipeDistance) {
          closeMobileMenu();
          return;
        }
      }

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        // 水平滑动
        if (deltaX > 0) {
          handleSwipeRight();
        } else {
          handleSwipeLeft();
        }
      } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
        // 垂直滑动
        if (deltaY > 0) {
          handleSwipeDown();
        } else {
          handleSwipeUp();
        }
      }
    }, { passive: true });
  }

  // 处理向右滑动
  function handleSwipeRight() {
    console.log('向右滑动');
    // 可以在这里添加向右滑动的逻辑，比如显示上一个轮播项
  }

  // 处理向左滑动
  function handleSwipeLeft() {
    console.log('向左滑动');
    // 可以在这里添加向左滑动的逻辑，比如显示下一个轮播项
  }

  // 处理向下滑动
  function handleSwipeDown() {
    console.log('向下滑动');
    // 可以在这里添加向下滑动的逻辑
  }

  // 处理向上滑动
  function handleSwipeUp() {
    console.log('向上滑动');
    // 可以在这里添加向上滑动的逻辑
  }

  // 优化移动端滚动
  function optimizeMobileScroll() {
    // 平滑滚动
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // 防止iOS橡皮筋效果
    document.body.addEventListener('touchmove', function(e) {
      if (e.target.closest('.scrollable')) {
        return;
      }
      e.preventDefault();
    }, { passive: false });

    // 优化滚动性能
    let ticking = false;
    function updateScroll() {
      ticking = false;
      // 在这里可以添加滚动时的优化逻辑
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // 移动端菜单处理
  function initMobileMenu() {
    // 创建移动端菜单按钮（初始隐藏）
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.display = 'none'; // 初始隐藏
    mobileMenuBtn.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;
    
    // 添加到页面
    const header = document.querySelector('.site-header');
    if (header) {
      header.appendChild(mobileMenuBtn);
    }

    // 移动端菜单切换
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      document.body.classList.toggle('mobile-menu-open');
      
      // 显示/隐藏移动端菜单
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu) {
        mobileMenu.classList.toggle('active');
      }
    });

    // 创建移动端菜单
    createMobileMenu();
    
    // 添加点击空白处关闭菜单的功能
    addClickOutsideToClose();
    
    // 监听页面状态变化，控制移动端菜单按钮的显示
    observePageState();
  }

  // 监听页面状态变化
  function observePageState() {
    // 检查当前页面状态
    function checkPageState() {
      const r1 = document.querySelector('.r1');
      const r2 = document.querySelector('.r2');
      const r3 = document.querySelector('.r3');
      const r4 = document.querySelector('.r4');
      const r5 = document.querySelector('.r5');
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      
      if (!mobileMenuBtn) return;
      
      // 如果r1显示，其他模块隐藏，则隐藏移动端菜单按钮
      if (r1 && r1.style.display !== 'none' && 
          r2 && r2.style.display === 'none' && 
          r3 && r3.style.display === 'none' && 
          r4 && r4.style.display === 'none' && 
          r5 && r5.style.display === 'none') {
        mobileMenuBtn.style.display = 'none';
      } else {
        // 如果任何r2-r5模块显示，则显示移动端菜单按钮
        mobileMenuBtn.style.display = 'block';
      }
    }
    
    // 初始检查
    checkPageState();
    
    // 监听DOM变化
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          checkPageState();
        }
      });
    });
    
    // 观察r1-r5模块的style属性变化
    const modules = document.querySelectorAll('.r1, .r2, .r3, .r4, .r5');
    modules.forEach(module => {
      observer.observe(module, { attributes: true, attributeFilter: ['style'] });
    });
  }

  // 添加点击空白处关闭菜单的功能
  function addClickOutsideToClose() {
    document.addEventListener('click', function(e) {
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      const mobileMenu = document.querySelector('.mobile-menu');
      
      // 如果菜单是打开的，且点击的不是菜单按钮和菜单内容
      if (mobileMenu && mobileMenu.classList.contains('active') && 
          !mobileMenuBtn.contains(e.target) && 
          !mobileMenu.contains(e.target)) {
        
        // 关闭菜单
        mobileMenuBtn.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
        mobileMenu.classList.remove('active');
      }
    });
    
    // 添加ESC键关闭菜单的功能
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          closeMobileMenu();
        }
      }
    });
  }

  // 创建移动端菜单
  function createMobileMenu() {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
      <nav class="mobile-nav">
        <ul class="mobile-nav-list">
          <li><a href=".r2" class="mobile-nav-link">走进文投</a></li>
          <li><a href=".r3" class="mobile-nav-link">文旅科技</a></li>
          <li><a href=".r4" class="mobile-nav-link">产业布局</a></li>
          <li><a href=".r5" class="mobile-nav-link">新闻动态</a></li>
        </ul>
      </nav>
    `;

    document.body.appendChild(mobileMenu);

    // 移动端菜单链接点击处理
    const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSelector = this.getAttribute('href');
        const targetElement = document.querySelector(targetSelector);
        
        if (targetElement) {
          // 关闭移动端菜单
          closeMobileMenu();
          
          // 隐藏所有模块
          const allModules = document.querySelectorAll('.r2, .r3, .r4, .r5');
          allModules.forEach(module => {
            if (module) {
              module.style.display = 'none';
            }
          });
          
          // 显示目标模块
          targetElement.style.display = 'block';
          
          // 滚动到目标位置
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // 切换背景（如果需要）
          switchBackground(targetSelector.substring(1));
        }
      });
    });
  }

  // 背景切换函数
  function switchBackground(moduleType) {
    const fullPage = document.querySelector('.fullPage');
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
        fullPage.style.backgroundImage = 'url(https://oss.allintrip.cn/shanwentou/upfiles/solution/GQVMZVPJN3ND.png)';
        fullPage.style.backgroundSize = 'cover';
        fullPage.style.backgroundPosition = 'center';
        fullPage.style.backgroundRepeat = 'no-repeat';
        break;
        
      case 'r4':
        // 显示指定图片
        fullPage.style.backgroundImage = 'url(https://oss.allintrip.cn/shanwentou/upfiles/onepage/20240441592859731.jpeg)';
        fullPage.style.backgroundSize = 'cover';
        fullPage.style.backgroundPosition = 'center';
        fullPage.style.backgroundRepeat = 'no-repeat';
        break;

      case 'r5':
        // r5显示互联网风格渐变背景
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

  // 关闭移动端菜单的通用函数
  function closeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.remove('active');
    }
    if (mobileMenu) {
      mobileMenu.classList.remove('active');
    }
    document.body.classList.remove('mobile-menu-open');
  }

  // 移动端图片懒加载
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  // 移动端性能优化
  function optimizeMobilePerformance() {
    // 减少重绘和回流
    const style = document.createElement('style');
    style.textContent = `
      .mobile-optimized {
        will-change: auto;
        transform: translateZ(0);
        backface-visibility: hidden;
      }
    `;
    document.head.appendChild(style);

    // 为关键元素添加性能优化类
    const criticalElements = document.querySelectorAll('.tech-item, .industry-item, .news-item');
    criticalElements.forEach(el => {
      el.classList.add('mobile-optimized');
    });
  }

  // 移动端响应式处理
  function handleResize() {
    if (window.innerWidth <= 768) {
      // 移动端布局调整
      adjustMobileLayout();
    } else {
      // 桌面端布局恢复
      restoreDesktopLayout();
    }
  }

  // 调整移动端布局
  function adjustMobileLayout() {
    // 隐藏桌面端侧边栏
    const sidebar = document.querySelector('.public-sidebar');
    if (sidebar) {
      sidebar.style.display = 'none';
    }

    // 调整内容间距
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
      section.style.padding = '40px 20px';
    });
  }

  // 恢复桌面端布局
  function restoreDesktopLayout() {
    // 显示桌面端侧边栏
    const sidebar = document.querySelector('.public-sidebar');
    if (sidebar) {
      sidebar.style.display = 'block';
    }

    // 恢复内容间距
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
      section.style.padding = '';
    });
  }

  // 移动端触摸反馈
  function addTouchFeedback() {
    const touchElements = document.querySelectorAll('.layer-icon, .nav-link, .sidebar-link, .news-content-left, .news-item');
    
    touchElements.forEach(element => {
      element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
        this.style.transition = 'transform 0.1s ease';
      }, { passive: true });

      element.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
      }, { passive: true });
    });
  }

  // 移动端加载优化
  function optimizeMobileLoading() {
    if (isMobile) {
      // 减少移动端加载帧数
      const canvas = document.querySelector('.loadFrame');
      if (canvas) {
        canvas.setAttribute('data-images-count', '60'); // 移动端减少到60帧
      }
    }
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobile);
  } else {
    initMobile();
  }

  // 窗口大小改变时处理
  window.addEventListener('resize', handleResize);
  
  // 触摸反馈初始化
  document.addEventListener('DOMContentLoaded', addTouchFeedback);
  
  // 移动端加载优化
  document.addEventListener('DOMContentLoaded', optimizeMobileLoading);

  // 导出移动端检测函数供其他脚本使用
  window.isMobile = isMobile;
  window.isTouch = isTouch;
  
  // 导出移动端菜单显示触发函数
  window.triggerMobileMenuShow = function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
      mobileMenuBtn.style.display = 'block';
    }
  };

})();
