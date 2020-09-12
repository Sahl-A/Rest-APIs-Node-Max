exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: new Date().toDateString(),
        title: "First post",
        content: "This is the content of the first post",
        creator: {
          name: 'sahl',
        },
        imageUrl: 'images/Mongo.jpg',
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: "Post created successfully",
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: {
        name: "sahl",
      },
      createdAt: new Date(),
    },
  });
};
