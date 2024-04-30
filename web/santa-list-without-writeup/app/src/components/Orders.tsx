import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { EntryType, ListEntry } from "../generated/schema_v2";
import { useState, useEffect } from "react";
import { styled } from "@mui/material";
import { client } from "../utils/grpcSDK";

const titles = ["Naughty children", "Nice children"];
const capitalize = (s: string) => s[0].toUpperCase() + s.substring(1);

const HeaderTextCell = styled(TableCell)({
  fontWeight: "bold",
});

export default function Orders(props: { type: EntryType }) {
  const [entries, setEntries] = useState<ListEntry[]>([]);

  useEffect(() => {
    if (!entries.length) {
      client
        .getValues({
          type: props.type,
        })
        .then((res) => {
          setEntries(res.response.entries);
        });
    }
  }, []);

  return (
    <React.Fragment>
      <Title>{titles[props.type]}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <HeaderTextCell>Name</HeaderTextCell>
            <HeaderTextCell>Gift</HeaderTextCell>
            <HeaderTextCell>Type</HeaderTextCell>
            <HeaderTextCell>Location</HeaderTextCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.gift}</TableCell>
              <TableCell>{capitalize(row.type)}</TableCell>
              <TableCell>{row.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
