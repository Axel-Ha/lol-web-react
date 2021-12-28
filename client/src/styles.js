import React from "react";

export const container = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
};

export const a = {
  textDecoration: "none",
};

export const ul = {
  listStyleType: "none",
  display: "flex",
  ...container,
};

export const li = {
  marginRight: "25px",
  fontSize: "1.62em",
  testDecoration: "none",
  color: "navy",
};

export const column = {
  display: "flex",
  flexDirection: "column",
};

export const row = {
  display: "flex",
  flexDirection: "row",
};

export const fullPage = {
  marginLeft: "2%",
};
