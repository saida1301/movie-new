import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

interface Review {
  id: number;
  content: string;
}

interface ReviewState {
  error: string | null;
  isLoading: boolean;
}

interface UpdateReviewResponse {
  reviewId: number;
  content: string;
}

interface DeleteReviewResponse {
  id: number;
}

const reviewsAdapter = createEntityAdapter<Review>({
  selectId: (review) => review.id,
  sortComparer: (a, b) => a.id - b.id,
});

const initialState: ReviewState = {
  error: null,
  isLoading: false,
};

export const updateReviewAsync = createAsyncThunk<
  UpdateReviewResponse,
  { reviewId: number; content: string }
>("review/updateReviewAsync", async ({ reviewId, content }) => {
  const response = await axios.put<UpdateReviewResponse>(
    `http://192.168.0.105:3000/review/${reviewId}`,
    { content }
  );
  return response.data;
});

export const deleteReviewAsync = createAsyncThunk<number, number>(
  "reviews/deleteReviewAsync",
  async (reviewId) => {
    const response = await axios.delete<DeleteReviewResponse>(
      `http://192.168.0.105:3000/review/${reviewId}`
    );
    return response.data.id;
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState: reviewsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateReviewAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateReviewAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        reviewsAdapter.updateOne(state, {
          id: action.payload.reviewId,
          changes: { content: action.payload.content },
        });
      })
      .addCase(updateReviewAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Something went wrong.";
      })
      .addCase(deleteReviewAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteReviewAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        reviewsAdapter.removeOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllReviews,
  selectById: selectReviewById,
} = reviewsAdapter.getSelectors((state: any) => state.review);
