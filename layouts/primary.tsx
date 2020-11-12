import * as React from "react";

export function Primary(props: { children?: React.ReactNode }) {
  return (
    <div className="primary-template">
      <div>Template: primary</div>
      <div>{props.children}</div>
    </div>
  );
}
