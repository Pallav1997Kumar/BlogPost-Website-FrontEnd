import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";

import { getAllBlogPost } from "../../store/allBlogPostSlice.js";
import { getAllBlogCategory } from "../../store/allBlogCategorySlice.js";
import { FaSearch } from "react-icons/fa";

import "../../style/blog search/BlogSearch.scss";


function BlogSearch(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchItem, setSearchItem] = useState("");
    const [searchedResult, setSearchedResult] = useState([]);

    //Getting All Blogs as object from Redux Store
	const blogSlice = useSelector((value) => value.blogPostsSliceName);
	const { blogPosts, loading } = blogSlice;

    //Getting All Blogs Category as object from Redux Store
	const categoriesList = useSelector((categogiesListRedux) =>	categogiesListRedux.blogCategorySliceName.blogCategories);

    function getSearchData(item){
        const searchResult = [];
        if(item.length >= 3){
            blogPosts.forEach((element) => {
                if(element.postTitle.toLowerCase().includes(item.toLowerCase())){
                    searchResult.push(element.postTitle);
                }
                if(element.userFullName.toLowerCase().includes(item.toLowerCase())){
                    searchResult.push("AUTHOR: " + element.userFullName + " (" + element.username + ")");
                }
            });
            categoriesList.forEach((element) => {
                if(element.categoryName.toLowerCase().includes(item.toLowerCase())){
                    searchResult.push("CATEGORY: " + element.categoryName);
                }
            });
        }
        const uniqueObj = new Set(searchResult);
        const uniqueSearchResult = [...uniqueObj];
        setSearchedResult([...uniqueSearchResult]);
    }

    function resultClickHandler(event){
        const text = event.target.innerText;
        if(text.startsWith("AUTHOR: ")){
            const parenthesisOpenIndex = text.indexOf('(');
            const parenthesisCloseIndex = text.indexOf(')');
            const authorUsername = text.slice(parenthesisOpenIndex + 1, parenthesisCloseIndex);
            navigate(`/blogs/username/${authorUsername}`);
        }
        else if(text.startsWith("CATEGORY: ")){
            let newText = text.slice(10);
            newText = newText.replaceAll(' ', '_');
            const category = newText.toLowerCase() + "_blogs"
            navigate(`/blogs/category/${category}`);
        }
        else{
            const postInfo = blogPosts.find(function(element){
                return element.postTitle == text;
            });
            const postID = postInfo.postID;
            navigate(`/blogs/postId/${postID}`);
        }
    }

    useEffect(function(){
        setSearchedResult([]);
        const getSearch = setTimeout(() => {
            dispatch(getAllBlogPost());
            dispatch(getAllBlogCategory());
            getSearchData(searchItem);
        }, 1500);
        return () => clearTimeout(getSearch);
    }, [searchItem]);

    return(
        <div className="blog-search-container">
            <div className="search-box">
                <input type="text" value={searchItem} placeholder="Search" onChange={(event) => setSearchItem(event.target.value)} />
                <FaSearch />
            </div>
            {searchedResult.length > 0 &&
            <div className="search-result">
                {searchedResult.map(function(result){
                    return(
                        <div onClick={resultClickHandler}>
                            <h6>{result}</h6>
                        </div>                        
                    );
                })}
            </div>}
        </div>
    );
}

export default BlogSearch;