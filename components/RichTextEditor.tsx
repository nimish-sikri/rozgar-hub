"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic"; //A Next.js function to dynamically import components, which can be useful for client-side rendering.
import { forwardRef } from "react";  //A React function to forward refs to DOM components or class component instances.
import { EditorProps } from "react-draft-wysiwyg"; //Type definitions for props from the react-draft-wysiwyg library.
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor), //dynamic is used to import the Editor component from react-draft-wysiwyg dynamically.
  { ssr: false }, // ensures that the component is not server-side rendered, which is important for components that rely on the browser's DOM.
);

export default forwardRef<Object, EditorProps>( //forwardRef: Wraps the RichTextEditor function component to forward its ref to the Editor component.
  function RichTextEditor(props, ref) {
    return (
      <Editor
      
        editorClassName={cn(
          "border rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-black",
          props.editorClassName,
        )}
        toolbar={{
          options: ["inline", "list", "link", "history"],
          inline: {
            options: ["bold", "italic", "underline"],
          },
        }}
        //Sets the editor's ref. If ref is a function, it is called with the editor instance; if it’s an object, ref.current is set to the editor instance.
        editorRef={(r) => {
          if (typeof ref === "function") {
            ref(r);
          } else if (ref) {
            ref.current = r;
          }
        }}
        //Spreads any additional props onto the Editor component.
        {...props}
      />
    );
  },
);
