exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        title: 'NBA champion',
        content: 'Nuggets win 2023 NBA Champion!'
      },
      {
        title: '2023 NBA Final MVP',
        content: 'Jokic win 2023 NBA Final MVP'
      }
    ]
  })
};

exports.createPosts = (req, res, next) => {
  const { title, content } = req.body;

  //TODO: persistance to mongodb
  res.status(201).json({
    message: 'Post create successfully',
    post: {
      id: new Date().toISOString(),
      title,
      content
    }
  })
};