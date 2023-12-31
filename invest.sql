-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 31 2023 г., 15:36
-- Версия сервера: 8.0.24
-- Версия PHP: 8.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `invest`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `type` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'Торгівельні Операції', '2023-12-29 20:10:15', '2023-12-29 20:10:15'),
(2, 'Інвестаційний банкінг', '2023-12-29 20:10:38', '2023-12-29 20:10:38'),
(3, 'Аналітика', '2023-12-29 20:11:01', '2023-12-29 20:11:01'),
(4, 'Прямі інвестиціі', '2023-12-29 20:11:30', '2023-12-29 20:11:30');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` enum('В обробці','Відхилено','Виконано') NOT NULL DEFAULT 'В обробці',
  `message` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `name`, `phoneNumber`, `email`, `status`, `message`, `createdAt`, `updatedAt`, `user_id`, `category_id`) VALUES
(1, 'В\'ячеслав', '0967654321', 'viachsid@ukr.net', 'В обробці', 'Зателефонуйте мені будь ласка', '2023-12-31 09:01:49', '2023-12-31 11:04:13', 2, 4),
(2, 'Петро', '0736529313', 'nick228@gmail.com', 'Виконано', '', '2023-12-31 09:25:24', '2023-12-31 10:50:05', 3, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `phoneNumber`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Андрій', 'Вєльчев', 'vielchev@gmail.com', '$2b$07$LaoG2kLmfWkUO2liVCP00.zZDiPEa5blX51H4M3xpQVEr7JaHtbAa', '0971234567', 'admin', '2023-12-29 18:45:00', '2023-12-29 18:45:00'),
(2, 'В\'ячеслав', 'Сідоров', 'viachsid@ukr.net', '$2b$07$/6VOgb06uAx3qNyveiz14OORuNTrB2Z2rRoeSUrooycR0L7wWdsFa', '0967654321', 'user', '2023-12-31 09:01:18', '2023-12-31 09:01:18'),
(3, 'Коля', 'Колянов', 'nick228@gmail.com', '$2b$07$OJYSdfKRwVbCwnR7MtWCSu9bbCvFg8lIf4h38A65IW.ELaJ8O3fVi', '0631234567', 'user', '2023-12-31 09:24:28', '2023-12-31 09:24:28');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
