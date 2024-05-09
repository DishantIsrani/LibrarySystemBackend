const express = require('express');
const mongoose = require('mongoose');
const User = require('./user.js');
const Book = require('./bookSchema.js');


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


const mongouri = 'mongodb+srv://KoachLibrary:KoachLibrary@cluster0.nbrenlw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


mongoose.connect(mongouri)
    .then(() => console.log('Connected to database'))
    .catch((err) => console.error('Database connection error:', err));


app.post('/api/create-user', async (req, res) => {
    const { useremail, username, password } = req.body;
    try {
        const existinguser = await User.findOne({ useremail });
        if (existinguser) {
            return res.status(400).json({ error: 'User already exists' });
        } else {
            const newUser = new User({ useremail, username, password });
            await newUser.save();

            res.status(201).json(newUser);
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/api/add-books', async (req, res) => {
    const { title, author, genre } = req.body;
    try {
        const existingbooks = await User.findOne({ title });
        if (existingbooks) {
            return res.status(400).json({ error: 'Book is alredy in the library' });
        } else {
            const newBook = new Book({ title, author, genre });
            await newBook.save();

            res.status(201).json(newBook);
        }
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});








app.get('/', (req, res) => {
    res.send('Hello World from Node.js server!');
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});



app.get('/api/get-userdetails/', async (req, res) => {
    try {
        const userresponse = await User.find();
        res.json(userresponse);
    } catch (error) {
        console.error('Error getting all the users detials', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/get-userdetails/:id', async (req, res) => {
    const userid = req.params.id;

    try {
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error getting user', error);
        res.status(500).json({ error: 'Internal server error' });
    }

});


app.get('/api/get-books', async (req, res) => {
    try {
        const booksresponse = await Book.find();
        res.json(booksresponse);
    } catch (error) {
        console.error('Error getting all the books', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/api/get-books/:id', async (req, res) => {
    const booksid = req.params.id;

    try {
        const book = await Book.findById(booksid);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('Error getting book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.put('/api/updatebook/:id', async (req, res) => {
    const updateid = req.params.id;
    const { title, author, genre } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(updateid, { title, author, genre }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/delete-books/:id', async (req, res) => {
    const deleteid = req.params.id;

    try {
        const deletedBook = await Book.findByIdAndDelete(deleteid);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});