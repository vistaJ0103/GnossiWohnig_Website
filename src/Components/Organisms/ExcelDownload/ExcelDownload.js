import React, { useState } from "react";
import ReactExport from "react-export-excel";
import { getCollection } from "../../../firebaseProvider";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExcelDownload = ({ collection }) => {
  const [data, setData] = useState();

  const loadData = async () => {
    const rawData = await getCollection(collection);
    setData(getExcelData(rawData));
  };

  if (!data) {
    loadData();
  }

  const getExcelData = (rawData) => {
    let registered = [];
    let notRegistered = [];
    let unknown = [];
    rawData.forEach((element) => {
      if (element.registered === undefined) {
        unknown.push(element);
      } else if (element.registered === null) {
        notRegistered.push(element);
      } else {
        element.registered.forEach((person) => {
          registered.push({
            doc: element.doc,
            name: person,
            fish: element.food[person][1] ? "X" : null,
            meet: element.food[person][2] ? "X" : null,
            vegetarian: element.food[person][3] ? "X" : null,
            vegan: element.food[person][4] ? "X" : null,
            allergies: element.allergies,
            breakfast: element.breakfast,
          });
        });
      }
    });
    return [registered, notRegistered, unknown];
  };

  return data ? (
    <div>
      <ExcelFile
        element={
          <button>
            <p>Anmeldungen herunterladen</p>
          </button>
        }
      >
        <ExcelSheet data={data[0]} name="Anmeldungen">
          <ExcelColumn label="Kürzel" value="doc" />
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Fisch" value="fish" />
          <ExcelColumn label="Fleisch" value="meet" />
          <ExcelColumn label="Vegetarisch" value="vegetarian" />
          <ExcelColumn label="Vegan" value="vegan" />
          <ExcelColumn label="Allergien" value="allergies" />
          <ExcelColumn label="Anz. Frühstück ganze Gruppe" value="breakfast" />
        </ExcelSheet>
        <ExcelSheet data={data[1]} name="Abgemeldet">
          <ExcelColumn label="Kürzel" value="doc" />
          <ExcelColumn label="Namen" value="title" />
        </ExcelSheet>
        <ExcelSheet data={data[2]} name="noch keine Rückmeldung">
          <ExcelColumn label="Kürzel" value="doc" />
          <ExcelColumn label="Namen" value="title" />
        </ExcelSheet>
      </ExcelFile>
    </div>
  ) : (
    <div></div>
  );
};

export default ExcelDownload;
