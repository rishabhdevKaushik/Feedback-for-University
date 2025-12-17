import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create axios instance with interceptor for automatic token handling
const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

// Add request interceptor to include token in all requests except login and signup
apiClient.interceptors.request.use(
    (config) => {
        // Skip token for login and signup endpoints
        const skipTokenEndpoints = ['/auth/login', '/auth/signup', '/auth/register'];
        const shouldSkipToken = skipTokenEndpoints.some(endpoint => 
            config.url?.includes(endpoint)
        );
        
        if (!shouldSkipToken) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const handleAsyncError = (error) => {
    if (error.response) {
        return error.response.data;
    }
    return error.message;
};

export const getAllPosts = createAsyncThunk(
    "post/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/post/");
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const getPostById = createAsyncThunk(
    "post/getById",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/post/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const getAllCategories = createAsyncThunk(
    "category/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/category/");
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const addCategory = createAsyncThunk(
    "category/add",
    async ({ name }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/category/add", { name });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const updateCategory = createAsyncThunk(
    "category/update",
    async ({ id, name }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(`/category/update/${id}`, { name });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "category/delete",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await apiClient.delete(`/category/delete/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const upvoteToggle = createAsyncThunk(
    "post/upvote",
    async ({ toggle, id, username }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(
                `/post/upvote/${id}`,
                {
                    toggle,
                    username,
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const getAllComments = createAsyncThunk(
    "comment/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/comment/");
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const getAllReplies = createAsyncThunk(
    "reply/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/reply/");
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const getAllUsers = createAsyncThunk(
    "user/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/users");
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const replyUser = createAsyncThunk(
    "reply/addReply",
    async ({ id, content, user, replyType }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(
                `/reply/add/${id}`,
                {
                    content,
                    user,
                    replyType,
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const addComment = createAsyncThunk(
    "comment/addComment",
    async ({ content, user, postId }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(
                "/comment/add/", 
                {
                    content,
                    user,
                    postId,
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const editPost = createAsyncThunk(
    "post/edit",
    async ({ formData, id }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(
                `/post/update/${id}`,
                formData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const deletePost = createAsyncThunk(
    "post/delete",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await apiClient.delete(
                `/post/delete/${id}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const addPost = createAsyncThunk(
    "post/add",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(
                "/post/add",
                formData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const updateReply = createAsyncThunk(
    "reply/update",
    async ({ id, content }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(
                `/reply/update/${id}`,
                { content }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const deleteReply = createAsyncThunk(
    "reply/delete",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await apiClient.delete(
                `/reply/delete/${id}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const updateComment = createAsyncThunk(
    "comment/update",
    async ({ id, content }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(
                `/comment/update/${id}`,
                { content }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

export const deleteComment = createAsyncThunk(
    "comment/delete",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await apiClient.delete(
                `/comment/delete/${id}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAsyncError(error));
        }
    }
);

const socialSlice = createSlice({
    name: "social",
    initialState: {
        auth: { loggedIn: false, user: undefined, token: undefined },
        posts: [],
        categories: [],
        comments: [],
        replies: [],
        users: [],
        selectedPost: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.status = "loading";
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/fulfilled"),
                (state, action) => {
                    state.status = "succeeded";
                    if (action.type === getAllPosts.fulfilled.type) {
                        state.posts = action.payload.posts;
                    } else if (action.type === getPostById.fulfilled.type) {
                        state.selectedPost = action.payload.post;
                    } else if (
                        action.type === getAllCategories.fulfilled.type
                    ) {
                        state.categories = action.payload.categories;
                    } else if (action.type === addCategory.fulfilled.type) {
                        state.categories.push(action.payload.category);
                    } else if (action.type === updateCategory.fulfilled.type) {
                        const index = state.categories.findIndex(cat => cat._id === action.payload.category._id);
                        if (index !== -1) {
                            state.categories[index] = action.payload.category;
                        }
                    } else if (action.type === deleteCategory.fulfilled.type) {
                        state.categories = state.categories.filter(cat => cat._id !== action.payload.category._id);
                    } else if (action.type === getAllComments.fulfilled.type) {
                        state.comments = action.payload.comments;
                    } else if (action.type === getAllReplies.fulfilled.type) {
                        state.replies = action.payload.replies;
                    } else if (action.type === getAllUsers.fulfilled.type) {
                        state.users = action.payload.users;
                    }
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message;
                }
            );
    },
});

export default socialSlice.reducer;
