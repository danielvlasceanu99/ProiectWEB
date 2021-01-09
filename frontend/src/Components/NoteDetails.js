import React from 'react'

const SERVER ='http://localhost:9999'
 
class NoteDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        title: '',
        subject: '',
        text: '',
        userId: 1
      }
      this.data=[]
      
      this.show = () => {
        this.props.onAdd({
          title: this.state.title,
          subject: this.state.subject,
          text: this.state.text,
          userId: 1
        })
    }
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}
 
export default NoteDetails
      
      