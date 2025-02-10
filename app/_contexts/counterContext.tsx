import { createContext, useEffect, useRef, useState } from "react";

export const counterContext = createContext<{
  state: number;
  Increament: () => void;
  Decreament: () => void;
}>({ state: 0, Increament: () => {}, Decreament: () => {} });

export default function CounterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState(0);
  const value = useRef<{
    state: number;
    Increament: () => void;
    Decreament: () => void;
  }>({ state: 0, Increament: () => {}, Decreament: () => {} });
  useEffect(() => {
    value.current.state = state;
    value.current.Increament = () => setState((prev) => prev + 1);
    value.current.Decreament = () => setState((prev) => prev - 1);
  }, [state]);

  return (
    <counterContext.Provider value={value.current}>
      {children}
    </counterContext.Provider>
  );
}
