const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const uuid = require('uuid/v4');
const fs = require('fs');

const app = express();

app.use('/', express.static('src'));
app.use('/signIn', express.static('src'));
app.use('/signUp', express.static('src'));
app.use('/singleplayer', express.static('src'));

app.use(body.json());
app.use(cookie());

const users = {
    'test': {
        login: 'test',
        email: 'test@apoj.ru',
        password: 'Password1',
        singleScore: 0
    }
};

const ids = {};

const music = [
    'badtrip',
    'Владимирский централ'
];

function isAuth(id) {
    return ids[id] !== undefined;
}

app.post('/signup', (req, res) => {
    const login = req.body.login;
    const email = req.body.email;
    const password = req.body.password;

    if (!users[login]) {
        users[login] = {
            'login': login,
            'email': email,
            'password': password,
            'singleScore': 0
        };
    } else {
        return res.status(400).json({message: 'Логин или Email уже существует'});
    }
    const id = uuid();
    ids[id] = {
        'login': login
    };

    res.cookie('auth', id, {expires: new Date(Date.now() + (1000 * 60 * 10))});
    res.status(201).json(users[login]);
});

app.post('/signin', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    if (!users[login] || users[login].password !== password) {
        return res.status(400).json({message: 'Не верный Логин и/или пароль'});
    }

    const id = uuid();
    ids[id] = {
        'login': login
    };

    res.cookie('auth', id, {expires: new Date(Date.now() + (1000 * 60 * 10))});
    res.status(200).json(users[login]);
});

app.get('/users', (req, res) => {
    const userlist = Object.keys(users)
        .map(login => {
            return {
                'login': login,
                'email': users[login].email,
                'singleScore': users[login].singleScore
            };
        });

    res.json(userlist);
});

app.get('/user', (req, res) => {
    const id = req.cookies.auth;
    if (!isAuth(id)) {
        return res.status(401).end();
    }

    const login = ids[id].login;
    res.json(users[login]);
});

app.post('/logout', (req, res) => {
    const id = req.cookies.auth;
    if (!isAuth(id)) {
        return res.status(401).end();
    }

    res.cookie('auth', '', {expires: new Date()});
    res.json({});
});

app.get('/music', (req, res) => {
    const id = req.cookies.auth;

    const fileId = Math.floor(Math.random() * Object.keys(music).length);
    const title = music[fileId];
    const file = `${__dirname}/../src/static/music/${title}.mp3`;

    fs.exists(file, exists => {
        if (exists) {
            const rstream = fs.createReadStream(file);

            ids[id].music = fileId;

            rstream.pipe(res);
        } else {
            res.send('Something wrong');
            res.end();
        }
    });
});

app.post('/music', (req, res) => {
    const id = req.cookies.auth;

    const fileId = ids[id].music;
    const title = req.body.title;

    const json = {
        message: 'wrong'
    };

    if (fileId === undefined || title === undefined) {
        return res.status(400).json(json).end();
    }

    if (music[fileId].toLowerCase() === title.toLowerCase()) {
        const login = ids[id].login;

        json.message = 'right';
        json.score = ++users[login].singleScore;
    }

    delete ids[id].music;
    res.json(json);
});

app.get('*', (req, res) => {
    res.send('404');
});

app.listen(process.env.PORT || '8080', () => {
    console.log(`port: ${process.env.PORT || '8080'}`);
});
