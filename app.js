const express = require("express"); //Esta importando express
const app = express(); //Creando el servidor
const port = 3000; //Puerto de pruebas

const books = require("./data/books.json");

//Habilitar recepción de JSON por mi backend
//Parsear el body entrante al JSON, es como una traducción
app.use(express.json());


// 1. Crea una ruta /all para obtener todos los libro
app.get("/books", (req, res) => {
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
app.get("/author/dante-alighieridle", (req, res) => {
  const bookDante = books.find(b => b.author.toLowerCase() === "dante alighieri");
  if(bookDante) {
    res.json(bookDante);
  } else {
    res.status(404).json({ message: "Libro no encontrado" });
  }
});


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});