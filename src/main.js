/**
 * Перед использованием убедитесь, что в HTML подключены:
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
 * <script src="https://unpkg.com/split-type"></script>
 */

// 1. Mobile Menu Toggle
const burgerBtn = document.getElementById('burger-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu__list a');

if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        burgerBtn.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            burgerBtn.classList.remove('active');
        });
    });
}

// 2. Hero Animation (GSAP + SplitType)
// ВАЖНО: Используем 'words, chars', чтобы буквы были обернуты в неразрывные контейнеры слов
const text = new SplitType('#hero-title', { 
    types: 'words, chars',
    tagName: 'span' 
});

// Анимация букв
gsap.from(text.chars, {
    opacity: 0,
    y: 50,
    rotate: 10,
    duration: 0.8,
    stagger: 0.05,
    ease: "back.out(1.7)",
    delay: 0.5
});

// 3. Form Validation & Captcha
const form = document.getElementById('main-form');
const phoneInput = document.getElementById('phone');
const captchaLabel = document.getElementById('captcha-label');
const captchaInput = document.getElementById('captcha-input');
const formMessage = document.getElementById('form-message');

if (form) {
    // Генерация простой капчи
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    let captchaResult = num1 + num2;
    if (captchaLabel) captchaLabel.innerText = `Сколько будет ${num1} + ${num2}?`;

    // Валидация телефона (только цифры и плюс)
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9+]/g, '');
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (parseInt(captchaInput.value) !== captchaResult) {
            formMessage.innerText = "❌ Ошибка в капче!";
            formMessage.style.color = "red";
            return;
        }

        // Имитация AJAX
        formMessage.innerText = "⏳ Отправка...";
        formMessage.style.color = "var(--accent-color, #007bff)";
        
        setTimeout(() => {
            form.reset();
            formMessage.innerText = "✅ Доступ разрешен! Мы свяжемся с вами.";
            formMessage.style.color = "green";
            formMessage.classList.add('success');
        }, 1500);
    });
}

// 4. Cookie Popup Logic
const cookiePopup = document.getElementById('cookie-popup');
const cookieAccept = document.getElementById('cookie-accept');

if (cookiePopup && !localStorage.getItem('synerix_cookies')) {
    setTimeout(() => {
        cookiePopup.classList.add('show');
    }, 2000);
}

if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('synerix_cookies', 'true');
        cookiePopup.classList.remove('show');
    });
}