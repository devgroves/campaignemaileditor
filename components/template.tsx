import React, { useRef } from 'react';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import FileSaver from 'file-saver';
import dynamic from 'next/dynamic';
import Modal from './modal';

const api = process.env.NEXT_PUBLIC_API_URL
function Template() {
  const emailEditorRef = useRef<EditorRef>(null);
  const [open, setOpen] = React.useState(false);
  const [design, setDesign] = React.useState();
  const [templateName, setTemplateName] = React.useState<string>("");

  // const stringify = (obj) => {
  //   let cache = [];
  //   let str = JSON.stringify(obj, function(key, value) {
  //     if (typeof value === "object" && value !== null) {
  //       if (cache.indexOf(value) !== -1) {
  //         // Circular reference found, discard key
  //         return;
  //       }
  //       // Store value in our collection
  //       cache.push(value);
  //     }
  //     return value;
  //   });
  //   cache = null; // reset the cache
  //   return str; 
  // }

  const handleClose = async (savedTemplateName:string) => {
    console.log("handle close method click", savedTemplateName, templateName);
    if (savedTemplateName) {
        getDesign(saveApiCall, savedTemplateName);
        // let bodyStr = JSON.stringify({ data: design, name: savedTemplateName });
        // const response = await fetch(`${api}/items`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: bodyStr
        // });
        // if (response.status === 201) {
        //   alert(savedTemplateName +" created sucessfully")
        //   window.location.href = "/";
        // }
    }
    setOpen(false);
  };

  const saveApiCall = async (emailDesign:any, savedTemplateName:string) => {
    console.log("save api call method called", emailDesign);
    let emailDesignStr = JSON.stringify(emailDesign);
    let bodyStr = JSON.stringify({ data: emailDesign, name: savedTemplateName });
    const response = await fetch(`${api}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyStr
    });
    if (response.status === 201) {
      alert(savedTemplateName +" created sucessfully")
      window.location.href = "/";
    }
  }

  const handleOpen = () => {
    console.log("handle open click");
    setOpen(true);
  };

  function generateUniqueTemplateName(prefix: string): string {
    // Generate a unique identifier, such can be a timestamp or a random string.
    const uniqueIdentifier = Date.now().toString(36); // Using timestamp as an example

    // Combine the prefix and unique identifier to create the unique template name.
    const uniqueName = `${prefix}_${uniqueIdentifier}`;

    return uniqueName;
  }
  const handleCreateItem = async (design: any) => {
    // const templateName = generateUniqueTemplateName("template");
    setOpen(true);
    setDesign(design);
    
  };
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
  const getDesign = (callback:any, saveTemplateName:string) => {
    if (typeof window !== 'undefined') {
      const unlayer = emailEditorRef.current?.editor;

      unlayer?.exportHtml((data) => {
        const { design, html, } = data;
        console.log('exportHtml', design);
        callback(design, saveTemplateName)
      });
    }
  }
  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
  };
  const onDesignLoad = (data: any) => {
    console.log('onDesignLoad', data);
  };
  // const onLoad: EmailEditorProps['onLoad'] = (unlayer) => {
  //   console.log('onLoad', unlayer);
  //   unlayer.addEventListener('design:loaded', onDesignLoad);
  //   unlayer.loadDesign(data);
  // };
  return (
    <div className="container1">
      
      <nav>
        <div style={{ padding: 10 }}></div>
        <button onClick={SaveDesign}>Save Design</button>
        <div style={{ padding: 10 }}></div>
        <button onClick={exportHtml}>Export HTML</button>
      </nav>
      {typeof window !== 'undefined' && (
        <EmailEditor ref={emailEditorRef} onReady={onReady}  />
      )}
      {open &&<Modal isOpen={open} onClose={handleClose} templateName={templateName}/>}

    </div>
  )
}

export default dynamic(() => Promise.resolve(Template), {
  ssr: false
})