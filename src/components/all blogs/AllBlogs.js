import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DOMPurify from "dompurify";

import { getAllBlogPost } from "../../store/allBlogPostSlice.js";
import { getAllBlogCategory } from "../../store/allBlogCategorySlice.js";

import "../../style/all blogs/AllBlog.scss";

import NoPostSpecificCategory from "./NoPostSpecificCategory.js";
import AllBlogsPostContainer from "./AllBlogsPostContainer.js";
import NoPostFromUser from "./NoPostFromUser.js";
import ApplyFilterAndSort from "./ApplyFilterAndSort.js";
import NoPostForFilter from "./NoPostForFilter.js";


function AllBlogs() {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const [isSortingFilteringApplied, setIsSortingFilteringApplied] =
		useState(false);

	//Getting All Blogs as object from Redux Store
	const blogSlice = useSelector((value) => value.blogPostsSliceName);
	const { blogPosts, loading } = blogSlice;

	let blogPostsHome;
	let blogCategory;
	let username;

	//Print all blogs
	if (location.pathname === "/blogs") {
		blogPostsHome = blogPosts;
	}

	//Knowing  blog category
	if (location.pathname.includes("/blogs/category/")) {
		var categoryWithBlog = location.pathname.split("/")[3].toUpperCase();
		var categoryNameOfBlog = categoryWithBlog
			.substring(0, categoryWithBlog.length - 6)
			.replaceAll("_", " ");
		blogCategory = categoryNameOfBlog;
	}

	//Print specific blog category
	if (location.pathname.includes("/blogs/category/")) {
		blogPostsHome = blogPosts.filter(function (blogItem) {
			return blogItem.categoryName === blogCategory;
		});
	}

	//Print specific user blog
	if (location.pathname.includes("/blogs/username/")) {
		username = location.pathname.split("/")[3];
		blogPostsHome = blogPosts.filter(function (blogItem) {
			return blogItem.username === username;
		});
	}

	let blogHeader;
	if (blogPostsHome.length > 0) {
		if (location.pathname.includes("/blogs/category/")) {
			blogHeader = blogCategory;
		} else if (location.pathname.includes("/blogs/username/")) {
			blogHeader = username;
		} else if (location.pathname === "/blogs") {
			blogHeader = "ALL";
		}
	}

	const [sortedFilteredBlogPost, setSortedFilteredBlogPost] =
		useState(blogPostsHome);

	function getSortFilterObject(sortFilterObject) {
		console.log(sortFilterObject);
		//Sorting based on sort select
		if (sortFilterObject.sortSelection === "postTitleAscending") {
			blogPostsHome = blogPostsHome.slice().sort(function (a, b) {
				if (a.postTitle.toUpperCase() > b.postTitle.toUpperCase()) {
					return 1;
				}
				if (a.postTitle.toUpperCase() < b.postTitle.toUpperCase()) {
					return -1;
				}
				return 0;
			});
		}
		if (sortFilterObject.sortSelection === "postTitleDescending") {
			blogPostsHome = blogPostsHome.slice().sort(function (a, b) {
				if (a.postTitle.toUpperCase() < b.postTitle.toUpperCase()) {
					return 1;
				}
				if (a.postTitle.toUpperCase() > b.postTitle.toUpperCase()) {
					return -1;
				}
				return 0;
			});
		}
		if (sortFilterObject.sortSelection === "authorAscending") {
			blogPostsHome = blogPostsHome.slice().sort(function (a, b) {
				if (a.userFullName.toUpperCase() > b.userFullName.toUpperCase()) {
					return 1;
				}
				if (a.userFullName.toUpperCase() < b.userFullName.toUpperCase()) {
					return -1;
				}
				return 0;
			});
		}
		if (sortFilterObject.sortSelection === "authorDescending") {
			blogPostsHome = blogPostsHome.slice().sort(function (a, b) {
				if (a.userFullName.toUpperCase() < b.userFullName.toUpperCase()) {
					return 1;
				}
				if (a.userFullName.toUpperCase() > b.userFullName.toUpperCase()) {
					return -1;
				}
				return 0;
			});
		}
		if (sortFilterObject.sortSelection === "categoryAscending") {
			blogPostsHome = blogPostsHome.slice().sort(function (a, b) {
				if (a.categoryName.toUpperCase() > b.categoryName.toUpperCase()) {
					return 1;
				}
				if (a.categoryName.toUpperCase() < b.categoryName.toUpperCase()) {
					return -1;
				}
				return 0;
			});
		}
		if (sortFilterObject.sortSelection === "categoryDescending") {
			blogPostsHome = blogPostsHome.slice().sort(function (a, b) {
				if (a.categoryName.toUpperCase() < b.categoryName.toUpperCase()) {
					return 1;
				}
				if (a.categoryName.toUpperCase() > b.categoryName.toUpperCase()) {
					return -1;
				}
				return 0;
			});
		}
		if (sortFilterObject.sortSelection === "postDateAscending") {
			blogPostsHome = blogPostsHome.slice().sort(function (a, b) {
				const c = new Date(a.postDateTime);
				const d = new Date(b.postDateTime);
				return c - d;
			});
		}
		if (sortFilterObject.sortSelection === "postDateDescending") {
			blogPostsHome = blogPostsHome.slice().sort(function (a, b) {
				const c = new Date(a.postDateTime);
				const d = new Date(b.postDateTime);
				return d - c;
			});
		}
		if (sortFilterObject.sortSelection === "postLengthAscending") {
			blogPostsHome = blogPostsHome.slice().sort(function (a, b) {
				const c = getPlainText(a.postDescription).length;
				const d = getPlainText(b.postDescription).length;
				return c - d;
			});
		}
		if (sortFilterObject.sortSelection === "postLengthDescending") {
			blogPostsHome = blogPostsHome.slice().sort(function (a, b) {
				const c = getPlainText(a.postDescription).length;
				const d = getPlainText(b.postDescription).length;
				return d - c;
			});
		}

		//Getting blog post of specific categories
		if (sortFilterObject.allCheckedCategory.length > 0) {
			let filteredCategoryID = sortFilterObject.allCheckedCategory;
			filteredCategoryID = filteredCategoryID.map(Number); //converting array of string to array of numbers
			blogPostsHome = blogPostsHome.filter(function (eachPost) {
				return filteredCategoryID.includes(eachPost.categoryID);
			});
		} else {
			blogPostsHome = blogPostsHome;
		}

		//Getting blog post of specific users
		if (sortFilterObject.allCheckedAuthor.length > 0) {
			let filteredUserID = sortFilterObject.allCheckedAuthor;
			filteredUserID = filteredUserID.map(Number);
			blogPostsHome = blogPostsHome.filter(function (eachPost) {
				return filteredUserID.includes(eachPost.userID);
			});
		} else {
			blogPostsHome = blogPostsHome;
		}

		//Getting blog post based on post date
		if (sortFilterObject.checkedDate) {
			blogPostsHome = blogPostsHome.filter(function (eachPost) {
				const indiaDateTime = new Date(eachPost.postDateTime).toLocaleString(
					undefined,
					{ timeZone: "Asia/Kolkata" }
				);
				const indianDateTime = new Date(indiaDateTime);
				let cutoffTime;
				if (sortFilterObject.checkedDate === "1hour") {
					cutoffTime = new Date(Date.now() - 60 * 60 * 1000);
				}
				if (sortFilterObject.checkedDate === "24hours") {
					cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
				}
				if (sortFilterObject.checkedDate === "7days") {
					cutoffTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
				}
				if (sortFilterObject.checkedDate === "1month") {
					const currentDate = new Date();
					cutoffTime = new Date();
					cutoffTime.setMonth(currentDate.getMonth() - 1);
				}
				if (sortFilterObject.checkedDate === "3months") {
					const currentDate = new Date();
					cutoffTime = new Date();
					cutoffTime.setMonth(currentDate.getMonth() - 3);
				}
				if (sortFilterObject.checkedDate === "6months") {
					const currentDate = new Date();
					cutoffTime = new Date();
					cutoffTime.setMonth(currentDate.getMonth() - 6);
				}
				if (sortFilterObject.checkedDate === "1year") {
					const currentDate = new Date();
					cutoffTime = new Date();
					cutoffTime.setFullYear(currentDate.getFullYear() - 1);
				}
				if (sortFilterObject.checkedDate === "everyTime") {
					cutoffTime = new Date("1971-01-01");
				}
				return indianDateTime >= cutoffTime;
			});
		} else {
			blogPostsHome = blogPostsHome;
		}
		setSortedFilteredBlogPost(blogPostsHome);
		setIsSortingFilteringApplied(true);
	}

	if (isSortingFilteringApplied) {
		blogPostsHome = sortedFilteredBlogPost;
	}

	//Function to get Plain Text from HTML Text
	function getPlainText(htmlText) {
		const doc = new DOMParser().parseFromString(htmlText, "text/html");
		return doc.body.textContent;
	}

	useEffect(
		function () {
			dispatch(getAllBlogPost());
			dispatch(getAllBlogCategory());
		},
		[location.pathname, isSortingFilteringApplied]
	);

	return (
		<div className="all-blog">
			{blogPostsHome.length > 0 && (
				<div className="blog-heading">
					<h1>{blogHeader} BLOGS</h1>
				</div>
			)}
			{isSortingFilteringApplied && blogPostsHome.length == 0 && (
				<NoPostForFilter />
			)}
			{blogPostsHome.length > 0 && (
				<div>
					<ApplyFilterAndSort
						pathname={location.pathname}
						onGetSortFilterObject={getSortFilterObject}
					/>
				</div>
			)}
			{blogPostsHome.map(function (post) {
				return <AllBlogsPostContainer post={post} />;
			})}
			{blogPostsHome.length === 0 &&
				location.pathname.includes("/blogs/category/") && (
					<NoPostSpecificCategory blogCategory={blogCategory} />
				)}
			{blogPostsHome.length === 0 &&
				location.pathname.includes("/blogs/username/") && <NoPostFromUser />}
		</div>
	);
}

export default AllBlogs;
