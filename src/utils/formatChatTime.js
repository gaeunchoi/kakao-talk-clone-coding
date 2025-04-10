export const formatChatTime = (isChatBubble, chatTimeInfo) => {
  const now = new Date();
  const chatTime = new Date(chatTimeInfo);

  if(isChatBubble){
    return chatTime.toLocaleTimeString("ko-KR", {hour: "2-digit", minute: "2-digit", hour12: true});
  } else {
    const isToday = now.getFullYear() === chatTime.getFullYear() && now.getMonth() === chatTime.getMonth() && now.getDate() === chatTime.getDate();
  
    let yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = yesterday.getFullYear() === chatTime.getFullYear() && yesterday.getMonth() === chatTime.getMonth && yesterday.getDate() === chatTime.getDate();
  
    if(isToday){
      return chatTime.toLocaleTimeString("ko-KR", {hour: "2-digit", minute: "2-digit", hour12: true});
    } else if(isYesterday){
      return "어제";
    } else {
      return `${chatTime.getMonth() + 1}월 ${chatTime.getDate()}일`
    }
  }  
}
