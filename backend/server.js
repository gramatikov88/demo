//изброй командите в конзолоата
//npm init -y
//npm install express mysql2 bcrypt cors
//npm install --save-dev nodemon
//npx nodemon server.js
//npm run dev
//създай файл server.js в backend папката

//backend/server.js

import express from "express";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express(); // Инициализация на Express приложението
app.use(express.json()); // За да може да чете JSON тела в заявките
app.use(cors()); // За да разреши CORS заявки от фронтенда

// MySQL връзка
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "demo"
});

// Регистрация на потребител
app.post("/register", async (req, res) => { //асинхронна функция за да може да използваме await
  const { username, email, password } = req.body; //вземаме данните от тялото на заявката
  if (!username || !email || !password) { //проверка дали всички полета са попълнени
    return res.status(400).json({ message: "Всички полета са задължителни!" }); //ако не са, връщаме грешка 400 с подходящо съобщение
  }
  try { //опитваме се да хешираме паролата и да я запишем в базата
    const hashedPassword = await bcrypt.hash(password, 10); //хешираме паролата с 10 рунда
    db.query( //изпълняваме заявка към базата
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)", //SQL заявка с параметри
      [username, email, hashedPassword], //стойности за параметрите
      (err, result) => { //callback функция която се изпълнява след заявката
        if (err) { //ако има грешка
          if (err.code === "ER_DUP_ENTRY") { //проверка дали грешката е за дублиращ се запис
            return res.status(409).json({ message: "Потребителското име или email вече съществува!" });
          } //ако е друга грешка
          return res.status(500).json({ message: "Грешка при регистрация!" });
        }
        res.status(201).json({ message: "Регистрацията е успешна!" }); //ако всичко е наред, връщаме успех 201
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Грешка при обработка на паролата!" }); //ако има грешка при хеширането
  }
});

// Логин на потребител
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Всички полета са задължителни!" });
  }
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Грешка при заявка!" });
      if (results.length === 0) {
        return res.status(401).json({ message: "Грешно потребителско име или парола!" });
      }
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "Грешно потребителско име или парола!" });
      }
      return res.status(200).json({ message: "Успешен вход!", username: user.username });
      // НЕ използвайте res.redirect тук!
      // Пренасочването се прави във фронтенда след успешен login
    }
  );
});

// Стартиране на сървъра
app.listen(3001, () => {
  console.log("Сървърът работи на порт 3001");
});