import { useState, useEffect } from 'react';
import './navbar.css'


const Navbar = ({socket}) => {
    const [notifications, setNotifications] = useState([])
    const [open, setOpen] = useState(false);
    useEffect(() => {
     socket.on('getNotification', (data)=> {
      setNotifications((prev) => [...prev, data]);
     })
    },[socket]);
    
     
    
    const displayNotification = ({senderName, type}) => {
        let action;
      if(type === 1){
       action = 'liked'
      }else if(type === 2){
       action = 'commented'
      }else{
          action = 'shared'
      }
      return (
         <span className='notifications'>{`${senderName} ${action} Your Post`}</span> 
      )

    }
    const handleRead = () =>{
        setNotifications([]);
        setOpen(false)
    }
    return (
        <div className='navbar'>
            <span className='logo'>Affluent App</span>
            <div className='icons'>
             <div className='icon' onClick={()=> setOpen(!open)}>
             <i className="fa-solid fa-bell"></i>
             {
                 notifications.length > 0 &&
               <div className="counter">{notifications.length}</div>
             }
                 
             </div>
             <div className='icon' onClick={()=> setOpen(!open)}>
             <i className="fa-solid fa-message"></i>
               
             </div>
             <div className='icon' onClick={()=> setOpen(!open)}>
             <i className="fa-solid fa-heart"></i>
               
             </div>
            </div>
            { open && (
                 <div className="notifications">
                 {notifications.map(n=>displayNotification(n))}
                 <button className='notificationBtn' onClick={handleRead}>Mark as read</button>
             </div>
            )
            }
           

        </div>
    );
}
export default Navbar;  
