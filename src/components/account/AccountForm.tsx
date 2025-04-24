import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  ThemeProvider,
  createTheme,
  Tabs,
  Tab,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

import axios from "axios";
import { auth } from "../../firebase";
import Swal from "sweetalert2";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32",
    },
    secondary: {
      main: "#aed581",
    },
    background: {
      default: "#f1f8e9",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: { fontWeight: 600 },
    h6: { fontWeight: 500 },
    body1: { fontSize: "1rem" },
    button: { textTransform: "none", fontWeight: 500 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "10px 20px",
        },
      },
    },
  },
});

function AccountInfo() {
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [farmData, setFarmData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      const currentUser = auth.currentUser;
      if (!currentUser?.email) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }
      const userEmail = currentUser.email;
      const authToken = localStorage.getItem("Authorization");

      try {
        const res = await axios.get(
          "https://final-year-precision-farming-deployed.vercel.app/api/account/get-account",
          {
            params: { email: userEmail },
            headers: {
              "Content-Type": "application/json",
              ...(authToken && { Authorization: "Bearer " + authToken }),
            },
          }
        );

        const { username, email, contactNum, address, city, pincode } = res.data;
        const updatedData = {
          name: username || currentUser.displayName || "",
          email: email || userEmail,
          phone: contactNum || "",
          address: address || "",
          city: city || "",
          pincode: pincode || "",
        };

        setAccountData(updatedData);
        setOriginalData(updatedData);
      } catch (err) {
        setError("Account is not registered with any 'Farm' Details.");

        setAccountData((prev) => ({
          ...prev,
          name: currentUser.displayName || "",
          email: userEmail,
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleAccountSubmit = async (e) => {
    e.preventDefault();

    const hasChanges = Object.keys(accountData).some(
      (key) => accountData[key] !== originalData[key]
    );

    if (!hasChanges) {
      Swal.fire({
        icon: "info",
        title: "No changes made",
        text: "You haven't updated any information.",
        customClass: {
          popup: "custom-swal-zindex",
          container: "custom-swal-zindex",
        },
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update your account information?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "custom-swal-zindex",
        container: "custom-swal-zindex",
      },
    });

    if (result.isConfirmed) {
      try {
        const authToken = localStorage.getItem("Authorization");
        await axios.put(
          "https://final-year-precision-farming-deployed.vercel.app/api/account/update-account",
          accountData,
          {
            headers: {
              "Content-Type": "application/json",
              ...(authToken && { Authorization: "Bearer " + authToken }),
            },
          }
        );

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Your account information has been updated.",
          customClass: {
            popup: "custom-swal-zindex",
            container: "custom-swal-zindex",
          },
        });

        setOriginalData({ ...accountData });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: err?.response?.data?.message || "Something went wrong.",
          customClass: {
            popup: "custom-swal-zindex",
            container: "custom-swal-zindex",
          },
        });
      }
    }
  };

  const handleCityPincodeChange = (e) => {
    const value = e.target.value;
    const [city, pincode] = value.split("-").map((x) => x.trim());
    setAccountData({ ...accountData, city, pincode });
  };

  const displayCityPincode = () => {
    return [accountData.city, accountData.pincode].filter(Boolean).join(" - ");
  };

  if (loading) return <Box p={4}>Loading account data...</Box>;
  if (error) return <Box p={4} color="error.main">{error}</Box>;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: "1200px", mx: "auto", p: 4, backgroundColor: "background.default", minHeight: "100vh" }}>
        <Tabs
          value={tabIndex}
          onChange={(_, newIndex) => setTabIndex(newIndex)}
          textColor="primary"
          indicatorColor="primary"
          centered
          sx={{ mb: 4 }}
        >
          <Tab label="Account Info" />
          <Tab label="Farm Data" />
        </Tabs>

        {tabIndex === 0 && (
          <Paper sx={{ p: 4 }} elevation={3}>
            <Typography variant="h4" gutterBottom color="primary">
              Account Information
            </Typography>

            <Box component="form" onSubmit={handleAccountSubmit} mt={2}>
              <Stack spacing={3}>
                <TextField
                  label="Name"
                  fullWidth
                  variant="standard"
                  required
                  value={accountData.name}
                  onChange={(e) =>
                    setAccountData({ ...accountData, name: e.target.value })
                  }
                />
                <TextField
                  label="Email"
                  fullWidth
                  variant="standard"
                  value={accountData.email}
                  disabled
                />
                <TextField
                  label="Phone"
                  fullWidth
                  variant="standard"
                  value={accountData.phone}
                  onChange={(e) =>
                    setAccountData({ ...accountData, phone: e.target.value })
                  }
                />
                <TextField
                  label="Address"
                  fullWidth
                  variant="standard"
                  value={accountData.address}
                  onChange={(e) =>
                    setAccountData({ ...accountData, address: e.target.value })
                  }
                />
                <TextField
                  label="City - Pincode"
                  fullWidth
                  variant="standard"
                  value={displayCityPincode()}
                  onChange={handleCityPincodeChange}
                />
              </Stack>

              <Box mt={4}>
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
              </Box>
            </Box>
          </Paper>
        )}

        {tabIndex === 1 && (
          <Box>
            <Typography variant="h4" gutterBottom color="primary">
              My Farm Records
            </Typography>

            {farmData.length > 0 ? (
              farmData.map((farm, index) => {
                let previousCrops = [];
                try {
                  previousCrops = JSON.parse(farm.previousCrops || "[]");
                } catch {}

                let marker = { lat: "N/A", lng: "N/A" };
                try {
                  marker = farm.markerPosition
                    ? JSON.parse(farm.markerPosition)
                    : marker;
                } catch {}

                return (
                  <Card key={index} sx={{ mb: 3, backgroundColor: "#ffffff" }}>
                    <CardContent>
                      <Typography variant="h6" color="primary">
                        Farm #{index + 1}
                      </Typography>

                      <Typography variant="body1">
                        <strong>Area:</strong> {farm.area} {farm.measureScale}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Address:</strong> {farm.address}, {farm.city} - {farm.pincode}
                      </Typography>
                      <Typography variant="body1">
                        <strong>GPS:</strong> {marker.lat}, {marker.lng}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Previous Crops:</strong>{" "}
                        {previousCrops.length > 0 ? previousCrops.join(", ") : "None"}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Paper sx={{ p: 3 }}>
                <Typography>No farm data available yet.</Typography>
              </Paper>
            )}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default AccountInfo;
