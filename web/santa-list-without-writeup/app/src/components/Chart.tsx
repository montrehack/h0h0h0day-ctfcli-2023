import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Title from "./Title";

function addVariance(num: number) {
  const variance = Math.random() * 100 - 50;

  return Math.floor(num + variance);
}

// Generate Sales Data
function createData(name: string, amount: number) {
  return {
    name,
    naughty: addVariance(amount),
  };
}

const NaughtyData = [
  createData("1995", 300),
  createData("2000", 600),
  createData("2005", 800),
  createData("2010", 1500),
  createData("2015", 2000),
  createData("2020", 2400),
  createData("2023", 2400),
];
const nbData = NaughtyData.length - 1;

const NiceData = NaughtyData.map((e, idx) => {
  return {
    name: NaughtyData[nbData - idx].name,
    nice: addVariance(e.naughty),
  };
});

export default function Chart() {
  const theme = useTheme();

  return (
    <>
      <Title>Naughty vs. Nice</Title>
      <ResponsiveContainer>
        <LineChart
          width={600}
          height={300}
          margin={{ top: 16, right: 16, left: 24, bottom: 5 }}
        >
          <XAxis
            type="number"
            dataKey="name"
            domain={["auto", "auto"]}
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Children
            </Label>
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            data={NaughtyData}
            dataKey="naughty"
            strokeWidth={4}
            stroke={theme.palette.primary.main}
            dot={false}
          />
          <Line
            type="monotone"
            data={NiceData}
            dataKey="nice"
            dot={false}
            strokeWidth={4}
            stroke={theme.palette.secondary.main}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
