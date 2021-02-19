const { Schema, model } = require('mongoose');

const blogSchema = new Schema(
	{
		name: String,
		title: String,
		body: String,
		//  below how we connect blog to comments schema
		comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
	},
	{
		timestamps: true
	}
);

const Blog = model('Blog', blogSchema);

module.exports = Blog;
