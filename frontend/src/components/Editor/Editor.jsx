import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SketchPicker } from "react-color";
import Quill from "quill";
import FontSizeSelect from "../FontSizeSelect/FontSizeSelect";

// Définir une fonctionnalité personnalisée pour la taille de texte
const Size = Quill.import("attributors/style/size");
Size.whitelist = [
  "10px",
  "16px",
  "24px",
  "32px",
  "38px",
  "44px",
  "48px",
  "54px",
];
Quill.register(Size, true);

const Editor = () => {
  const [content, setContent] = useState("");
  const [currentColor, setCurrentColor] = useState("#333");
  const [currentSize, setCurrentSize] = useState("16px");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleChange = (value) => {
    setContent(value);
  };

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
    const editor = quillRef.current.getEditor();
    editor.format("color", color.hex);
  };

  const handleColorClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handlePickerClose = () => {
    setShowColorPicker(false);
  };

  const handleClick = () => {
    console.log("content", content);
  };

  const quillRef = useRef();

  React.useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.format("color", currentColor);
      editor.format("size", currentSize);
    }
  }, [currentColor, currentSize]);

  return (
    <div className="editor-container">
      <div className="ql-toolbar">
        <FontSizeSelect
          values={Size.whitelist}
          current={currentSize}
          onChange={setCurrentSize}
        />
        <button
          onClick={handleColorClick}
          style={{ backgroundColor: currentColor }}
        >
          Couleur
        </button>
        {showColorPicker && (
          <SketchPicker
            color={currentColor}
            onChange={handleColorChange}
            onChangeComplete={handleColorChange}
            onClose={handlePickerClose}
          />
        )}
      </div>
      <ReactQuill value={content} onChange={handleChange} ref={quillRef} />
      <button type="submit" onClick={handleClick}>
        test
      </button>
      <div
        className="content-preview"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default Editor;
