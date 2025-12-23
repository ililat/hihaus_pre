// Конфигурация сайта
const SITE_CONFIG = {
    phone: '+7 (917) 109-70-72',
    email: 'info@hithaus.ru',
    workingHours: 'Ежедневно 9:00-21:00',
    address: 'г. Самара, ул. Промышленности, 278',
    social: {
        vk: '#',
        instagram: '#',
        youtube: '#',
        whatsapp: 'https://wa.me/79171097072'
    }
};

// Основные данные сайта
const SITE_DATA = {
    site: {
        title: 'HitHaus',
        tagline: 'Строительство бань из бруса под ключ в Самаре',
        phone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email
    },
    
    projects: {
        title: 'Наши реализованные проекты',
        subtitle: 'Более 500 бань построено в Самаре и области',
        items: [
            {
                id: 1,
                title: 'Баня 3×3 м в СНТ Водино',
                description: 'Компактная баня для небольшой семьи. Профилированный брус 140×140 мм, печь Harvia, терраса.',
                features: ['3×3 м', 'Брус 140×140 мм', 'Печь Harvia', 'Терраса']
            },
            {
                id: 2,
                title: 'Баня 4×4 м на Мехзаводе',
                description: 'Классическая баня с комнатой отдыха. Профилированный брус 190×140 мм, стеклянная дверь в парную.',
                features: ['4×4 м', 'Брус 190×140 мм', 'Комната отдыха', 'Стеклянная дверь']
            },
            {
                id: 3,
                title: 'Баня 5×4 м в Водинском массиве',
                description: 'Просторная баня с мансардой. Двухэтажная конструкция, большая терраса, финская печь Tylo.',
                features: ['5×4 м', 'Мансарда', 'Финская печь', 'Большая терраса']
            },
            {
                id: 4,
                title: 'Баня 6×4 м в СНТ Белозерки',
                description: 'Элитная баня с бассейном. Полная комплектация под ключ, система вентиляции, отдельная котельная.',
                features: ['6×4 м', 'Бассейн', 'Система вентиляции', 'Котельная']
            }
        ]
    },
    
    prices: {
        turnkey: {
            title: 'Цены на бани под ключ',
            note: 'Все цены включают доставку, сборку и полную комплектацию',
            sizes: ['3×3 м', '4×3 м', '4×4 м', '5×4 м', '6×4 м', '6×6 м'],
            materials: [
                {
                    name: 'Брус 90×140 мм (профилированный камерной сушки)',
                    prices: ['249 000₽', '432 000₽', '525 000₽', '639 000₽', '847 000₽', '1 050 000₽']
                },
                {
                    name: 'Брус 140×140 мм (профилированный камерной сушки)',
                    prices: ['324 000₽', '524 000₽', '624 000₽', '750 000₽', '998 000₽', '1 250 000₽']
                },
                {
                    name: 'Брус 190×140 мм (профилированный камерной сушки)',
                    prices: ['374 000₽', '574 000₽', '724 000₽', '850 000₽', '1 125 000₽', '1 450 000₽']
                }
            ]
        }
    },
    
    faq: {
        title: 'Частые вопросы',
        questions: [
            {
                question: 'Сколько времени занимает строительство бани под ключ?',
                answer: 'Срок строительства зависит от размера и сложности проекта. Стандартная баня 3×3 м строится за 3-5 дней, баня 6×4 м - за 10-14 дней. Мы используем готовые проекты и опытные бригады, что позволяет максимально сократить сроки.'
            },
            {
                question: 'Какой фундамент нужен для бани?',
                answer: 'Для бань из бруса мы рекомендуем свайно-винтовой фундамент или бетонные блоки. Стоимость фундамента от 42 000 рублей и рассчитывается индивидуально, исходя из грунта на вашем участке.'
            },
            {
                question: 'Даете ли вы гарантию на строительство?',
                answer: 'Да, мы предоставляем официальную гарантию 5 лет на все конструкции и материалы. Это самая длинная гарантия на рынке строительства бань в Самаре.'
            },
            {
                question: 'Можно ли построить баню зимой?',
                answer: 'Да, строительство возможно круглый год. Более того, зимой часто действуют специальные цены и скидки до 15%.'
            },
            {
                question: 'Что входит в стоимость "под ключ"?',
                answer: 'В стоимость входит: доставка материалов до участка, разгрузка, сборка сруба, монтаж кровли, установка окон и дверей, монтаж печи и дымохода, отделочные работы, подключение коммуникаций.'
            }
        ]
    }
};

// Инициализация сайта
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 HitHaus - Строительство бань в Самаре');
    
    initSite();
    setupEventListeners();
    initAnniversaryModal();
    initTracking();
    setupSmoothScroll();
});

// Основная инициализация
function initSite() {
    // Установка текущего года
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Заполнение основных данных
    document.getElementById('header-phone').textContent = SITE_CONFIG.phone;
    
    // Инициализация компонентов
    initProjectsGallery();
    initPriceTable();
    initFAQ();
    initMobileMenu();
    
    console.log('✅ Сайт инициализирован');
}

// Инициализация галереи проектов
function initProjectsGallery() {
    const slider = document.getElementById('projects-slider');
    if (!slider) return;
    
    let slidesHTML = '';
    
    SITE_DATA.projects.items.forEach((project, index) => {
        const featuresHTML = project.features.map(feature => 
            `<span class="project-tag">${feature}</span>`
        ).join('');
        
        slidesHTML += `
            <div class="project-slide" data-index="${index}">
                <div class="project-image-container">
                    <i class="fas fa-home"></i>
                    <div class="project-size">${project.features[0]}</div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-features">${featuresHTML}</div>
                    <span class="project-badge">Выполненный проект</span>
                </div>
            </div>
        `;
    });
    
    slider.innerHTML = slidesHTML;
    
    // Инициализация слайдера
    setTimeout(() => {
        initCustomSlider();
    }, 100);
}

// Инициализация таблицы цен
function initPriceTable() {
    const table = document.getElementById('turnkey-table');
    if (!table) return;
    
    const data = SITE_DATA.prices.turnkey;
    
    let theadHTML = `<thead><tr><th>Материал / Размер</th>`;
    data.sizes.forEach(size => theadHTML += `<th>${size}</th>`);
    theadHTML += `</tr></thead>`;
    
    let tbodyHTML = `<tbody>`;
    data.materials.forEach(material => {
        tbodyHTML += `<tr><td>${material.name}</td>`;
        material.prices.forEach(price => {
            tbodyHTML += `<td>${price}</td>`;
        });
        tbodyHTML += `</tr>`;
    });
    tbodyHTML += `</tbody>`;
    
    table.innerHTML = theadHTML + tbodyHTML;
}

// Инициализация FAQ
function initFAQ() {
    const container = document.getElementById('faq-list');
    if (!container) return;
    
    let faqHTML = '';
    
    SITE_DATA.faq.questions.forEach((item, index) => {
        faqHTML += `
            <div class="faq-item" data-index="${index}">
                <div class="faq-question">
                    <span>${item.question}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = faqHTML;
    
    // Инициализация аккордеона
    initAccordion();
}

// Кастомный слайдер проектов
function initCustomSlider() {
    const slider = document.querySelector('.projects-slider');
    if (!slider) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

// Аккордеон FAQ
function initAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Закрываем все остальные
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Открываем текущий
            item.classList.toggle('active');
        });
    });
    
    // Открываем первый вопрос
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
}

// Мобильное меню
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('main-nav');
    
    if (!menuBtn || !menu) return;
    
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuBtn.innerHTML = menu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Всплывающее окно акции "НАМ 10 ЛЕТ"
function initAnniversaryModal() {
    // Проверяем, не закрывал ли пользователь это окно
    const dontShowAnniversary = localStorage.getItem('dontShowAnniversary');
    if (dontShowAnniversary === 'true') return;
    
    // Проверяем, показывали ли сегодня
    const lastShown = localStorage.getItem('anniversaryLastShown');
    const today = new Date().toDateString();
    
    if (lastShown === today) return;
    
    // Показываем с задержкой
    setTimeout(() => {
        showAnniversaryModal();
        localStorage.setItem('anniversaryLastShown', today);
    }, 2000);
}

function showAnniversaryModal() {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'modal anniversary-modal';
    modal.id = 'anniversary-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" id="anniversary-close">&times;</button>
            <div class="anniversary-content">
                <div class="anniversary-header">
                    <div class="anniversary-badge">
                        <i class="fas fa-birthday-cake"></i>
                        <span>ЮБИЛЕЙНАЯ АКЦИЯ</span>
                    </div>
                    <h2>НАМ 10 ЛЕТ!</h2>
                    <p>ВСЕМ СКИДКА -10% НА СЕЗОН 2026 ГОДА</p>
                </div>
                
                <div class="anniversary-body">
                    <div class="anniversary-image">
                        <div class="anniversary-number">
                            <span class="big-number">10</span>
                            <span class="years">лет</span>
                        </div>
                        <div class="anniversary-offer">
                            <span class="discount-big">-10%</span>
                            <span class="season">2026</span>
                        </div>
                    </div>
                    
                    <div class="anniversary-offer-details">
                        <div class="offer-card">
                            <div class="offer-icon">
                                <i class="fas fa-percentage"></i>
                            </div>
                            <div class="offer-text">
                                <h4>Скидка 10% получить</h4>
                                <p>Заключите договор на сезон 2026 года, оплатите 100% по фиксированной цене.</p>
                            </div>
                        </div>
                        
                        <ul class="anniversary-benefits">
                            <li><i class="fas fa-check-circle"></i> Фиксация цены на 2026 год</li>
                            <li><i class="fas fa-check-circle"></i> Гарантированная скидка 10%</li>
                            <li><i class="fas fa-check-circle"></i> Бесплатная доставка и сборка</li>
                            <li><i class="fas fa-check-circle"></i> Подарок - камни для печи</li>
                        </ul>
                    </div>
                </div>
                
                <div class="anniversary-footer">
                    <button class="btn btn-accent btn-lg" id="anniversary-action">
                        <i class="fas fa-calendar-check"></i>
                        Забронировать скидку на 2026 год
                    </button>
                    
                    <div class="anniversary-timer">
                        <p><i class="fas fa-clock"></i> Акция действует до 31 января 2025 года</p>
                    </div>
                    
                    <label class="anniversary-dont-show">
                        <input type="checkbox" id="dont-show-anniversary">
                        <span>Больше не показывать это предложение</span>
                    </label>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Анимация появления
    setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 100);
    
    // Обработчики событий
    document.getElementById('anniversary-close').addEventListener('click', closeAnniversaryModal);
    document.getElementById('anniversary-action').addEventListener('click', () => {
        showSuccessMessage('🎉 Поздравляем! Вы забронировали скидку 10% на сезон 2026 года. Мы свяжемся с вами для оформления договора.');
        closeAnniversaryModal();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAnniversaryModal();
        }
    });
    
    // Не показывать снова
    const dontShowCheckbox = document.getElementById('dont-show-anniversary');
    dontShowCheckbox.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('dontShowAnniversary', 'true');
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeAnniversaryModal();
        }
    });
    
    function closeAnniversaryModal() {
        const modal = document.getElementById('anniversary-modal');
        if (!modal) return;
        
        modal.classList.add('closing');
        
        setTimeout(() => {
            modal.classList.remove('active', 'closing');
            document.body.style.overflow = '';
            
            // Удаляем модальное окно из DOM
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }, 300);
    }
}

// Обработчики событий
function setupEventListeners() {
    // Форма лидогенерации в герое
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Симуляция отправки
            console.log('📤 Отправка заявки:', data);
            
            // Показ сообщения об успехе
            showSuccessMessage('Спасибо за заявку! Мы свяжемся с вами в течение 15 минут для расчета стоимости и согласования деталей.');
            
            // Очистка формы
            this.reset();
        });
    }
    
    // Кнопка заказа звонка
    const callbackBtn = document.getElementById('callback-btn');
    if (callbackBtn) {
        callbackBtn.addEventListener('click', showCallbackModal);
    }
    
    // Кнопки расчета стоимости
    document.getElementById('hero-calc-btn')?.addEventListener('click', () => {
        document.getElementById('lead-form').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('steps-calc-btn')?.addEventListener('click', () => {
        document.getElementById('lead-form').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Форма в CTA секции
    const ctaSubmitBtn = document.getElementById('cta-submit-btn');
    if (ctaSubmitBtn) {
        ctaSubmitBtn.addEventListener('click', function() {
            const name = document.getElementById('cta-name').value.trim();
            const phone = document.getElementById('cta-phone').value.trim();
            const size = document.getElementById('cta-size').value;
            
            if (!name || !phone) {
                showSuccessMessage('Пожалуйста, заполните имя и телефон');
                return;
            }
            
            console.log('📤 Заявка из CTA:', { name, phone, size });
            showSuccessMessage('Отлично! Вы получили скидку 10% и 3 подарка. Менеджер свяжется с вами в течение 15 минут для расчета стоимости.');
            
            // Очищаем поля
            document.getElementById('cta-name').value = '';
            document.getElementById('cta-phone').value = '';
            document.getElementById('cta-size').value = '';
        });
    }
    
    // Обработка Enter в полях CTA формы
    const ctaInputs = document.querySelectorAll('.cta-form-input, .cta-form-select');
    ctaInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                ctaSubmitBtn.click();
            }
        });
    });
    
    // Форма в футере
    const footerSubmitBtn = document.getElementById('footer-submit-btn');
    if (footerSubmitBtn) {
        footerSubmitBtn.addEventListener('click', function() {
            const name = document.getElementById('footer-name').value.trim();
            const phone = document.getElementById('footer-phone').value.trim();
            
            if (!name || !phone) {
                showSuccessMessage('Пожалуйста, заполните все поля');
                return;
            }
            
            console.log('📤 Заявка из футера:', { name, phone });
            showSuccessMessage('Спасибо! Наш специалист свяжется с вами в течение 15 минут для консультации.');
            
            // Очищаем поля
            document.getElementById('footer-name').value = '';
            document.getElementById('footer-phone').value = '';
        });
    }
    
    // Обработка Enter в полях формы футера
    const footerInputs = document.querySelectorAll('.footer-form-input');
    footerInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                footerSubmitBtn.click();
            }
        });
    });
}

// Модальное окно обратного звонка
function showCallbackModal() {
    const modal = document.createElement('div');
    modal.className = 'modal callback-modal';
    modal.id = 'callback-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-header">
                <h3><i class="fas fa-phone-volume"></i> Заказать обратный звонок</h3>
                <p>Мы перезвоним вам в течение 5 минут</p>
            </div>
            
            <form class="callback-form">
                <div class="form-group">
                    <input type="text" placeholder="Ваше имя" required>
                    <i class="fas fa-user"></i>
                </div>
                
                <div class="form-group">
                    <input type="tel" placeholder="Ваш телефон" required>
                    <i class="fas fa-phone"></i>
                </div>
                
                <div class="form-group">
                    <select>
                        <option value="">Удобное время для звонка</option>
                        <option value="now">Сейчас</option>
                        <option value="9-12">9:00 - 12:00</option>
                        <option value="12-15">12:00 - 15:00</option>
                        <option value="15-18">15:00 - 18:00</option>
                        <option value="18-21">18:00 - 21:00</option>
                    </select>
                    <i class="fas fa-clock"></i>
                </div>
                
                <button type="submit" class="btn btn-primary btn-block">
                    <i class="fas fa-bell"></i>
                    Жду звонка
                </button>
                
                <div class="form-footer">
                    <p><i class="fas fa-shield-alt"></i> Конфиденциальность гарантирована</p>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Анимация
    setTimeout(() => modal.classList.add('active'), 100);
    
    // Обработчики
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal(modal));
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal(modal);
        }
    });
    
    // Обработка формы
    const form = modal.querySelector('.callback-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showSuccessMessage('Спасибо! Мы перезвоним вам в указанное время.');
        closeModal(modal);
    });
}

function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

// Сообщение об успехе
function showSuccessMessage(text) {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div class="message-content">
            <i class="fas fa-check-circle"></i>
            <p>${text}</p>
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    }, 5000);
}

// Инициализация трекинга
function initTracking() {
    // Отслеживание кликов по телефону
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('📞 Клик по телефону:', this.href);
            // Здесь можно добавить отправку в Яндекс.Метрику или Google Analytics
        });
    });
    
    // Отслеживание отправки форм
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            console.log('📤 Отправка формы:', this.id || 'unnamed');
        });
    });
}

// Плавный скролл для якорных ссылок
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

console.log('✨ HitHaus готов к работе!');