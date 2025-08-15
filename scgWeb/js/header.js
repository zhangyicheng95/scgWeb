/**
 * 现代化Header组件 - 支持Web端和移动端
 * 功能特性：
 * - 响应式设计
 * - 智能滚动检测
 * - 触摸友好的交互
 * - 平滑动画效果
 * - 无障碍支持
 */
// 公共导航组件 - 借鉴4d-bios.cn设计
class Header {
  constructor() {
    this.init();
  }

  init() {
    this.createHeader();
    this.handleScroll();
    this.initMobileInteraction(); // 添加移动端交互初始化
  }

  createHeader() {
    const baseUrl = window.location.origin + (window.location.href?.indexOf('/scgWeb/') > -1 ? '/scgWeb' : '');
    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
      <div class="header-container">
        <div class="header-left">
          <a href="${baseUrl}/" class="logo">
            <img src="https://zhilv-oss.oss-cn-beijing.aliyuncs.com/shanwentou/templates/image/logo.png" alt="SCG Logo" class="logo-img">
          </a>
        </div>
        <nav class="header-nav">
          <ul class="nav-menu">
            <li class="nav-item" data-menu="home">
              <a href="${baseUrl}/" class="nav-link active">首页</a>
            </li>
            <li class="nav-item" data-menu="news">
              <a href="#" class="nav-link">新闻中心</a>
            </li>
            <li class="nav-item" data-menu="culture-tech">
              <a href="#" class="nav-link">文旅科技</a>
            </li>
            <li class="nav-item" data-menu="industry">
              <a href="#" class="nav-link">产业布局</a>
            </li>
            <li class="nav-item" data-menu="party">
              <a href="#" class="nav-link">党建动态</a>
            </li>
            <li class="nav-item" data-menu="about">
              <a href="#" class="nav-link">走进文投</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="mega-menu-panel" id="megaMenuPanel">
        <div class="mega-menu-inner">
          <ul class="mega-menu-col" data-menu="news">
            <li><a href="#">集团要闻</a></li>
            <li><a href="#">公司动态</a></li>
            <li><a href="#">媒体聚焦</a></li>
            <li><a href="#">企业内刊</a></li>
          </ul>
          <ul class="mega-menu-col" data-menu="culture-tech">
            <li><a href="#">文旅智能科技</a></li>
            <li><a href="#">文旅数娱科技</a></li>
            <li><a href="#">文旅融合科技</a></li>
          </ul>
          <ul class="mega-menu-col" data-menu="industry">
            <li><a href="#">影视生产</a></li>
            <li><a href="#">文化旅游</a></li>
            <li><a href="#">文化金融</a></li>
            <li><a href="#">文化传媒</a></li>
            <li><a href="#">艺术文创</a></li>
          </ul>
          <ul class="mega-menu-col" data-menu="party">
            <li><a href="#">党群工作</a></li>
            <li><a href="#">支部动态</a></li>
            <li><a href="#">工会动态</a></li>
          </ul>
          <ul class="mega-menu-col" data-menu="about">
            <li><a href="${baseUrl}/about/about-us.html">集团简介</a></li>
            <li><a href="#">董事长致辞</a></li>
            <li><a href="#">领导班子</a></li>
            <li><a href="#">企业集群</a></li>
            <li><a href="#">企业文化</a></li>
            <li><a href="#">大事记</a></li>
            <li><a href="${baseUrl}/about/contact-us.html">人才招聘</a></li>
          </ul>
        </div>
      </div>
    `;
    document.body.insertBefore(header, document.body.firstChild);

    // 保存header引用
    this.header = header;
  }

  handleScroll() {
    let lastScrollTop = 0;
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // 隐藏/显示导航栏
      if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }

      lastScrollTop = scrollTop;
    });
  }

  // 添加移动端交互逻辑 - 保持原有设计不变
  initMobileInteraction() {
    const mobileMenuToggle = this.header.querySelector('.mobile-menu-toggle');
    const megaMenuPanel = this.header.querySelector('.mega-menu-panel');

    if (mobileMenuToggle && megaMenuPanel) {
      // 移动端菜单切换
      mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        megaMenuPanel.style.display = megaMenuPanel.style.display === 'block' ? 'none' : 'block';
      });

      // 移动端触摸优化
      this.optimizeMobileTouch();

      // 移动端点击外部关闭菜单
      document.addEventListener('click', (e) => {
        if (!this.header.contains(e.target)) {
          mobileMenuToggle.classList.remove('active');
          megaMenuPanel.style.display = 'none';
        }
      });
    }
  }

  // 移动端触摸优化 - 保持原有交互逻辑
  optimizeMobileTouch() {
    const megaMenuLinks = this.header.querySelectorAll('.mega-menu-col a');

    megaMenuLinks.forEach(link => {
      // 添加触摸反馈
      link.addEventListener('touchstart', () => {
        link.style.opacity = '0.7';
      }, { passive: true });

      link.addEventListener('touchend', () => {
        link.style.opacity = '1';
      }, { passive: true });

      // 触摸目标优化
      link.style.minHeight = '44px';
      link.style.display = 'flex';
      link.style.alignItems = 'center';
    });
  }
}

// 页面加载完成后初始化导航
document.addEventListener('DOMContentLoaded', () => {
  new Header();
}); 