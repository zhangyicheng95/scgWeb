/**
 * Reusable Footer Component
 */
class Footer {
    constructor() {
        // In a real app, you might pass a container selector
        // For simplicity, we'll append to the body.
        this.container = document.body;
        this.init();
    }

    init() {
        this.createFooter();
    }

    createFooter() {
        const footer = document.createElement('footer');
        footer.className = 'site-footer';
        footer.innerHTML = `
            <div class="footer-container">
                <div class="footer-top">
                    <div class="footer-logo-section">
                        <img src="https://zhilv-oss.oss-cn-beijing.aliyuncs.com/shanwentou/templates/image/logo.png" alt="SCG Logo" class="footer-logo">
                        <div class="footer-social-icons">
                            <div class="social-icon-wrapper">
                                <a href="#" aria-label="WeChat" class="social-icon-link" data-popup-target="wechat-popup">
                                    <svg t="1755222904150" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3417" width="200" height="200"><path d="M711.9744 335.6032c5.19424 0 10.28992 0.09728 15.38816 0.34176C700.40704 189.1712 548.79616 76.8 365.80608 76.8 163.75552 76.8 0 213.7728 0 382.74688 0 481.8112 56.28416 569.90208 143.58656 625.792c1.12896 0.7104 3.35744 2.10816 3.35744 2.10816l-35.35616 110.73024 132.2432-67.36c0 0 4.13952 1.19936 6.22208 1.78944 36.36224 10.11968 75.29856 15.6096 115.75296 15.6096 8.25728 0 16.4416-0.31872 24.57728-0.76032-7.49696-23.25504-11.61472-47.73376-11.61472-72.99584C378.76864 460.66432 527.9936 335.6032 711.9744 335.6032zM493.09952 227.64032c28.37504 0 51.3344 22.24896 51.3344 49.74336 0 27.44192-22.95808 49.7408-51.3344 49.7408-28.39808 0-51.35616-22.29888-51.35616-49.7408C441.74208 249.88928 464.70144 227.64032 493.09952 227.64032zM238.51136 327.12448c-28.37248 0-51.35616-22.29888-51.35616-49.7408 0-27.4944 22.98368-49.74336 51.35616-49.74336 28.40064 0 51.40992 22.24896 51.40992 49.74336C289.92128 304.8256 266.912 327.12448 238.51136 327.12448z" fill="#969696" p-id="3418"></path><path d="M405.67424 616.72704c0 142.75328 138.39232 258.48192 309.09312 258.48192 34.1568 0 67.04128-4.65408 97.76768-13.23008 1.76384-0.4672 5.24416-1.52064 5.24416-1.52064l111.68384 56.9472-29.8432-93.5552c0 0 1.91232-1.19936 2.84288-1.78688 73.70496-47.2192 121.29024-121.60896 121.29024-205.33632 0-142.73152-138.34496-258.43456-308.9856-258.43456C544.06656 358.29248 405.67424 473.99552 405.67424 616.72704zM778.8672 527.7056c0-23.17952 19.40608-41.97248 43.37024-41.97248 24.0128 0 43.42016 18.79296 43.42016 41.97248 0 23.22944-19.40864 42.048-43.42016 42.048C798.27328 569.7536 778.8672 550.93504 778.8672 527.7056zM563.79136 527.7056c0-23.17952 19.4304-41.97248 43.39456-41.97248 23.98976 0 43.42016 18.79296 43.42016 41.97248 0 23.22944-19.4304 42.048-43.42016 42.048C583.22176 569.7536 563.79136 550.93504 563.79136 527.7056z" fill="#969696" p-id="3419"></path></svg>
                                </a>
                                <div id="wechat-popup" class="qr-popup">
                                    <img src="https://oss.allintrip.cn/shanwentou/upfiles/onepage/f45d05f3c62a8242.jpg" alt="WeChat QR Code">
                                </div>
                            </div>
                            <div class="social-icon-wrapper">
                                <a href="javascript:void(0);" aria-label="Weibo" class="social-icon-link" data-popup-target="weibo-popup">
                                    <svg t="1755222946519" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3573" width="200" height="200"><path d="M726.973608 502.538511c-34.789341-6.760984-17.886369-25.464975-17.886369-25.464975s34.026978-56.002478-6.706749-96.79044c-50.495044-50.439786-173.186388 6.434549-173.186388 6.434549-46.827515 14.559601-34.408671-6.598278-27.810393-42.697451 0-42.424228-14.518668-114.294093-139.309836-71.815629-124.709303 42.642193-231.751225 192.216813-231.751225 192.216813-74.487481 99.298564-64.591087 176.076204-64.591087 176.076204 18.567891 169.477926 198.678992 216.046544 338.765517 227.061412 147.380652 11.615549 346.304214-50.821479 406.614811-178.911786C871.422488 560.284703 761.818207 509.518482 726.973608 502.538511L726.973608 502.538511zM415.431106 819.736826c-146.275481 6.816243-264.550235-66.526159-264.550235-164.188456 0-97.716532 118.274754-176.13044 264.550235-182.838212 146.425907-6.760984 264.919648 53.602825 264.919648 151.101393C680.350754 721.474872 561.803801 813.084313 415.431106 819.736826L415.431106 819.736826zM415.431106 819.736826" fill="#CCCCCC" p-id="3574"></path><path d="M386.285299 537.055652c-147.202597 17.231453-130.162502 155.082054-130.162502 155.082054s-1.526773 43.678802 39.452547 65.872267c86.102007 46.622854 174.74079 18.376533 219.550345-39.479153C559.94957 660.729369 533.611715 519.988951 386.285299 537.055652L386.285299 537.055652zM349.15054 730.527039c-27.482935 3.27151-49.622164-12.596899-49.622164-35.552727 0-22.902616 19.657712-46.895053 47.140647-49.785893 31.573089-2.944052 52.103682 15.268752 52.103682 38.225603C398.772704 706.261379 376.469746 727.419258 349.15054 730.527039L349.15054 730.527039zM435.853228 656.69345c-9.296737 6.925736-20.775162 5.944386-25.656333-2.399653-5.15337-8.124028-3.217275-21.157879 6.216585-27.974122 10.906397-8.124028 22.221094-5.779633 27.1565 2.345418C448.503339 636.953873 444.959629 649.495514 435.853228 656.69345L435.853228 656.69345zM435.853228 656.69345" fill="#CCCCCC" p-id="3575"></path><path d="M798.625508 442.882829c11.83249 0 21.921265-8.723685 23.610744-20.230764 0.217964-0.817622 0.327458-1.581008 0.327458-2.562359 17.994839-161.571862-132.398426-133.76147-132.398426-133.76147-13.360286 0-24.047696 10.796904-24.047696 24.26566 0 13.249769 10.68741 24.047696 24.047696 24.047696 108.023272-23.829731 84.193541 84.192517 84.193541 84.192517C774.359848 432.19542 785.210987 442.882829 798.625508 442.882829L798.625508 442.882829zM798.625508 442.882829" fill="#CCCCCC" p-id="3576"></path><path d="M781.066597 160.855548c-51.966559-12.215206-105.405655-1.744737-120.401184 1.14508-1.199315 0.10847-2.290159 1.199315-3.325745 1.417279-0.490164 0.109494-0.87288 0.654916-0.87288 0.654916-14.72333 4.199649-25.520233 17.831111-25.520233 34.026978 0 19.249413 15.595186 35.062564 35.063587 35.062564 0 0 18.920932-2.508123 31.736818-7.579629 12.759605-5.125741 120.401184-3.815909 173.895539 86.047772 29.227672 65.545832 12.868075 109.387339 10.796904 116.475781 0 0-6.925736 17.013489-6.925736 33.80799 0 19.357883 15.595186 31.518854 34.95307 31.518854 16.140609 0 29.718859-2.181689 33.69952-29.556153l0.217964 0C1001.802954 272.532023 874.149599 182.557826 781.066597 160.855548L781.066597 160.855548zM781.066597 160.855548" fill="#CCCCCC" p-id="3577"></path></svg>
                                </a>
                                <div id="weibo-popup" class="qr-popup">
                                    <img src="https://oss.allintrip.cn/shanwentou/upfiles/onepage/71a2849669dcb9a7.png" alt="Weibo QR Code">
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav class="footer-nav-section">
                        <div class="footer-nav-col">
                            <h4>关于我们</h4>
                            <ul>
                                <li><a href="#">公司介绍</a></li>
                                <li><a href="#">新闻中心</a></li>
                            </ul>
                        </div>
                        <div class="footer-nav-col">
                            <h4>联系我们</h4>
                            <ul>
                                <li><a href="../about/concat-us.html">联系我们</a></li>
                                <li><a href="#">成为合作伙伴</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div class="footer-bottom">
                    <div class="footer-copyright">
                        <p>Copyright 2025 Shaanxi Culture Industry Investment Holdings (Group)Co. All rights reserved.</p>
                        <p>陕西省文化产业投资控股(集团)有限公司保留一切权利</p>
                        <p><a href="https://beian.miit.gov.cn/" target="_blank" rel="nofollow">陕ICP备14004739号-1</a></p>
                    </div>
                    <div class="footer-legal">
                        <a href="#">隐私政策</a>
                        <a href="#">法律声明</a>
                    </div>
                </div>
            </div>
        `;
        this.container.appendChild(footer);

        const socialIconLinks = document.querySelectorAll('.social-icon-link');

        socialIconLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                const targetPopupId = link.getAttribute('data-popup-target');
                const targetPopup = document.getElementById(targetPopupId);

                // Close all other popups
                document.querySelectorAll('.qr-popup.show').forEach(popup => {
                    if (popup.id !== targetPopupId) {
                        popup.classList.remove('show');
                    }
                });

                // Toggle the current popup
                if (targetPopup) {
                    targetPopup.classList.toggle('show');
                }
            });
        });

        // Close popups when clicking anywhere else on the page
        document.addEventListener('click', (event) => {
            const openPopups = document.querySelectorAll('.qr-popup.show');
            const isClickInsidePopup = event.target.closest('.qr-popup') !== null;
            const isClickOnIcon = event.target.closest('.social-icon-link') !== null;

            if (!isClickInsidePopup && !isClickOnIcon) {
                openPopups.forEach(popup => {
                    popup.classList.remove('show');
                });
            }
        });
    }
}

// Instantiate the footer once the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Footer();
});
