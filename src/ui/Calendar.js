import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import { Text } from "./StyledComponents";
import dayjs from "dayjs";
const advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

const CustomCalendar = ({ value, handleOnChange }) => {
  const [displayCalendar, setDisplayCalendar] = useState(false);

  const handleCalendarChange = (date) => {
    setDisplayCalendar(!displayCalendar);
    handleOnChange(date);
  };

  const handleOnClick = () => setDisplayCalendar(!displayCalendar);

  const actualDate = dayjs(value).format("ddd, MMM Do, YYYY");
  const validDate = dayjs(value).isValid();
  const displayDate = validDate ? String(actualDate) : "No Due Date";

  return displayCalendar ? (
    <Calendar
      onChange={handleCalendarChange}
      defaultValue={new Date()}
      value={value}
    />
  ) : (
    <StyledText onClick={handleOnClick}>{displayDate}</StyledText>
  );
};

const StyledText = styled(Text)`
  padding-left: 5px;
  cursor: pointer;
`;

export default CustomCalendar;

// import dayjs from "dayjs";
// var relativeTime = require("dayjs/plugin/relativeTime");
// dayjs.extend(relativeTime);
// const when = dayjs(value).fromNow();
