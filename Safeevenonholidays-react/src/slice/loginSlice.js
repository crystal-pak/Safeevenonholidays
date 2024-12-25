import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginPost } from '../api/memberApi'
import { getCookie, removeCookie, setCookie } from '../util/cookieUtil'

const initState = {
    email : ''
}

//쿠키에서 로그인 정보 로딩
const loadMemberCookie = () => {
    const memberInfo = getCookie("member")

    //닉네임 처리
    if (memberInfo && memberInfo.nickName) {
        memberInfo.nickName = decodeURIComponent(memberInfo.nickName)
    }
    return memberInfo
}

//createAsyncThunk('이름', () => {})
export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param)
})

const loginSlice = createSlice({
    name: 'LoginSlice',
    //쿠키가 없다면 초깃값 사용
    initialState: loadMemberCookie() || initState,
    reducers: {
        login: (state, action) => {
            console.log("login...")
            const data = action.payload
            return { email : data.email }
        },
        logout: (state, action) => {
            console.log("logout...")
            removeCookie("member")
            return {...initState}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.pending, (state, action) => {
            //데이터 오는 중
            console.log("pending : 데이터 오는 중")
        })
        .addCase(loginPostAsync.fulfilled, (state, action) => {
            //데이터 성공
            console.log("fulfilled : 성공")
            const payload = action.payload

            //정상적인 로그인시 쿠키 저장
            if(!payload.error) {
                setCookie("member", JSON.stringify(payload), 1)
                //1은 하루를 의미
            }

            return payload
        })
        .addCase(loginPostAsync.rejected, (state, aciton) => {
            //데이터 실패
            console.log("rejected : 실패")
        })
    }
})

export const { login, logout } = loginSlice.actions

export default loginSlice.reducer