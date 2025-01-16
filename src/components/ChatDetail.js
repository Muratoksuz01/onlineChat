import React, { } from "react";
import HeadersOfChatDatail from "./HeadersOfChatDatail"
import FooterOfChatDetail from "./FooterOfChatDetail"
import ContentOfChatDetail from "./ContentOfChatDetail"
const ChatDetail = ({ chat }) => {


  return (
    <div className="flex flex-col " style={{ padding: "20px" }}>
      <HeadersOfChatDatail  chat={chat} />
      <ContentOfChatDetail className={"grow"} chat={chat} />
      <FooterOfChatDetail className={"flex-none"} chat={chat}/>
    </div>
  );
};

export default ChatDetail;
