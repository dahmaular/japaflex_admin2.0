import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { EditorState, $getRoot } from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  ListNode,
  ListItemNode,
} from "@lexical/list";
import { TOGGLE_LINK_COMMAND, LinkNode } from "@lexical/link";
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import styles from "./AdvertDetails.module.css";
import { AdFormValues } from "./formik-types/formikTypes";

interface AdvertDetailsProps {
  values: AdFormValues;
  setFieldValue: <K extends keyof AdFormValues>(
    field: K,
    value: AdFormValues[K],
    shouldValidate?: boolean
  ) => void;
}

const editorConfig = {
  namespace: "MyEditor",
  onError(error: Error) {
    throw error;
  },
  nodes: [ListNode, ListItemNode, LinkNode],
};

function Toolbar() {
  const [editor] = useLexicalComposerContext();

  const applyFormat = (format: "bold" | "italic" | "underline") => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const insertList = (type: "ordered" | "unordered") => {
    editor.dispatchCommand(
      type === "ordered"
        ? INSERT_ORDERED_LIST_COMMAND
        : INSERT_UNORDERED_LIST_COMMAND,
      undefined
    );
  };

  const removeList = () => {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  };

  const alignText = (alignment: "left" | "center" | "right") => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url !== null) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url === "" ? null : { url });
    }
  };

  return (
    <div className={styles.editorControls}>
      <button type="button" onClick={() => applyFormat("bold")}>
        <b>B</b>
      </button>
      <button type="button" onClick={() => applyFormat("italic")}>
        <i>I</i>
      </button>
      <button type="button" onClick={() => applyFormat("underline")}>
        <u>U</u>
      </button>

      <button type="button" onClick={() => insertList("unordered")}>
        • List
      </button>
      <button type="button" onClick={() => insertList("ordered")}>
        1. List
      </button>
      <button type="button" onClick={removeList}>
        No List
      </button>

      <button type="button" onClick={() => alignText("left")}>
        ⬅
      </button>
      <button type="button" onClick={() => alignText("center")}>
        ⬌
      </button>
      <button type="button" onClick={() => alignText("right")}>
        ➡
      </button>

      <button type="button" onClick={insertLink}>
        🔗 Link
      </button>
    </div>
  );
}

export default function TextEditor({
  values,
  setFieldValue,
}: AdvertDetailsProps) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={styles.editorContainer}>
        <Toolbar />
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.editorInput} />}
          placeholder={
            <div className={styles.editorPlaceholder}>Write something...</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState: EditorState) => {
            editorState.read(() => {
              const plainText = $getRoot().getTextContent();
              setFieldValue("cta", plainText, true);
            });
          }}
        />
      </div>
    </LexicalComposer>
  );
}
