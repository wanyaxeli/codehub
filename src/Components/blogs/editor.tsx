import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect } from "react"

const editorStyles = `
  .tiptap-editor .tiptap {
    outline: none;
    min-height: 200px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1rem;
    line-height: 1.75;
    color: #1a1a1a;
  }

  .tiptap-editor .tiptap h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 1.5rem 0 0.75rem;
    line-height: 1.2;
    color: #111;
  }

  .tiptap-editor .tiptap h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 1.25rem 0 0.6rem;
    line-height: 1.3;
    color: #111;
  }

  .tiptap-editor .tiptap h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1rem 0 0.5rem;
    color: #111;
  }

  .tiptap-editor .tiptap p {
    margin: 0.6rem 0;
  }

  .tiptap-editor .tiptap ul {
    list-style: disc;
    padding-left: 1.5rem;
    margin: 0.6rem 0;
  }

  .tiptap-editor .tiptap ol {
    list-style: decimal;
    padding-left: 1.5rem;
    margin: 0.6rem 0;
  }

  .tiptap-editor .tiptap li {
    margin: 0.25rem 0;
  }

  .tiptap-editor .tiptap strong {
    font-weight: 700;
  }

  .tiptap-editor .tiptap em {
    font-style: italic;
  }

  .tiptap-editor .tiptap blockquote {
    border-left: 4px solid #d1d5db;
    padding-left: 1rem;
    margin: 1rem 0;
    color: #6b7280;
    font-style: italic;
  }

  .tiptap-editor .tiptap code {
    background: #f3f4f6;
    border-radius: 4px;
    padding: 0.1rem 0.3rem;
    font-family: monospace;
    font-size: 0.9em;
  }

  .tiptap-editor .tiptap p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #9ca3af;
    pointer-events: none;
    height: 0;
  }
`

type ToolbarButtonProps = {
  onClick: () => void
  isActive?: boolean
  label: string
}

const ToolbarButton = ({ onClick, isActive, label }: ToolbarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      !px-3 !py-1.5 rounded text-sm font-medium transition-all duration-150 border
      ${isActive
        ? "bg-gray-900 text-white border-gray-900"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
      }
    `}
  >
    {label}
  </button>
)

export default function RichTextEditor({
  content,
  onChange,
}: {
  content?: any
  onChange?: (value: any) => void
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "<p>Start writing...</p>",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON())
    },
  })

  useEffect(() => {
    if (editor && content) {
      // Avoid resetting if content is already the same
      const current = editor.getJSON()
      if (JSON.stringify(current) !== JSON.stringify(content)) {
        editor.commands.setContent(content)
      }
    }
  }, [content, editor])

  if (!editor) return null

  return (
    <>
      {/* Inject scoped styles */}
      <style>{editorStyles}</style>

      <div className="tiptap-editor border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-white">

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 !px-4 !py-3 border-b border-gray-200 bg-gray-50">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            label="Bold"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            label="Italic"
          />
          <div className="w-px bg-gray-300 mx-1" />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive("heading", { level: 1 })}
            label="H1"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive("heading", { level: 2 })}
            label="H2"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive("heading", { level: 3 })}
            label="H3"
          />
          <div className="w-px bg-gray-300 mx-1" />
          <ToolbarButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive("paragraph")}
            label="¶ Para"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            label="• List"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            label="1. List"
          />
          {/* <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            label='" Quote'
          /> */}
          <div className="w-px bg-gray-300 mx-1" />
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            label="↩ Undo"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            label="↪ Redo"
          />
        </div>

        {/* Editor Area */}
        <div className="!px-5 !py-4">
          <EditorContent editor={editor} />
        </div>

      </div>
    </>
  )
}