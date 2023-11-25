import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import Cookies from "js-cookie";

import { getAllBlogCategory } from "../../store/allBlogCategorySlice.js";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "react-bootstrap/Button";
import "../../style/write post/Write.scss";

import backendBaseURL from "../../backendBaseURL.js";


function Write() {
	const navigate = useNavigate();

	//All inputs fields
	const [title, setTitle] = useState("");
	const [postDescription, setPostDescription] = useState("");
	const [category, setCategory] = useState("");
	const [blogImage, setBlogImage] = useState();

	//Success or Failed Message while posting to backend
	const [isErrorWhileUploading, setIsErrorWhileUploading] = useState(false);
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	//Getting category list as object from Redux Store
	const categoriesList = useSelector(
		(categogiesListRedux) =>
			categogiesListRedux.blogCategorySliceName.blogCategories
	);

	//Getting logged-in user detail from Redux Store
	const user = useSelector((user) => user.userSlice.userDetail);

	useEffect(function () {
		if (!localStorage.getItem("user")) {
			navigate("/login");
		}
	}, []);

	async function handleUpload() {
		const formData = new FormData();
		formData.append("blogImage", blogImage);
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/blogImage`,
				formData
			);
			return response.data;
		} catch (error) {
			setErrorMessage(error.message);
			setSuccessMessage(null);
			setIsErrorWhileUploading(true);
		}
	}

	async function submitHandler(event) {
		event.preventDefault();
		const imageDetail = await handleUpload();
		const token = Cookies.get("jwt_access_token");
		const values = { title, postDescription, category, token, imageDetail };
		try {
			const response = await axios.post(
				`${backendBaseURL}/api/blogPost/newPost/post`,
				values
			);
			setSuccessMessage(response.data);
			setTitle("");
			setPostDescription("");
			setBlogImage(null);
			setCategory();
			setErrorMessage(null);
			setIsErrorWhileUploading(false);
		} catch (error) {
			if (error.message === "Request failed with status code 417") {
				setErrorMessage(error.response.data);
			} else {
				setErrorMessage(error.message);
			}
			setSuccessMessage(null);
			setIsErrorWhileUploading(true);
		}
		if (successMessage) {
			setTimeout(() => {
				navigate("/");
			}, 3000);
		}
	}

	return (
		<div className="write-blog">
			<h1>Welcome {user !== null && user.fullName}, </h1>
			<h1>Write your blog here</h1>
			<form>
				<label>Select Category</label>
				<br />
				<select onChange={(event) => setCategory(event.target.value)}>
					<option value="" selected>
						Please Select
					</option>
					{categoriesList.map(function (categoryList) {
						return (
							<option value={categoryList.categoryID}>
								{categoryList.categoryName}
							</option>
						);
					})}
				</select>
				<br />
				<br />
				<label>Blog Title</label>
				<br />
				<input
					required
					type="text"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<br />
				<br />
				<label>Blog Description</label>
				<div className="react-quill">
					<ReactQuill
						theme="snow"
						value={postDescription}
						onChange={setPostDescription}
					/>
				</div>
				<br />
				<br />
				<label>Upload the image</label>
				<br />
				<input
					required
					type="file"
					name="blogImage"
					onChange={(event) => setBlogImage(event.target.files[0])}
				/>
				<br />
				<br />
				<Button variant="primary" onClick={submitHandler}>
					Publish yor blog
				</Button>
				{isErrorWhileUploading ? (
					<div className="error">
						<p>{errorMessage}</p>
					</div>
				) : (
					<div className="success">
						<p>{successMessage}</p>
					</div>
				)}
			</form>
		</div>
	);
}

export default Write;
