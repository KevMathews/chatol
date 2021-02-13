const Blog = require('../models/blog');
const express = require('express');
const blogRouter = express.Router();
// INDUCES
// -- new goes bye bye
// -- edit goes bye bye
// CRUD
// Create
blogRouter.post('/', async (req, res)=> {
    try {
        const newBlogPost = await Blog.create(req.body);
        res
          .status(200)
          .json(newBlogPost)
    } catch (error){
        res
          .status(400)
          .json(error)
    }
})
// Read 
/* Index */
blogRouter.get('/', async (req, res) => {
  try {
    const foundBlogs = await Blog.find({})
    res
      .status(200)
      .json(foundBlogs)
  } catch (error) {
    res
      .status(400)
      .json(error)
  }
})
/* Show */
blogRouter.get('/:id', async (req, res) => {
    try {
        const foundBlog = await Blog.findById(req.params.id)
        await foundBlog.execPopulate('comments')
        res
          .status(200)
          .json(foundBlog)
    } catch (error) {
        res 
          .status(400)
          .json(error)
    }
})
// Destroy
blogRouter.delete('/:id', async (req, res) => {
    try {
        const foundBlog = await Blog.findByIdAndDelete(req.params.id)
        res
          .status(200)
          .json(foundBlog)
    } catch (error) {
        res 
          .status(400)
          .json(error)
    }
})
// Update
blogRouter.put('/:id', async (req, res) => {
    try {
        const foundBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true } )
         res
          .status(200)
          .json(foundBlog)
    } catch (error) {
        res 
          .status(400)
          .json(error)
    }
})
module.exports = blogRouter;