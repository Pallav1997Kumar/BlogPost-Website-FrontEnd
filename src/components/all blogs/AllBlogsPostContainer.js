import { Link } from "react-router-dom";

import moment from "moment";

import "../../style/all blogs/AllBlogsPostContainer.scss";

import backendBaseURL from "../../backendBaseURL.js";


function AllBlogsPostContainer(props) {
	const post = props.post;

	//Function to get Plain Text from HTML Text
	function getPlainText(htmlText) {
		const doc = new DOMParser().parseFromString(htmlText, "text/html");
		return doc.body.textContent;
	}

	return (
		<div className="post-container" id={post.postID}>
			<div className="post-desc">
				<Link className="heading-title" to={`/blogs/postId/${post.postID}`}>
					<h1>{post.postTitle}</h1>
				</Link>
				<div className="username-posttime">
					<div className="user-name">
						Author:{" "}
						<Link
							to={`/blogs/username/${post.username}`}
							className="user-click"
						>
							{post.userFullName}
						</Link>
					</div>
					<div className="post-time">
						Posted {moment(post.postDateTime).fromNow()}
					</div>
				</div>
				<div className="category-name">
					Category:{" "}
					<Link
						to={`/blogs/category/${post.categoryName
							.toLowerCase()
							.replaceAll(" ", "_")}_blogs`}
						className="category-click"
					>
						{post.categoryName}
					</Link>
				</div>
				<div className="post-description">
					{getPlainText(post.postDescription).length > 900 ? (
						<p>
							{getPlainText(post.postDescription).slice(0, 900)}...{" "}
							<Link to={`/blogs/postId/${post.postID}`} className="read-more">
								Read More
							</Link>
						</p>
					) : (
						<p>{getPlainText(post.postDescription)}</p>
					)}
				</div>
			</div>
			<div className="post-image">
				<img
					src={`${backendBaseURL}/uploads/blogImage/${post.postImage}`}
				/>
			</div>
		</div>
	);
}

export default AllBlogsPostContainer;
