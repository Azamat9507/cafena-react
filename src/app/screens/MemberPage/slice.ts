import { createSlice } from "@reduxjs/toolkit";
import { MemberPageState } from "../../../types/screen";

const initialState: MemberPageState = {
  choosenMember: null,
  chosenMemberBoArticles: [],
  chosenSingleBoArticle: null,
  memberFollowers: [],
  memberFollowings: [],
}

const memberPageSlice = createSlice({
  name: "memberPage",
  initialState,
  reducers: {
    setChoosenMember: (state, action) => {
      state.choosenMember = action.payload;
    },
    setChosenMemberBoArticles: (state, action) => {
      state.chosenMemberBoArticles = action.payload;
    },
    setChosenSingleBoArticle: (state, action) => {
      state.chosenSingleBoArticle = action.payload;
    },
    setMemberFollowers: (state, action) => {
      state.memberFollowers = action.payload;
    },
    setMemberFollowings: (state, action) => {
      state.memberFollowings = action.payload;
    },
  },
});

export const { 
  setChoosenMember, 
  setChosenMemberBoArticles, 
  setChosenSingleBoArticle, 
  setMemberFollowers, 
  setMemberFollowings, 
} = memberPageSlice.actions;

const MemberPageReducer = memberPageSlice.reducer;
export default MemberPageReducer;