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

// Данные для квиза
const QUIZ_DATA = {
    steps: [
        {
            id: 'size',
            question: 'Какой размер бани вам нужен?',
            options: [
                { value: '3x3', label: '3×3 м', price: 249000 },
                { value: '4x3', label: '4×3 м', price: 432000 },
                { value: '5x3', label: '5×3 м', price: 525000 },
                { value: '6x4', label: '6×4 м', price: 847000 }
            ]
        },
        {
            id: 'material',
            question: 'Какой материал предпочитаете?',
            options: [
                { value: '90', label: 'Брус 90×140 мм', multiplier: 1 },
                { value: '140', label: 'Брус 140×140 мм', multiplier: 1.3 },
                { value: '190', label: 'Брус 190×140 мм', multiplier: 1.5 }
            ]
        },
        {
            id: 'extras',
            question: 'Нужна ли терраса или мансарда?',
            options: [
                { value: 'no', label: 'Только баня', price: 0 },
                { value: 'terrace', label: 'С террасой', price: 50000 },
                { value: 'mansard', label: 'С мансардой', price: 150000 }
            ]
        },
        {
            id: 'timing',
            question: 'Когда планируете строительство?',
            options: [
                { value: 'now', label: 'В этом месяце' },
                { value: '1-3', label: 'Через 1-3 месяца' },
                { value: '3-6', label: 'Через 3-6 месяцев' }
            ]
        }
    ]
};

// Основные данные сайта
const SITE_DATA = {
    site: {
        title: 'HitHaus',
        tagline: 'Строительство бань из бруса под ключ в Самаре',
        phone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email
    }
};

// Инициализация сайта
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 HitHaus - Строительство бань в Самаре');
    
    initSite();
    setupEventListeners();
    initQuiz();
    initMobileMenu();
    initFAQ();
    initTracking();
    setupSmoothScroll();
    
    console.log('✅ Сайт инициализирован');
});

// Основная инициализация
function initSite() {
    // Установка текущего года
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Заполнение основных данных
    document.getElementById('header-phone').textContent = SITE_CONFIG.phone;
    
    console.log('✅ Базовые данные установлены');
}

// Инициализация квиза
function initQuiz() {
    const quizSteps = document.querySelectorAll('.quiz-step');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizPrevBtn = document.getElementById('quiz-prev');
    const quizNextBtn = document.getElementById('quiz-next');
    const quizProgress = document.getElementById('quiz-progress');
    const getFullCalcBtn = document.getElementById('get-full-calc');
    
    let currentStep = 0;
    const answers = {};
    const prices = {
        '3x3': 249000,
        '4x3': 432000,
        '5x3': 525000,
        '6x4': 847000,
        '90': 1,
        '140': 1.3,
        '190': 1.5,
        'no': 0,
        'terrace': 50000,
        'mansard': 150000
    };
    
    // Инициализация первого шага
    showStep(currentStep);
    updateProgress();
    
    // Обработка выбора опции
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const stepOptions = this.closest('.quiz-step').querySelectorAll('.quiz-option');
            stepOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const value = this.dataset.value;
            const stepId = this.closest('.quiz-step').id.replace('step', '');
            answers[stepId] = value;
            
            // Если это не последний шаг, активируем кнопку "Далее"
            if (currentStep < 4) {
                quizNextBtn.disabled = false;
            }
            
            // Если это последний шаг перед финалом, показываем расчет
            if (currentStep === 3) {
                calculateResult();
            }
        });
    });
    
    // Кнопка "Назад"
    quizPrevBtn.addEventListener('click', function() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
            updateProgress();
            updateNavigation();
        }
    });
    
    // Кнопка "Далее"
    quizNextBtn.addEventListener('click', function() {
        if (currentStep < 4) {
            // Проверяем, выбран ли вариант на текущем шаге
            const currentStepEl = document.getElementById(`step${currentStep + 1}`);
            const selectedOption = currentStepEl.querySelector('.quiz-option.active');
            
            if (!selectedOption && currentStep < 3) {
                showSuccessMessage('Пожалуйста, выберите вариант ответа');
                return;
            }
            
            currentStep++;
            showStep(currentStep);
            updateProgress();
            updateNavigation();
            
            // Если дошли до 5 шага (формы), скрываем кнопки навигации
            if (currentStep === 4) {
                document.querySelector('.quiz-navigation').style.display = 'none';
            }
        }
    });
    
    // Получить полный расчет
    getFullCalcBtn?.addEventListener('click', function() {
        const name = document.getElementById('quiz-name').value.trim();
        const phone = document.getElementById('quiz-phone').value.trim();
        const email = document.getElementById('quiz-email').value.trim();
        
        if (!name || !phone) {
            showSuccessMessage('Пожалуйста, заполните имя и телефон');
            return;
        }
        
        console.log('📤 Заявка из квиза:', { name, phone, email, answers });
        showSuccessMessage('Отлично! Детальный расчет и 3D-проект отправлены вам на почту. Менеджер свяжется для уточнения деталей.');
        
        // Очищаем форму
        document.getElementById('quiz-name').value = '';
        document.getElementById('quiz-phone').value = '';
        document.getElementById('quiz-email').value = '';
    });
    
    function showStep(stepIndex) {
        quizSteps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        
        // Показываем результат на последнем шаге
        if (stepIndex === 5) {
            calculateResult();
        }
    }
    
    function updateProgress() {
        const progress = ((currentStep + 1) / 5) * 100;
        quizProgress.style.width = `${progress}%`;
    }
    
    function updateNavigation() {
        quizPrevBtn.disabled = currentStep === 0;
        
        if (currentStep < 3) {
            quizNextBtn.textContent = 'Далее →';
            quizNextBtn.disabled = !answers[currentStep + 1];
        } else if (currentStep === 3) {
            quizNextBtn.textContent = 'Получить расчет';
        } else if (currentStep === 4) {
            quizNextBtn.textContent = 'Отправить';
        }
    }
    
    function calculateResult() {
        let totalPrice = 0;
        
        // Базовая цена по размеру
        if (answers['1']) {
            totalPrice = prices[answers['1']] || 0;
        }
        
        // Умножаем на коэффициент материала
        if (answers['2']) {
            const multiplier = prices[answers['2']] || 1;
            totalPrice *= multiplier;
        }
        
        // Добавляем дополнительные опции
        if (answers['3']) {
            totalPrice += prices[answers['3']] || 0;
        }
        
        // Форматируем цену
        const formattedPrice = Math.round(totalPrice).toLocaleString('ru-RU');
        
        // Обновляем результат
        const resultAmount = document.getElementById('result-amount');
        const resultDescription = document.getElementById('result-description');
        
        if (resultAmount) {
            resultAmount.textContent = formattedPrice;
        }
        
        if (resultDescription) {
            let description = 'Примерная стоимость вашей бани. ';
            
            if (answers['4'] === 'now') {
                description += 'При заказе в этом месяце дарим камни для печи!';
            } else if (answers['4'] === '1-3') {
                description += 'Забронируйте строительство сейчас и зафиксируйте цену.';
            } else {
                description += 'Забронируйте строительство сейчас и получите скидку 5%.';
            }
            
            resultDescription.textContent = description;
        }
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

// FAQ аккордеон
function initFAQ() {
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
    document.getElementById('steps-calc-btn')?.addEventListener('click', () => {
        document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
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
    
    // Действия по шагам
    document.querySelectorAll('.step-action').forEach(btn => {
        btn.addEventListener('click', function() {
            const step = this.dataset.step;
            
            switch(step) {
                case '1':
                    document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
                    break;
                case '2':
                    showSuccessMessage('Замерщик выезжает бесплатно! Оставьте заявку, и мы согласуем удобное время.');
                    break;
                case '3':
                    document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
                    break;
                case '4':
                    showSuccessMessage('Экскурсии на производство проводятся по субботам. Запишитесь по телефону!');
                    break;
                case '6':
                    showSuccessMessage('Гарантия 5 лет распространяется на все материалы и работы. Подробности в договоре.');
                    break;
            }
        });
    });
    
    // Кнопка добавления отзыва
    document.getElementById('add-review-btn')?.addEventListener('click', function() {
        showSuccessMessage('Спасибо за желание оставить отзыв! Мы свяжемся с вами для уточнения деталей.');
    });
    
    // Кнопки просмотра проектов
    document.querySelectorAll('.project-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectTitle = this.closest('.project-info').querySelector('h3').textContent;
            showSuccessMessage(`Проект "${projectTitle}" отправлен вам на почту. Также вы можете посмотреть все проекты в нашем каталоге.`);
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

// ===== СЛАЙДЕР ПРОЕКТОВ =====
const PROJECTS_DATA = [
    {
        id: 1,
        title: "Баня 3×3 м в СНТ Водино",
        description: "Компактная баня для небольшой семьи. Профилированный брус 140×140 мм, печь Harvia, терраса с навесом.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        size: "3×3 м",
        price: "249 000₽",
        period: "Сборка за 7 дней",
        features: ["Профилированный брус", "Печь Harvia", "Терраса", "Утепление Rockwool"],
        location: "Самара, СНТ Водино",
        area: "9 м²",
        year: "2023",
        status: "Выполненный проект"
    },
    {
        id: 2,
        title: "Баня 4×4 м на Мехзаводе",
        description: "Классическая баня с комнатой отдыха. Профилированный брус 190×140 мм, стеклянная дверь в парную.",
        image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        size: "4×4 м",
        price: "525 000₽",
        period: "Сборка за 10 дней",
        features: ["Брус 190×140 мм", "Комната отдыха", "Стеклянная дверь", "Финская печь"],
        location: "Самара, Мехзавод",
        area: "16 м²",
        year: "2024",
        status: "Новый проект"
    },
    {
        id: 3,
        title: "Баня 6×4 м в Водинском массиве",
        description: "Просторная баня с мансардой. Двухэтажная конструкция, большая терраса, финская печь Tylo.",
        image: "https://images.unsplash.com/photo-1563723353576-5d924b49b0da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        size: "6×4 м",
        price: "847 000₽",
        period: "Сборка за 14 дней",
        features: ["Мансарда", "Финская печь", "Большая терраса", "Двухэтажная"],
        location: "Самара, Водинский массив",
        area: "24 м²",
        year: "2022",
        status: "Выполненный проект"
    },
    {
        id: 4,
        title: "Баня 5×4 м с бассейном",
        description: "Элитная баня с бассейном. Полная комплектация под ключ, система вентиляции, отдельная котельная.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        size: "5×4 м",
        price: "1 150 000₽",
        period: "Сборка за 21 день",
        features: ["Бассейн", "Система вентиляции", "Котельная", "Премиум отделка"],
        location: "Самара, СНТ Белозерки",
        area: "20 м²",
        year: "2023",
        status: "Элитный проект"
    },
    {
        id: 5,
        title: "Баня 4×3 м с террасой",
        description: "Уютная баня с просторной террасой для отдыха. Идеально для загородного дома.",
        image: "https://images.unsplash.com/photo-1585730180956-8e29d04319b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        size: "4×3 м",
        price: "432 000₽",
        period: "Сборка за 8 дней",
        features: ["Профилированный брус", "Просторная терраса", "Печь Tylo", "Эко-утеплитель"],
        location: "Самара, СНТ Солнечное",
        area: "12 м²",
        year: "2024",
        status: "Популярный проект"
    },
    {
        id: 6,
        title: "Баня 3×2.5 м для дачи",
        description: "Мини-баня для небольшого участка. Все необходимое в компактном размере.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        size: "3×2.5 м",
        price: "195 000₽",
        period: "Сборка за 5 дней",
        features: ["Компактная", "Экономичная", "Быстрый монтаж", "Все включено"],
        location: "Самара, дачный массив",
        area: "7.5 м²",
        year: "2023",
        status: "Бюджетный вариант"
    }
];

// Инициализация слайдера проектов
function initProjectsSlider() {
    const slider = document.getElementById('projects-slider');
    const indicators = document.getElementById('slider-indicators');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    
    if (!slider) return;
    
    let currentSlide = 0;
    let slidesPerView = 3;
    let totalSlides = PROJECTS_DATA.length;
    let autoSlideInterval;
    
    // Определяем количество слайдов в зависимости от ширины экрана
    function updateSlidesPerView() {
        if (window.innerWidth <= 768) {
            slidesPerView = 1;
        } else if (window.innerWidth <= 1024) {
            slidesPerView = 2;
        } else {
            slidesPerView = 3;
        }
        renderSlides();
    }
    
    // Рендеринг слайдов
    function renderSlides() {
        slider.innerHTML = '';
        indicators.innerHTML = '';
        
        PROJECTS_DATA.forEach((project, index) => {
            // Создаем слайд
            const slide = document.createElement('div');
            slide.className = `slider-item ${index < slidesPerView ? 'active' : ''}`;
            slide.setAttribute('data-index', index);
            
            const featuresHTML = project.features.map(feature => 
                `<span class="slider-tag"><i class="fas fa-check"></i> ${feature}</span>`
            ).join('');
            
            slide.innerHTML = `
                <div class="slider-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="slider-badge">${project.status}</div>
                    <div class="slider-size">${project.size}</div>
                </div>
                <div class="slider-info">
                    <h3>${project.title}</h3>
                    <p class="slider-description">${project.description}</p>
                    <div class="slider-features">${featuresHTML}</div>
                    <div class="slider-price">
                        <div>
                            <div class="price-amount">${project.price}</div>
                            <div class="price-period">${project.period}</div>
                        </div>
                        <button class="btn btn-secondary btn-sm view-project-btn" data-id="${project.id}">
                            <i class="fas fa-eye"></i> Подробнее
                        </button>
                    </div>
                </div>
            `;
            
            slider.appendChild(slide);
            
            // Добавляем обработчик клика для кнопки "Подробнее"
            slide.querySelector('.view-project-btn').addEventListener('click', () => {
                showProjectModal(project.id);
            });
            
            // Добавляем обработчик клика на весь слайд
            slide.addEventListener('click', (e) => {
                if (!e.target.closest('.view-project-btn')) {
                    showProjectModal(project.id);
                }
            });
            
            // Создаем индикатор
            if (index < Math.ceil(totalSlides / slidesPerView)) {
                const indicator = document.createElement('button');
                indicator.className = `slider-indicator ${index === 0 ? 'active' : ''}`;
                indicator.setAttribute('data-slide', index);
                indicator.setAttribute('aria-label', `Перейти к слайду ${index + 1}`);
                indicator.addEventListener('click', () => goToSlide(index));
                indicators.appendChild(indicator);
            }
        });
        
        updateSliderPosition();
    }
    
    // Переход к конкретному слайду
    function goToSlide(slideIndex) {
        const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
        currentSlide = Math.min(Math.max(slideIndex, 0), maxSlide);
        
        updateSliderPosition();
        updateIndicators();
        updateButtons();
    }
    
    // Следующий слайд
    function nextSlide() {
        const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
        if (currentSlide < maxSlide) {
            currentSlide++;
            goToSlide(currentSlide);
        } else {
            // Если последний слайд - переходим к первому
            goToSlide(0);
        }
    }
    
    // Предыдущий слайд
    function prevSlide() {
        const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
        if (currentSlide > 0) {
            currentSlide--;
            goToSlide(currentSlide);
        } else {
            // Если первый слайд - переходим к последнему
            goToSlide(maxSlide);
        }
    }
    
    // Обновление позиции слайдера
    function updateSliderPosition() {
        const slideWidth = 100 / slidesPerView;
        const translateX = -(currentSlide * 100);
        slider.style.transform = `translateX(${translateX}%)`;
        
        // Обновляем активные слайды
        document.querySelectorAll('.slider-item').forEach((item, index) => {
            const slideIndex = parseInt(item.dataset.index);
            const startRange = currentSlide * slidesPerView;
            const endRange = startRange + slidesPerView;
            
            if (slideIndex >= startRange && slideIndex < endRange) {
                item.classList.add('active');
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.classList.remove('active');
                item.style.opacity = '0.6';
                item.style.transform = 'scale(0.95)';
            }
        });
    }
    
    // Обновление индикаторов
    function updateIndicators() {
        document.querySelectorAll('.slider-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Обновление состояния кнопок
    function updateButtons() {
        const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === maxSlide;
    }
    
    // Автопрокрутка
    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    // Инициализация
    updateSlidesPerView();
    
    // Обработчики событий
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        setTimeout(startAutoSlide, 10000); // Перезапуск через 10 секунд
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        setTimeout(startAutoSlide, 10000); // Перезапуск через 10 секунд
    });
    
    // Свайп на мобильных
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Свайп влево - следующий слайд
                nextSlide();
            } else {
                // Свайп вправо - предыдущий слайд
                prevSlide();
            }
        }
    }
    
    // Клавиатурная навигация
    document.addEventListener('keydown', (e) => {
        if (document.querySelector('.project-modal.active')) return;
        
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 10000);
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 10000);
        }
    });
    
    // Ресайз окна
    window.addEventListener('resize', () => {
        updateSlidesPerView();
        goToSlide(0);
    });
    
    // Старт автопрокрутки
    startAutoSlide();
    
    // Пауза при наведении
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    
    console.log('✅ Слайдер проектов инициализирован');
}

// Модальное окно проекта
function showProjectModal(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;
    
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'modal project-modal';
    modal.id = 'project-modal';
    
    const featuresHTML = project.features.map(feature => 
        `<span class="feature-tag">${feature}</span>`
    ).join('');
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="project-modal-content">
                <div class="project-modal-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-modal-info">
                    <div class="project-modal-header">
                        <h3 class="project-modal-title">${project.title}</h3>
                        <div class="project-modal-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${project.location}</span>
                        </div>
                    </div>
                    
                    <div class="project-modal-details">
                        <div class="detail-item">
                            <i class="fas fa-expand-arrows-alt"></i>
                            <span class="detail-value">${project.size}</span>
                            <span class="detail-label">Размер</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-ruler-combined"></i>
                            <span class="detail-value">${project.area}</span>
                            <span class="detail-label">Площадь</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span class="detail-value">${project.year}</span>
                            <span class="detail-label">Год постройки</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span class="detail-value">${project.period.replace('Сборка за ', '')}</span>
                            <span class="detail-label">Срок сборки</span>
                        </div>
                    </div>
                    
                    <div class="project-modal-features">
                        <h4>Особенности проекта:</h4>
                        <div class="features-list">${featuresHTML}</div>
                    </div>
                    
                    <div class="project-modal-description">
                        <p>${project.description}</p>
                    </div>
                    
                    <div class="project-modal-actions">
                        <button class="btn btn-primary" id="modal-calc-btn">
                            <i class="fas fa-calculator"></i>
                            Рассчитать такой же проект
                        </button>
                        <button class="btn btn-secondary" id="modal-close-btn">
                            <i class="fas fa-times"></i>
                            Закрыть
                        </button>
                    </div>
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
    const closeBtn = modal.querySelector('.modal-close');
    const closeBtn2 = modal.querySelector('#modal-close-btn');
    const calcBtn = modal.querySelector('#modal-calc-btn');
    
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
            document.body.style.overflow = '';
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    closeBtn2.addEventListener('click', closeModal);
    
    calcBtn.addEventListener('click', () => {
        closeModal();
        // Прокручиваем к квизу
        document.getElementById('quiz-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        // Показываем сообщение
        setTimeout(() => {
            showSuccessMessage(`Отлично! Мы подготовили расчет для проекта "${project.title}". Ответьте на несколько вопросов для точного расчета.`);
        }, 500);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Добавьте вызов инициализации в основную функцию
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 HitHaus - Строительство бань в Самаре');
    
    initSite();
    setupEventListeners();
    initQuiz();
    initMobileMenu();
    initFAQ();
    initTracking();
    setupSmoothScroll();
    initProjectsSlider(); // ← Добавьте эту строку!
    
    console.log('✅ Сайт инициализирован');
});

// ===== УНИВЕРСАЛЬНЫЙ СЛАЙДЕР =====
const UniversalSlider = {
    // Конфигурация
    config: {
        autoPlay: true,
        interval: 5000,
        transitionSpeed: 500,
        loop: true,
        touchThreshold: 50,
        keyboardNavigation: true,
        lazyLoad: true,
        preloadImages: 2
    },
    
    // Состояние
    state: {
        currentSlide: 0,
        totalSlides: 0,
        isAnimating: false,
        autoPlayInterval: null,
        touchStartX: 0,
        touchEndX: 0,
        slidesPerView: 1,
        isMobile: false
    },
    
    // Элементы DOM
    elements: {
        track: null,
        prevBtn: null,
        nextBtn: null,
        progressFill: null,
        currentSlideEl: null,
        totalSlidesEl: null,
        pagination: null,
        mobileDots: null,
        mobilePrev: null,
        mobileNext: null
    },
    
    // Данные проектов
    projects: [
        {
            id: 1,
            title: "Баня 3×3 м в СНТ Водино",
            description: "Компактная баня для небольшой семьи. Профилированный брус 140×140 мм, печь Harvia, терраса с навесом. Идеально подходит для дачных участков.",
            image: "images/projects/1.jpg",
            size: "3×3 м",
            price: "249 000₽",
            period: "7 дней",
            area: "9 м²",
            year: "2023",
            location: "Самара, СНТ Водино",
            status: "Выполнено",
            features: ["Профилированный брус", "Печь Harvia", "Терраса", "Утепление Rockwool", "Фундамент включен"],
            materials: ["Брус 140×140 мм", "Ондулин", "Финская печь"]
        },
        {
            id: 2,
            title: "Баня 4×4 м на Мехзаводе",
            description: "Классическая баня с комнатой отдыха. Профилированный брус 190×140 мм, стеклянная дверь в парную, электрическая проводка.",
            image: "images/projects/2.jpg",
            size: "4×4 м",
            price: "525 000₽",
            period: "10 дней",
            area: "16 м²",
            year: "2024",
            location: "Самара, Мехзавод",
            status: "Новый",
            features: ["Брус 190×140 мм", "Комната отдыха", "Стеклянная дверь", "Финская печь", "Электрика"],
            materials: ["Брус камерной сушки", "Металлочерепица", "Tylo"]
        },
        {
            id: 3,
            title: "Баня 6×4 м в Водинском массиве",
            description: "Просторная баня с мансардой. Двухэтажная конструкция, большая терраса, финская печь Tylo, отдельная комната для гостей.",
            image: "images/projects/3.jpg",
            size: "6×4 м",
            price: "847 000₽",
            period: "14 дней",
            area: "24 м²",
            year: "2022",
            location: "Самара, Водинский массив",
            status: "Выполнено",
            features: ["Мансарда", "Финская печь", "Большая терраса", "Двухэтажная", "Гостевая комната"],
            materials: ["Брус 190×190 мм", "Мягкая кровля", "Harvia"]
        },
        {
            id: 4,
            title: "Баня 5×4 м с бассейном",
            description: "Элитная баня с бассейном. Полная комплектация под ключ, система вентиляции, отдельная котельная, панорамные окна.",
            image: "images/projects/4.jpg",
            size: "5×4 м",
            price: "1 150 000₽",
            period: "21 день",
            area: "20 м²",
            year: "2023",
            location: "Самара, СНТ Белозерки",
            status: "Элит",
            features: ["Бассейн", "Система вентиляции", "Котельная", "Премиум отделка", "Панорамные окна"],
            materials: ["Клееный брус", "Медь", "Helo"]
        },
        
    ],
    
    // Инициализация
    init() {
        console.log('🎬 Инициализация универсального слайдера...');
        
        this.cacheElements();
        this.checkDeviceType();
        this.renderSlides();
        this.setupEventListeners();
        this.startAutoPlay();
        this.setupIntersectionObserver();
        
        // Обновляем отображение
        this.updateSlider();
        
        console.log('✅ Слайдер готов!');
    },
    
    // Кэширование элементов
    cacheElements() {
        this.elements.track = document.getElementById('slider-track');
        this.elements.prevBtn = document.querySelector('.prev-btn');
        this.elements.nextBtn = document.querySelector('.next-btn');
        this.elements.progressFill = document.querySelector('.progress-fill');
        this.elements.currentSlideEl = document.querySelector('.current-slide');
        this.elements.totalSlidesEl = document.querySelector('.total-slides');
        this.elements.pagination = document.getElementById('slider-pagination');
        this.elements.mobileDots = document.querySelector('.mobile-dots');
        this.elements.mobilePrev = document.querySelector('.mobile-prev');
        this.elements.mobileNext = document.querySelector('.mobile-next');
        
        this.state.totalSlides = this.projects.length;
    },
    
    // Определение типа устройства
    checkDeviceType() {
        this.state.isMobile = window.innerWidth <= 768;
        this.state.slidesPerView = this.state.isMobile ? 1 : 1;
    },
    
    // Рендеринг слайдов
    renderSlides() {
        this.elements.track.innerHTML = '';
        this.elements.pagination.innerHTML = '';
        this.elements.mobileDots.innerHTML = '';
        
        // Обновляем общее количество слайдов
        this.elements.totalSlidesEl.textContent = `/${this.state.totalSlides}`;
        
        this.projects.forEach((project, index) => {
            // Создаем слайд
            const slide = document.createElement('div');
            slide.className = `slide-item ${index === 0 ? 'active' : ''}`;
            slide.dataset.index = index;
            slide.dataset.id = project.id;
            
            const featuresHTML = project.features.slice(0, 3).map(feature => 
                `<span class="feature-tag">${feature}</span>`
            ).join('');
            
            slide.innerHTML = `
                <div class="slide-content">
                    <div class="slide-image">
                        <img src="${project.image}" 
                             alt="${project.title}"
                             loading="${this.config.lazyLoad && index > this.config.preloadImages ? 'lazy' : 'eager'}">
                        <div class="image-overlay"></div>
                        <div class="image-badges">
                            <span class="badge status">${project.status}</span>
                            <span class="badge size">${project.size}</span>
                        </div>
                    </div>
                    <div class="slide-info">
                        <div class="slide-header">
                            <h3>${project.title}</h3>
                            <div class="slide-location">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${project.location}</span>
                            </div>
                            <p class="slide-description">${project.description}</p>
                        </div>
                        
                        <div class="slide-details">
                            <div class="detail-box">
                                <i class="fas fa-expand-arrows-alt"></i>
                                <span class="value">${project.area}</span>
                                <span class="label">Площадь</span>
                            </div>
                            <div class="detail-box">
                                <i class="fas fa-calendar-alt"></i>
                                <span class="value">${project.year}</span>
                                <span class="label">Год</span>
                            </div>
                            <div class="detail-box">
                                <i class="fas fa-clock"></i>
                                <span class="value">${project.period}</span>
                                <span class="label">Срок</span>
                            </div>
                            <div class="detail-box">
                                <i class="fas fa-home"></i>
                                <span class="value">${project.size}</span>
                                <span class="label">Размер</span>
                            </div>
                        </div>
                        
                        <div class="slide-features">
                            <h4>Особенности:</h4>
                            <div class="features-tags">${featuresHTML}</div>
                        </div>
                        
                        <div class="slide-footer">
                            <div class="slide-price">${project.price}</div>
                            <div class="slide-actions">
                                <button class="btn btn-secondary btn-sm view-details" data-id="${project.id}">
                                    <i class="fas fa-eye"></i> Подробнее
                                </button>
                                <button class="btn btn-primary btn-sm calculate-project" data-id="${project.id}">
                                    <i class="fas fa-calculator"></i> Рассчитать
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            this.elements.track.appendChild(slide);
            
            // Создаем точку пагинации
            const dot = document.createElement('button');
            dot.className = `pagination-dot ${index === 0 ? 'active' : ''}`;
            dot.dataset.slide = index;
            dot.setAttribute('aria-label', `Перейти к слайду ${index + 1}`);
            this.elements.pagination.appendChild(dot);
            
            // Создаем точку для мобильной пагинации
            const mobileDot = document.createElement('div');
            mobileDot.className = `mobile-dot ${index === 0 ? 'active' : ''}`;
            mobileDot.dataset.slide = index;
            this.elements.mobileDots.appendChild(mobileDot);
            
            // Добавляем обработчики для кнопок слайда
            slide.querySelector('.view-details').addEventListener('click', (e) => {
                e.stopPropagation();
                this.showProjectDetails(project.id);
            });
            
            slide.querySelector('.calculate-project').addEventListener('click', (e) => {
                e.stopPropagation();
                this.calculateProject(project.id);
            });
            
            // Клик по всему слайду (кроме кнопок)
            slide.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    this.showProjectDetails(project.id);
                }
            });
        });
    },
    
    // Переход к слайду
    goToSlide(index, direction = 'next') {
        if (this.state.isAnimating || index === this.state.currentSlide) return;
        
        // Проверяем границы
        if (index < 0) {
            index = this.config.loop ? this.state.totalSlides - 1 : 0;
        } else if (index >= this.state.totalSlides) {
            index = this.config.loop ? 0 : this.state.totalSlides - 1;
        }
        
        this.state.isAnimating = true;
        
        // Удаляем класс active у текущего слайда
        const currentSlide = this.elements.track.querySelector(`.slide-item[data-index="${this.state.currentSlide}"]`);
        if (currentSlide) {
            currentSlide.classList.remove('active');
        }
        
        // Обновляем состояние
        this.state.currentSlide = index;
        
        // Обновляем позицию трека
        this.elements.track.style.transform = `translateX(-${index * 100}%)`;
        
        // Добавляем класс active новому слайду
        const newSlide = this.elements.track.querySelector(`.slide-item[data-index="${index}"]`);
        if (newSlide) {
            newSlide.classList.add('active');
        }
        
        // Обновляем UI
        this.updateUI();
        
        // Сбрасываем анимацию
        setTimeout(() => {
            this.state.isAnimating = false;
        }, this.config.transitionSpeed);
        
        // Перезапускаем автоплей
        this.restartAutoPlay();
    },
    
    // Следующий слайд
    nextSlide() {
        this.goToSlide(this.state.currentSlide + 1, 'next');
    },
    
    // Предыдущий слайд
    prevSlide() {
        this.goToSlide(this.state.currentSlide - 1, 'prev');
    },
    
    // Обновление UI
    updateUI() {
        // Обновляем прогресс-бар
        const progressWidth = ((this.state.currentSlide + 1) / this.state.totalSlides) * 100;
        this.elements.progressFill.style.width = `${progressWidth}%`;
        
        // Обновляем счетчик
        this.elements.currentSlideEl.textContent = this.state.currentSlide + 1;
        
        // Обновляем точки пагинации
        document.querySelectorAll('.pagination-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.state.currentSlide);
        });
        
        // Обновляем мобильные точки
        document.querySelectorAll('.mobile-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.state.currentSlide);
        });
        
        // Обновляем состояние кнопок
        if (!this.config.loop) {
            this.elements.prevBtn.disabled = this.state.currentSlide === 0;
            this.elements.nextBtn.disabled = this.state.currentSlide === this.state.totalSlides - 1;
            this.elements.mobilePrev.disabled = this.state.currentSlide === 0;
            this.elements.mobileNext.disabled = this.state.currentSlide === this.state.totalSlides - 1;
        }
    },
    
    // Обновление слайдера
    updateSlider() {
        this.checkDeviceType();
        this.updateUI();
    },
    
    // Настройка обработчиков событий
    setupEventListeners() {
        // Кнопки навигации
        this.elements.prevBtn.addEventListener('click', () => this.prevSlide());
        this.elements.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Мобильная навигация
        this.elements.mobilePrev.addEventListener('click', () => this.prevSlide());
        this.elements.mobileNext.addEventListener('click', () => this.nextSlide());
        
        // Пагинация
        this.elements.pagination.addEventListener('click', (e) => {
            const dot = e.target.closest('.pagination-dot');
            if (dot) {
                const slideIndex = parseInt(dot.dataset.slide);
                this.goToSlide(slideIndex);
            }
        });
        
        // Мобильные точки
        this.elements.mobileDots.addEventListener('click', (e) => {
            const dot = e.target.closest('.mobile-dot');
            if (dot) {
                const slideIndex = parseInt(dot.dataset.slide);
                this.goToSlide(slideIndex);
            }
        });
        
        // Клавиатура
        if (this.config.keyboardNavigation) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            });
        }
        
        // Свайп на мобильных
        this.elements.track.addEventListener('touchstart', (e) => {
            this.state.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.elements.track.addEventListener('touchend', (e) => {
            this.state.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
        
        // Ресайз окна
        window.addEventListener('resize', () => {
            this.debounce(() => this.updateSlider(), 250);
        });
        
        // Кнопки действий
        document.getElementById('view-all-projects')?.addEventListener('click', () => {
            this.showAllProjects();
        });
        
        document.getElementById('calculate-project')?.addEventListener('click', () => {
            this.calculateCurrentProject();
        });
    },
    
    // Обработка свайпа
    handleSwipe() {
        const diff = this.state.touchStartX - this.state.touchEndX;
        
        if (Math.abs(diff) > this.config.touchThreshold) {
            if (diff > 0) {
                this.nextSlide(); // Свайп влево
            } else {
                this.prevSlide(); // Свайп вправо
            }
        }
    },
    
    // Автоплей
    startAutoPlay() {
        if (!this.config.autoPlay) return;
        
        this.stopAutoPlay();
        
        this.state.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.config.interval);
        
        // Пауза при наведении
        this.elements.track.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.elements.track.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Пауза при фокусе
        this.elements.track.addEventListener('focusin', () => this.stopAutoPlay());
        this.elements.track.addEventListener('focusout', () => this.startAutoPlay());
    },
    
    // Остановка автоплея
    stopAutoPlay() {
        if (this.state.autoPlayInterval) {
            clearInterval(this.state.autoPlayInterval);
            this.state.autoPlayInterval = null;
        }
    },
    
    // Перезапуск автоплея
    restartAutoPlay() {
        this.stopAutoPlay();
        if (this.config.autoPlay) {
            this.startAutoPlay();
        }
    },
    
    // Intersection Observer для ленивой загрузки
    setupIntersectionObserver() {
        if (!this.config.lazyLoad) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px',
            threshold: 0.1
        });
        
        // Наблюдаем за всеми изображениями
        document.querySelectorAll('.slide-image img').forEach((img, index) => {
            if (index > this.config.preloadImages) {
                img.dataset.src = img.src;
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNGNUY1RjUiLz48L3N2Zz4=';
                observer.observe(img);
            }
        });
    },
    
    // Показать детали проекта
    showProjectDetails(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;
        
        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.className = 'modal project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="project-modal-header">
                    <h3>${project.title}</h3>
                    <p class="project-modal-subtitle">${project.location} • ${project.year} год</p>
                </div>
                <div class="project-modal-body">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="project-details">
                        <div class="detail-row">
                            <span class="detail-label">Размер:</span>
                            <span class="detail-value">${project.size}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Площадь:</span>
                            <span class="detail-value">${project.area}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Срок строительства:</span>
                            <span class="detail-value">${project.period}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Стоимость:</span>
                            <span class="detail-value highlight">${project.price}</span>
                        </div>
                    </div>
                    <div class="project-features-list">
                        <h4>Особенности проекта:</h4>
                        <ul>
                            ${project.features.map(feat => `<li>${feat}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="project-modal-footer">
                    <button class="btn btn-primary" id="modal-calculate-btn">
                        <i class="fas fa-calculator"></i>
                        Рассчитать аналогичный проект
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Анимация появления
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Обработчики
        const closeBtn = modal.querySelector('.modal-close');
        const calculateBtn = modal.querySelector('#modal-calculate-btn');
        
        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        calculateBtn.addEventListener('click', () => {
            closeModal();
            this.calculateProject(projectId);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    },
    
    // Рассчитать проект
    calculateProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;
        
        // Прокрутка к квизу
        const quizSection = document.getElementById('quiz-section');
        if (quizSection) {
            quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Показываем сообщение
            setTimeout(() => {
                this.showNotification(`Готовим расчет для проекта "${project.title}"`);
            }, 500);
        }
    },
    
    // Рассчитать текущий проект
    calculateCurrentProject() {
        const currentProject = this.projects[this.state.currentSlide];
        if (currentProject) {
            this.calculateProject(currentProject.id);
        }
    },
    
    // Показать все проекты
    showAllProjects() {
        this.showNotification('Загружаем полный каталог проектов...');
        // Здесь можно реализовать загрузку полного каталога
    },
    
    // Уведомление
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    },
    
    // Debounce
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем слайдер
    UniversalSlider.init();
    
    // Добавляем стили для уведомлений
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 15px 20px;
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: var(--shadow-lg);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 9999;
            max-width: 300px;
        }
        .notification.show {
            transform: translateX(0);
        }
        .notification i {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
    
    console.log('🚀 Универсальный слайдер загружен');
});

console.log('✨ HitHaus готов к работе!');