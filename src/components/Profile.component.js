import { useRouter } from "next/router";
const Profile = () => {
    return(
            <div className="flex flex-col justify-center items-center border-solid border-x-2  border-gray-200 h-2/4">
                <div className="rounded-full w-32 h-32 overflow-hidden  mb-1">
                    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" className="w-full h-full "></img>
                </div><br></br><br></br>
                <div className="flex flex-col align-start h-20 w-3/4 text-gray-500 font-sans">
                 <p className="text-3xl text-black font-serif"><b>Donald Trump</b></p>
                 <p>9469693369</p>
                 <p>Diploma</p>
                 <p>Designation</p>
                </div>
            </div>
        
    
    )

}
export default Profile