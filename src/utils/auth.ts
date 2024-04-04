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

export const fetchChat = async() => {
  console.log("fetching chat")
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/getChat/660eb0fd0d391d387a7040ce`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await res.json();
      return data;
}