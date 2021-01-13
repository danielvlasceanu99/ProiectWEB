import React from 'react'
import store from './NoteStore'

const SERVER ='http://localhost:9999'
 
class NoteDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        note: []
      }
  }

  componentDidMount(){
    store.getOne(this.props.idNote)

    store.emitter.addListener('GET_NOTE_SUCCESS', () => {
      this.setState({
        note: store.data
      })
      //console.log('succes get_note')
      //console.log()
    })
  }

  render () {
    return (
      <div>
        <div>{'Titlu: ' + this.state.note.title}</div>
        <div>{'Materie: ' + this.state.note.subject}</div>
        <div>{'TEXT: ' + this.state.note.text}</div>
       
      </div>
    )
  }
}
 
export default NoteDetails
      
      