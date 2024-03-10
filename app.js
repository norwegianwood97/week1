// /app.js

import express from 'express';
import connect from './schemas/index.js';
import ProductsRouter from './routes/products.router.js';
import ErrorHandlerMiddleware from './middlewares/error-handler.middleware.js';

const app = express();
const PORT = 3001;

connect();

//미들웨어
app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
});

// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정합니다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({ message: 'Hi!' });
});

// /api 주소로 접근하였을 때, router와 ProductsRouter로 클라이언트의 요청이 전달됩니다.
app.use('/api', [ProductsRouter]);

// 에러 핸들링 미들웨어를 등록합니다.
app.use(ErrorHandlerMiddleware);

app.listen(PORT, () => {
    console.log(PORT, '포트로 서버가 열렸어요!');
});
