import { useNavigate } from "react-router-dom";

import "../../style/blog home/BlogPostCard.scss";

import Card from "react-bootstrap/Card";


function BlogPostCard(props) {
	const navigate = useNavigate();

	const text = getPlainText(props.description);
	//Function to get Plain Text from HTML Text
	function getPlainText(htmlText) {
		const doc = new DOMParser().parseFromString(htmlText, "text/html");
		return doc.body.textContent;
	}

	let newText;
	if (text.length > 220) {
		newText = text.slice(0, 220).concat("...");
	} else {
		newText = text;
	}

	function linkClickHandler() {
		navigate(`/blogs/postId/${props.id}`);
	}

	return (
		<Card style={{ width: "100%" }}>
			<Card.Img className="card-image" src={props.image} />
			<div className="card-body">
				<Card.Title className="card-title">{props.title}</Card.Title>
				<Card.Subtitle className="card-subtitle">
					Author Name: {props.authorName}
				</Card.Subtitle>
				<Card.Text className="card-text">{newText}</Card.Text>
				<div className="card-link">
					<Card.Link onClick={linkClickHandler}>View Post</Card.Link>
				</div>
			</div>
		</Card>
	);
}

export default BlogPostCard;
