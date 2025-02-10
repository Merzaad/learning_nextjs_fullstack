import { memo, useContext } from "react";
import { counterContext } from "../_contexts/counterContext";

function Actions() {
  const { Increament, Decreament } = useContext(counterContext);
  console.log("Actions");
  return (
    <>
      <button type="button" onClick={Increament}>
        +
      </button>
      <button type="button" onClick={Decreament}>
        -
      </button>
    </>
  );
}
export default memo(Actions);
