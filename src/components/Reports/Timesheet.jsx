import {
  Card,
  CardBody,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { getISOWeek } from "date-fns";
import HorizontalCardSkeleton from "../Skeletons/HorizontalCardSkeleton";

const Timesheet = ({ activeJobs, isLoading }) => {
  const hourly_contract =
    activeJobs?.filter((contract) => contract.job_type === "hourly") || [];

  function getCurrentWeek() {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay() + 1); // Adjust to Monday of the current week
    const lastDayOfWeek = new Date(today);
    lastDayOfWeek.setDate(today.getDate() - today.getDay() + 7); // Adjust to Sunday of the current week
    const weekNumber = getISOWeek(today);
    return {
      start: firstDayOfWeek,
      end: lastDayOfWeek,
      week_number: weekNumber,
    };
  }

  function formatTime(milliseconds) {
    // Convert milliseconds to seconds
    let totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate hours, minutes, and seconds
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);

    // Format the time string
    let timeString = "";
    if (hours > 0 || minutes > 0) {
      timeString += hours < 10 ? "0" + hours : hours;
      timeString += ":";
      timeString += minutes < 10 ? "0" + minutes : minutes;
    } else {
      timeString += "0";
    }

    return timeString;
  }

  function calculatedMinutes(milliseconds = 0) {
    let totalMinutes = milliseconds / (1000 * 60);

    return Number(totalMinutes?.toFixed());
  }

  const { week_number } = getCurrentWeek();

  return (
    <div className="mb-3">
      <div className="md:flex mt-3 justify-between">
        <h2 className="mt-8 mb-8 text-[25px] font-semibold">
          Current Timesheet
        </h2>
      </div>
      {isLoading ? (
        <HorizontalCardSkeleton />
      ) : (
        <div className="mb-3">
          <Card>
            <CardBody
              paddingY={"2.5rem"}
              overflowX={"auto"}
              minHeight={"200px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {hourly_contract?.length ? (
                <Table variant="simple">
                  <Thead textAlign={"center"}>
                    <Tr maxWidth={"100%"} textAlign={"center"}>
                      <Th
                        fontSize={"1rem"}
                        textColor={"black"}
                        marginBottom={"1.5rem"}
                      >
                        Hourly Contracts
                      </Th>
                      <Th textAlign="center">Mon</Th>
                      <Th textAlign="center">Tue</Th>
                      <Th textAlign="center">Wed</Th>
                      <Th textAlign="center">Thu</Th>
                      <Th textAlign="center">Fri</Th>
                      <Th textAlign="center">Sat</Th>
                      <Th textAlign="center">Sun</Th>
                      <Th textAlign="center">Hours</Th>
                      <Th textAlign="center">Rate</Th>
                      <Th textAlign="center">Amount</Th>
                    </Tr>
                    <br />
                  </Thead>
                  <Tbody>
                    {hourly_contract &&
                      hourly_contract.map((contract, index) => {
                        const this_week = contract?.spend_time?.filter(
                          (item) => item.week_number === week_number
                        );
                        const date_time = this_week?.[0]?.date_time;
                        const this_week_time =
                          this_week && this_week?.[0]?.total_time;

                        const total_earning =
                          calculatedMinutes(this_week_time) *
                          (contract.hourly_rate / 60);

                        return (
                          <Tr key={index}>
                            <Td className="text-[#22C35E]">
                              {contract?.contract_title?.length > 30
                                ? contract?.contract_title?.slice(0, 30) + ".."
                                : contract?.contract_title}
                            </Td>
                            {date_time?.length
                              ? date_time?.map((date, index) => (
                                  <Td key={index} textAlign="center">
                                    {formatTime(date.time)}
                                  </Td>
                                ))
                              : [1, 2, 3, 4, 5, 6, 7]?.map((date, index) => (
                                  <Td key={index} textAlign="center">
                                    0
                                  </Td>
                                ))}
                            <Td textAlign="center">
                              {formatTime(this_week?.[0]?.total_time)}
                            </Td>
                            <Td textAlign={"center"} fontWeight={"semibold"}>
                              ${contract?.hourly_rate}
                              <sub className="font-normal">/hr</sub>
                            </Td>
                            <Td textAlign="center" fontWeight={"semibold"}>
                              ${total_earning?.toFixed(2) || 0}
                            </Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
              ) : (
                <div className="text-center capitalize font-bold">
                  You have&apos;t hourly contract jobs!
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Timesheet;
