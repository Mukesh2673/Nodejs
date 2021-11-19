
const auth=require('./routes/auth');
const post=require('./routes/post');
const express = require('express');
const app = express();
app.use(express.json())
app.use("/auth",auth);
app.use("/posts",post);
const port=5001
app.listen(port, () => {
    console.log(`Authentication service started on port ${port}`);
});

