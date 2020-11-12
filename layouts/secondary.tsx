import * as React from "react";

export function Secondary(props: { children?: React.ReactNode }) {
  return (
    <div className="secondary-template">
      <div>Template: secondary</div>
      <div>{props.children}</div>
    </div>
  );
}
