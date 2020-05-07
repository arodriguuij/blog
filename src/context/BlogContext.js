import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    /*     case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ]; */
    case "remove_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "edit_blogpost":
      return state.map((blogPost) =>
        blogPost.id === action.payload.id ? action.payload : blogPost
      );
    case "get_blogposts":
      return action.payload;
    default:
      return state;
  }
};
const addBlogPost = (dispatch) => async (title, content, callBack) => {
  try {
    await jsonServer.post("/blogposts", { title, content });
    /*   dispatch({ type: "add_blogpost", payload: { title, content } });*/
    if (callBack) callBack();
  } catch (error) {
    console.log(error.message);
  }
};
const removeBlogPost = (dispatch) => async (id) => {
  try {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "remove_blogpost", payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

const editBlogPost = (dispatch) => async (id, title, content, callBack) => {
  try {
    await jsonServer.put(`/blogposts/${id}`, { title, content });
    dispatch({ type: "edit_blogpost", payload: { id, title, content } });
    if (callBack) callBack();
  } catch (error) {
    console.log(error.message);
  }
};

const getBlogPosts = (dispatch) => async () => {
  try {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "get_blogposts", payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, removeBlogPost, editBlogPost, getBlogPosts },
  []
);
