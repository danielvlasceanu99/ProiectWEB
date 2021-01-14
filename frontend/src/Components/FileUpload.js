import React, { Component, Fragment } from 'react'
import axios from 'axios'

export class FileUpload extends Component {

    state={
        file: null
    }

    fileSelectedHandler = event =>{
        this.setState({file: event.target.files[0]})
    }

    fileUploadHandler= async e=>{
   
        const file = this.state.file

        const myFile = new FormData();

        myFile.append('file', file)
        console.log(myFile)
        console.log(myFile.getAll('file'))

        try{
            const res = await axios.post('http://localhost:9999/uploadFile', myFile)

        }catch(error){
            console.log(error)
        }
     
    }

    render() {
        return (
            <Fragment>
                    <div className="menu">
                        <input type="file" id='customFile'onChange={this.fileSelectedHandler}></input>
                        <button onClick={this.fileUploadHandler}> Upload </button>
                    </div>
            </Fragment>
        )
    }
}

export default FileUpload
