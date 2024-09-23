-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Авг 24 2024 г., 15:57
-- Версия сервера: 5.7.24
-- Версия PHP: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `sql_roof-calc`
--

-- --------------------------------------------------------

--
-- Структура таблицы `junctionlist`
--

CREATE TABLE `junctionlist` (
  `name` varchar(100) NOT NULL,
  `length` int(100) NOT NULL,
  `jSquareMeters` int(100) NOT NULL,
  `junctionId` int(100) NOT NULL,
  `roofId` int(100) NOT NULL,
  `userId` int(100) NOT NULL,
  `junctionLayers` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `projectqueue`
--

CREATE TABLE `projectqueue` (
  `projectId` int(100) NOT NULL,
  `queueId` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `userId` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `projectqueue`
--

INSERT INTO `projectqueue` (`projectId`, `queueId`, `name`, `userId`) VALUES
(35, 5, '1', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

CREATE TABLE `projects` (
  `userId` int(100) NOT NULL,
  `projectId` int(100) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `projects`
--

INSERT INTO `projects` (`userId`, `projectId`, `name`) VALUES
(1, 35, 'Константинова д9');

-- --------------------------------------------------------

--
-- Структура таблицы `rooflist`
--

CREATE TABLE `rooflist` (
  `name` varchar(100) NOT NULL,
  `projectId` int(100) NOT NULL,
  `queueId` int(100) NOT NULL,
  `sectionId` int(100) NOT NULL,
  `roofId` int(100) NOT NULL,
  `roofLayers` json NOT NULL,
  `squareMeters` int(100) NOT NULL,
  `userId` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `rooflist`
--

INSERT INTO `rooflist` (`name`, `projectId`, `queueId`, `sectionId`, `roofId`, `roofLayers`, `squareMeters`, `userId`) VALUES
('По узлу А', 35, 5, 8, 12, '{\"0\": {\"name\": \"Уклонообразующий слой из керамзита\", \"layerId\": 1, \"composition\": {\"material1\": \"Керамзит - 73.60 м3\", \"material2\": \"Плёнка полиэтиленовая - 607.20 м2\"}}, \"1\": {\"name\": \"Уклонообразующий слой из раствора/бетона/керамзитобетона\", \"layerId\": 2, \"composition\": {\"material1\": \"Раствор - 73.60 м3\", \"material2\": \"Армирующая сетка - 134 листов\", \"material3\": \"Фиксаторы - 1380 шт\"}}, \"2\": {\"name\": \"Стяжка\", \"layerId\": 3, \"composition\": {\"material1\": \"Армирующая сетка - 134 листов\", \"material2\": \"Фиксаторы - 1380 шт\", \"material3\": \"Стяжка - 33.12 м2\"}}, \"3\": {\"name\": \"ХЦЛ\", \"layerId\": 4, \"composition\": {\"material1\": \"ХЦЛ - 404.80 листов\"}}, \"4\": {\"name\": \"Водосточная воронка\", \"layerId\": 5, \"composition\": {\"material1\": \"Водосточная воронка - 12 шт\"}}, \"5\": {\"name\": \"Гидроизоляция\", \"layerId\": 6, \"composition\": {\"material1\": \"Праймер - 138.00 л\", \"material2\": \"Гидроизоляция 1 слой - 64 рул.\"}}, \"6\": {\"name\": \"Утеплитель\", \"layerId\": 7, \"composition\": {\"material1\": \"Утеплитель - 607.20 м2\"}}, \"7\": {\"name\": \"Балластный слой\", \"layerId\": 8, \"composition\": {\"material1\": \"Щебень - 27.60 м3\", \"material2\": \"Геотекстиль - 607.20 м2\"}}}', 552, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `sections`
--

CREATE TABLE `sections` (
  `projectId` int(100) NOT NULL,
  `queueId` int(100) NOT NULL,
  `sectionId` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `userId` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `sections`
--

INSERT INTO `sections` (`projectId`, `queueId`, `sectionId`, `name`, `userId`) VALUES
(35, 5, 8, '1', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `userId` int(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `login` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`userId`, `email`, `login`, `password`) VALUES
(1, 'Syam144@yandex.ru', 'Mirkariy', 'Selester144');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `junctionlist`
--
ALTER TABLE `junctionlist`
  ADD PRIMARY KEY (`junctionId`),
  ADD KEY `roofId` (`roofId`);

--
-- Индексы таблицы `projectqueue`
--
ALTER TABLE `projectqueue`
  ADD PRIMARY KEY (`queueId`),
  ADD KEY `project_index` (`projectId`);

--
-- Индексы таблицы `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`projectId`);

--
-- Индексы таблицы `rooflist`
--
ALTER TABLE `rooflist`
  ADD PRIMARY KEY (`roofId`),
  ADD KEY `section_index` (`sectionId`),
  ADD KEY `queue_index` (`queueId`),
  ADD KEY `project_index` (`projectId`);

--
-- Индексы таблицы `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`sectionId`),
  ADD KEY `queue_index` (`queueId`),
  ADD KEY `project_index` (`projectId`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `junctionlist`
--
ALTER TABLE `junctionlist`
  MODIFY `junctionId` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `projectqueue`
--
ALTER TABLE `projectqueue`
  MODIFY `queueId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `projects`
--
ALTER TABLE `projects`
  MODIFY `projectId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT для таблицы `rooflist`
--
ALTER TABLE `rooflist`
  MODIFY `roofId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `sections`
--
ALTER TABLE `sections`
  MODIFY `sectionId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `junctionlist`
--
ALTER TABLE `junctionlist`
  ADD CONSTRAINT `junctionlist_ibfk_1` FOREIGN KEY (`roofId`) REFERENCES `rooflist` (`roofId`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `projectqueue`
--
ALTER TABLE `projectqueue`
  ADD CONSTRAINT `projectqueue_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `rooflist`
--
ALTER TABLE `rooflist`
  ADD CONSTRAINT `rooflist_ibfk_3` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`sectionId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `sections`
--
ALTER TABLE `sections`
  ADD CONSTRAINT `sections_ibfk_1` FOREIGN KEY (`queueId`) REFERENCES `projectqueue` (`queueId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

DROP USER '%'@'%';
CREATE USER '${process.env.DB_USER}'@'%' IDENTIFIED BY '${process.env.DB_PASSWORD}';
GRANT ALL PRIVILEGES ON *.* TO '${process.env.DB_USER}'@'%';
FLUSH PRIVILEGES;