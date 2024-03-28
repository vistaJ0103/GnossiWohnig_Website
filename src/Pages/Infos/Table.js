import React, { useMemo, useState } from "react";

import DataTable from "react-data-table-component";
import FilterInput from "./FilterInput";
import { useTranslation } from "react-i18next";
import Details from "./Details";

const Table = (props) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { t } = useTranslation();

  const customStyles = {
    headCells: {
      style: {
        paddingBottom: "10px",
        fontSize: "12px",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
      },
    },
  };

  const columns = [
    {
      name: t("Infos.Name"),
      selector: (row) => row.name,
      sortable: true,
      grow: 3,
    },
    {
      name: t("Infos.Link"),
      selector: (row) => (
        <a aria-label={row.name} href={row.link}>
          {row.link}
        </a>
      ),
      sortable: true,
      grow: 2,
    },
    {
      name: <div>{t("Infos.InsGnossi")}</div>,
      selector: (row) =>
        row.announcements.ownWebsite ? t("Infos.Yes") : t("Infos.No"),
      sortable: true,
      center: true,
    },
    {
      name: <div>{t("Infos.InsHomegate")}</div>,
      selector: (row) =>
        row.announcements.homegate ? t("Infos.Yes") : t("Infos.No"),
      sortable: true,
      center: true,
    },
    {
      name: <div>{t("Infos.InsWaiting")}</div>,
      selector: (row) =>
        row.announcements.waitingList ? t("Infos.Yes") : t("Infos.No"),
      sortable: true,
      center: true,
    },
    {
      name: <div>{t("Infos.InsEmail")}</div>,
      selector: (row) =>
        row.announcements.emailSubscription ? t("Infos.Yes") : t("Infos.No"),
      center: true,
    },
    {
      name: <div>{t("Infos.ApplWithMembership")}</div>,
      selector: (row) =>
        row.applOptions.onlyWithMembership ? t("Infos.Yes") : t("Infos.No"),
      sortable: true,
      center: true,
    },
  ];

  const getFilterableData = (item) => {
    const name = JSON.stringify(item.name).toLowerCase();
    const otPlaces = JSON.stringify(item.otherPlaces).toLowerCase();
    const zhPlaces = JSON.stringify(
      item.zurichPlaces.map((place) => "kreis " + place)
    );
    const resString = name + otPlaces + zhPlaces;
    return resString.indexOf(filterText.toLowerCase()) !== -1;
  };

  const filteredItems = props.data.filter((item) => getFilterableData(item));

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterInput
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const ExpandedComponent = ({ data }) => <Details item={data} />;

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      expandableRows
      expandableRowsComponent={ExpandedComponent}
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
      customStyles={customStyles}
    />
  );
};

export default Table;
