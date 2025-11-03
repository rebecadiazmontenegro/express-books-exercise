const express = require("express"); //Esta importando express
const app = express(); //Creando el servidor
const port = 3000; //Puerto de pruebas

const books = require("./data/books.json");

//Habilitar recepción de JSON por mi backend
//Parsear el body entrante al JSON, es como una traducción
app.use(express.json());


// 1. Crea una ruta /all para obtener todos los libro

    app.get("/all", (req, res) => {
    res.json(books); 
    });
    console.log("Número de libros cargados:", books.length); // Para asegurarme de que me estan cargando todos los libros


// 2. Crea una ruta /first para obtener el primer libro

    app.get("/first", (req, res) => {
    const firstBook = books[0];
    console.log("Primer libro:", firstBook);
    res.json(firstBook);
    });

// 3. Crea una ruta /last para obtener el último libro

    app.get("/last", (req, res) => {
    const lastBook = books[99];
    console.log("Ultimo libro:", lastBook);
    res.json(lastBook);
    });

// 4. Crea una ruta /middle para obtener el libro en la mitad (número 50 en el array)

    app.get("/middle", (req, res) => {
    const middleBook = books[50];
    console.log("Libro del medio:", middleBook);
    res.json(middleBook);
    });

// 5. Crea una ruta /author/dante-alighieri para obtener SÓLO EL TÍTULO del libro de Dante Alighieri

    app.get("/author/dante-alighieri", (req, res) => {
    const bookDante = books.find(b => b.author.toLowerCase() === "dante alighieri");
    if(bookDante) {
        res.json(bookDante.title);
    } else {
        res.status(404).json({ message: "Libro no encontrado" });
    }
    });

// 6.Crea una ruta /country/charles-dickens para obtener SÓLO EL PAÍS del libro de Charles Dickens

    app.get("/country/charles-dickens", (req, res) => {
    const bookCharles = books.find(b => b.author.toLowerCase() === "charles dickens");
    if(bookCharles) {
        res.json(bookCharles.country);
    } else {
        res.status(404).json({ message: "Libro no encontrado" });
    }
    });

// 7.Crea una ruta /year&pages/cervantes para obtener LAS PÁGINAS Y EL AÑO del libro de Miguel de Cervantes, Ejemplo de respuesta: { pages: ..., year: ... }

   app.get("/year&pages/cervantes", (req, res) => {
    const bookMiguel = books.find(b => b.author.toLowerCase() === "miguel de cervantes");
    if(bookMiguel) {
       res.json({ pages: bookMiguel.pages, year: bookMiguel.year });
    } else {
        res.status(404).json({ message: "Libro no encontrado" });
    }
    });

// 8. Crea una ruta /country/count/spain para obtener EL NÚMERO DE LIBROS de España

   app.get("/country/count/spain", (req, res) => {
    const booksSpain = books.filter(b => b.country.toLowerCase() === "spain");
    if(booksSpain) {
       res.json(booksSpain.length);
    } else {
        res.status(404).json({ message: "Libro no encontrado" });
    }
    });

// 9. Crea una ruta /country/at-least/germany para obtener VERDADERO O FALSO dependiendo de si hay o no un libro de Alemania

    app.get("/country/at-least/germany", (req, res) => {
    // Comprueba si hay al menos un libro de Alemania
    const hasGermanyBook = books.some(b => b.country.toLowerCase() === "germany");
    res.json(hasGermanyBook);
    });


// 10. Crea una ruta /pages/all-greater/200 para obtener VERDADERO O FALSO dependiendo de si todos los libros tienen más de 200 páginas

    app.get("/pages/all-greater/200", (req, res) => {
    // Comprueba si todos los libros tienen más de 200 páginas
    const allGreater = books.every(b => b.pages > 200);
    res.json(allGreater);
    });

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});