// import React, { useState, useRef } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { SketchPicker } from "react-color";
// import Quill from "quill";
// import FontSizeSelect from "../FontSizeSelect/FontSizeSelect";

// // Définir une fonctionnalité personnalisée pour la taille de texte
// const Size = Quill.import("attributors/style/size");
// Size.whitelist = [
//   "10px",
//   "16px",
//   "24px",
//   "32px",
//   "38px",
//   "44px",
//   "48px",
//   "54px",
// ];
// Quill.register(Size, true);

// const Editor = () => {
//   const [content, setContent] = useState("");
//   const [currentColor, setCurrentColor] = useState("#333");
//   const [currentSize, setCurrentSize] = useState("16px");
//   const [showColorPicker, setShowColorPicker] = useState(false);

//   const handleChange = (value) => {
//     setContent(value);
//   };

//   const handleColorChange = (color) => {
//     setCurrentColor(color.hex);
//     const editor = quillRef.current.getEditor();
//     editor.format("color", color.hex);
//   };

//   const handleColorClick = () => {
//     setShowColorPicker(!showColorPicker);
//   };

//   const handlePickerClose = () => {
//     setShowColorPicker(false);
//   };

//   const handleClick = () => {
//     console.log("content", content);
//   };

//   const quillRef = useRef();

//   React.useEffect(() => {
//     if (quillRef.current) {
//       const editor = quillRef.current.getEditor();
//       editor.format("color", currentColor);
//       editor.format("size", currentSize);
//     }
//   }, [currentColor, currentSize]);

//   return (
//     <div className="editor-container">
//       <div className="ql-toolbar">
//         <FontSizeSelect
//           values={Size.whitelist}
//           current={currentSize}
//           onChange={setCurrentSize}
//         />
//         <button
//           onClick={handleColorClick}
//           style={{ backgroundColor: currentColor }}
//         >
//           Couleur
//         </button>
//         {showColorPicker && (
//           <SketchPicker
//             color={currentColor}
//             onChange={handleColorChange}
//             onChangeComplete={handleColorChange}
//             onClose={handlePickerClose}
//           />
//         )}
//       </div>
//       <ReactQuill value={content} onChange={handleChange} ref={quillRef} />
//       <button type="submit" onClick={handleClick}>
//         test
//       </button>
//       <div
//         className="content-preview"
//         dangerouslySetInnerHTML={{ __html: content }}
//       />
//     </div>
//   );
// };

// export default Editor;
// import React, { useState, useEffect, useRef } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { SketchPicker } from "react-color";
// import Quill from "quill";
// import FontSizeSelect from "../FontSizeSelect/FontSizeSelect";
// import io from "socket.io-client";
// import { debounce } from "lodash"; // Importez la fonction debounce depuis lodash

// // Configuration de Socket.IO client pour se connecter au backend
// const socket = io(`${import.meta.env.VITE_BACKEND_URL}/`); // Remplacez l'URL par l'URL de votre backend

// // Définir une fonctionnalité personnalisée pour la taille de texte
// const Size = Quill.import("attributors/style/size");
// Size.whitelist = [
//   "10px",
//   "16px",
//   "24px",
//   "32px",
//   "38px",
//   "44px",
//   "48px",
//   "54px",
// ];
// Quill.register(Size, true);

// const Editor = () => {
//   const [content, setContent] = useState("");
//   const [currentColor, setCurrentColor] = useState("#333");
//   const [currentSize, setCurrentSize] = useState("16px");
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [otherUsersContent, setOtherUsersContent] = useState(""); // Nouvel état pour stocker le contenu des autres utilisateurs

//   // Utiliser debounce pour différer l'émission de l'événement de mise à jour du contenu
//   const handleChange = debounce((value) => {
//     setContent(value);
//     // Émettre l'événement de mise à jour du contenu de l'éditeur aux autres utilisateurs
//     socket.emit("editorContentUpdate", value);
//   }, 500); // Délai de 500 ms avant d'émettre l'événement

//   const handleColorChange = (color) => {
//     setCurrentColor(color.hex);
//     const editor = quillRef.current.getEditor();
//     editor.format("color", color.hex);
//     // Émettre l'événement de mise à jour de la couleur aux autres utilisateurs
//     socket.emit("editorColorUpdate", color.hex);
//   };

//   const handleColorClick = () => {
//     setShowColorPicker(!showColorPicker);
//   };

//   const handlePickerClose = () => {
//     setShowColorPicker(false);
//   };

//   const handleSizeChange = (e) => {
//     setCurrentSize(e.target.value);
//     const editor = quillRef.current.getEditor();
//     editor.format("size", e.target.value);
//     // Émettre l'événement de mise à jour de la taille aux autres utilisateurs
//     socket.emit("editorSizeUpdate", e.target.value);
//   };

//   const quillRef = useRef();

//   useEffect(() => {
//     if (quillRef.current) {
//       const editor = quillRef.current.getEditor();
//       editor.format("color", currentColor);
//       editor.format("size", currentSize);

//       // Gérer l'événement de mise à jour du contenu de l'éditeur depuis d'autres utilisateurs
//       socket.on("editorContentUpdate", (content) => {
//         // Mettre à jour le contenu des autres utilisateurs dans l'état
//         setOtherUsersContent(content);
//       });

//       // Gérer l'événement de mise à jour de la couleur depuis d'autres utilisateurs
//       socket.on("editorColorUpdate", (color) => {
//         setCurrentColor(color);
//         editor.format("color", color);
//       });

//       // Gérer l'événement de mise à jour de la taille depuis d'autres utilisateurs
//       socket.on("editorSizeUpdate", (size) => {
//         setCurrentSize(size);
//         editor.format("size", size);
//       });
//     }
//   }, [currentColor, currentSize]);

//   useEffect(() => {
//     // Établir la connexion Socket.IO lorsqu'un utilisateur entre sur la page
//     socket.connect();

//     // Gérer l'événement d'activation d'un nouvel utilisateur
//     socket.emit("userConnected", "userId"); // Remplacez "userId" par l'ID de l'utilisateur connecté

//     // Gérer la déconnexion d'un utilisateur
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="editor-container">
//       <div className="ql-toolbar">
//         <FontSizeSelect
//           values={Size.whitelist}
//           current={currentSize}
//           onChange={handleSizeChange}
//         />
//         <button
//           onClick={handleColorClick}
//           style={{ backgroundColor: currentColor }}
//         >
//           Couleur
//         </button>
//         {showColorPicker && (
//           <SketchPicker
//             color={currentColor}
//             onChange={handleColorChange}
//             onChangeComplete={handleColorChange}
//             onClose={handlePickerClose}
//           />
//         )}
//       </div>
//       <ReactQuill value={content} onChange={handleChange} ref={quillRef} />
//       <button
//         type="submit"
//         onClick={() => socket.emit("submitContent", content)}
//       >
//         Sauvegarder
//       </button>
//       <div
//         className="content-preview"
//         dangerouslySetInnerHTML={{ __html: otherUsersContent }} // Utiliser le contenu des autres utilisateurs pour l'aperçu
//       />
//     </div>
//   );
// };

// export default Editor;

// import React, { useState, useEffect, useRef } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { SketchPicker } from "react-color";
// import Quill from "quill";
// import FontSizeSelect from "../FontSizeSelect/FontSizeSelect";
// import io from "socket.io-client";
// import { debounce } from "lodash"; // Importez la fonction debounce depuis lodash

// // Configuration de Socket.IO client pour se connecter au backend
// const socket = io(`${import.meta.env.VITE_BACKEND_URL}/`); // Remplacez l'URL par l'URL de votre backend

// // Définir une fonctionnalité personnalisée pour la taille de texte
// const Size = Quill.import("attributors/style/size");
// Size.whitelist = [
//   "10px",
//   "16px",
//   "24px",
//   "32px",
//   "38px",
//   "44px",
//   "48px",
//   "54px",
// ];
// Quill.register(Size, true);

// const Editor = () => {
//   const [content, setContent] = useState("");
//   const [currentColor, setCurrentColor] = useState("#333");
//   const [currentSize, setCurrentSize] = useState("16px");
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [otherUsersContent, setOtherUsersContent] = useState(""); // Nouvel état pour stocker le contenu des autres utilisateurs

//   // Utiliser debounce pour différer l'émission de l'événement de mise à jour du contenu
//   const handleChange = debounce((value) => {
//     setContent(value);
//     // Émettre l'événement de mise à jour du contenu de l'éditeur aux autres utilisateurs
//     socket.emit("editorContentUpdate", value);
//   }, 500); // Délai de 500 ms avant d'émettre l'événement

//   const handleColorChange = (color) => {
//     setCurrentColor(color.hex);
//     const editor = quillRef.current.getEditor();
//     editor.format("color", color.hex);
//     // Émettre l'événement de mise à jour de la couleur aux autres utilisateurs
//     socket.emit("editorColorUpdate", color.hex);
//   };

//   const handleColorClick = () => {
//     setShowColorPicker(!showColorPicker);
//   };

//   const handlePickerClose = () => {
//     setShowColorPicker(false);
//   };

//   const handleSizeChange = (e) => {
//     setCurrentSize(e.target.value);
//     const editor = quillRef.current.getEditor();
//     editor.format("size", e.target.value);
//     // Émettre l'événement de mise à jour de la taille aux autres utilisateurs
//     socket.emit("editorSizeUpdate", e.target.value);
//   };

//   const quillRef = useRef();

//   useEffect(() => {
//     if (quillRef.current) {
//       const editor = quillRef.current.getEditor();
//       editor.format("color", currentColor);
//       editor.format("size", currentSize);

//       // Gérer l'événement de mise à jour du contenu de l'éditeur depuis d'autres utilisateurs
//       socket.on("editorContentUpdate", (content) => {
//         // Mettre à jour le contenu des autres utilisateurs dans l'état
//         setOtherUsersContent(content);
//       });

//       // Gérer l'événement de mise à jour de la couleur depuis d'autres utilisateurs
//       socket.on("editorColorUpdate", (color) => {
//         setCurrentColor(color);
//         editor.format("color", color);
//       });

//       // Gérer l'événement de mise à jour de la taille depuis d'autres utilisateurs
//       socket.on("editorSizeUpdate", (size) => {
//         setCurrentSize(size);
//         editor.format("size", size);
//       });
//     }
//   }, [currentColor, currentSize]);

//   useEffect(() => {
//     // Établir la connexion Socket.IO lorsqu'un utilisateur entre sur la page
//     socket.connect();

//     // Gérer l'événement d'activation d'un nouvel utilisateur
//     socket.emit("userConnected", "userId"); // Remplacez "userId" par l'ID de l'utilisateur connecté

//     // Gérer la déconnexion d'un utilisateur
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // Écouter les mises à jour du contenu des autres utilisateurs et mettre à jour le contenu de l'éditeur
//   useEffect(() => {
//     if (quillRef.current) {
//       const editor = quillRef.current.getEditor();
//       editor.root.innerHTML = otherUsersContent;
//     }
//   }, [otherUsersContent]);

//   return (
//     <div className="editor-container">
//       <div className="ql-toolbar">
//         <FontSizeSelect
//           values={Size.whitelist}
//           current={currentSize}
//           onChange={handleSizeChange}
//         />
//         <button
//           onClick={handleColorClick}
//           style={{ backgroundColor: currentColor }}
//         >
//           Couleur
//         </button>
//         {showColorPicker && (
//           <SketchPicker
//             color={currentColor}
//             onChange={handleColorChange}
//             onChangeComplete={handleColorChange}
//             onClose={handlePickerClose}
//           />
//         )}
//       </div>
//       <ReactQuill value={content} onChange={handleChange} ref={quillRef} />
//       <button
//         type="submit"
//         onClick={() => socket.emit("submitContent", content)}
//       >
//         Sauvegarder
//       </button>
//       <div
//         className="content-preview"
//         dangerouslySetInnerHTML={{ __html: otherUsersContent }} // Utiliser le contenu des autres utilisateurs pour l'aperçu
//       />
//     </div>
//   );
// };

// export default Editor;

import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SketchPicker } from "react-color";
import Quill from "quill";
import FontSizeSelect from "../FontSizeSelect/FontSizeSelect";
import io from "socket.io-client";
import debounce from "lodash/debounce"; // Importez la fonction debounce depuis lodash

// Configuration de Socket.IO client pour se connecter au backend
const socket = io(`${import.meta.env.VITE_BACKEND_URL}/`); // Remplacez l'URL par l'URL de votre backend

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

// Définir une fonctionnalité personnalisée pour les sauts de ligne
const Break = Quill.import("blots/break");
Quill.register(Break, true);

const Editor = () => {
  const [currentColor, setCurrentColor] = useState("#333");
  const [currentSize, setCurrentSize] = useState("16px");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [editorContent, setEditorContent] = useState(""); // État local pour stocker le contenu de l'éditeur
  const [cursorPosition, setCursorPosition] = useState({ index: 0, length: 0 }); // État local pour stocker la position du curseur
  const quillRef = useRef();
  const debounceTimerRef = useRef(); // Utiliser useRef pour stocker le timer du debounce

  const handleChange = (value) => {
    setEditorContent(value); // Mettre à jour l'état local avec le nouveau contenu
    // Définir un délai de 500 ms pour différer l'émission de l'événement de mise à jour du contenu
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      socket.emit("editorContentUpdate", value);
    }, 500);
  };

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
    const editor = quillRef.current.getEditor();
    editor.format("color", color.hex);
    socket.emit("editorColorUpdate", color.hex);
  };

  const handleColorClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handlePickerClose = () => {
    setShowColorPicker(false);
  };

  const handleSizeChange = (e) => {
    setCurrentSize(e.target.value);
    const editor = quillRef.current.getEditor();
    editor.format("size", e.target.value);
    socket.emit("editorSizeUpdate", e.target.value);
  };

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.format("color", currentColor);
      editor.format("size", currentSize);

      // Gérer l'événement de mise à jour du contenu de l'éditeur depuis d'autres utilisateurs
      socket.on("editorContentUpdate", (updatedContent) => {
        // Mettre à jour le contenu des autres utilisateurs uniquement s'il est différent du contenu actuel
        if (updatedContent !== editorContent) {
          setEditorContent(updatedContent); // Mettre à jour l'état local avec le nouveau contenu
        }
      });

      // Gérer l'événement de mise à jour de la couleur depuis d'autres utilisateurs
      socket.on("editorColorUpdate", (color) => {
        setCurrentColor(color);
        editor.format("color", color);
      });

      // Gérer l'événement de mise à jour de la taille depuis d'autres utilisateurs
      socket.on("editorSizeUpdate", (size) => {
        setCurrentSize(size);
        editor.format("size", size);
      });
    }
  }, [currentColor, currentSize, editorContent]);

  useEffect(() => {
    // Établir la connexion Socket.IO lorsqu'un utilisateur entre sur la page
    socket.connect();

    // Gérer l'événement d'activation d'un nouvel utilisateur
    socket.emit("userConnected", "userId"); // Remplacez "userId" par l'ID de l'utilisateur connecté

    // Gérer la déconnexion d'un utilisateur
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();

      // Gérer les touches pour insérer un nouveau paragraphe à la fin du contenu
      editor.keyboard.addBinding(
        {
          key: "Enter",
        },
        (range, context) => {
          if (range.index === editor.getLength() - 1) {
            editor.insertText(range.index, "\n", Quill.sources.USER);
            editor.setSelection(range.index + 1, Quill.sources.SILENT);
          } else {
            return true;
          }
        }
      );

      const handler = (delta, oldDelta, source) => {
        if (source === "user") {
          const content = editor.getContents();
          setEditorContent(content);
          setCursorPosition(editor.getSelection()); // Mettre à jour la position du curseur après chaque mise à jour du contenu
          socket.emit("editorContentUpdate", content);
        }
      };
      editor.on("text-change", handler);
      return () => {
        editor.off("text-change", handler);
      };
    }
  }, []);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.setSelection(cursorPosition); // Restaurer la position du curseur après chaque mise à jour du contenu
    }
  }, [cursorPosition]);

  // Utiliser useMemo pour mémoriser le contenu à afficher dans l'aperçu
  const contentPreview = useMemo(() => {
    return { __html: editorContent };
  }, [editorContent]);

  return (
    <div className="editor-container">
      <div className="ql-toolbar">
        <FontSizeSelect
          values={Size.whitelist}
          current={currentSize}
          onChange={handleSizeChange}
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
      <ReactQuill
        value={editorContent}
        onChange={handleChange}
        ref={quillRef}
        modules={{
          toolbar: true, // Activer la barre d'outils Quill pour permettre les sauts de ligne
        }}
      />
      <button
        type="submit"
        onClick={() => socket.emit("submitContent", editorContent)}
      >
        Sauvegarder
      </button>
      <div
        className="content-preview"
        dangerouslySetInnerHTML={contentPreview}
      />
    </div>
  );
};

export default Editor;
