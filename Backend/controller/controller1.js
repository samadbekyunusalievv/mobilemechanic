const Router = require('express')
const { model } = require('mongoose')
const multer = require('multer');
const path = require('path');
const db = require('../db'); // Подключите ваш модуль для работы с базой данных

class UsersController1 {

    async createFunction1(req, res) {
        try {
            // Получите user_id из запроса
            const user_id = req.body.user_id;
            const id = req.body.id;
            const  photo_name= req.body.user_id;


            // Конфигурация multer для сохранения изображений
            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, 'hackathon\photo'); // Указываем папку, куда будут сохраняться изображения
                },
                filename: function (req, file, cb) {
                    const ext = path.extname(file.originalname);
                    cb(null, Date.now() + ext); // Генерация уникального имени файла с использованием временной метки
                }
            });

            // Создание экземпляра multer с указанной конфигурацией
            const upload = multer({ storage: storage }).single('image'); // 'image' - имя поля формы для загрузки файла

            // Обработка загрузки файла
            upload(req, res, async function (err) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Ошибка при загрузке изображения' });
                }

                // Ваш код для обработки файла, например, сохранение пути к изображению в базе данных
                const imagePath = req.file.path;

                // Сохранение пути к изображению и user_id в базе данных
                await db.Image.create({
                    user_id: user_id,
                    imagePath: imagePath
                });

                // Отправка успешного ответа
                res.status(200).json({ message: 'Изображение успешно загружено', imagePath: imagePath });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при обработке изображения' });
        }
    }





}

module.exports = UsersController1;
