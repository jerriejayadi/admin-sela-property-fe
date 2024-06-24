import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
import {
  EditorContent,
  JSONContent,
  generateHTML,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Editor from "quill/core/editor";
import { useEffect, useMemo, useState } from "react";
import { json } from "stream/consumers";

interface RichTextRenderProps {
  value?: JSONContent;
  className?: string;
}

export default function RichTextRender({
  value,
  className,
}: RichTextRenderProps) {
  const [fieldValue, setFieldValue] = useState<string>("");
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc",
        },
      }),
    ],
    content: value,
    editable: false,
    editorProps: {
      attributes: {
        class: " prose max-w-none text-black prose-neutral",
      },
    },
  });

  return (
    <div className={className}>
      <EditorContent editor={editor} />
    </div>
  );
}
