// ==========================================
// 1. ЛОГИКА ГЕЙМ-БАРА (ДЖОЙСТИК И КНОПКИ)
// ==========================================

// Переменные для джойстика
let joystickActive = false;
let joystickStartX = 0;
let joystickStartY = 0;

// Инициализация гейм-бара (вызывается после старта игры)
function initGamepad() {
    const joystickArea = document.getElementById('joystickArea');
    const joystickBase = document.getElementById('joystickBase');
    
    if (!joystickArea) return; // Если гейм-бара нет (например, на ПК)

    // --- ДЖОЙСТИК ---
    joystickArea.addEventListener('mousedown', startJoystick);
    joystickArea.addEventListener('touchstart', startJoystick, {passive: false});
    
    document.addEventListener('mousemove', moveJoystick);
    document.addEventListener('touchmove', moveJoystick, {passive: false});
    
    document.addEventListener('mouseup', endJoystick);
    document.addEventListener('touchend', endJoystick);

    function startJoystick(e) {
        joystickActive = true;
        const rect = joystickArea.getBoundingClientRect();
        // Центр джойстика
        joystickStartX = rect.left + rect.width / 2;
        joystickStartY = rect.top + rect.height / 2;
    }

    function moveJoystick(e) {
        if (!joystickActive) return;
        e.preventDefault();

        const touch = e.touches ? e.touches[0] : e;
        let dx = touch.clientX - joystickStartX;
        let dy = touch.clientY - joystickStartY;
        
        const maxDist = 30; // Максимальное отклонение ручки
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        // Ограничиваем движение по кругу
        if (dist > maxDist) {
            dx = (dx / dist) * maxDist;
            dy = (dy / dist) * maxDist;
        }
        
        // Двигаем ручку визуально
        joystickBase.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
        
        // --- ПЕРЕДАЧА В ИГРУ ---
        // Нормализуем значения от -1 до 1 (чтобы игра понимала)
        const normX = dx / maxDist;
        const normY = dy / maxDist;
        onJoystickMove(normX, normY);
    }

    function endJoystick() {
        if (!joystickActive) return;
        joystickActive = false;
        // Возвращаем ручку в центр
        joystickBase.style.transform = 'translate(-50%, -50%)';
        onJoystickMove(0, 0);
    }

    // --- КНОПКИ A, B, X, Y ---
    const btnA = document.getElementById('btnA');
    const btnB = document.getElementById('btnB');
    const btnX = document.getElementById('btnX');
    const btnY = document.getElementById('btnY');

    if (btnA) btnA.addEventListener('click', () => pressButton('A', btnA));
    if (btnB) btnB.addEventListener('click', () => pressButton('B', btnB));
    if (btnX) btnX.addEventListener('click', () => pressButton('X', btnX));
    if (btnY) btnY.addEventListener('click', () => pressButton('Y', btnY));

    function pressButton(name, el) {
        // Визуальный эффект нажатия
        el.style.transform = 'scale(0.8)';
        setTimeout(() => { el.style.transform = 'scale(1)'; }, 100);
        
        // Передаем в игру
        onGamepadButton(name);
    }
}

// ==========================================
// 2. ФУНКЦИИ, КОТОРЫЕ ВЫЗЫВАЕТ ГЕЙМ-БАР
// ==========================================
// Эти функции ты можешь менять под свою игру!

function onJoystickMove(dx, dy) {
    // dx: -1 (влево) до 1 (вправо)
    // dy: -1 (вверх) до 1 (вниз)
    // console.log("Джойстик:", dx.toFixed(2), dy.toFixed(2));
    
    // ПРИМЕР: Если двинул вправо больше чем на половину
    if (dx > 0.5) {
        // Твой код для движения вправо
    }
    if (dx < -0.5) {
        // Твой код для движения влево
    }
}

function onGamepadButton(btn) {
    console.log("Нажата кнопка:", btn);
    
    // ПРИМЕР: Кнопка A ставит блок (как в твоей игре)
    if (btn === 'A') {
        // Вызови тут свою функцию drop(), если она есть
        // drop(); 
    }
}

// ==========================================
// 3. ЗАПУСК ИГРЫ (ВЫЗЫВАЕТСЯ ИЗ index.html)
// ==========================================

function initGame(settings) {
    console.log("Игра запущена с графикой: " + settings);
    
    // Инициализируем гейм-бар
    initGamepad();
    
    // ТУТ ТВОЙ КОД ИНИЦИАЛИЗАЦИИ ИГРЫ
    // Например: init(); 
    // (Если ты используешь мой старый game.js, то тут вызывается init())
}