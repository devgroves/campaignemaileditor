import React, { useRef } from 'react';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import data from "./data.json"
import FileSaver from 'file-saver';
export default function App() {
  const emailEditorRef = useRef<EditorRef>(null);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html, } = data;
      console.log('exportHtml', design);
      const blob = new Blob([html], { type: 'text/html' });
      FileSaver.saveAs(blob, 'email.html');
      // console.log('html :>> ', html);
    });
    // unlayer?.saveDesign((data)=>{
    //   const { design, html, } = data;
    // })
  };
  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    // editor is ready
    // you can load your template here;
    // the design json can be obtained by calling
    // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)

    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);
  };
  const onDesignLoad = (data:any) => {
    console.log('onDesignLoad', data);
  };
  const onLoad: EmailEditorProps['onLoad'] = (unlayer) => {
    console.log('onLoad', unlayer);
    unlayer.addEventListener('design:loaded', onDesignLoad);
    unlayer.loadDesign(data);
  };
  return (
    <div className="container">
      <nav>
        <button onClick={exportHtml}>Export HTML</button>
      </nav>
      <EmailEditor ref={emailEditorRef} onReady={onReady} onLoad={onLoad} />
    </div>
  )
}
