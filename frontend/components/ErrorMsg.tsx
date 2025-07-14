import React from "react";
const ErrorMsg = ({ msg }: { msg: string }) =>
  <div className="bg-red-200 text-red-800 p-2 rounded my-2">{msg}</div>;

export default ErrorMsg;
