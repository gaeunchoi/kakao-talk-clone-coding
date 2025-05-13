import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export const formatChatTime = (isChatBubble, chatTimeInfo) => {
  const now = dayjs();
  const chatTime = dayjs(chatTimeInfo);

  if (isChatBubble) {
    return chatTime.format("A hh:mm");
  }

  const isToday = now.isSame(chatTime, "day");
  const isYesterday = now.add(-1, "day").isSame(chatTime, "day");

  if (isToday) {
    return chatTime.format("A hh:mm");
  } else if (isYesterday) {
    return "어제";
  } else {
    return chatTime.format("M월 D일");
  }
};
