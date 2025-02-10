import Actions from "./Actions";
import Result from "./Result";
import Test from "./Test";
import CounterContextProvider from "../_contexts/counterContext";

export default function Counter() {
  console.log("Counter");
  return (
    <>
      <CounterContextProvider>
        <Result />
        <Actions />
        <Test key="1" />
      </CounterContextProvider>
    </>
  );
}
