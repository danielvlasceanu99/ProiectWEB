import React from 'react'
 
class NoteAddForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      subject: '',
      text: '',
      userId: 1
    }
 
    this.add = () => {
      this.props.onAdd({
        title: this.state.title,
        subject: this.state.subject,
        text: this.state.text,
        userId: 1
      })
    }
 
    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
  }
 
  render () {
    return (
      <div>
        <div>
          <label htmlFor='title'>Title</label>
          <input type='text' name='title' id='title' value={this.state.title} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor='subject'>subject</label>
          <input type='subject' name='subject' id='subject' value={this.state.subject} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor='text'>text</label>
          <input type='text' name='text' id='text' value={this.state.text} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor='userId'>userId</label>
          <input type='userId' name='userId' id='userId' value={this.state.userId} onChange={this.handleChange} />
        </div>
        <div>
          <input type='button' value='add' onClick={this.add} />
        </div>
      </div>
    )
  }
}
 
export default NoteAddForm