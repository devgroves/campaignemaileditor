import React, { useRef,useEffect ,useState} from 'react';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import FileSaver from 'file-saver';
import dynamic from 'next/dynamic';

const api = process.env.NEXT_PUBLIC_API_URL
function View({id}:any) {
  const [data, setData] = useState();
 
  const emailEditorRef = useRef<EditorRef>(null);
  const handleGetItemById = async (tempid: any) => {
    const response = await fetch(`${api}/items?id=${tempid}`);
    if (response.status === 200) {
      const resData = await response.json();
      console.log('resData :>> ', resData);
      setData(resData.data)
    } else {
    console.log("error on api get by id ");
    }
  };
  useEffect(()=>{
    handleGetItemById(id)
  },[id])
  function generateUniqueTemplateName(prefix: string): string {
    // Generate a unique identifier, such can be a timestamp or a random string.
    const uniqueIdentifier = Date.now().toString(36); // Using timestamp as an example

    // Combine the prefix and unique identifier to create the unique template name.
    const uniqueName = `${prefix}_${uniqueIdentifier}`;

    return uniqueName;
  }
  const handleCreateItem = async (design: any) => {
    const templateName = generateUniqueTemplateName("template");

    const response = await fetch(`${api}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: design, name: templateName }),
    });
    if (response.status === 201) {
      alert(templateName + "Created Sucessfull")
    }
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
      console.log("save design button clicked..");
      // unlayer?.exportHtml((data) => {
      //   const { design, html, } = data;
      //   console.log('exportHtml', design);
      //   handleCreateItem(design)
      // });
    }
  };
  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
  };
  const onDesignLoad = (data: any) => {
    console.log('onDesignLoad', data);
  };
  const onLoad: EmailEditorProps['onLoad'] = (unlayer) => {
    console.log('onLoad', unlayer);
   if(data){
     unlayer.addEventListener('design:loaded', onDesignLoad);
     unlayer.loadDesign(data);
   }
  };
  return (
    <div className="container1">
      
      <nav>
        <div style={{ padding: 10 }}></div>
        <button onClick={SaveDesign}>Save Design</button>
        <div style={{ padding: 10 }}></div>
        <button onClick={exportHtml}>Export HTML</button>
      </nav>
      {data && (
        <EmailEditor ref={emailEditorRef} onReady={onReady} onLoad={onLoad} />
      )}

    </div>
  )
}

export default dynamic(() => Promise.resolve(View), {
  ssr: false
})