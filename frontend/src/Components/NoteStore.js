import {EventEmitter} from 'fbemitter'

const SERVER ='http://localhost:9999'

class NoteStore{
    constructor(){
        this.data=[]
        this.emitter = new EventEmitter()
    }

    async getAll(){
        try{
            const response = await fetch(`${SERVER}/1/notes`)
            const data = await response.json()
            this.data = data
            this.emitter.emit('GET_PLANES_SUCCESS')
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('GET_PLANES_ERROR')
        }
    }

    async addOne(note){
        try{
            await fetch(`${SERVER}/1/create-note`,{
                method: 'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(note)
            })
            this.getAll()
        }catch(err){
            console.warn(err)
            this.emitter.emit('ADD_PLANES_ERROR')
        }
    }

    async getOne(){
        try{
            const response = await fetch(`${SERVER}/notes/1`)
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

const store = new NoteStore()

export default store