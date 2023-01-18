import axios from "axios";
import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";
import type { User } from "../types";

interface State {
  authenticated: boolean;
  user: User;
  loading: boolean;
}

const initialState = {
  authenticated: false,
  user: {} as User,
  loading: true,
};

const StateContext = createContext<State>(initialState);

export enum ActionKind {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  STOP_LOADING = "STOP_LOADING",
}

type UserAction =
  | {
      type: ActionKind.LOGIN;
      payload: User;
    }
  | { type: ActionKind.LOGOUT }
  | { type: ActionKind.STOP_LOADING };

const reducer = (state: State, action: UserAction) => {
  switch (action.type) {
    case ActionKind.LOGIN: {
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    }
    case ActionKind.LOGOUT: {
      return {
        ...state,
        user: {} as User,
        authenticated: false,
      };
    }
    case ActionKind.STOP_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      throw new Error(`Unknown action type`);
  }
};

const DispatchContext = createContext<Dispatch<UserAction>>(
  (action: UserAction) => {}
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/auth/me");
        dispatch({ type: ActionKind.LOGIN, payload: res.data });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: ActionKind.STOP_LOADING });
      }
    })();
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default AuthProvider;

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
