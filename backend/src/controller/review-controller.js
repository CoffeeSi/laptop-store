import Review from "../model/review-model.js"

export const addReview = async (req, res, next) => {
  try {
    const { rating, comment, laptop_id, user_id } = req.body

    if (!rating || !comment) {
      return res.status(400).json({ message: "bad data" })
    }

    const review = new Review({
      rating,
      comment,
      laptop_id,
      user_id
    })

    await review.save()
    res.status(201).json(review)

  } catch (err) {
    next(err)
  }
}

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate("user_id")
      .populate("laptop_id")
    res.json(reviews)
  } catch (err) {
    next(err)
  }
}
