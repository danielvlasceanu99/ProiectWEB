import {EventEmitter} from 'fbemitter'

const SERVER ='http://localhost:9999'

class FileStore{
    constructor(){
        this.data=[]
        this.emitter = new EventEmitter()
    }

    async getAll(id,idNote){
        try{
            const response = await fetch(`${SERVER}/${id}/${idNote}/files`)
            const data = await response.json()
            this.data = data
            this.emitter.emit('GET_PLANES_SUCCESS')
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
}

const filestore = new FileStore()

export default filestore