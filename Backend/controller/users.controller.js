const { reset } = require('nodemon');
const multer = require('multer');
const path = require('path');
const db = require('../db')
const brcypt = require('bcryptjs');                                                                                                   


class UsersController{
    //------------------------------------------------------------------------------------------------------
    async createUser(req, res){
        try{
            const{ name, surname, email, password, password1} =  req.body;
            let heshpassword = '';
            console.log(password, password1);
            if(password === password1){
                heshpassword = brcypt.hashSync(password, 5);
                console.log(heshpassword);
            }
            else{
                res.json('error pasword')
            }


            const newPerson = await db.query('INSERT INTO users (name, surname, email, password) values ($1,$2,$3,$4) RETURNING * ', [name,surname,email,heshpassword])
            console.log(name, surname);
        
            const users1 = await db.query(`
                SELECT users.id
                FROM users
                WHERE name = $1 and email = $2;`,
            [name, email]);

            res.json(users1.rows);
        }
        catch(e){
            console.log(e)
            res.status(401).json({message:'бул Email колдонулган'})
        }
    }

//------------------------------------------------------------------------------------------------------

async createFunction(req, res) {
    try {
        const { user_id, tel, about, a, b, c, d, e, f, g, h } = req.body;

        console.log(req.body);

        const newPerson = await db.query('INSERT INTO function(user_id, tel, about, a, b, c, d, e, f, g, h) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *', [user_id, tel, about, a, b, c, d, e, f, g, h]);

        res.json('ok');
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
}

//------------------------------------------------------------------------------------------------------



   async getUsersA(req, res) {
    try {
        const users = await db.query(`
            SELECT users.id, users.name
            FROM users
            JOIN function ON users.id = function.user_id
            WHERE function.a = true;
        `);
        
        console.log(users.rows);

        res.json(users.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//------------------------------------------------------------------------------------------------------



async getUsersB(req, res) {
    try {
        const users = await db.query(`
            SELECT users.id, users.name
            FROM users
            JOIN function ON users.id = function.user_id
            WHERE function.b = true;
        `);

        res.json(users.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//------------------------------------------------------------------------------------------------------

async getUsersC(req, res) {
    try {
        const users = await db.query(`
            SELECT users.id, users.name
            FROM users
            JOIN function ON users.id = function.user_id
            WHERE function.c = true;
        `);

        res.json(users.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//------------------------------------------------------------------------------------------------------


async getUsersD(req, res) {
    try {
        const users = await db.query(`
            SELECT users.id, users.name
            FROM users
            JOIN function ON users.id = function.user_id
            WHERE function.d = true;
        `);

        res.json(users.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//------------------------------------------------------------------------------------------------------


async getUsersE(req, res) {
    try {
        const users = await db.query(`
            SELECT users.id, users.name
            FROM users
            JOIN function ON users.id = function.user_id
            WHERE function.e = true;
        `);

        res.json(users.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//------------------------------------------------------------------------------------------------------


async getUsersF(req, res) {
    try {
        const users = await db.query(`
            SELECT users.id, users.name
            FROM users
            JOIN function ON users.id = function.user_id
            WHERE function.f = true;
        `);

        res.json(users.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//------------------------------------------------------------------------------------------------------


async getUsersG(req, res) {
    try {
        const users = await db.query(`
            SELECT users.id, users.name
            FROM users
            JOIN function ON users.id = function.user_id
            WHERE function.g = true;
        `);

        res.json(users.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//------------------------------------------------------------------------------------------------------


async getUsersH(req, res) {
    try {
        const users = await db.query(`
            SELECT users.id, users.name
            FROM users
            JOIN function ON users.id = function.user_id
            WHERE function.h = true;
        `);

        res.json(users.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//------------------------------------------------------------------------------------------------------


async info(req, res) {
    try {
        // Extract the 'id' parameter from the request query
        const userId = req.query.id;

        console.log(userId);
        // Check if 'id' parameter is provided
        if (!userId) {
            return res.status(400).json({ error: 'Bad Request - Missing id parameter' });
        }

        // Perform a database query to retrieve user information based on the provided 'id'
        
        const userInfo = await db.query(`
        SELECT users.* , function.*
        FROM users
        LEFT JOIN function ON users.id = function.user_id
        WHERE users.id = $1 AND function.b = true;
    `, [userId]);
    
    // Check if user with the provided 'id' exists
    if (userInfo.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Respond with the retrieved user information in JSON format
    res.json(userInfo.rows[0]);
    

    } catch (error) {
        // Handle errors - log the error and send a 500 Internal Server Error response
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//------------------------------------------------------------------------------------------------------
 
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


//------------------------------------------------------------------------------------------------------

  
    async getOneUser(req, res){
        try {
            // Extract the 'id' parameter from the request query
            const userId = req.query.id;
    
            console.log(userId);
            // Check if 'id' parameter is provided
            if (!userId) {
                return res.status(400).json({ error: 'Bad Request - Missing id parameter' });
            }
    
            // Perform a database query to retrieve user information based on the provided 'id'
            
            const userInfo = await db.query(`
            SELECT users.name , users.surname, users.email
            FROM users
            WHERE users.id = $1;
        `, [userId]);
        
        // Check if user with the provided 'id' exists
        if (userInfo.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Respond with the retrieved user information in JSON format
        res.json(userInfo.rows[0]);
        
    
        } catch (error) {
            // Handle errors - log the error and send a 500 Internal Server Error response
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

//------------------------------------------------------------------------------------------------------

    async login(req, res){
        try{
            const{  email, password } =  req.body;

            let heshpassword = '';
            
            heshpassword = brcypt.hashSync(password, 5);

            console.log(heshpassword);
            


        
            const users1 = await db.query(`
                SELECT users.password, users.id
                FROM users
                WHERE  email = $1;`,
            [email]);

           const ps=users1.file.password;
           const id=users1.file.id;

           console.log(ps);
           console.log(heshpassword);

           if(ps === heshpassword){
            res.json(id);
           }
        }
        catch(e){
            console.log(e)
            res.status(401).json({message:'парол же Email ката'})
        }
    }



    //------------------------------------------------------------------------------------------------------

    async apdateUser(req, res){
        
    }

    async deleteUser(req, res){
        
    }

    async database(id, path) {

        
    }

}

module.exports = new UsersController()