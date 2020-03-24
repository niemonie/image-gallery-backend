const fetch = require("node-fetch");

exports.list_all_images = async function (req, res) {
  const limit = req.query.limit || 3;
  const page = req.query.page || 1;
  const offset = (page - 1) * limit;

  const data = await Promise.all([
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.query.q}&limit=${limit}&offset=${offset}`
    )
      .then((response) => response.json())
      .then((data) =>
          ({
              giphyCollection: {
                  meta: { total: data.pagination.total_count },
                  images: data.data.map((giphy) => ({
                      title: giphy.title,
                      url: giphy.images.fixed_width.url,
                  })),
              },
          }))
      .then((data) => (data )),
    fetch(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${req.query.q}&per_page=${limit}&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => ({
        imageCollection: {
          meta: { total: data.total },
          images: data.hits.map((image) => ({
            title: image.tags,
            url: image.userImageURL,
          })),
        },
      }))
      .then((data) => data),
  ]);
  res.json({ ...data[0], ...data[1] });
};


