import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { getAllBlogPost } from "../../store/allBlogPostSlice.js";
import { getAllBlogCategory } from "../../store/allBlogCategorySlice.js";

import "../../style/single post/SinglePost.scss";

import SingleOnlyPostSection from "./SingleOnlyPostSection.js";
import CommentSection from "./CommentSection.js";


function SinglePost() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//Getting logged-in user information from Redux Store
	const user = useSelector((user) => user.userSlice.userDetail);

	//Getting All Blogs as object from Redux Store
	const blogSlice = useSelector((value) => value.blogPostsSliceName);
	const { blogPosts, loading } = blogSlice;

	//Getting Post ID from URL
	const location = useLocation();
	const pathname = location.pathname;
	const splitedArray = pathname.split("/");
	const blogPostID = splitedArray[3];

	//Getting current post details from all post details
	const singlePost = blogPosts.find(function (post) {
		return post.postID == blogPostID;
	});

	//Checking if post belongs to logged-in user
	let isUserOwnPost;
	if (user !== null && user.userID == singlePost.userID) {
		isUserOwnPost = true;
	} else {
		isUserOwnPost = false;
	}

	const indiaDateTime = new Date(singlePost.postDateTime).toLocaleString(
		undefined,
		{ timeZone: "Asia/Kolkata" }
	);
	const indianDateTime = new Date(indiaDateTime);
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const date = indianDateTime.getDate();
	const month = months[indianDateTime.getMonth()];
	const year = indianDateTime.getFullYear();
	const day = days[indianDateTime.getDay()];
	const hour = indianDateTime.getHours();
	const minute = indianDateTime.getMinutes();
	const second = indianDateTime.getSeconds();
	const millisecond = indianDateTime.getMilliseconds();
	const fullDate =
		day +
		" , " +
		date +
		" " +
		month +
		" " +
		year +
		", " +
		hour +
		":" +
		minute +
		":" +
		second +
		":" +
		millisecond;

	useEffect(
		function () {
			dispatch(getAllBlogPost());
			dispatch(getAllBlogCategory());
		},[]);

	return (
		<div className="single-post">
			<div className="post-section">
				<SingleOnlyPostSection
					singlePost={singlePost}
					blogPostID={blogPostID}
					isUserOwnPost={isUserOwnPost}
					fullDate={fullDate}
				/>
			</div>
			<div className="comment-section">
				<CommentSection 
					singlePost={singlePost} 
					blogPostID={blogPostID} 
				/>
			</div>
		</div>
	);
}

export default SinglePost;
