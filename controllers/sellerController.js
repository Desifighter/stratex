import fs from "fs";
import csv from "csv-parser";

export const addBooksFromCSV = async (req, res) => {
  try {
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



