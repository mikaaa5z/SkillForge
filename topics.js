// ============================================
// КОНТЕЙНЕР
// ============================================

const container = document.getElementById('container');

// ============================================
// ЗАГРУЗКА ПРОФИЛЯ (АВАТАР И ИМЯ)
// ============================================

function getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function saveUserData(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function generateAvatar(name) {
    if (!name) name = 'User';

    const initials = name
        .split(' ')
        .map(word => word[0] || '')
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const canvas = document.createElement('canvas');
    canvas.width = 120;
    canvas.height = 120;
    const ctx = canvas.getContext('2d');

    const colors = ['#4a6cf7', '#34a853', '#ea4335', '#fbbc04', '#9b59b6', '#1abc9c', '#e67e22', '#2ecc71'];
    const colorIndex = name.length % colors.length;

    ctx.fillStyle = colors[colorIndex];
    ctx.beginPath();
    ctx.arc(60, 60, 60, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials || '?', 60, 65);

    return canvas.toDataURL('image/png');
}

function loadProfile() {
    const user = getUserData();
    if (!user) return;

    const profileName = document.getElementById('profileName');
    if (profileName) {
        profileName.textContent = user.name;
    }

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
}

function setupAvatarUpload() {
    const avatarInput = document.getElementById('avatarInput');
    const avatarImg = document.getElementById('avatarImage');

    if (!avatarInput || !avatarImg) return;

    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('❌ Пожалуйста, выберите изображение!');
            avatarInput.value = '';
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('❌ Файл слишком большой! Максимум 5MB.');
            avatarInput.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const base64 = event.target.result;
            avatarImg.src = base64;

            const user = getUserData();
            if (user) {
                user.avatar = base64;
                saveUserData(user);
                alert('✅ Аватар обновлён!');
            }
        };
        reader.readAsDataURL(file);
    });
}

// ============================================
// ПУСТОЕ СОСТОЯНИЕ
// ============================================

function showEmptyState() {
    container.innerHTML = `
        <div class="empty-state">
            <span class="empty-icon">📚</span>
            <h2>Выберите тему</h2>
            <p>Нажмите на один из языков в левой панели, чтобы начать изучение</p>
        </div>
    `;
}

// ============================================
// PYTHON — ПОЛНЫЙ УЧЕБНИК
// ============================================

function showPython() {
    container.innerHTML = `
        <h1>🐍 Учебник Python</h1>
        <p>Изучайте синтаксис и концепции Python</p>

        <div class="quote">
            «Python — это язык, который понимают даже дети, но используют профессионалы» 💻
        </div>

        <hr>

        <h2>📦 1. Переменные и типы данных</h2>
        <p><b>Переменная</b> — это контейнер для хранения данных. В Python не нужно указывать тип.</p>

        <h3>Примеры переменных:</h3>
        <pre>
# Строка
name = "Алексей"

# Число
age = 25

# Булево значение
is_student = True

# Список
numbers = [1, 2, 3, 4, 5]

# Словарь
user = {
    "name": "Алексей",
    "age": 25
}
        </pre>

        <div class="info-box">
            <p>💡 <b>Подсказка:</b> в Python не нужно указывать тип переменной.</p>
        </div>

        <h3>Типы данных в Python:</h3>
        <ul>
            <li><b>int</b> — целые числа (42)</li>
            <li><b>float</b> — числа с плавающей точкой (3.14)</li>
            <li><b>str</b> — строки ("Привет")</li>
            <li><b>bool</b> — булевы значения (True, False)</li>
            <li><b>list</b> — списки ([1, 2, 3])</li>
            <li><b>dict</b> — словари ({"key": "value"})</li>
        </ul>

        <hr>

        <h2>🔀 2. Условные операторы</h2>
        <p><b>Условные операторы</b> позволяют выполнять код только при определённых условиях.</p>

        <h3>Пример if-else:</h3>
        <pre>
age = 18

if age >= 18:
    print("Совершеннолетний")
else:
    print("Ребёнок")
        </pre>

        <h3>Пример с elif:</h3>
        <pre>
score = 85

if score >= 90:
    grade = "Отлично"
elif score >= 70:
    grade = "Хорошо"
elif score >= 50:
    grade = "Удовлетворительно"
else:
    grade = "Неудовлетворительно"

print(grade)  # Выведет: Хорошо
        </pre>

        <div class="info-box">
            <p>💡 <b>Логические операторы:</b></p>
            <p><code>and</code> (И) — оба условия истинны</p>
            <p><code>or</code> (ИЛИ) — хотя бы одно условие истинно</p>
            <p><code>not</code> (НЕ) — отрицание</p>
        </div>

        <hr>

        <h2>🔄 3. Циклы</h2>
        <p><b>Циклы</b> позволяют повторять блок кода несколько раз.</p>

        <h3>Цикл for:</h3>
        <pre>
# Вывести числа от 0 до 4
for i in range(5):
    print(i)

# Перебор списка
fruits = ["яблоко", "банан", "апельсин"]
for fruit in fruits:
    print(fruit)
        </pre>

        <h3>Цикл while:</h3>
        <pre>
i = 0
while i < 5:
    print(i)
    i += 1
        </pre>

        <hr>

        <h2>🏗️ 4. Функции</h2>
        <p><b>Функция</b> — это блок кода, который выполняет определённую задачу и может использоваться многократно.</p>

        <h3>Создание и вызов функции:</h3>
        <pre>
def greet(name):
    return "Привет, " + name

message = greet("Алексей")
print(message)  # Выведет: Привет, Алексей
        </pre>

        <h3>Функция с несколькими параметрами:</h3>
        <pre>
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # Выведет: 8
        </pre>

        <hr>

        <h2>📋 5. Списки</h2>
        <p><b>Список</b> — это коллекция элементов, которая может изменяться.</p>

        <h3>Работа со списками:</h3>
        <pre>
# Создание списка
numbers = [1, 2, 3, 4, 5]

# Добавление элемента
numbers.append(6)

# Удаление элемента
numbers.pop()  # удаляет последний

# Получение элемента
first = numbers[0]

# Перебор списка
for num in numbers:
    print(num)

# Длина списка
length = len(numbers)
        </pre>

        <hr>

        <h2>📖 6. Словари</h2>
        <p><b>Словарь</b> — это коллекция пар «ключ-значение».</p>

        <h3>Работа со словарями:</h3>
        <pre>
# Создание словаря
user = {
    "name": "Алексей",
    "age": 25,
    "city": "Москва"
}

# Получение значения
name = user["name"]
age = user.get("age")

# Добавление пары
user["email"] = "alex@mail.ru"

# Удаление пары
del user["city"]

# Перебор словаря
for key, value in user.items():
    print(key, ":", value)
        </pre>

        <hr>

        <h2>📁 7. Работа с файлами</h2>
        <p>Python позволяет читать и записывать файлы.</p>

        <h3>Чтение файла:</h3>
        <pre>
# Открыть файл для чтения
with open("file.txt", "r") as file:
    content = file.read()
    print(content)
        </pre>

        <h3>Запись в файл:</h3>
        <pre>
# Открыть файл для записи
with open("file.txt", "w") as file:
    file.write("Привет, мир!")
        </pre>

        <hr>

        <h2>🛡️ 8. Обработка ошибок</h2>
        <p>Python позволяет обрабатывать ошибки с помощью <b>try-except</b>.</p>

        <h3>Пример:</h3>
        <pre>
try:
    number = int(input("Введите число: "))
    print("Вы ввели:", number)
except ValueError:
    print("Ошибка: нужно ввести число!")
finally:
    print("Программа завершена")
        </pre>

        <hr>

        <h2>🏛️ 9. Классы и ООП</h2>
        <p><b>Класс</b> — это шаблон для создания объектов.</p>

        <h3>Пример класса:</h3>
        <pre>
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        print(f"Привет, я {self.name}")

# Создание объекта
user = User("Алексей", 25)
user.greet()  # Выведет: Привет, я Алексей
        </pre>

        <hr>

        <p><b>💻 SkillForge — куй свои навыки! ⚒️</b></p>
    `;
}

// ============================================
// C++ — ПОЛНЫЙ УЧЕБНИК
// ============================================

function showCpp() {
    container.innerHTML = `
        <h1>⚙️ Учебник C++</h1>
        <p>Изучайте синтаксис и концепции C++</p>

        <div class="quote">
            «C++ — это язык, который даёт полный контроль над компьютером» 💻
        </div>

        <hr>

        <h2>📦 1. Переменные и типы данных</h2>
        <p><b>Переменная</b> — это контейнер для хранения данных. В C++ нужно указывать тип переменной.</p>

        <h3>Примеры переменных:</h3>
        <pre>
#include &lt;iostream&gt;
#include &lt;string&gt;

using namespace std;

int main() {
    string name = "Алексей";
    int age = 25;
    double price = 19.99;
    bool isStudent = true;
    int numbers[5] = {1, 2, 3, 4, 5};
    return 0;
}
        </pre>

        <div class="info-box">
            <p>💡 <b>Типы данных в C++:</b></p>
            <p><code>int</code> — целые числа (42)</p>
            <p><code>double</code> — числа с плавающей точкой (3.14)</p>
            <p><code>char</code> — один символ ('A')</p>
            <p><code>string</code> — строки ("Привет")</p>
            <p><code>bool</code> — булевы значения (true, false)</p>
        </div>

        <hr>

        <h2>🔀 2. Условные операторы</h2>
        <p><b>Условные операторы</b> позволяют выполнять код только при определённых условиях.</p>

        <pre>
int age = 18;

if (age >= 18) {
    cout << "Совершеннолетний" << endl;
} else {
    cout << "Ребёнок" << endl;
}
        </pre>

        <h3>Пример с else if:</h3>
        <pre>
int score = 85;

if (score >= 90) {
    cout << "Отлично" << endl;
} else if (score >= 70) {
    cout << "Хорошо" << endl;
} else if (score >= 50) {
    cout << "Удовлетворительно" << endl;
} else {
    cout << "Неудовлетворительно" << endl;
}
        </pre>

        <hr>

        <h2>🔄 3. Циклы</h2>
        <p><b>Циклы</b> позволяют повторять блок кода несколько раз.</p>

        <h3>Цикл for:</h3>
        <pre>
for (int i = 0; i < 5; i++) {
    cout << i << endl;
}

int numbers[5] = {1, 2, 3, 4, 5};
for (int i = 0; i < 5; i++) {
    cout << numbers[i] << endl;
}
        </pre>

        <h3>Цикл while:</h3>
        <pre>
int i = 0;
while (i < 5) {
    cout << i << endl;
    i++;
}
        </pre>

        <h3>Цикл do-while:</h3>
        <pre>
int i = 0;
do {
    cout << i << endl;
    i++;
} while (i < 5);
        </pre>

        <hr>

        <h2>🏗️ 4. Функции</h2>
        <p><b>Функция</b> — это блок кода, который выполняет определённую задачу.</p>

        <h3>Создание и вызов функции:</h3>
        <pre>
#include &lt;iostream&gt;
#include &lt;string&gt;

using namespace std;

string greet(string name) {
    return "Привет, " + name;
}

void printMessage(string message) {
    cout << message << endl;
}

int main() {
    string message = greet("Алексей");
    cout << message << endl;
    printMessage("Привет, мир!");
    return 0;
}
        </pre>

        <h3>Функция с несколькими параметрами:</h3>
        <pre>
int add(int a, int b) {
    return a + b;
}

int result = add(5, 3);
cout << result << endl;  // Выведет: 8
        </pre>

        <hr>

        <h2>📋 5. Массивы</h2>
        <p><b>Массив</b> — это коллекция элементов одного типа, которая имеет фиксированный размер.</p>

        <h3>Работа с массивами:</h3>
        <pre>
int numbers[5] = {1, 2, 3, 4, 5};
int first = numbers[0];
numbers[2] = 10;

for (int i = 0; i < 5; i++) {
    cout << numbers[i] << endl;
}

int length = sizeof(numbers) / sizeof(numbers[0]);
        </pre>

        <hr>

        <h2>📍 6. Указатели</h2>
        <p><b>Указатель</b> — это переменная, которая хранит адрес другой переменной.</p>

        <h3>Пример указателей:</h3>
        <pre>
int x = 10;
int* ptr = &amp;x;

cout << "Значение x: " << x << endl;
cout << "Значение ptr: " << *ptr << endl;

*ptr = 20;
cout << "Новое значение x: " << x << endl;
        </pre>

        <hr>

        <h2>📁 7. Работа с файлами</h2>
        <p>C++ позволяет читать и записывать файлы с помощью библиотеки <b>fstream</b>.</p>

        <h3>Чтение файла:</h3>
        <pre>
#include &lt;iostream&gt;
#include &lt;fstream&gt;
#include &lt;string&gt;

using namespace std;

int main() {
    ifstream file("file.txt");
    string line;

    if (file.is_open()) {
        while (getline(file, line)) {
            cout << line << endl;
        }
        file.close();
    }

    return 0;
}
        </pre>

        <h3>Запись в файл:</h3>
        <pre>
#include &lt;iostream&gt;
#include &lt;fstream&gt;

using namespace std;

int main() {
    ofstream file("file.txt");

    if (file.is_open()) {
        file << "Привет, мир!" << endl;
        file.close();
    }

    return 0;
}
        </pre>

        <hr>

        <h2>🛡️ 8. Обработка ошибок</h2>
        <p>C++ позволяет обрабатывать ошибки с помощью <b>try-catch</b>.</p>

        <h3>Пример:</h3>
        <pre>
#include &lt;iostream&gt;
#include &lt;stdexcept&gt;

using namespace std;

int main() {
    try {
        int age;
        cout << "Введите возраст: ";
        cin >> age;

        if (age < 0) {
            throw invalid_argument("Возраст не может быть отрицательным!");
        }

        cout << "Ваш возраст: " << age << endl;
    } catch (const invalid_argument&amp; e) {
        cout << "Ошибка: " << e.what() << endl;
    }

    return 0;
}
        </pre>

        <hr>

        <h2>🏛️ 9. Классы и ООП</h2>
        <p><b>Класс</b> — это шаблон для создания объектов. В C++ классы — основа объектно-ориентированного программирования.</p>

        <h3>Пример класса:</h3>
        <pre>
#include &lt;iostream&gt;
#include &lt;string&gt;

using namespace std;

class User {
private:
    string name;
    int age;

public:
    User(string n, int a) {
        name = n;
        age = a;
    }

    void greet() {
        cout << "Привет, я " << name << ", мне " << age << " лет" << endl;
    }

    string getName() {
        return name;
    }

    void setName(string n) {
        name = n;
    }
};

int main() {
    User user("Алексей", 25);
    user.greet();

    user.setName("Мария");
    cout << "Новое имя: " << user.getName() << endl;

    return 0;
}
        </pre>

        <hr>

        <p><b>💻 SkillForge — куй свои навыки! ⚒️</b></p>
    `;
}

// ============================================
// PASCAL — ПОЛНЫЙ УЧЕБНИК
// ============================================

function showPascal() {
    container.innerHTML = `
        <h1>📐 Учебник Pascal</h1>
        <p>Изучайте синтаксис и концепции Pascal</p>

        <div class="quote">
            «Pascal — это язык, который учит думать правильно» 💻
        </div>

        <hr>

        <h2>📋 1. Структура программы</h2>
        <p>Программа на Pascal имеет чёткую структуру:</p>

        <pre>
program ИмяПрограммы;
uses
    модули;

const
    константы;

var
    переменные;

begin
    // тело программы
end.
        </pre>

        <hr>

        <h2>📦 2. Переменные и типы данных</h2>
        <p><b>Переменная</b> — это контейнер для хранения данных. В Pascal переменные объявляются в секции <b>var</b>.</p>

        <h3>Примеры переменных:</h3>
        <pre>
program Variables;

var
    name: string;       // строка
    age: integer;       // целое число
    price: real;        // число с плавающей точкой
    isStudent: boolean; // булево значение
    grade: char;        // один символ

begin
    name := 'Алексей';
    age := 25;
    price := 19.99;
    isStudent := true;
    grade := 'A';
end.
        </pre>

        <div class="info-box">
            <p>💡 <b>Типы данных в Pascal:</b></p>
            <p><code>integer</code> — целые числа (42)</p>
            <p><code>real</code> — числа с плавающей точкой (3.14)</p>
            <p><code>char</code> — один символ ('A')</p>
            <p><code>string</code> — строки ("Привет")</p>
            <p><code>boolean</code> — булевы значения (true, false)</p>
        </div>

        <hr>

        <h2>🔀 3. Условные операторы</h2>
        <p><b>Условные операторы</b> позволяют выполнять код только при определённых условиях.</p>

        <h3>Пример if-else:</h3>
        <pre>
if age >= 18 then
    writeln('Совершеннолетний')
else
    writeln('Ребёнок');
        </pre>

        <h3>Пример с else if:</h3>
        <pre>
if score >= 90 then
    writeln('Отлично')
else if score >= 70 then
    writeln('Хорошо')
else if score >= 50 then
    writeln('Удовлетворительно')
else
    writeln('Неудовлетворительно');
        </pre>

        <hr>

        <h2>🔄 4. Циклы</h2>
        <p><b>Циклы</b> позволяют повторять блок кода несколько раз.</p>

        <h3>Цикл for:</h3>
        <pre>
for i := 1 to 5 do
    writeln(i);

for i := 5 downto 1 do
    writeln(i);
        </pre>

        <h3>Цикл while:</h3>
        <pre>
i := 0;
while i < 5 do
begin
    writeln(i);
    i := i + 1;
end;
        </pre>

        <h3>Цикл repeat-until:</h3>
        <pre>
i := 0;
repeat
    writeln(i);
    i := i + 1;
until i >= 5;
        </pre>

        <hr>

        <h2>🏗️ 5. Функции и процедуры</h2>
        <p><b>Функция</b> возвращает значение, <b>процедура</b> — нет.</p>

        <h3>Процедура:</h3>
        <pre>
procedure Greet(name: string);
begin
    writeln('Привет, ', name);
end;

Greet('Алексей');
        </pre>

        <h3>Функция:</h3>
        <pre>
function Add(a, b: integer): integer;
begin
    Add := a + b;
end;

result := Add(5, 3);
writeln(result);  // Выведет: 8
        </pre>

        <hr>

        <h2>📋 6. Массивы</h2>
        <p><b>Массив</b> — это коллекция элементов одного типа.</p>

        <h3>Работа с массивами:</h3>
        <pre>
var
    numbers: array[0..4] of integer;

numbers[0] := 1;
numbers[1] := 2;
numbers[2] := 3;
numbers[3] := 4;
numbers[4] := 5;

for i := 0 to 4 do
    writeln(numbers[i]);
        </pre>

        <hr>

        <h2>📁 7. Работа с файлами</h2>
        <p>Pascal позволяет читать и записывать файлы.</p>

        <h3>Чтение файла:</h3>
        <pre>
assign(f, 'file.txt');
reset(f);

while not eof(f) do
begin
    readln(f, line);
    writeln(line);
end;

close(f);
        </pre>

        <h3>Запись в файл:</h3>
        <pre>
assign(f, 'file.txt');
rewrite(f);
writeln(f, 'Привет, мир!');
close(f);
        </pre>

        <hr>

        <h2>🛡️ 8. Обработка ошибок</h2>
        <p>В Pascal используется конструкция <b>try-except</b>.</p>

        <h3>Пример:</h3>
        <pre>
try
    readln(number);
    writeln('Вы ввели: ', number);
except
    writeln('Ошибка: нужно ввести число!');
end;
        </pre>

        <hr>

        <h2>📚 9. Записи (Records)</h2>
        <p><b>Запись</b> — это структура, объединяющая разные типы данных.</p>

        <h3>Пример записи:</h3>
        <pre>
type
    User = record
        name: string;
        age: integer;
        city: string;
    end;

var
    u: User;

u.name := 'Алексей';
u.age := 25;
u.city := 'Москва';

writeln('Имя: ', u.name);
writeln('Возраст: ', u.age);
writeln('Город: ', u.city);
        </pre>

        <hr>

        <p><b>💻 SkillForge — куй свои навыки! ⚒️</b></p>
    `;
}

// ============================================
// JAVASCRIPT — ПОЛНЫЙ УЧЕБНИК
// ============================================

function showJS() {
    container.innerHTML = `
        <h1>🌐 Учебник JavaScript</h1>
        <p>Изучайте синтаксис и концепции JavaScript</p>

        <div class="quote">
            «JavaScript — это язык, который оживляет веб-страницы» 💻
        </div>

        <hr>

        <h2>📦 1. Переменные и типы данных</h2>
        <p><b>Переменная</b> — это контейнер для хранения данных. В JavaScript переменные объявляются с помощью <b>let</b>, <b>const</b> или <b>var</b>.</p>

        <h3>Примеры переменных:</h3>
        <pre>
let name = "Алексей";
let age = 25;
let isStudent = true;
let numbers = [1, 2, 3, 4, 5];
let user = { name: "Алексей", age: 25 };
        </pre>

        <div class="info-box">
            <p>💡 <b>Типы данных в JavaScript:</b></p>
            <p><code>string</code> — строки ("Привет")</p>
            <p><code>number</code> — числа (42, 3.14)</p>
            <p><code>boolean</code> — булевы значения (true, false)</p>
            <p><code>null</code> — пустое значение</p>
            <p><code>undefined</code> — неопределённое значение</p>
            <p><code>object</code> — объекты ({}, [])</p>
            <p><code>symbol</code> — уникальные значения</p>
        </div>

        <hr>

        <h2>🔀 2. Условные операторы</h2>
        <p><b>Условные операторы</b> позволяют выполнять код только при определённых условиях.</p>

        <h3>Пример if-else:</h3>
        <pre>
let age = 18;

if (age >= 18) {
    console.log("Совершеннолетний");
} else {
    console.log("Ребёнок");
}
        </pre>

        <h3>Пример с else if:</h3>
        <pre>
let score = 85;

if (score >= 90) {
    console.log("Отлично");
} else if (score >= 70) {
    console.log("Хорошо");
} else if (score >= 50) {
    console.log("Удовлетворительно");
} else {
    console.log("Неудовлетворительно");
}
        </pre>

        <h3>Тернарный оператор:</h3>
        <pre>
let status = age >= 18 ? "Взрослый" : "Ребёнок";
        </pre>

        <hr>

        <h2>🔄 3. Циклы</h2>
        <p><b>Циклы</b> позволяют повторять блок кода несколько раз.</p>

        <h3>Цикл for:</h3>
        <pre>
for (let i = 0; i < 5; i++) {
    console.log(i);
}

let fruits = ["яблоко", "банан", "апельсин"];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
        </pre>

        <h3>Цикл for-of:</h3>
        <pre>
for (let fruit of fruits) {
    console.log(fruit);
}
        </pre>

        <h3>Цикл for-in:</h3>
        <pre>
for (let key in user) {
    console.log(key + ": " + user[key]);
}
        </pre>

        <h3>Цикл while:</h3>
        <pre>
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}
        </pre>

        <h3>Цикл do-while:</h3>
        <pre>
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 5);
        </pre>

        <hr>

        <h2>🏗️ 4. Функции</h2>
        <p><b>Функция</b> — это блок кода, который выполняет определённую задачу и может использоваться многократно.</p>

        <h3>Объявление функции:</h3>
        <pre>
function greet(name) {
    return "Привет, " + name;
}

let message = greet("Алексей");
console.log(message);  // Выведет: Привет, Алексей
        </pre>

        <h3>Стрелочная функция:</h3>
        <pre>
const greet = (name) => {
    return "Привет, " + name;
};

// Сокращённая запись
const greet = name => "Привет, " + name;
        </pre>

        <h3>Функция с несколькими параметрами:</h3>
        <pre>
function add(a, b) {
    return a + b;
}

let result = add(5, 3);
console.log(result);  // Выведет: 8
        </pre>

        <hr>

        <h2>📋 5. Массивы</h2>
        <p><b>Массив</b> — это коллекция элементов, которая может изменяться.</p>

        <h3>Работа с массивами:</h3>
        <pre>
let numbers = [1, 2, 3, 4, 5];

// Добавление в конец
numbers.push(6);

// Удаление последнего
numbers.pop();

// Добавление в начало
numbers.unshift(0);

// Удаление первого
numbers.shift();

// Получение элемента
let first = numbers[0];

// Длина массива
let length = numbers.length;

// Перебор
numbers.forEach(num => console.log(num));

// Преобразование
let doubled = numbers.map(num => num * 2);
        </pre>

        <div class="info-box">
            <p>💡 <b>Методы массивов:</b></p>
            <p><code>push()</code> — добавить в конец</p>
            <p><code>pop()</code> — удалить последний</p>
            <p><code>map()</code> — преобразовать каждый элемент</p>
            <p><code>filter()</code> — отфильтровать элементы</p>
            <p><code>forEach()</code> — перебор</p>
            <p><code>find()</code> — найти элемент</p>
        </div>

        <hr>

        <h2>📖 6. Объекты</h2>
        <p><b>Объект</b> — это коллекция пар «ключ-значение».</p>

        <h3>Работа с объектами:</h3>
        <pre>
let user = {
    name: "Алексей",
    age: 25,
    city: "Москва"
};

// Получение значения
let name = user.name;
let age = user["age"];

// Добавление свойства
user.email = "alex@mail.ru";

// Удаление свойства
delete user.city;

// Перебор объекта
for (let key in user) {
    console.log(key + ": " + user[key]);
}

// Получение ключей и значений
let keys = Object.keys(user);
let values = Object.values(user);
let entries = Object.entries(user);
        </pre>

        <hr>

        <h2>📁 7. Работа с DOM</h2>
        <p>JavaScript позволяет управлять элементами на странице.</p>

        <h3>Поиск элементов:</h3>
        <pre>
// По ID
let element = document.getElementById('myId');

// По классу
let elements = document.getElementsByClassName('myClass');

// По селектору
let element = document.querySelector('.myClass');
let elements = document.querySelectorAll('.myClass');
        </pre>

        <h3>Изменение содержимого:</h3>
        <pre>
element.textContent = "Новый текст";
element.innerHTML = "<p>Новый HTML</p>";
element.style.color = "red";
element.style.backgroundColor = "blue";
        </pre>

        <h3>Создание элементов:</h3>
        <pre>
let div = document.createElement('div');
div.textContent = "Привет!";
document.body.appendChild(div);
        </pre>

        <hr>

        <h2>🛡️ 8. События</h2>
        <p>События позволяют реагировать на действия пользователя.</p>

        <h3>Основные события:</h3>
        <ul>
            <li><b>click</b> — клик мыши</li>
            <li><b>mouseover</b> — наведение мыши</li>
            <li><b>mouseout</b> — уход мыши</li>
            <li><b>keydown</b> — нажатие клавиши</li>
            <li><b>keyup</b> — отпускание клавиши</li>
            <li><b>submit</b> — отправка формы</li>
            <li><b>change</b> — изменение значения</li>
            <li><b>input</b> — ввод текста</li>
        </ul>

        <h3>Добавление обработчика:</h3>
        <pre>
let button = document.getElementById('myButton');

button.addEventListener('click', function() {
    console.log('Кнопка нажата!');
});

button.addEventListener('click', () => {
    console.log('Кнопка нажата!');
});
        </pre>

        <hr>

        <h2>🏛️ 9. Классы и ООП</h2>
        <p><b>Класс</b> — это шаблон для создания объектов.</p>

        <h3>Пример класса:</h3>
        <pre>
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(\`Привет, я \${this.name}\`);
    }
}

let user = new User("Алексей", 25);
user.greet();  // Выведет: Привет, я Алексей
        </pre>

        <h3>Наследование:</h3>
        <pre>
class Student extends User {
    constructor(name, age, group) {
        super(name, age);
        this.group = group;
    }

    study() {
        console.log(\`\${this.name} учится в группе \${this.group}\`);
    }
}

let student = new Student("Мария", 20, "ИТ-101");
student.greet();  // Привет, я Мария
student.study();  // Мария учится в группе ИТ-101
        </pre>

        <hr>

        <p><b>💻 SkillForge — куй свои навыки! ⚒️</b></p>
    `;
}

// ============================================
// ПОДКЛЮЧЕНИЕ КНОПОК И ЗАГРУЗКА ПРОФИЛЯ
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Загружаем профиль (аватар и имя)
    loadProfile();
    setupAvatarUpload();

    // Показываем пустое состояние
    showEmptyState();

    // Подключаем кнопки языков
    const btnPython = document.getElementById('btn_python');
    const btnCpp = document.getElementById('btn_cpp');
    const btnPascal = document.getElementById('btn_pascal');
    const btnJS = document.getElementById('btn_js');

    if (btnPython) btnPython.addEventListener('click', showPython);
    if (btnCpp) btnCpp.addEventListener('click', showCpp);
    if (btnPascal) btnPascal.addEventListener('click', showPascal);
    if (btnJS) btnJS.addEventListener('click', showJS);

    // Кнопка выхода
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }

    console.log('📖 Учебник загружен');
});
