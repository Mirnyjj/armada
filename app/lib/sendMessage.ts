const baseUrl = `https://api.telegram.org/bot${process.env
  .NEXT_PUBLIC_BOT_ID!}/`;
export const sendMessage = async (message: string) => {
  const url = `${baseUrl}sendMessage?chat_id=${process.env
    .NEXT_PUBLIC_CHAT_ID!}&text=${message}`;
  const response = await fetch(url);
  const fetchResTelegram = await response.json();

  return fetchResTelegram;
};
