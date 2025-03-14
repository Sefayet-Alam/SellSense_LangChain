import { useEffect, useState } from "react"; 
import axios from "axios";
import "./Reviews.css"; // Import the CSS file

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [overallReview, setOverallReview] = useState("");

  useEffect(() => {
    // Fetch all reviews
    axios.get("http://localhost:5001/api/reviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });

    // Fetch overall review
    axios.get("http://localhost:5001/api/reviews/overall")
      .then((response) => {
        setOverallReview(response.data.overallReview);
      })
      .catch((error) => {
        console.error("Error fetching overall review:", error);
      });
  }, []);

  // Function to format review text
  const formatReviewText = (text) => {
    return text.split("\n").map((line, index) => {
      const parts = line.split(":"); // Splitting by ":" to identify key points
      if (parts.length > 1) {
        return (
          <p key={index}>
            <strong>{parts[0]}:</strong> {parts.slice(1).join(":")}
          </p>
        );
      }
      return <p key={index}>{line}</p>;
    });
  };

  return (
    <div className="reviews-container">
      <div className="text-center">
        <h2 className="mb-4">Customer Reviews</h2>
        <div className="row justify-content-center">
          {reviews.map((review, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="styled-review-card">
                <p><strong>Customer ID:</strong> {review.customer_id}</p>
                <div className="formatted-review">
                  {formatReviewText(review.summary)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Review Section */}
        {overallReview && (
          <div className="overall-review-container">
            <h3 className="overall-title">Overall Customer Satisfaction</h3>
            <div className="styled-review-card overall-review-card">
              <div className="formatted-review">
                {formatReviewText(overallReview)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
