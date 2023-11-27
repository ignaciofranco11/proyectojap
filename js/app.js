const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const fs = require('fs');

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "planning",
    connectionLimit: 5,
});

const app = express();
const port = 3000;
const key = "key";

app.use(cors());
app.use(express.json());

const categorias = require("../json/cats/cat.json")
const users = require("../json/users/users.json")



app.get("/categorias", (req, res) => {
    res.json(categorias);
});

app.get("/catProd/:idCat", (req, res) => {
    const categoriasProd = require(`../json/cats_products/` + req.params.idCat + ".json")
    res.json(categoriasProd);
});

app.get("/productos/:idProd", (req, res) => {
    const productos = require(`../json/products/` + req.params.idProd + ".json")
    res.json(productos);
});

app.get("/comentariosProductos/:idProd", (req, res) => {
    const comentsProd = require(`../json/products_comments/` + req.params.idProd + ".json")
    res.json(comentsProd);
});


app.post("/login", (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass

    const cuerpo = {
        "user": email,
        "articles": []
    };

    for (let user of users) {
        if (user.email == email && user.pass == pass) {
            fs.writeFile(`json/user_cart/${email}.json`, JSON.stringify(cuerpo), function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
            const token = jwt.sign({ email }, key, { expiresIn: "1h" });
            res.status(200).json({ token });
            break
        } else {
            res.status(401).json({ message: "Error" });
        }
    }

});

app.use("/cart", (req, res, next) => {

    try {
        const decoded = jwt.verify(req.headers["token"], key);
        req.decoded = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }


})

app.get("/cart/:idCart", (req, res) => {
    const filePath = "../json/user_cart/" + req.params.idCart + ".json";

    // Elimina el módulo del caché antes de requerirlo nuevamente
    delete require.cache[require.resolve(filePath)];

    // Requiere el archivo actualizado
    const carrito = require(filePath);

    res.send(carrito);
});

app.post("/cart", (req, res) => {
    const email = req.body.email;
    const arreglo = req.body.articles

    const cuerpo = {
        "user": email,
        "articles": arreglo
    };
    fs.writeFile(`json/user_cart/${email}.json`, JSON.stringify(cuerpo), function (err) {
        if (err) {
            console.error('Error al guardar el carrito:', err);
            res.status(500).json({ message: "Error al actualizar el carrito" });
        } else {
            const filePath = "../json/user_cart/" + email + ".json";

            // Elimina el módulo del caché antes de requerirlo nuevamente
            delete require.cache[require.resolve(filePath)];

            // Requiere el archivo actualizado
            const carrito = require(filePath);
            res.json(carrito)
        }
    });
})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

