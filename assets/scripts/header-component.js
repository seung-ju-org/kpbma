function toggleMenu() {
    document.querySelector('.menu').classList.toggle('active')
}

class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
<header>
    <div class="container">
        <h1 class="logo">
            <a href="/">
                <div class="logo-txt">
                    <img src="/assets/images/logotxt-white.png" class="white" alt="kpbma">
                    <img src="/assets/images/logotxt-color.png" class="color" alt="kpbma">
                </div>
                <span>디지털역사관</span>
                <div class="logo-simbol">
                    <img src="/assets/images/simbol-white.png" class="white" alt="kpbma">
                    <img src="/assets/images/simbol.png" class="color" alt="kpbma">
                </div>
            </a>
        </h1>
        <nav class="gnb">
            <a class="btn" href="/highlight">
                역사 하이라이트
            </a>
            <div class="sub-menu-container">
                <a href="/industrial">산업관</a>
                <div class="sub-menu shadow">
                    <a href="/industrial#1">한국 제약바이오산업의 120년</a>
                    <a href="/evolution/first">그림으로 보는 산업 변천사</a>
                </div>
            </div>
            <div class="sub-menu-container">
                <a href="/association">협회관</a>
                <div class="sub-menu shadow">
                    <a href="/association">KPBMA 80년</a>
                    <a href="/fame">역대 회장/이사장</a>
                </div>
            </div>
            <a href="/digital-archive">디지털아카이브</a>
            <div class="sub-menu-container"> 
                <a href="/celebrate">80주년 기념사업</a>
            </div>
        </nav>
<!--            <div class="header-btn-set">-->
<!--                <a href="/industrial/details">-->
<!--                    <div class="object book"></div>-->
<!--                    <label>KPBMA 80년사</label>-->
<!--                </a>-->
<!--            </div>-->
        <button type="button" class="menu-button" onclick="toggleMenu()">
        <div class="wrap">
            <span></span>
            <span></span>
            <span></span>
        </div>
        </button>
    </div>
</header>
<div class="menu">
    <button class="close" onclick="toggleMenu()"><span></span><span></span></button>
    <a class="btn" href="/highlight">역사 하이라이트</a>
    <a href="/industrial">산업관</a>
    <div class="sub-menu">
        <a href="/industrial#1">한국 제약바이오산업의 120년</a>
        <a href="/evolution/first">그림으로 보는 산업 변천사</a>
    </div>
    <a href="/association">협회관</a>
    <div class="sub-menu">
        <a href="/association">KPBMA 80년</a>
        <a href="/fame">역대 회장/이사장</a>
    </div>
    <a href="/digital-archive">디지털아카이브</a>
    <a href="/celebrate">80주년 기념사업</a>
</div>
        `;
    }
}

customElements.define('header-component', HeaderComponent);
