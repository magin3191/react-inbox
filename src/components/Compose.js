import React from 'react'


const Compose= ({composeMail})=>{
  const messageAdded =(event)=>{
    event.preventDefault()
    composeMail({
      subject: event.target.subject.value,
      body: event.target.body.value
    })
  }
  return(
    <form className="form-horizontal well" onSubmit={messageAdded}>

    <div className="form-group">
      <div className="col-sm-8 col-sm-offset-2">
        <h4>Compose Message</h4>
      </div>
    </div>
    <div className="form-group">
      <label for="subject" className="col-sm-2 control-label">Subject</label>
      <div className="col-sm-8">
        <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"  refs='subject'/>
      </div>
    </div>
    <div className="form-group">
      <label for="body" className="col-sm-2 control-label">Body</label>
      <div className="col-sm-8">
        <textarea name="body" id="body" refs='body' className="form-control" ></textarea>
      </div>
    </div>
    <div className="form-group">
      <div className="col-sm-8 col-sm-offset-2">
        <input type="submit" value="Send" className="btn btn-primary" />
      </div>
    </div>
  </form>
  )
}


export default Compose
