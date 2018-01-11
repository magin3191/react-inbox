import React from 'react'



const Toolbar = ({selectAll, markAsRead, markAsUnread, del, applyLabel, removeLabel, unreadCount, setButtonState, unclickable}) => {
  return (
    <div className="row toolbar">
  <div className="col-md-12">
    <p className="pull-right">
      <span className="badge badge">{`${unreadCount()}`}</span>
      unread messages
    </p>

    <button className='btn btn-default'  onClick={()=>{selectAll()}}>
      <i className={`${setButtonState()}`} ></i>
    </button>

    <button className="btn btn-default" disabled={`${unclickable()}`} onClick={()=>{markAsRead()}}>
      Mark As Read
    </button>

    <button className="btn btn-default" disabled={`${unclickable()}`} onClick={()=>{markAsUnread()}}>
      Mark As Unread
    </button>

    <select className="form-control label-select" disabled={`${unclickable()}`} onChange={(e)=>{applyLabel(e.target.value)}}>
      <option>Apply label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select className="form-control label-select" disabled={`${unclickable()}`} onChange={(e)=>(removeLabel(e.target.value))}>
      <option>Remove label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <button className="btn btn-default" disabled={`${unclickable()}`} onClick={()=>{del()}}>
      <i className="fa fa-trash-o"></i>
    </button>
  </div>
</div>
  )
}


export default Toolbar
