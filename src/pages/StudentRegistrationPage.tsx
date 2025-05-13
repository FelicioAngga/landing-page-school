import { useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import StudentRegistration from "../features/student-registration";
import { isAuthenticated } from "../utils/getAccessToken";
import { useNavigate } from "react-router-dom";

function StudentRegistrationPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) navigate("/login");
  }, []);

  return (
    <div>
      <NavigationBar />
      <StudentRegistration />
    </div>
  )
}

export default StudentRegistrationPage;
