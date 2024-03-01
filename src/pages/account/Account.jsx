import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import { signUser } from "../../utils/api"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchUsers } from '../../store/user'
import "./account.css"
import { useParams } from "react-router-dom"
const Account = () => {
    const navigate = useNavigate();
    const params = useParams();
    const userData = useSelector((state)=>state.users.users)
    const {operation} = params;
    const [loggedIn,setLoggedIn] = useState(false);
    const [user,setUser] = useState("")
    console.log(params)
    // const [authenticated,setAuthenticated] = useState(false);
    const createNewUser = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target)
        const formObj = {}
        
        formData.forEach((value, key) => {
            console.log(key,value)
            formObj[key] = value;
          });
          formObj.watchlist = [];
          let existingUser = false;
          for(const user of userData){
            if((formObj.username.toLowerCase() === user.username.toLowerCase()) && (formObj.password === user.password) ){

                alert('Please enter a differnt username')
                    existingUser = true;
            }
          }
    

        if(!existingUser){
            let userList =   signUser(formObj);
            userList.then((res)=>{
              console.log(res);
            })
        }
      

    }

    const logUser = (e)=>{

        e.preventDefault();
        const formData = new FormData(e.target)
        const formObj = {}
        formData.forEach((value, key) => {
            console.log(key,value)
            formObj[key] = value;
          });
        for(const user of userData){
            if((user.username === formObj.username) && (user.password === formObj.password)){     
                console.log("You are logged in")
                setLoggedIn(true);
                // setUser(user);
                const  userTokenObj = {
                    "auth" : 1,
                    "username" : user.username,
                    "tokenId" : `${user.username}-${user.id}`
                }
                console.log(userTokenObj)
                localStorage.setItem("userToken",JSON.stringify(userTokenObj))
                localStorage.setItem("currentUser",JSON.stringify(user))
                setUser(user);
                userPersist(loggedIn)
                navigate("/account/you")
                break;
            }else{
                setLoggedIn(false);
                console.log("Wrong credentials");
            }
        }
    }
    
    // console.log(user)

useEffect(()=>{

    userPersist();

    checkUserOnLoad()
    

})

useEffect(()=>{
    const currentUser =  localStorage.getItem("currentUser");
    //    setUser(currentUser)
    console.log(JSON.parse(currentUser))
       setUser(JSON.parse(currentUser));

},[])

    const checkUserOnLoad = ()=>{

        const auth = localStorage.getItem("userToken");
        // console.log(auth)
        // setUser(auth.username)
        if(!auth){
            
            setLoggedIn(false)
            console.log("Please log in")
        }

       

    }

    
    const userPersist = (status)=>{

        const auth = localStorage.getItem('userToken');
        if(auth){

                setLoggedIn(true);
            
        }else{
            setLoggedIn(false);
            console.log("no auth found")
        }

    }
  return (
        <>


            { operation === 'login' ? (

                <div  className='loginFormContainer login'>
                    <div className={`formBox  ${loggedIn ? "user" : "guest"}`}>
                    <ContentWrapper>
                            

                            <div className="formTitle">
                                Login Form
                            </div>

                            <form  onSubmit={(e)=>{logUser(e)}} className="loginForm">
                                <div className='nameUser'>
                                    <label htmlFor="userNameLog"> Username</label>
                                    <input name="username" id='userNameLog' type="text" />

                                </div>
                                <div className='passUserLog'>
                                    <label htmlFor="passwordLog"> Password</label>
                                    <input  name="password" id='passwordLog' type="password" />

                                </div>
                                <input  type="submit" value="submit"/>

                            </form>
                        </ContentWrapper>
                    </div>
                        
            </div>
            ) : operation === 'register'   ? (

                <div className='loginFormContainer register'>
                    <div className={`formBox  ${loggedIn ? "user" : "guest"}`}>

                            <ContentWrapper>

                                <div className="formTitle">
                                    Register Form
                                </div>

                                <form  onSubmit={(e)=>{createNewUser(e)}} className="registerForm">
                                    <div className='nameUser'>
                                        <label htmlFor="userNameReg"> Username</label>
                                        <input  name="username" id='userNameReg' type="text" />

                                    </div>
                                    <div className='passUserReg'>
                                        <label htmlFor="passwordReg"> Password</label>
                                        <input name="password" id='passwordReg' type="password" />

                                    </div>

                                    <input  type="submit" value="submit"/>
                                    
                                </form>
                            </ContentWrapper>

                    </div>
            </div>
            )
            :

            (

                <div className="accountDetailsSection">
                    <ContentWrapper>
                        <div className="accountDetails">
                            Hi, {user?.username}
                        </div>
                        <div className="watchlist">


                            <div className="watchlistTitle">
                                Watchlist
                            </div>
                            <div className="watchlistTitle">
                                
                            </div>
                             
                            
                        </div>

                        
                    </ContentWrapper>
                </div>

            )


            }
        </>
  )
}

export default Account