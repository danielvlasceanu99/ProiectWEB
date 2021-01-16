import React from 'react'
import store from './NoteStore'
import NoteAddForm from './NoteAddForm'
import NoteDetails from './NoteDetails'
import FileUpload from "./FileUpload";

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
      <div className="menu">
      <h1>Notite utilizator {this.props.idLogat}</h1>
       <button value="Adauga" onClick={()=>this.change(1)}>Adauga</button>
        {
          this.state.notes.map(e => 
          <div>
            <strong> Denumire notita: </strong> {e.title}
            <p>  <strong>Materie: </strong> {e.subject} </p>
          
            <button id={e.id} onClick={()=>this.display(e.id)}>Display</button>
          </div>)
        }
        </div>)
      }
      else if(this.state.adauga === 1)return (
        <div className="menu">
          <h1>Adauga Notita</h1>
          <NoteAddForm onAdd={this.add}/>
          <button onClick={() => this.change(0)}>Cancel</button>
        </div>
      )
      else if(this.state.adauga === 2)return (
        <div className="menu">
          <NoteDetails idNote={this.state.N}/>
          <button onClick={() => this.change(3)}>Vezi fisiere</button>
          <button onClick={() => this.change(0)}>Cancel</button>
        </div>
      )
      else if(this.state.adauga === 3)return (
        <div className="menu">
          <FileUpload idNote={this.state.N}/>
          <button onClick={() => this.change(2)}>Cancel</button>
        </div>
      )
  }
}
 
export default App