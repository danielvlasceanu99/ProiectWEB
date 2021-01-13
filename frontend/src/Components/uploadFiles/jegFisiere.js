import React, { Fragment, useState } from 'react';
import filestore from './FileStore';
//import FileDB from './backend/models/file/FileDB'
import axios from 'axios';
//temport comentez route
//import { route } from '../../../../backend/routes';

class jegFisiere extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
          name:'',
          link:''
        }
    
        this.onChange = e => {
            this.state.link = `${__dirname}/${e.target.files[0].name}`;
            this.state.name = e.target.files[0].name;
          };

          this.add = async () => {


            console.log(this.props.idNote);
        //     const formData = new FormData();
        //     formData.append('file', this.state);
        //     console.log(this.state);
        //     console.log(formData);
        // try {
        //         const res = await axios.post('http://localhost:9999/1/create-file', formData, {
        //             headers: {
        //     'Content-Type': 'multipart/form-data'
            
        //         }
        //         }
        //         )
        // }
        // catch(err){

        //     }

            this.props.onAdd({
                name:this.state.name,
                link:this.state.link
                
            })
          }

    }


render () {
        return (
            <Fragment>
                <form >
                    <div className='custom-file mb-4'>
                    <input
                        type='file'
                        className='custom-file-input'
                        id='customFile'
                        onChange={this.onChange}
                    />
                    <label className='custom-file-label' htmlFor='customFile'>
                        {this.state.name}
                    </label>
                    </div>
                    <input type='button' value='Add' onClick={this.add} />
                </form>
            </Fragment>
            
        )
    }
}

export default jegFisiere;