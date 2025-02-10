import { useContext } from "react";
import { counterContext } from "../_contexts/counterContext";

export default function Result() {
  console.log("Result");
  const { state } = useContext(counterContext);
  return <div>{state}</div>;
}
