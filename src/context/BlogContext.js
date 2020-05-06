import createDataContext from "./createDataContext";

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case "remove_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    default:
      return state;
  }
};
const addBlogPost = (dispatch) => (title, content, callBack) => {
  dispatch({ type: "add_blogpost", payload: { title, content } });
  callBack();
};
const removeBlogPost = (dispatch) => (id) =>
  dispatch({ type: "remove_blogpost", payload: id });

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, removeBlogPost },
  []
);
