<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-column">
          <h3>关于TGA</h3>
          <ul>
            <li><router-link to="/about">关于我们</router-link></li>
            <li><router-link to="/grading/process">评级流程</router-link></li>
            <li><router-link to="/protection-policy">服务协议</router-link></li>
            <li><router-link to="/careers">加入我们</router-link></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3>服务支持</h3>
          <ul>
            <li><router-link to="/submit">提交评级</router-link></li>
            <li><router-link to="/lookup">评级查询</router-link></li>
            <li><router-link to="/faq">常见问题</router-link></li>
            <li><router-link to="/customerservice">联系我们</router-link></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3>联系方式</h3>
          <ul>
            <li><i class="icon location"></i> 上海市闵行区平阳路258号1层</li>
            <li><i class="icon phone"></i> 400-888-8888</li>
            <li><i class="icon email"></i> service@tga.com</li>
            <li><i class="icon time"></i> 周一至周五 9:00-18:00</li>
          </ul>
          
          <div class="social-links">
            <a href="#" class="social-icon"><i class="icon wechat"></i></a>
            <a href="#" class="social-icon"><i class="icon weibo"></i></a>
            <a href="#" class="social-icon"><i class="icon instagram"></i></a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="copyright">
          <p>© 2025 TGA 潮玩评级机构 | 专业 · 权威 · 可信赖</p>
          <p>沪ICP备12345678号 | 沪公网安备 31011502008888号</p>
        </div>
        
        <div class="payment-methods">
          <div class="payment-icon"><i class="icon alipay"></i></div>
          <div class="payment-icon"><i class="icon wechat-pay"></i></div>
          <div class="payment-icon"><i class="icon visa"></i></div>
          <div class="payment-icon"><i class="icon mastercard"></i></div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: #353c44;
  color: white;
  padding: 70px 0 0;
  font-size: 0.95rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  padding-bottom: 50px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.footer-column h3 {
  font-size: 1.4rem;
  margin-bottom: 25px;
  position: relative;
  padding-bottom: 12px;
}

.footer-column h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: #3498db;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column ul li {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.footer-column ul li a {
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.3s ease;
  display: block;
  padding: 3px 0;
}

.footer-column ul li a:hover {
  color: white;
  padding-left: 5px;
}

.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 12px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.location { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>'); }
.phone { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>'); }
.email { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>'); }
.time { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>'); }
.wechat { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M8.2 13.6c-.3 0-.5-.2-.5-.5s.2-.5.5-.5c.3 0 .5.2.5.5s-.3.5-.5.5zm3.5 0c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5z"/><path d="M12 3C6.5 3 2 6.6 2 11c0 2 1.1 3.8 2.8 5 .2.1.3.4.2.7 0 .2-.1.3-.2.4-.4.3-.8.6-1.1.9-.1.1-.2.2-.1.4.1.5.9 1.1 1.7 1.8 2.4.1.1.3.1.4 0 .6-.4 1.1-.7 1.7-1 .1-.1.3 0 .4.1.8.4 1.7.6 2.6.7 4.5.1 8.2-2.9 8.2-6.5 0-4.4-4.5-8-10-8zm6.7 9.8c-.1.1-.3.2-.5.1-.6-.2-1.4-.4-2.1-.3-.1 0-.2 0-.3-.1-.1-.1-.1-.2 0-.3.4-.5.6-1.1.6-1.8 0-1.5-1.4-2.8-3.1-2.8-1.7 0-3.1 1.2-3.1 2.8 0 1.5 1.4 2.8 3.1 2.8.5 0 1-.1 1.4-.3.1-.1.3-.1.4 0 .5.3 1.1.5 2.1.8.1.1.2.2.4.2.1 0 .3-.1.4-.1.4-.4.9-.9 1.3-1.4.1-.1.1-.3.1-.4 0-.2-.1-.4-.1-.6-.2-.1-.1-.2-.3-.1-.4.3-.7.5-1.5.5-2.3.1-.1-.1-.2-.1-.3-.1z"/></svg>'); }
.weibo { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M10.32 15.42c-.15.08-.33.13-.51.13-.51 0-.92-.42-.92-.93 0-.51.41-.93.92-.93.23 0 .44.09.61.23.1.1.18.22.23.35.05.13.07.27.07.41 0 .23-.07.45-.2.64-.1.14-.25.25-.42.3zm.72-3.07c-.6.34-1.29.54-2.01.54-1.85 0-3.35-1.5-3.35-3.35 0-.72.23-1.39.62-1.94.06-.08.06-.2 0-.28-.07-.08-.19-.08-.26 0-.5.65-.79 1.43-.79 2.26 0 2.14 1.74 3.88 3.88 3.88.87 0 1.69-.29 2.36-.79.09-.06.1-.19.04-.28-.05-.08-.18-.09-.27-.04zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.5 11.5c0 1.93-1.57 3.5-3.5 3.5-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5c1.93 0 3.5 1.57 3.5 3.5z"/></svg>'); }
.instagram { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>'); }
.alipay { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M19.3 7.6c-.1-.2-.3-.3-.5-.3h-2.1c-.2 0-.4.1-.5.3l-1.3 2.8-1.7-3.8c-.1-.2-.3-.3-.5-.3h-2.1c-.3 0-.4.2-.4.4 0 .1 0 .2.1.3l3.3 7.3v2.7c0 .3.2.5.5.5h1c.3 0 .5-.2.5-.5v-2.7l3.3-7.3c.1-.1.1-.2.1-.3 0-.2-.1-.4-.3-.4zM7.6 15.4c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8z"/></svg>'); }
.wechat-pay { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M8.2 13.6c-.3 0-.5-.2-.5-.5s.2-.5.5-.5c.3 0 .5.2.5.5s-.3.5-.5.5zm3.5 0c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5z"/><path d="M12 3C6.5 3 2 6.6 2 11c0 2 1.1 3.8 2.8 5 .2.1.3.4.2.7 0 .2-.1.3-.2.4-.4.3-.8.6-1.1.9-.1.1-.2.2-.1.4.1.5.9 1.1 1.7 1.8 2.4.1.1.3.1.4 0 .6-.4 1.1-.7 1.7-1 .1-.1.3 0 .4.1.8.4 1.7.6 2.6.7 4.5.1 8.2-2.9 8.2-6.5 0-4.4-4.5-8-10-8zm6.7 9.8c-.1.1-.3.2-.5.1-.6-.2-1.4-.4-2.1-.3-.1 0-.2 0-.3-.1-.1-.1-.1-.2 0-.3.4-.5.6-1.1.6-1.8 0-1.5-1.4-2.8-3.1-2.8-1.7 0-3.1 1.2-3.1 2.8 0 1.5 1.4 2.8 3.1 2.8.5 0 1-.1 1.4-.3.1-.1.3-.1.4 0 .5.3 1.1.5 2.1.8.1.1.2.2.4.2.1 0 .3-.1.4-.1.4-.4.9-.9 1.3-1.4.1-.1.1-.3.1-.4 0-.2-.1-.4-.1-.6-.2-.1-.1-.2-.3-.1-.4.3-.7.5-1.5.5-2.3.1-.1-.1-.2-.1-.3-.1z"/></svg>'); }
.visa { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M17.5 8h-2.2c-.3 0-.6.2-.7.5l-1 2.3-1-2.3c-.1-.3-.4-.5-.7-.5H9.3c-.3 0-.5.2-.5.5v7c0 .3.2.5.5.5h2.2c.3 0 .6-.2.7-.5l1-2.3 1 2.3c.1.3.4.5.7.5h2.2c.3 0 .5-.2.5-.5v-7c0-.3-.2-.5-.5-.5zM7.5 15.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>'); }
.mastercard { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 6c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0-4C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>'); }

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.social-icon:hover {
  background: #2d3539;
  transform: translateY(-3px);
}

.footer-bottom {
  padding: 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.copyright p {
  margin: 5px 0;
  color: #bdc3c7;
  font-size: 0.9rem;
}

.payment-methods {
  display: flex;
  gap: 15px;
}

.payment-icon {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .footer-content {
    gap: 30px;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .payment-methods {
    justify-content: center;
  }
}
</style>