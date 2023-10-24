import React, { useRef } from 'react';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import data from "./data.json"
import FileSaver from 'file-saver';
import dynamic from 'next/dynamic';
function Sample() {
  const emailEditorRef = useRef<EditorRef>(null);
  const exportHtml = () => {
    if (typeof window !== 'undefined') {
      const unlayer = emailEditorRef.current?.editor;

      unlayer?.exportHtml((data) => {
        const { design, html, } = data;
        console.log('exportHtml', design);
        const blob = new Blob([html], { type: 'text/html' });
        FileSaver.saveAs(blob, 'email.html');
      });
    }
  };
  const handleCreateItem = async (design:any) => {
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: design, name: "Default" }),
    });
    if (response.status === 201) {
      alert("Created Sucessfull")
    }
  };
  const SaveDesign = () => {
    if (typeof window !== 'undefined') {
      const unlayer = emailEditorRef.current?.editor;

      unlayer?.exportHtml((data) => {
        const { design, html, } = data;
        console.log('exportHtml', design);
        handleCreateItem(design)
      });
    }
  };
  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
  };
  const onDesignLoad = (data: any) => {
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
        <input type="text" className="block w-1/3 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Please Enter Template Name"></input>
        <div style={{ padding: 10 }}></div>
        <button onClick={SaveDesign}>Save Design</button>
        <div style={{padding:10}}></div>
        <button onClick={exportHtml}>Export HTML</button>
      </nav>
      {typeof window !== 'undefined' && (
        <EmailEditor ref={emailEditorRef} onReady={onReady} onLoad={onLoad} />
      )}

    </div>
  )
}

export default dynamic(() => Promise.resolve(Sample), {
  ssr: false
})