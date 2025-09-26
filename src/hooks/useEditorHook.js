"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";

function stripHtmlTags(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}
export const useEditorHook = (content) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Underline,
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          level: [2],
        },
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[150px] border-gray-300 bg-back p-1 focus:border-gray-300",
      },
    },
    onUpdate({ editor }) {
      const htmlContent = editor.getHTML();
      const plainTextContent = stripHtmlTags(htmlContent);
      setAdditionalDetails(plainTextContent);
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);
  return { editor };
};
