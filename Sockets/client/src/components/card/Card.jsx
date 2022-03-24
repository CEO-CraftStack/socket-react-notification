import { useState } from 'react'
import './card.css'

const Card = ({post, socket, user}) => {
    
    const [liked, setLiked] = useState(false)

     const handleNotification = (type) => {
         setLiked(true);
         socket.emit("sendNotification", {
            senderName:user, 
            receiverName: post.username,
            type,
         });
     };

    return (
        <div className='card'>
            <div className="info">
                <img src={post.userImg} alt="" className='userImg' />
                <span>{post.fullname}</span>

            </div>
            <img src={post.postImg} alt="" className='postImg'/>
            <div className="interaction">

            {liked ? (
            <i className="fa-solid fa-heart cardRed"></i>
            ) : (
            <i className="fa-solid fa-heart cardIcon" onClick={()=> handleNotification(1)}></i>
            )}
            <i className="fa-solid fa-comments cardIcon" onClick={()=> handleNotification(2)}></i>
            <i className="fa-solid fa-share cardIcon" onClick={()=> handleNotification(3)}></i>
            <i className="fa-solid fa-info cardIcon infoIcon" onClick={()=> handleNotification(4)}></i>
            </div>
        </div>
    )
}
export default Card;
