import React, { Component, Fragment } from "react";
import axios from "axios";
import FileStore from './FileStore'
const SERVER = "http://localhost:9999";
//const download=require("download");
var retard=0;



export class FileUpload extends Component {
	constructor (props) {
		super(props)
		//console.log('text constructor: '+ this.props.idLogat)
	 
		this.state = {
			file: null,
			files:[]
		}
	

	this.fileSelectedHandler = (event) => {
		this.setState({ file: event.target.files[0] });
	};

	this.fileUploadHandler = async (e) => {
		const file = this.state.file;

		const myFile = new FormData();

		myFile.append("file", file);
		console.log(myFile);
		console.log(myFile.getAll("file"));

		try {
			const res = await axios.post(`${SERVER}/${this.props.idNote}/uploadFile`, myFile);
		} catch (error) {
			console.log(error);
		}
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
					<input type='file' id='customFile' onChange={this.fileSelectedHandler}></input>
					<button onClick={this.fileUploadHandler}> Upload </button>
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
