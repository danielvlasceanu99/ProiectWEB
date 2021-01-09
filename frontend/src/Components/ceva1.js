//import './App.css';
import React from 'react'
import store from './NoteStore'
import NoteAddForm from './NoteAddForm'
import NoteDetails from './NoteDetails'

class App extends React.Component {
  constructor (props) {
    super(props)
    //console.log('text constructor: '+ this.props.idLogat)
 
    this.state = {
      notita: [],
      notes: [],
      adauga: 0,
      N: 0,
    }

    //console.log('id app.js: '+ this.props.idLogat)
 
    this.add = (note) => {
      store.addOne(note,this.props.idLogat)
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
    this.display = (n) =>{
      this.setState({adauga : 2, N: n});
      console.log(n);
    }
  }
 
  componentDidMount () {
    store.getAll(this.props.idLogat)
 
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
      <h1>Notite utilizator {this.props.idLogat}</h1>
       <input type="button" value="Adauga" onClick={()=>this.change(1)}></input>
       <br></br>
       <span> Titlu notita </span>
       <span>Materie</span>

        {
          this.state.notes.map(e => 
          <div>
            <button id={e.id} onClick={()=>this.display(e.id)}>Display</button>
            
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
          <NoteDetails idNote={this.state.N}/>

          <button onClick={() => this.change(0)}>Cancel</button>
        </div>
      )
  }
}
 
export default App