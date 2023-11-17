import React, { useState, useContext } from 'react';
import { collection, query, where, getDocs, getDoc, setDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import {db} from "../../config/firebase"
import { AuthContext } from '../../context/AuthContext';

export const ChatSearch = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const {currentUser} = useContext(AuthContext);
  


  const handleSearch = async () => {
    const q = query(collection(db, "users"),
    where("displayName", "==", username)
    );

    try{

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    setUser(doc.data())
});
    }catch(err){
      setErr(true);
    }
  };
  const handleKey = (e) =>{
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    
      const res = await getDoc(doc(db, "chats", combinedId));

      console.log(res.exists());
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }

    setUser(null);
    setUsername("")
  };
  
  return (
    <div className='chatsearch'>
        <div className="searchForm">
            <input type="text" placeholder='find user' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)}/>
        </div>
        {err && <span>User not found</span> }
        {user && <div className="userChat" onClick={handleSelect}>
            <img src={user.photoURL} alt=""/>
            <div className="userChatInfo">
                <span>{user.displayName}</span>
            </div>
        </div>}
    </div>
  )
}
