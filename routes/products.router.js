// routes/products.router.js
import express from 'express';
import Product from '../schemas/products.schema.js';
import Joi from 'joi';

const router = express.Router();


const createProductSchema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    password: Joi.string().required(),
});

// 상품 작성 API
router.post('/products', async (req, res, next) => {
    try {
        const { name, description, author, password } = req.body;
        const product = new Product({
            name,
            description,
            author,
            password,
            status: 'FOR_SALE', // 기본 상태 FOR_SALE
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
});


// 상품 목록 조회 API
router.get('/products', async (req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

// 상품 상세 조회 API
router.get('/products/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: '상품 조회에 실패하였습니다.' });
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

// 상품 정보 수정 API
router.patch('/products/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { name, description, status, password } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: '상품 조회에 실패하였습니다.' });
        }

        if (product.password !== password) {
            return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.status = status || product.status;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

// 상품 삭제 API
router.delete('/products/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { password } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: '상품 조회에 실패하였습니다.' });
        }

        if (product.password !== password) {
            return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
        }

        await Product.deleteOne({ _id: productId });
        res.status(200).json({ message: '제품이 삭제되었습니다.' });
    } catch (error) {
        next(error);
    }
});


export default router;
