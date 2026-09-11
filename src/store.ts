import {
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { authApi, visitorsApi } from "./api";
import { AuthUser, Visitor, VisitorPayload } from "./types";

interface AppState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}
interface VisitorState {
  items: Visitor[];
  loading: boolean;
  error: string | null;
}

export const login = createAsyncThunk(
  "auth/login",
  ({ email, password }: { email: string; password: string }) =>
    authApi.login(email, password),
);
export const loadVisitors = createAsyncThunk("visitors/load", () =>
  visitorsApi.list(),
);
export const addVisitor = createAsyncThunk(
  "visitors/add",
  (payload: VisitorPayload) => visitorsApi.create(payload),
);
export const changeVisitorStatus = createAsyncThunk(
  "visitors/status",
  ({ id, status }: { id: string; status: "approve" | "reject" }) =>
    visitorsApi.updateStatus(id, status),
);
export const deleteVisitor = createAsyncThunk("visitors/delete", (id: string) =>
  visitorsApi.remove(id).then(() => id),
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null } as AppState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<AuthUser>) => {
        state.loading = false;
        state.user = action.payload;
      },
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Unable to Login.";
    });
  },
});

const visitorSlice = createSlice({
  name: "visitors",
  initialState: { items: [], loading: false, error: null } as VisitorState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadVisitors.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loadVisitors.fulfilled,
      (state, action: PayloadAction<Visitor[]>) => {
        state.loading = false;
        state.items = action.payload;
      },
    );
    builder.addCase(loadVisitors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Unable to load visitors.";
    });
    builder.addCase(
      addVisitor.fulfilled,
      (state, action: PayloadAction<Visitor>) => {
        state.items.unshift(action.payload);
      },
    );
    builder.addCase(
      changeVisitorStatus.fulfilled,
      (state, action: PayloadAction<Visitor>) => {
        const item = state.items.find(
          (visitor) => visitor.id === action.payload.id,
        );
        if (item) item.status = action.payload.status;
      },
    );
    builder.addCase(
      deleteVisitor.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(
          (visitor) => visitor.id !== action.payload,
        );
      },
    );
  },
});

export const store = configureStore({
  reducer: { auth: authSlice.reducer, visitors: visitorSlice.reducer },
});
export const { logout } = authSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
