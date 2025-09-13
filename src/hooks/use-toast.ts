import * as React from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const DEFAULT_TOAST_LIMIT = 3;
const DEFAULT_REMOVE_DELAY = 4000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

type State = {
  toasts: ToasterToast[];
};

const actionTypes = {
  ADD: "ADD_TOAST",
  UPDATE: "UPDATE_TOAST",
  DISMISS: "DISMISS_TOAST",
  REMOVE: "REMOVE_TOAST",
} as const;

type Action =
  | { type: typeof actionTypes.ADD; toast: ToasterToast }
  | { type: typeof actionTypes.UPDATE; toast: Partial<ToasterToast> }
  | { type: typeof actionTypes.DISMISS; toastId?: string }
  | { type: typeof actionTypes.REMOVE; toastId?: string };

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string, delay = DEFAULT_REMOVE_DELAY) => {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: actionTypes.REMOVE, toastId });
  }, delay);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, DEFAULT_TOAST_LIMIT),
      };

    case actionTypes.UPDATE:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          !action.toastId || t.id === action.toastId ? { ...t, open: false } : t
        ),
      };

    case actionTypes.REMOVE:
      return {
        ...state,
        toasts: action.toastId
          ? state.toasts.filter((t) => t.id !== action.toastId)
          : [],
      };

    default:
      return state;
  }
};

// ===== Global Store =====
let memoryState: State = { toasts: [] };
const listeners = new Set<(state: State) => void>();

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

// ===== API =====
type Toast = Omit<ToasterToast, "id">;

function toast(props: Toast) {
  const id = genId();

  const dismiss = () => dispatch({ type: actionTypes.DISMISS, toastId: id });
  const update = (newProps: Partial<ToasterToast>) =>
    dispatch({ type: actionTypes.UPDATE, toast: { ...newProps, id } });

  dispatch({
    type: actionTypes.ADD,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => !open && dismiss(),
    },
  });

  if (props.duration !== Infinity) {
    addToRemoveQueue(id, props.duration ?? DEFAULT_REMOVE_DELAY);
  }

  return { id, dismiss, update };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) =>
      dispatch({ type: actionTypes.DISMISS, toastId }),
  };
}

export { useToast, toast };
