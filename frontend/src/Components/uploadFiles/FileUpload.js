import React, { Fragment, Component } from 'react';
import Message from './Message';
import Progress from './Progress';
import filestore from './FileStore';
//import FileDB from './backend/models/file/FileDB'
import axios from 'axios';
//temport comentez route
//import { route } from '../../../../backend/routes';



class FileUpload extends Component {
  constructor (props){
    super(props)
    this.state = {
        SERVER :'http://localhost:9999',
        fisier: {
          name:'',
          link:''
        },
        file:''
    }
  }
  
  // const SERVER ='http://localhost:9999'
  // const [file, setFile] = useState('');
  // const [filename, setFilename] = useState('Choose File');
  // const [uploadedFile, setUploadedFile] = useState({});
  // const [message, setMessage] = useState('');
  // const [uploadPercentage, setUploadPercentage] = useState(0);

   onChange = async (e) => {
    // setFile(e.target.files[0]);
    // setFilename(e.target.files[0].name);
    const fisier= await fetch(e.target.files[0]);
    this.setState({file:fisier})
  };

   onSubmit = async e => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('file', file);

    try {
      // const res = await axios.post(`/${this.props.idNote}/create-file`, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   // onUploadProgress: progressEvent => {
      //   //   setUploadPercentage(
      //   //     parseInt(
      //   //       Math.round((progressEvent.loaded * 100) / progressEvent.total)
      //   //     )
      //   //   );

      //   //   // Clear percentage
      //   //   setTimeout(() => setUploadPercentage(0), 3000);
      //   //}
      // });

      // const { fileName, filePath } = res.data;

      // setUploadedFile({ fileName, filePath });

      // this.props.onAdd({
      //   name:fileName,
      //   link:filePath
      // })

      // setMessage('File Uploaded');
      console.log(this.state.file);
      console.log(this.props.idNote);
      try{
        await axios.post(`${this.state.SERVER}/${this.props.idNote}/create-file`,this.state.file ,
        {headers: {
              'Content-Type': 'multipart/form-data'
            }
          })  
        //this.getAll(idNote)
    }catch(err){
        console.warn(err)
        this.emitter.emit('ADD_FIle_CREATE_ERROR')
    }

      
    } catch (err) {
      // if (err.response.status === 500) {
      //   setMessage('There was a problem with the server');
      // } else {
      //   setMessage(err.response.data.msg);
      // }
    }

    // function GetFileData(){
    //   return setUploadedFile;
    // }

  };

  render (){
  return (
    <Fragment>
      {/* {message ? <Message msg={message} /> : null} */}
      <form onSubmit={this.onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={this.onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            Jeg
          </label>
        </div>

        {/* <Progress percentage={uploadPercentage} /> */}

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>Scris</h3>
            {/* <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' /> */}
          </div>
        </div>
    </Fragment>
  );
  }
};

export default FileUpload;
