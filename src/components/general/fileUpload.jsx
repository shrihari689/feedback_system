import React from 'react';
import '../../addNewFeed.css';

const AddNewFeedFileUpload = (props) => {
    
    const { files, setFiles, sources, setSources } = props;

    const handleOnButtonClick = () => {
        document.getElementById('feed_image').click();
    };

    

    const handlePreviewFiles = (event) => {
        const filesArr = Array.from(event.target.files);
    
        const checkSize = filesArr.every((file) => file.size < 2097152);
        if(!checkSize){
            alert("Each Image must be less than 2 MB!");
            return;  
        } 
        setFiles((prev) => [...prev, ...filesArr]);
        Promise.all(filesArr.map(file => {
            return (new Promise((resolve,reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.addEventListener('load', (ev) => {
                    resolve(ev.target.result);
                });
                reader.addEventListener('error', reject);
            }));
        }))
        .then((images) => {
            setSources((prev) => [...prev,...images]);
        }, error => {        
            console.error(error);
        });
    };

    
    const handleRemoveFile = (i) => {
        const newFiles = files.filter((e, index) => index !== i);
        const newSources = sources.filter((e, index) => index !== i);
        setFiles(newFiles);
        setSources(newSources);
    };

    return (
        <React.Fragment>
            <div className="feed__file__chosen__container">
                {
                    sources.map((e, i) => (
                        <div key={i} className="feed__file__chosen">
                            <img src={e} alt=""/>
                            <i onClick={() => handleRemoveFile(i)} className="fa fa-trash remove"></i>
                        </div>
                    )
                )
                }
                <div className="feed__file__upload__button" onClick={handleOnButtonClick}>
                    <i className="fa fa-plus-circle"></i>
                </div>
            </div>
            <input className="feed__file__upload"
                onChange={handlePreviewFiles}
                type="file"
                accept=".jpg,.png"
                name="feed_image" id="feed_image" multiple/>
        </React.Fragment>
    );
    
}
 

export default AddNewFeedFileUpload;