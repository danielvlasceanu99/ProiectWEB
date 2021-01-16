import React, { Component, Fragment } from "react";
import axios from "axios";
import FileStore from './FileStore'
const SERVER = "http://localhost:9999";
//const download=require("download");
var NumeFileSelector="Choose File";



export class FileUpload extends Component {
	constructor (props) {
		super(props)
		//console.log('text constructor: '+ this.props.idLogat)
	 
		this.state = {
			file: null,
			files:[],
			procent:0,
			
		}
	

	this.fileSelectedHandler = (event) => {
		this.setState({ file: event.target.files[0]});
		NumeFileSelector=event.target.files[0].name
	};


	this.fileUploadHandler = async (e) => {
		const file = this.state.file;

		const myFile = new FormData();

		myFile.append("file", file);
		console.log(myFile);
		console.log(myFile.getAll("file"));

		try {
			const res = await axios.post(`${SERVER}/${this.props.idNote}/uploadFile`, myFile,{
			onUploadProgress: progressEvent => {
				this.setState({
					procent:parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
				});
	  
				// Clear percentage
				setTimeout(() => this.setState({procent:0}), 3000);
			}
			  });
		} catch (error) {
			console.log(error);
		}

		FileStore.getAll(this.props.idNote);
		FileStore.emitter.addListener('GET_FILES_SUCCESS', () => {
			this.setState({
			  files: FileStore.data
			})
		  });
		console.log(this.state.files);
	};

	 
		
	 this.Download = (e) =>{
		
		// const fileDownload = e;

		// const myFileDownload = new FormData();

		// myFileDownload.append("file", fileDownload);
		// try {
		// 	const down = await axios.get(`${SERVER}/dowloadFile`, fileDownload);
		// } catch (error) {
		// 	console.log(error);
		// }
			// axios({
			// 	url: e.link, //your url
			// 	method: 'GET',
			// 	responseType: 'blob', // important
			// }).then((response) => {
			// 	const url = window.URL.createObjectURL(new Blob([response.data]));
			// 	const link = document.createElement('a');
			// 	link.href = url;
			// 	link.setAttribute('download', e.name); //or any other extension
			// 	document.body.appendChild(link);
			// 	link.click();
			// });
			// var link=document.getElementsByClassName("DL");
			// if (link !=null){
			// //link.setAttribute("href",e.link);
			// }
			//asta merge intrun fel
			// window.open(`${SERVER}/downloadFile/${e.id}`);
			
			//FileStore.Download(e)
			window.open(`${SERVER}/downloadFile/${e.id}`);
			//axios.get(`${SERVER}/downloadFile/${e.id}`);
	}
	
	}
	componentDidMount() {
		FileStore.getAll(this.props.idNote);
		FileStore.emitter.addListener('GET_FILES_SUCCESS', () => {
			this.setState({
			  files: FileStore.data
			})
		  });
		console.log(this.state.files);
		
	};

	


	render() {
		return (
			<Fragment >
				<div className='menu'>
					<div class="custom-file">
						<input type="file" class="custom-file-input" id="customFile" onChange={this.fileSelectedHandler}></input>
						<label class="custom-file-label" for="customFile">{NumeFileSelector}</label>
					</div>
					<button onClick={this.fileUploadHandler}> Upload </button>
					<div className='progress'>
						<div
							className='progress-bar progress-bar-striped bg-success'
							role='progressbar'
							style={{ width: `${this.state.procent}%` }}
						>
							{this.state.procent}%
						</div>
					</div>
					<br/>
					{
					this.state.files.map((fila,index) => 
					<div>
						<button onClick={(e)=>this.Download(fila)}>{fila.name}</button>
					</div>)
					}
				</div>
				
			</Fragment>
		);
	}
}

export default FileUpload;
