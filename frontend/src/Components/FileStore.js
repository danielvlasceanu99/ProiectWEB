import {EventEmitter} from 'fbemitter'
const Fs = require('fs')  
const Path = require('path')  
const axios = require('axios')

const SERVER ='http://localhost:9999'

class FileStore{
    constructor(){
        this.data=[]
        this.emitter = new EventEmitter()
    }

    async getAll(id){
        try{
            const response = await fetch(`${SERVER}/${id}/files`)
            const data = await response.json()
            this.data = data
            this.emitter.emit('GET_FILES_SUCCESS')
        }
        catch(err){
            //console.warn(err)
            this.emitter.emit('GET_PLANES_ERROR')
        }
    }

    async addOne(file,idNote){
        console.log("mergi fa")
        try{
            await fetch(`${SERVER}/${idNote}/create-file`,{
                method: 'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(file)
            })
            //this.getAll(idNote)
        }catch(err){
            console.warn(err)
            this.emitter.emit('ADD_FIle_CREATE_ERROR')
        }
    }

    async getOne(id){
        try{
            const response = await fetch(`${SERVER}/file/${id}`)
            const data = await response.json()
            this.data = data
            this.emitter.emit('GET_NOTE_SUCCESS')
            console.log(this.data)
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('GET_NOTE_ERROR')
        }
    }

    async saveOne(id, plane){

    }

    async deleteOne(id){

    }

    async Download(fila){
        // const url=e.link;
		// 	const path = Path.resolve(__dirname, 'dowload', e.name)
		// 	const writer = Fs.createWriteStream(path)

		// 	const response = await axios({
		// 		url,
		// 		method: 'GET',
		// 		responseType: 'stream'
		// 	})

		// 	response.data.pipe(writer)

		// 	return new Promise((resolve, reject) => {
		// 		writer.on('finish', resolve)
		// 		writer.on('error', reject)
        // 	})
        try{
            fetch(`${SERVER}/downloadFile/${fila.id}`,{
                method: 'get',
                headers:{
                    "Content-Type": "application/octet-stream",
                    "Content-Disposition" : "attachment; filename=" + fila.name             
                }
            })
            .catch((err)=>{
                console.warn(err);
            })
            //this.getAll(idNote)
        }catch(err){
            console.warn(err)
            this.emitter.emit('ADD_FIle_DOWNLOAD_ERROR')
        }
    }
}

const filestore = new FileStore()

export default filestore