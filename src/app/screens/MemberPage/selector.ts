import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../types/screen";

 
const selectMemberPage = (state: AppRootState) => state.memberPage;
export const retrieveChoosenMember = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.choosenMember
);
export const retrieveChosenMemberBoArticles = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenMemberBoArticles
);
export const retrieveChosenSingleBoArticle = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenSingleBoArticle
);
export const retrieveMemberFollowers = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.memberFollowers
);
export const retrieveMemberFollowings = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.memberFollowings
);