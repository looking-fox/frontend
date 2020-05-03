import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import theme from "../../../ui/theme/theme";
import { getClients } from "../../../thunks/clientThunk";

const customStyles = {
  control: (base) => ({
    ...base,
    border: "1px solid #CCCCCC",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #CCCCCC",
    },
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? theme.colors.lightGrey : "white",
    color: "#777777",
  }),
  singleValue: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? 0.5 : 1,
    transition: "opacity 300ms",
    color: "#777777",
    fontSize: "0.9em",
    padding: "5px",
  }),
};

const ClientMenu = ({
  clientForTask,
  clients,
  getClients,
  handleClientChange,
}) => {
  const generateOptions = (clients) => {
    if (!clients.length) return [];
    else {
      return clients.map((client) => ({
        value: client.clientId,
        label: client.clientFullName,
      }));
    }
  };

  useEffect(() => {
    clients.length === 0 && getClients();
  }, [clients.length, getClients]);

  const options = generateOptions(clients);
  const [option, setOption] = useState(clientForTask);

  const handleChange = (option) => {
    setOption(option);
    handleClientChange(option.value);
  };

  return (
    <Select
      value={option}
      options={options}
      onChange={handleChange}
      styles={customStyles}
    />
  );
};

const mapState = (state) => {
  return { clients: state.clients.clients };
};

export default connect(mapState, { getClients })(ClientMenu);
