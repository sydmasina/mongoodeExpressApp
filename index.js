const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require('./AppError');

const Product = require('./models/products');

async function main(){
    await mongoose.connect('mongodb://localhost:27017/farmStand');
    console.log('MONGO CONNECTION OPEN!');
}
main().catch(err=>{ 
    console.log('OHHH ON MONGO CONNECTION ERROR!')
    console.log(err)
});


app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.get('/products', async (req, res)=>{
    const products = await Product.find({})
    res.render('index', {products});
})

app.get('/show/:id', async(req, res)=>{
    const id = req.params.id;
    const product = await Product.findById(`${id}`);
    res.render('products/show', {product});
})

app.get('/edit/:id', async(req, res)=>{
    const id = req.params.id;
    const product = await Product.findById(`${id}`);
    res.render('products/edit', {product});
})

app.put('/edit/:id', async (req, res)=>{
    const id = req.params.id;
    const productUpdate = req.body;
    Product.findByIdAndUpdate(id , productUpdate).then(p=>{
        res.redirect(`/show/${id}`);
    });
    

})

app.delete('/products/:id', (req, res)=>{
    const id = req.params.id;
    Product.findByIdAndRemove(id).then(()=>{
        res.redirect(`/products`)
    })
})

app.get('/new', (req, res)=>{
    res.render('products/new')
})

app.post('/products', async (req,res)=>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect('/products');
})

app.use((err, req, res, next)=>{
    const {status = 500, message = 'Something went wrong'}= err;
    res.status(status).send(message)
})

app.listen(3000, ()=>console.log('Listening on port 3000!'));