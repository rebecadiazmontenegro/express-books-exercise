const express = require("express"); //Esta importando express
const app = express(); //Creando el servidor
const port = 3000; //Puerto de pruebas

const { swaggerUi, swaggerSpec } = require("./swagger");

const books = require("./data/books.json");

//Habilitar recepción de JSON por mi backend
//Parsear el body entrante al JSON, es como una traducción
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /all:
 *   get:
 *     summary: Obtiene todos los libros
 *     responses:
 *       200:
 *         description: Lista completa de libros
 */
app.get("/all", (req, res) => {
  res.json(books);
});
console.log("Número de libros cargados:", books.length); // Para asegurarme de que me estan cargando todos los libros

/**
 * @swagger
 * /first:
 *   get:
 *     summary: Obtiene el primer libro
 *     responses:
 *       200:
 *         description: Primer libro del array
 */
app.get("/first", (req, res) => {
  const firstBook = books[0];
  console.log("Primer libro:", firstBook);
  res.json(firstBook);
});

/**
 * @swagger
 * /last:
 *   get:
 *     summary: Obtiene el último libro
 *     responses:
 *       200:
 *         description: Último libro del array
 */
app.get("/last", (req, res) => {
  const lastBook = books[99];
  console.log("Ultimo libro:", lastBook);
  res.json(lastBook);
});

/**
 * @swagger
 * /middle:
 *   get:
 *     summary: Obtiene el libro central (posición 50)
 *     responses:
 *       200:
 *         description: Libro del medio
 */
app.get("/middle", (req, res) => {
  const middleBook = books[50];
  console.log("Libro del medio:", middleBook);
  res.json(middleBook);
});

/**
 * @swagger
 * /author/dante-alighieri:
 *   get:
 *     summary: Obtiene el título del libro de Dante Alighieri
 *     responses:
 *       200:
 *         description: Título del libro
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Libro no encontrado
 */
app.get("/author/dante-alighieri", (req, res) => {
  const bookDante = books.find(
    (b) => b.author.toLowerCase() === "dante alighieri"
  );
  if (bookDante) {
    res.json(bookDante.title);
  } else {
    res.status(404).json({ message: "Libro no encontrado" });
  }
});

/**
 * @swagger
 * /country/charles-dickens:
 *   get:
 *     summary: Obtiene el país del libro de Charles Dickens
 *     responses:
 *       200:
 *         description: País del libro
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Libro no encontrado
 */
app.get("/country/charles-dickens", (req, res) => {
  const bookCharles = books.find(
    (b) => b.author.toLowerCase() === "charles dickens"
  );
  if (bookCharles) {
    res.json(bookCharles.country);
  } else {
    res.status(404).json({ message: "Libro no encontrado" });
  }
});

/**
 * @swagger
 * /year&pages/cervantes:
 *   get:
 *     summary: Obtiene año y páginas del libro de Miguel de Cervantes
 *     responses:
 *       200:
 *         description: Año y número de páginas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pages:
 *                   type: integer
 *                 year:
 *                   type: integer
 *       404:
 *         description: Libro no encontrado
 */
app.get("/year&pages/cervantes", (req, res) => {
  const bookMiguel = books.find(
    (b) => b.author.toLowerCase() === "miguel de cervantes"
  );
  if (bookMiguel) {
    res.json({ pages: bookMiguel.pages, year: bookMiguel.year });
  } else {
    res.status(404).json({ message: "Libro no encontrado" });
  }
});

/**
 * @swagger
 * /country/count/spain:
 *   get:
 *     summary: Obtiene el número de libros de España
 *     responses:
 *       200:
 *         description: Número de libros españoles
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 */
app.get("/country/count/spain", (req, res) => {
  const booksSpain = books.filter((b) => b.country.toLowerCase() === "spain");
  if (booksSpain) {
    res.json(booksSpain.length);
  } else {
    res.status(404).json({ message: "Libro no encontrado" });
  }
});

/**
 * @swagger
 * /country/at-least/germany:
 *   get:
 *     summary: Comprueba si existe algún libro de Alemania
 *     responses:
 *       200:
 *         description: true o false
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 */
app.get("/country/at-least/germany", (req, res) => {
  // Comprueba si hay al menos un libro de Alemania
  const hasGermanyBook = books.some(
    (b) => b.country.toLowerCase() === "germany"
  );
  res.json(hasGermanyBook);
});

/**
 * @swagger
 * /pages/all-greater/200:
 *   get:
 *     summary: Comprueba si todos los libros tienen más de 200 páginas
 *     responses:
 *       200:
 *         description: true o false
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 */
app.get("/pages/all-greater/200", (req, res) => {
  // Comprueba si todos los libros tienen más de 200 páginas
  const allGreater = books.every((b) => b.pages > 200);
  res.json(allGreater);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
