interface ILoginBody {
  email: string;
  password: string;
}
export const loginUser = async (body: ILoginBody) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};

export const fetchChat = async (chatId: string, token: string) => {
  console.log("fetching chat")
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/getChat/${chatId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });
  const data = await res.json();
  return data;
}

export const getCurrentDate = () => {
  const currentDate = new Date();

  // Months array
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Format the date
  const formattedDate = `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
  return formattedDate
}