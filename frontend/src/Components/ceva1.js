import './App.css';
import React from 'react'
import store from './NoteStore'
import NoteAddForm from './NoteAddForm'
import NoteDetails from './NoteDetails'

class App extends React.Component {
  constructor () {
    super()
 
    this.state = {
      notita: [],
      notes: [],
      adauga: 0
    }
 
    this.add = (note) => {
      store.addOne(note)
      this.state.adauga = 0
    }

    this.getOne= () =>{
      store.getOne()

      store.emitter.addListener('GET_NOTE_SUCCESS', () => {
        this.setState({
          notes: store.data
          // notita: store.data ???????? to do
        })
        console.log('succes')
      })
    }

    this.change = (i) => {
      this.setState({adauga : i})
    }
    this.display = () =>{
      this.setState({adauga : 2});
    }
    this.afiseaza=(note)=>{
      NoteDetails.show(note)
    }
  }
 
  componentDidMount () {
    store.getAll()
 
    store.emitter.addListener('GET_PLANES_SUCCESS', () => {
      this.setState({
        notes: store.data
      })
    })
  }
 
  render () {
    if(this.state.adauga === 0){
     return (
      <div>
      <h1>TITLU</h1>
       <input type="button" value="Adauga" onClick={()=>this.change(1)}></input>
       <br></br>
       <span> Titlu notita </span>
       <span>Materie</span>

        {
          this.state.notes.map(e => 
          <div>
            <button id={e.id} onClick={this.display}>Display</button>

            {e.title} {e.subject}
          </div>)
        }
        </div>)
      }
      else if(this.state.adauga === 1)return (
        <div>
        <h1>TITLU</h1>
        <NoteAddForm onAdd={this.add}/>
        <button onClick={() => this.change(0)}>Cancel</button>
        </div>
      )
      else if(this.state.adauga === 2)return (
        <div>
          <NoteDetails/>

          <button onClick={() => this.change(0)}>Cancel</button>
        </div>
      )
  }
}
 
export default App