import myAxios from "../plugins/myAxios";
import {setCurrentUserState} from "../states/user";


export  const getCurrentUser = async () =>{
    const res  = await myAxios.get('/user/current');

    console.log("getCurrentUser" + res.data)
    //成功获取则设置用户状态，否则返回空值
    if (res.data){
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}