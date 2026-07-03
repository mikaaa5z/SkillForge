// ============================================
// НАСТРОЙКИ
// ============================================

const API_URL = 'https://sierra-jockstrap-barbecue.ngrok-free.dev/api';

// ============================================
// ОБЩИЕ ФУНКЦИИ
// ============================================

function getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function saveUserData(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function clearUserData() {
    localStorage.removeItem('user');
}

function goTo(page) {
    window.location.href = page;
}

// ============================================
// ГЕНЕРАЦИЯ АВАТАРА
// ============================================

function generateAvatar(name) {
    const initials = name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const canvas = document.createElement('canvas');
    canvas.width = 120;
    canvas.height = 120;
    const ctx = canvas.getContext('2d');

    const colors = ['#4a6cf7', '#34a853', '#ea4335', '#fbbc04', '#9b59b6', '#1abc9c'];
    const colorIndex = name.length % colors.length;

    ctx.fillStyle = colors[colorIndex];
    ctx.beginPath();
    ctx.arc(60, 60, 60, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, 60, 65);

    return canvas.toDataURL('image/png');
}

// ============================================
// ПРОВЕРКА ПАРОЛЯ
// ============================================

function isValidPassword(password) {
    if (password.length < 6) return false;
    if (!/\d/.test(password)) return false;
    if (!/[a-zA-Z]/.test(password)) return false;
    return true;
}

// ============================================
// СТАРТОВАЯ СТРАНИЦА (index.html)
// ============================================

if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', function() {
        const user = getUserData();
        if (user) {
            window.location.href = 'profile.html';
        }
    });
}

// ============================================
// СТРАНИЦА РЕГИСТРАЦИИ (register.html)
// ============================================

if (window.location.pathname.endsWith('register.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('registerForm');
        const nameInput = document.getElementById('registerNameInput');
        const passwordInput = document.getElementById('registerPasswordInput');
        const passwordConfirmInput = document.getElementById('registerPasswordConfirmInput');
        const registerBtn = document.getElementById('registerBtn');
        const passwordHint = document.getElementById('passwordHint');

        if (!form) {
            console.error('❌ Форма регистрации не найдена!');
            return;
        }

        const user = getUserData();
        if (user) {
            window.location.href = 'profile.html';
            return;
        }

        function validatePassword() {
            const password = passwordInput.value;
            const confirm = passwordConfirmInput.value;

            if (!password) {
                if (passwordHint) {
                    passwordHint.textContent = 'Введите пароль (минимум 6 символов, буква и цифра)';
                    passwordHint.className = 'password-hint';
                }
                return false;
            }

            if (!isValidPassword(password)) {
                if (passwordHint) {
                    passwordHint.textContent = '❌ Пароль должен содержать минимум 6 символов, букву и цифру';
                    passwordHint.className = 'password-hint invalid';
                }
                return false;
            }

            if (confirm && password !== confirm) {
                if (passwordHint) {
                    passwordHint.textContent = '❌ Пароли не совпадают';
                    passwordHint.className = 'password-hint invalid';
                }
                return false;
            }

            if (confirm && password === confirm) {
                if (passwordHint) {
                    passwordHint.textContent = '✅ Пароль подходит';
                    passwordHint.className = 'password-hint valid';
                }
                return true;
            }

            if (passwordHint) {
                passwordHint.textContent = '✅ Пароль подходит (6+ символов, буква + цифра)';
                passwordHint.className = 'password-hint valid';
            }
            return true;
        }

        if (passwordInput) {
            passwordInput.addEventListener('input', validatePassword);
        }
        if (passwordConfirmInput) {
            passwordConfirmInput.addEventListener('input', validatePassword);
        }

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = nameInput ? nameInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value : '';
            const confirm = passwordConfirmInput ? passwordConfirmInput.value : '';

            if (!name) {
                alert('Пожалуйста, введите ваше имя');
                if (nameInput) nameInput.focus();
                return;
            }

            if (name.length < 2) {
                alert('Имя должно содержать минимум 2 символа');
                if (nameInput) nameInput.focus();
                return;
            }

            if (!isValidPassword(password)) {
                alert('❌ Пароль должен содержать минимум 6 символов, букву и цифру');
                if (passwordInput) passwordInput.focus();
                return;
            }

            if (password !== confirm) {
                alert('❌ Пароли не совпадают');
                if (passwordConfirmInput) passwordConfirmInput.focus();
                return;
            }

            if (registerBtn) {
                registerBtn.disabled = true;
                registerBtn.textContent = 'Регистрация...';
            }

            try {
                const avatar = generateAvatar(name);

                const response = await fetch(`${API_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, password, avatar })
                });

                const data = await response.json();

                if (data.success) {
                    const userData = data.user;
                    if (!userData.avatar) {
                        userData.avatar = avatar;
                    }
                    saveUserData(userData);
                    alert('✅ ' + data.message);
                    window.location.href = 'profile.html';
                } else {
                    alert('❌ ' + data.error);
                    if (registerBtn) {
                        registerBtn.disabled = false;
                        registerBtn.textContent = 'Зарегистрироваться';
                    }
                }

            } catch (error) {
                console.error('Ошибка:', error);
                alert('❌ Не удалось подключиться к серверу. Запустите бэкенд!');
                if (registerBtn) {
                    registerBtn.disabled = false;
                    registerBtn.textContent = 'Зарегистрироваться';
                }
            }
        });
    });
}

// ============================================
// СТРАНИЦА ВХОДА (login.html)
// ============================================

if (window.location.pathname.endsWith('login.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('loginForm');
        const nameInput = document.getElementById('loginNameInput');
        const passwordInput = document.getElementById('loginPasswordInput');
        const loginBtn = document.getElementById('loginBtn');

        if (!form) {
            console.error('❌ Форма входа не найдена!');
            return;
        }

        const user = getUserData();
        if (user) {
            window.location.href = 'profile.html';
            return;
        }

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = nameInput ? nameInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value : '';

            if (!name) {
                alert('Пожалуйста, введите ваше имя');
                if (nameInput) nameInput.focus();
                return;
            }

            if (!password) {
                alert('Пожалуйста, введите пароль');
                if (passwordInput) passwordInput.focus();
                return;
            }

            if (loginBtn) {
                loginBtn.disabled = true;
                loginBtn.textContent = 'Вход...';
            }

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, password })
                });

                const data = await response.json();

                if (data.success) {
                    saveUserData(data.user);
                    alert('✅ ' + data.message);
                    window.location.href = 'profile.html';
                } else {
                    alert('❌ ' + data.error);
                    if (loginBtn) {
                        loginBtn.disabled = false;
                        loginBtn.textContent = 'Войти';
                    }
                }

            } catch (error) {
                console.error('Ошибка:', error);
                alert('❌ Не удалось подключиться к серверу. Запустите бэкенд!');
                if (loginBtn) {
                    loginBtn.disabled = false;
                    loginBtn.textContent = 'Войти';
                }
            }
        });
    });
}

// ============================================
// СТРАНИЦА ПРОФИЛЯ (profile.html)
// ============================================

if (window.location.pathname.endsWith('profile.html') ||
    window.location.pathname.endsWith('tasks.html') ||
    window.location.pathname.endsWith('test.html')) {

    document.addEventListener('DOMContentLoaded', function() {
        const user = getUserData();

        if (!user) {
            window.location.href = 'index.html';
            return;
        }

        // Заполняем имя
        const profileName = document.getElementById('profileName');
        if (profileName) {
            profileName.textContent = user.name;
        }

        // Аватар
        const avatarImg = document.getElementById('avatarImage');
        if (avatarImg) {
            if (user.avatar) {
                avatarImg.src = user.avatar;
            } else {
                const defaultAvatar = generateAvatar(user.name);
                avatarImg.src = defaultAvatar;
                user.avatar = defaultAvatar;
                saveUserData(user);
            }
        }

        // Загрузка аватара
        const avatarInput = document.getElementById('avatarInput');
        if (avatarInput) {
            avatarInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = function(event) {
                    const base64 = event.target.result;
                    if (avatarImg) {
                        avatarImg.src = base64;
                    }
                    user.avatar = base64;
                    saveUserData(user);
                    alert('✅ Аватар обновлён!');
                };
                reader.readAsDataURL(file);
            });
        }

        // Выход
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                clearUserData();
                window.location.href = 'index.html';
            });
        }
    });
}


// ============================================
// СТРАНИЦА ЗАДАЧ (tasks.html)
// ============================================

// ============================================
// ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ
// ============================================

function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// ============================================
// КЛЮЧИ ДЛЯ СТАТИСТИКИ (ПРИВЯЗАНЫ К ПОЛЬЗОВАТЕЛЮ)
// ============================================

function getStatsKeys() {
    const user = getCurrentUser();
    const username = user ? user.name : 'guest';
    return {
        stats: `testStats_${username}`,
        completed: `completedTasks_${username}`,
        button: `buttonGreen_${username}`
    };
}

// ============================================
// ЗАГРУЗКА СТАТИСТИКИ
// ============================================

const keys = getStatsKeys();

let stats = JSON.parse(localStorage.getItem(keys.stats)) || {
    correct: 0,
    wrong: 0,
    total: 0
};

let completedTasks = JSON.parse(localStorage.getItem(keys.completed)) || [];

// ============================================
// СОХРАНЕНИЕ СТАТИСТИКИ
// ============================================

function saveStats() {
    localStorage.setItem(keys.stats, JSON.stringify(stats));
    localStorage.setItem(keys.completed, JSON.stringify(completedTasks));
}

// ============================================
// ОБНОВЛЕНИЕ ОТОБРАЖЕНИЯ
// ============================================

function updateStatsDisplay() {
    const total = stats.correct + stats.wrong;
    const progress = total > 0 ? Math.round((stats.correct / total) * 100) : 0;

    const totalEl = document.getElementById('totalTasks');
    const correctEl = document.getElementById('completedTasks');
    const progressEl = document.getElementById('progressPercent');
    const wrongEl = document.getElementById('wrongCount');
    const asEl = document.getElementById('as');

    if (totalEl) totalEl.textContent = total;
    if (correctEl) correctEl.textContent = stats.correct;
    if (progressEl) progressEl.textContent = progress + '%';
    if (wrongEl) wrongEl.textContent = stats.wrong;
    if (asEl) asEl.textContent = stats.correct;
}

// ============================================
// КЛАСС ЗАДАЧ
// ============================================

class Task {
    constructor(question1, question2, question3, question4, correctAnswer, taskId) {
        this.question1 = question1;
        this.question2 = question2;
        this.question3 = question3;
        this.question4 = question4;
        this.correctAnswer = correctAnswer;
        this.taskId = taskId || 1;
        this.isCompleted = completedTasks.includes(this.taskId);
    }

    test() {
        const container = document.getElementById('container');

        if (this.isCompleted) {
            container.innerHTML = `
                <div class="test-wrapper">
                    <div class="test-header">
                        <h3>📝 Тест</h3>
                        <span class="test-number">Вопрос 1 из 1</span>
                    </div>
                    <div class="question-text">Выберите правильный ответ:</div>
                    <div class="options-group">
                        <label class="option">
                            <input type="radio" name="quiz" value="1" disabled><span class="letter">A</span> ${this.question1}
                        </label>
                        <label class="option">
                            <input type="radio" name="quiz" value="2" disabled><span class="letter">B</span> ${this.question2}
                        </label>
                        <label class="option">
                            <input type="radio" name="quiz" value="3" disabled><span class="letter">C</span> ${this.question3}
                        </label>
                        <label class="option">
                            <input type="radio" name="quiz" value="4" disabled><span class="letter">D</span> ${this.question4}
                        </label>
                    </div>
                    <div class="result show correct" style="display:block;">✅ Вы уже прошли этот тест!</div>
                </div>
            `;
            container.style.display = 'block';
            return;
        }

        container.innerHTML = `
            <div class="test-wrapper">
                <div class="test-header">
                    <h3>📝 Тест</h3>
                    <span class="test-number">Вопрос 1 из 1</span>
                </div>
                <div class="question-text">Выберите правильный ответ:</div>
                <div class="options-group">
                    <label class="option">
                        <input type="radio" name="quiz" value="1"><span class="letter">A</span> ${this.question1}
                    </label>
                    <label class="option">
                        <input type="radio" name="quiz" value="2"><span class="letter">B</span> ${this.question2}
                    </label>
                    <label class="option">
                        <input type="radio" name="quiz" value="3"><span class="letter">C</span> ${this.question3}
                    </label>
                    <label class="option">
                        <input type="radio" name="quiz" value="4"><span class="letter">D</span> ${this.question4}
                    </label>
                </div>
                <button class="btn-check" id="checkBtn">✅ Проверить</button>
                <div class="result" id="result"></div>
                <div class="correct-answer" id="correctAnswer"></div>
            </div>
        `;

        document.querySelectorAll('.option input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', function() {
                document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                this.closest('.option').classList.add('selected');
            });
        });

        const self = this;
        document.getElementById('checkBtn').addEventListener('click', function() {
            self.check();
        });

        container.style.display = 'block';
    }

    check() {
        const selected = document.querySelector('input[name="quiz"]:checked');
        const result = document.getElementById('result');
        const button = document.getElementById('button');

        if (!selected) {
            result.textContent = '⚠️ Выберите вариант!';
            result.className = 'result show warning';
            return;
        }

        const userAnswer = parseInt(selected.value);

        if (userAnswer === this.correctAnswer) {
            result.textContent = '✅ Правильно! Отличная работа! 🎉';
            result.className = 'result show correct';

            // Засчитываем 1 раз
            stats.correct++;
            stats.total++;
            completedTasks.push(this.taskId);
            this.isCompleted = true;
            saveStats();
            updateStatsDisplay();

            // Кнопка становится зелёной
            if (button) {
                button.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
                button.style.borderColor = '#00FF00';
                button.style.color = '#00C853';
            }

            localStorage.setItem(keys.button, 'true');

            // Обновляем тест
            this.test();

        } else {
            result.textContent = '❌ Неправильно! Попробуйте ещё раз.';
            result.className = 'result show wrong';
            stats.wrong++;
            stats.total++;
            saveStats();
            updateStatsDisplay();

            document.getElementById('correctAnswer').textContent = `✅ Правильный ответ: ${this.correctAnswer}`;
            document.getElementById('correctAnswer').className = 'correct-answer show';
        }
    }
}

// ============================================
// ЗАПУСК ТЕСТА
// ============================================

let testVisible = false;
let currentTask = null;

function startTest() {
    const container = document.getElementById('container');

    if (!testVisible) {
        currentTask = new Task(
            "int",
            "int, float, str",
            "str, float",
            "int, float, str, bool",
            4,
            1
        );
        currentTask.test();
        testVisible = true;
    } else {
        container.style.display = container.style.display === 'none' ? 'block' : 'none';
    }
}

// ============================================
// ВОССТАНОВЛЕНИЕ ЗЕЛЁНОЙ КНОПКИ
// ============================================

function restoreButtonState() {
    const button = document.getElementById('button');
    if (button && localStorage.getItem(keys.button) === 'true') {
        button.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
        button.style.borderColor = '#00FF00';
        button.style.color = '#00C853';
    }
}

// ============================================
// ВОССТАНОВЛЕНИЕ ТЕСТА
// ============================================

function restoreTestState() {
    if (completedTasks.length > 0 && document.getElementById('container')) {
        const task = new Task(
            "int",
            "int, float, str",
            "str, float",
            "int, float, str, bool",
            4,
            1
        );
        task.test();
        testVisible = true;
    }
}

// ============================================
// ПОДКЛЮЧЕНИЕ КНОПКИ
// ============================================

const button = document.getElementById('button');
if (button) {
    button.addEventListener('click', startTest);
}

// ============================================
// ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    updateStatsDisplay();
    restoreButtonState();
    restoreTestState();
    console.log('📊 Статистика загружена:', stats);
    console.log('✅ Пройденные задачи:', completedTasks);
});
