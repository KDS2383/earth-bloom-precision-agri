import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSoilDataStore } from "@/store/soilDataStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Results = () => {
  const navigate = useNavigate();
  const soilData = useSoilDataStore((state) => state.soilData);

  useEffect(() => {
    if (!soilData) {
      navigate("/soil-data");
    }
  }, [soilData, navigate]);

  if (!soilData) {
    return null;
  }

  const nutrientData = [
    { name: "Nitrogen", value: soilData.nitrogen },
    { name: "Phosphorus", value: soilData.phosphorus },
    { name: "Potassium", value: soilData.potassium },
  ];

  const getPhLevel = (ph: number) => {
    if (ph < 6.0) return "Acidic - May need lime to increase pH";
    if (ph > 7.5) return "Alkaline - May need sulfur to decrease pH";
    return "Neutral - Optimal for most plants";
  };

  const getMoistureLevel = (moisture: number) => {
    if (moisture < 20) return "Low - Irrigation needed";
    if (moisture > 40) return "High - Reduce watering";
    return "Optimal - Good moisture content";
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Soil Analysis Results</h1>
        
        {/* pH and Moisture Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>pH Level Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{soilData.ph}</div>
              <p className="text-muted-foreground">{getPhLevel(soilData.ph)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Moisture Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{soilData.moisture}%</div>
              <p className="text-muted-foreground">
                {getMoistureLevel(soilData.moisture)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Nutrients Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Nutrient Levels (mg/kg)</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nutrientData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#9b87f5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Additional Measurements */}
        <Card>
          <CardHeader>
            <CardTitle>Other Measurements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Organic Matter</h3>
                <p className="text-2xl mb-1">{soilData.organicMatter}%</p>
                <p className="text-sm text-muted-foreground">
                  {soilData.organicMatter < 2
                    ? "Low - Consider adding compost"
                    : "Good organic matter content"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Soil Temperature</h3>
                <p className="text-2xl mb-1">{soilData.temperature}°C</p>
                <p className="text-sm text-muted-foreground">
                  {soilData.temperature < 10
                    ? "Cold - May slow plant growth"
                    : soilData.temperature > 30
                    ? "Hot - Monitor moisture levels"
                    : "Optimal temperature range"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Results;