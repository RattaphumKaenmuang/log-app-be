import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

const app = express();

const PORT = 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Docs',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.send('bruh');
})

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Hello World endpoint
 *     responses:
 *       200:
 *         description: Returns Hello World
 */
app.get('/api/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})