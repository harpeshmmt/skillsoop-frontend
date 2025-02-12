import { Box, Button, Card } from "@mui/material";
import { useNavigate } from "react-router";
import { showSnackbar } from "../features/counter/snackbarSlice";
import { severity, severityerror } from "../constant/common";
import { logout } from "../components/services/common";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData } from "../features/counter/authSlice";
import AnchorTemporaryDrawer from "../MUI/commonents/drawer";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const tokens = useSelector((state) => state.auth.tokens);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // console.log("User ID:", user.id);
  // console.log("Access Token:", tokens.access);
  // console.log("Access Token:", tokens.refresh);

  const refreshToken = tokens.refresh;

  useEffect(() => {
    if (isAuthenticated) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [isAuthenticated]);

  const UserLogout = async () => {
    try {
      const payload = { refresh: refreshToken };
      const response = await logout(payload);
      dispatch(clearAuthData());
      navigate("/skillsoop-frontend/login");
      dispatch(
        showSnackbar({
          message: "You have been logged out successfully.",
          severity: severity.severityMessage,
        })
      );
    } catch (error: any) {
      const errorMessage = error.response.data.error;
      const detailMessage = error.response.data.detail;
      if (errorMessage) {
        handleErrorResponse(errorMessage, dispatch);
      } else if (detailMessage) {
        handleErrorResponse(detailMessage, dispatch);
      } else {
        dispatch(
          showSnackbar({
            message: "somthing went wrong",
            severity: severityerror.severityMessage,
          })
        );
      }
    }
  };

  const handleErrorResponse = (errorMessage: string, dispatch: any) => {
    dispatch(
      showSnackbar({
        message: errorMessage,
        severity: severityerror.severityMessage,
      })
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          height: "100vh",
          width: 100,
        }}
      >
        <Box>
          <AnchorTemporaryDrawer />
          <Button onClick={UserLogout}>Logout</Button>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
