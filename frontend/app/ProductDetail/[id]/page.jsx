"use client"; // Required for components using hooks

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Istok_Web } from 'next/font/google';
import Cookies from "js-cookie"; // Import js-cookie
const token = Cookies.get("token");

const istokweb = Istok_Web({
  weight: ['400', '700'],
  subsets: ['latin'],
});

// Star Rating Component
const StarRating = ({ rating }) => {
  const totalStars = 5;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      <span key={i} style={i <= rating ? filledStarStyle : emptyStarStyle}>
        ★
      </span>
    );
  }

  return <div>{stars}</div>;
};

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const { id: productId } = useParams();

  useEffect(() => {
  //   const fetchProductData = async () => {
  //     if (productId) {
  //       try {
  //         const productResponse = await fetch(
  //           `${process.env.NEXT_PUBLIC_URL_HOST}/view-product/${productId}`
  //         );
  //         const productData = await productResponse.json();
  //         setProduct(productData.product);

  //         const reviewsResponse = await fetch(
  //           `${process.env.NEXT_PUBLIC_URL_HOST}/reviews/${productId}`
  //         );
  //         const reviewsData = await reviewsResponse.json();
  //         setReviews(reviewsData.reviews);

  //         const ratingResponse = await fetch(
  //           `${process.env.NEXT_PUBLIC_URL_HOST}/average-rating/${productId}`
  //         );
  //         const ratingData = await ratingResponse.json();
  //         setAverageRating(ratingData.averageRating);
  //       } catch (error) {
  //         console.error("Error fetching product data:", error);
  //       }
  //     }
  //   };

  //   fetchProductData();
  // }, [productId]);
  const fetchProductData = async () => {
    if (productId) {
      try {
        const productResponse = await fetch(
          `${process.env.NEXT_PUBLIC_URL_HOST}/view-product/${productId}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`, // Send token in the headers
              "Content-Type": "application/json",
            },
          }
        );
        const productData = await productResponse.json();
        setProduct(productData.product);

        const reviewsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_URL_HOST}/reviews/${productId}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`, // Send token in the headers
              "Content-Type": "application/json",
            },
          }
        );
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData.reviews);

        const ratingResponse = await fetch(
          `${process.env.NEXT_PUBLIC_URL_HOST}/average-rating/${productId}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`, // Send token in the headers
              "Content-Type": "application/json",
            },
          }
        );
        const ratingData = await ratingResponse.json();
        setAverageRating(ratingData.averageRating);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
  };

  fetchProductData();
}, [productId]);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_HOST}/cart/add`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
 
          },
          body: JSON.stringify({
            productId: product._id,
            imageURL: product.imageUrl,
            price: product.price,
            title: product.title,
            quantity: quantity,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`${quantity} item(s) of ${product.title} added to cart.`);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred while adding to the cart.");
    }
  };

  const handleAddReview = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_HOST}/add-review`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            comment,
            rating,
          }),
        }
      );

      if (response.ok) {
        alert("Review added successfully!");
        setComment("");
        setRating(5);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding review:", error);
      alert("An error occurred while adding the review.");
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div style={containerStyle}>
      {/* Product Image */}
      <div style={imageContainerStyle}>
        <img src={product.imageUrl} alt={product.title} style={imageStyle} />
      </div>

      {/* Product Information */}
      <div style={detailsContainerStyle}>
        <h1>{product.title}</h1>
        <p style={descriptionContainerStyle}>
          <strong>{product.description}</strong>
        </p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 style={prePriceStyle}>Price</h1>
          <p style={priceStyle}>
            <strong>₹{product.price}</strong>
          </p>
        </div>

        {/* Average Rating */}
        <div style={averageRatingStyle}>
          <StarRating rating={averageRating} />{" "}
          <span style={averageRatingTextStyle}>({averageRating}/5)</span>
        </div>

        <div style={{ display: "flex", gap: "10px", height: "50px" }}>
          {/* Quantity Selector */}
          <div style={quantitySelectorStyle}>
            <button
              onClick={() => handleQuantityChange(-1)}
              style={quantityButtonStyle}
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              style={quantityInputStyle}
            />
            <button
              onClick={() => handleQuantityChange(1)}
              style={quantityButtonStyle}
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button onClick={handleAddToCart} style={ProductDetailStyle}>
            ADD TO CART
          </button>
        </div>
        <div style={{fontSize: "16px", fontFamily: '"Istok Web"',}}>
          {/* Reviews */}
          <div style={reviewSectionStyle}>
            <h2>Reviews:</h2>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} style={reviewCardStyle}>
                  <StarRating rating={review.rating} />
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
          {/* Add a Review Form */}
          <div style={addReviewStyle}>
            <h2>Add a Review:</h2>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              style={textareaStyle}
            />
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              style={ratingInputStyle}
            />
            <button onClick={handleAddReview} style={ProductDetailStyle}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles (updated for better alignment)
const containerStyle = {
  position: "relative",
  marginLeft: "250px",
  marginTop: "87px",
  display: "flex",
  padding: "20px",
  maxWidth: "100%",
  // zIndex: "-1",
  minHeight: "100vh",
  backgroundColor: "#1C1C1C",
};

const imageContainerStyle = {
  width: "40%",
};

const imageStyle = {
  width: "100%",
  borderRadius: "10px",
};

const detailsContainerStyle = {
  width: "55%",
  padding: "10px",
  fontFamily: "Outfit",
  fontSize: "46px",
  fontWeight: "900",
  color: "#EBEBEB",
};

const descriptionContainerStyle = {
  marginTop: "20px",
  color: "#EBEBEB9C",
  fontFamily: "Istok Web",
  fontSize: "13px",
  lineHeight: "18px",
};

const prePriceStyle = {
  fontFamily: "Istok Web",
  fontSize: "16px",
  color: "#9A9A9A",
};

const priceStyle = {
  marginLeft: "10px",
  fontFamily: "Outfit",
  fontSize: "29px",
  color: "#EBEBEB",
  fontWeight: "900",
};

const averageRatingStyle = {
  display: "flex",
  alignItems: "center",
  margin: "20px 0",
};

const averageRatingTextStyle = {
  marginLeft: "10px",
  fontSize: "16px",
  color: "#EBEBEB",
};

const quantitySelectorStyle = {
  display: "flex",
  alignItems: "center",
  border: "2px solid #333333",
  borderRadius: "9px",
  width: "126px",
};

const quantityButtonStyle = {
  backgroundColor: "#1C1C1C",
  color: "#EBEBEB9C",
  padding: "10px",
  cursor: "pointer",
  fontSize: "20px",
};

const quantityInputStyle = {
  textAlign: "center",
  width: "40px",
  backgroundColor: "#1C1C1C",
  border: "none",
  color: "#EBEBEB9C",
  fontSize: "21px",
};

const ProductDetailStyle = {
  backgroundColor: "#435940",
  color: "#CEDF9F",
  border: "none",
  padding: "10px 20px",
  fontSize: "18px",
  fontWeight: "bold",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const reviewSectionStyle = {
  marginTop: "40px",
  padding: "10px",
  backgroundColor: "#2C2C2C",
  borderRadius: "10px",
};

const reviewCardStyle = {
  backgroundColor: "#333333",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "10px",
  color: "#EBEBEB",
};

const addReviewStyle = {
  marginTop: "30px",
  padding: "20px",
  backgroundColor: "#2C2C2C",
  borderRadius: "10px",
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#333333",
  color: "#EBEBEB",
  marginBottom: "10px",
  fontSize: "14px",
};

const ratingInputStyle = {
  width: "60px",
  padding: "5px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#333333",
  color: "#EBEBEB",
  marginBottom: "10px",
  fontSize: "16px",
};

const emptyStarStyle = {
  color: "#9A9A9A",
  fontSize: "20px",
};

const filledStarStyle = {
  color: "#FFD700",
  fontSize: "20px",
};

export default ProductDetail;
