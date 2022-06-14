const mongoose = require('mongoose');
const Product = require('./models/products');

async function main(){
    await mongoose.connect('mongodb://localhost:27017/farmStand');
    console.log('MONGO CONNECTION OPEN!');
}
main().catch(err=>{ 
    console.log('OHHH ON MONGO CONNECTION ERROR!')
    console.log(err)
});

// const p = new Product({
//     name: 'Pineapple',
//     price: 1.45,
//     category: 'fruit'
// })
// p.save()
// .then(p=>{
//     console.log(p);
// })
// .catch(e=>{
//     console.log(e)
// })

const seedProducts = [
    {
        name: 'FairyEggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goodness Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
.then(res=>{
    console.log(res);
})
.catch(err=>{
    console.log(err);
})


