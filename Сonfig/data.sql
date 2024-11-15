CREATE TABLE products (
    id INT PRIMARY KEY,
    category VARCHAR(255),
    title VARCHAR(255),
    img VARCHAR(255),
    price DECIMAL(10, 2),
    weight INT,
    calories INT,
    descriptions TEXT,
    structure TEXT
);

-- Вставка данных в таблицу
INSERT INTO products (id, category, title, img, price, weight, calories, descriptions, structure)
VALUES
    (1, 'burgers', 'Мясная бомба', '1.png', 550.00, 520, 430, 'Супер мясное наслаждение!...', '["Пшеничная булочка", "Котлета из говядины", "Красный лук", "Листья салата", "Соус горчичный"]'),
    (2, 'pizza', 'Домашняя пицца', '2.png', 649.00, 600, 2006, 'Пицца сделанная по домашнему рецепту.', '["Сервелат", "Бекон", "Сочные томаты", "Сыр Моцарелла", "Томатный соус", "Свежая зелень"]'),
    (3, 'wok', 'Лав фил', '3.png', 649.00, 300, 749, 'Одна из разновидностей суши в японской кухне.', '["Сыр Филадельфия", "Филе лосося", "Соус Лав чиз", "Икра Тобика"]');