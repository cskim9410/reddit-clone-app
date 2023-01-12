import React, { createContext, Dispatch, useReducer } from "react";
import type { User } from "../types";

interface State {
  authentiacted: boolean;
  user: User | undefined;
  loading: boolean;
}

interface Action {
  type: string;
  payload: any;
}

const StateContext = createContext<State>({
  authentiacted: false,
  user: undefined,
  loading: true,
});

export enum ActionKind {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  STOP_LOADING = "STOP_LOADING",
}

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case ActionKind.LOGIN: {
      return {
        ...state,
        user: payload,
        authentiacted: true,
      };
    }
    case ActionKind.LOGOUT: {
      return {
        ...state,
        user: undefined,
        authentiacted: false,
      };
    }
    case ActionKind.STOP_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

const DispatchContext = createContext<Dispatch<Action>>(
  ({ type, payload }) => {}
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    authentiacted: false,
    user: undefined,
    loading: true,
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default AuthProvider;
