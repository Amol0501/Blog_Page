const express = require('express');
const { connectDB } = require('./connection');
const BlogPost = require('./models/BlogPost');
const cors = require('cors');
const app = express();
const port = 5000;

connectDB()
  .then(() => {
    console.log('Connected to the database');
    app.use(express.json());
    app.use(cors());

    // -------------------------post a blog --------------------------
    app.post('/post-blog', async (req, res) => {
      let blog = new BlogPost({
        title: req.body.title,
        description: req.body.description
      });
      
      await blog.save();
      res.json({ message: 'Blog post Save successfully' });
    });
    
    // -------------------------get a blog --------------------------
    
    app.get('/get-blog', async (req, res) => {
      let blogs = await BlogPost.find();
      if(!blogs){
        res.status(404).json({message:"Blog not found"})
      }
      res.json({blogs});
    })

    // -------------------------delete a blog --------------------------
    
    app.delete('/delete-blog/:id', async (req, res) => {
      let blogs = await BlogPost.findByIdAndDelete(req.params.id);
      if(!blogs){
        res.status(404).json({message:"Blog not found"});
      }
      res.status(200).json({message: "Blog deleted successfully"});
    })
    
    // -------------------------update a blog --------------------------
    
    app.put('/update-blog/:id', async (req, res) => {
      let blog = await BlogPost.findByIdAndUpdate(req.params.id);
      if(!blog){
        res.status(404).json({message:"Blog not found"});
      }
      
      if(!req.body.title && !req.body.description){
        res.json({message: "Please Enter title or description"});
      }
      else if(!req.body.title){
        blog.description = req.body.description;
      }
      else if(!req.body.description){
        blog.title = req.body.title;
      }
      else{
        blog.title = req.body.title;
        blog.description = req.body.description;
      }

      await blog.save();
      res.status(200).json({message : "Blog successfully updated", blog});
    })


    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
