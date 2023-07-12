import React, { Component, createRef} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';

Quill.register("modules/imageResize", ImageResize);

class TextEditor extends Component {
    quillRef = createRef();
    handleChange = (content) => {
        this.props.onChange(content);
    };

    handleImageUpload = async () => {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.style.display = "none";
        document.body.appendChild(input);
        
        input.click();

        input.onchange = async () => {
            const [file] = input.files;
      
            const formData = new FormData();
            formData.append('image', file);
      
            try {
              const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
              });
      
              if (response !== null) {
                const data = await response.json();
                const range = this.quillRef.current.getEditor().getSelection();
                this.quillRef.current.getEditor().insertEmbed(range.index, 'image', data.url);
                this.quillRef.current.getEditor().setSelection(range.index + 1);
              } else {
                console.error('이미지 업로드 실패');
              }
            } catch (error) {
              console.error('이미지 업로드 실패', error);
            } finally {
              document.body.querySelector(':scope > input').remove();
            }
          };
        }

    render() {
        return (
            <ReactQuill
            ref={this.quillRef}
            value={this.props.value}
            onChange={this.handleChange} 
            modules={{
                toolbar: {
                    container : [
                        ['bold', 'italic', 'underline','strike', 'blockquote'],
                        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 헤더 스타일
                        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                        ['image'],
                        [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                        ['clean']
                    ],
                    handlers : {
                        image : this.handleImageUpload
                    }
                },
                imageResize: {
                  parchment: Quill.import("parchment"),
                  modules: ["Resize", "DisplaySize", "Toolbar"]
                }
            }}
            style={{height: "600px"}} 
            />

            
        )
    }
}

export default TextEditor;