import { UserCard } from "../components/UserCard";
import { cleanUser } from "../libs/CleanUser";
import axios from "axios";
import { useState } from "react";
export default function RandomUserPage() {
  const [users, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState(1);

  const generateBtnOnClick = async () => {
    setIsLoading(true);
    // แก้ไข: ใช้ backticks (` `) แทน
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    // แก้ไข: ประกาศตัวแปรใหม่เพื่อรับค่าจาก API
    const rawUsers = resp.data.results;
    // แก้ไข: ใช้ .map เพื่อเรียกฟังก์ชัน cleanUser
    const cleanUsers = rawUsers.map((user: any) => cleanUser(user));
    // แก้ไข: อัปเดต state ด้วยข้อมูลที่ clean แล้ว
    setUsers(cleanUsers);
  };

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(event: any) => setGenAmount(event.target.value)}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {/* แก้ไข: ใช้ users ที่เป็น state ในการวนลูป */}
      {!isLoading && users.map((user: any, index: number) => (
        <UserCard
          key={index}
          name={user.name}
          imgUrl={user.imgUrl}
          address={user.address}
          email={user.email}
        />
      ))}
    </div>
  );
}