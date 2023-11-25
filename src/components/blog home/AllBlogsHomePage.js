import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";

import { getAllBlogPost } from "../../store/allBlogPostSlice.js";
import { getAllBlogCategory } from "../../store/allBlogCategorySlice.js";

import "../../style/blog home/AllBlogsHomePage.scss";
import Button from "react-bootstrap/Button";

import CategoryCard from "./CategoryCard.js";


function AllBlogsHomePage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//Getting All Blogs as object from Redux Store
	const blogSlice = useSelector((value) => value.blogPostsSliceName);
	const { blogPosts, loading } = blogSlice;

	//Getting All Blogs Category as object from Redux Store
	const categoriesList = useSelector((categogiesListRedux) =>	categogiesListRedux.blogCategorySliceName.blogCategories);

	//Creating an array and storing all blogs category name
	const blogCategoryArray = [];
	categoriesList.map(function (categoryList) {
		blogCategoryArray.push(categoryList.categoryName.concat(" BLOGS"));
	});

	useEffect(function () {
		dispatch(getAllBlogPost());
		dispatch(getAllBlogCategory());
	}, []);

	//Getting first four blogs without any category
	const defaultBlog = blogPosts.slice(0, 4);

	return (
		<div className="all-blogs-home">
			<div className="search-post">
				<h5> Want to search to specific post </h5>
				<Button onClick={()=> navigate('/blogSearch')} variant="primary">Search</Button>
			</div>
			<CategoryCard cardHeading="ALL BLOGS" blogsDisplay={defaultBlog} />
			{blogCategoryArray.map(function (cardHead) {
				const specificCategoryArray = blogPosts.filter(function (item) {
					return (
						cardHead.substring(0, cardHead.length - 6) == item.categoryName
					);
					//return (cardHead.startsWith(item.categoryName));
				});
				const specificCategoryBlog = specificCategoryArray.slice(0, 4);
				return (
					<CategoryCard
						cardHeading={cardHead}
						blogsDisplay={specificCategoryBlog}
					/>
				);
			})}
		</div>
	);
}
export default AllBlogsHomePage;
