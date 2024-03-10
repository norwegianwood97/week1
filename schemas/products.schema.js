// schemas/products.schema.js

import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
    name: { // 상품명
        type: String,
        required: true,
    },
    description: { // 작성 내용
        type: String,
        required: true,
    },
    author: { // 작성자명
        type: String,
        required: true,
    },
    password: { // 비밀번호
        type: String,
        required: true,
    },
    status: { // 상품 상태
        type: String,
        required: true,
        default: 'FOR_SALE', // 기본값 FOR_SALE
        enum: ['FOR_SALE', 'SOLD_OUT'] // 허용되는 값
    },
    createdAt: { // 작성 날짜
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Product', productsSchema);
