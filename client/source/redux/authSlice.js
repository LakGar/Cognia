import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userService from "../services/userServices";

// Fetch current user info
export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (token, thunkAPI) => {
    try {
      const response = await userService.getMyProfile(token);
      return response;
    } catch (error) {
      console.log("Error fetching user info:", error.response.data); // Debugging line
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update user info
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      const { token, ...userUpdates } = userData;
      return await userService.updateUserProfile(
        token,
        userUpdates.userId,
        userUpdates
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (token, thunkAPI) => {
    try {
      await userService.deleteUserInfo(token);
      await AsyncStorage.removeItem("token");
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Fetch any user info by ID
export const getUserById = createAsyncThunk(
  "auth/getUserById",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.userToken;
      const response = await userService.getUserProfile(token, userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userToken: null,
    userInfo: null,
    error: null,
  },
  reducers: {
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userToken = action.payload.userToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userToken = null;
      state.userInfo = null;
      AsyncStorage.removeItem("token"); // Clear token from storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.userToken = null;
        state.userInfo = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setAuthState, logout } = authSlice.actions;

export const checkAuthState = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch(setAuthState({ isAuthenticated: true, userToken: token }));
    dispatch(getUserInfo(token));
  } else {
    dispatch(setAuthState({ isAuthenticated: false, userToken: null }));
  }
};

export default authSlice.reducer;
