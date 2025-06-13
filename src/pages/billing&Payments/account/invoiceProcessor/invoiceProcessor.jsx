/** @format */
import { useState, Fragment, useEffect, useRef } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  EmailOutlined,
} from "@mui/icons-material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MoneyIcon from "@mui/icons-material/Money";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { format, subDays } from "date-fns";
// import { Container } from '@/components/container';
// import {
// 	Select,
// 	SelectTrigger,
// 	SelectContent,
// 	SelectItem,
// 	SelectValue,
// } from '@/components/ui/select';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { KeenIcon } from "@/components";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { refreshAllAccounts } from "../../../../slices/accountSlice";
import {
  accountCreateInvoice,
  accountPostOrUnpostJobs,
  accountPriceJobByMileage,
  accountPriceJobHVS,
  accountUpdateChargesData,
  clearInvoice,
} from "../../../../service/operations/billing&Payment";
import toast from "react-hot-toast";
import {
  Toolbar,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from "@/partials/toolbar";
import { refreshAccountChargeableJobs } from "../../../../slices/billingSlice";
import TableFilterPopover from "../../tableFilterBar/tableFilterBar";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
// Collapsible Row Component
function RowNotPriced({
  row,
  // setPriceBaseModal,
  setSelectedBooking,
  handlePostButton,
  handleShow,
}) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [open, setOpen] = useState(false);
  const [waiting, setWaiting] = useState(row.waiting);
  const [journeyCharge, setJourneyCharge] = useState(row.journeyCharge);
  const [driverFare, setDriverFare] = useState(row.driverFare);
  const [parking, setParking] = useState(row.parking);
  const { accountChargeableJobs } = useSelector((state) => state.billing);
  const notPriced = accountChargeableJobs?.notPriced;
  const booking = notPriced?.find((job) => job?.bookingId === row?.id);

  const calculatedTotal =
    Number(parking) + Number(row?.waitingCharge) + Number(journeyCharge);

  const [debouncedValue, setDebouncedValue] = useState(null);

  const handleCancel = async () => {
    try {
      const response = await clearInvoice(row?.id);
      if (response?.status === "success") {
        toast.success("Invoice Cancellation Successful");
        handleShow();
      }
    } catch (error) {
      console.error("Failed to cancel invoice:", error);
      toast.error("Failed to cancel invoice");
    }
  };

  const handleInputChange = async (field, value) => {
    const newValue = value < 0 ? 0 : value;

    // Update state based on field name
    if (field === "waiting") setWaiting(newValue);
    if (field === "journeyCharge") setJourneyCharge(newValue);
    if (field === "driverFare") setDriverFare(newValue);
    if (field === "parking") setParking(newValue);

    // Set debounced value for API call
    // setDebouncedValue({ field, value: newValue });
  };

  const handlePriceFromBaseButton = async () => {
    try {
      const payload = {
        pickupPostcode: booking?.pickupPostcode || "",
        viaPostcodes: booking?.vias?.length
          ? booking.vias.map((via) => via.postCode)
          : [], // Map via postcodes
        destinationPostcode: booking?.destinationPostcode || "",
        pickupDateTime: booking?.date || new Date().toISOString(), // Use booking date if available
        passengers: booking?.passengers || 0,
        priceFromBase: true, // Use form value
        bookingId: booking?.bookingId || 0,
        actionByUserId: userData?.userId || 0,
        updatedByName: userData?.fullName || "", // Change as needed
        price: booking?.price || 0,
        priceAccount: booking?.priceAccount || 0,
        mileage: booking?.miles || 0,
        mileageText: `${booking?.miles || 0} miles`, // Convert miles to string
        durationText: "", // No duration available in provided object
      };
      let response;
      if (booking?.accNo === 10026 || booking?.accNo === 9014) {
        response = await accountPriceJobHVS(payload);
      } else {
        response = await accountPriceJobByMileage(payload);
      }
      // console.log('Response:', response);
      if (response.status === "success") {
        handleShow();
        toast.success("Price Updated");
      } else {
        toast.error("Failed to Update Price");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setJourneyCharge(row.journeyCharge);
  }, [row.journeyCharge]);

  useEffect(() => {
    if (!debouncedValue) return;

    const timer = setTimeout(() => {
      updateCharges();
    }, 500); // Delay of 500ms

    return () => clearTimeout(timer);
  }, [debouncedValue]);

  const handleKeyPress = (event, nextField) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission

      // Move focus to the next input field
      if (nextField) {
        const nextInput = document.querySelector(`input[name="${nextField}"]`);
        if (nextInput) {
          nextInput.focus();
          nextInput.select(); // Select the text inside the input
        }
      }
    }
  };

  const updateCharges = async () => {
    try {
      const payload = {
        bookingId: row?.id || 0,
        waitingMinutes: waiting || 0,
        parkingCharge: parking || 0,
        priceAccount: journeyCharge || 0,
        price: driverFare || 0,
      };

      const response = await accountUpdateChargesData(payload);

      if (response?.status === "success") {
        // console.log(response);
        handleShow();
        toast.success("Value Updated");
      }
    } catch (error) {
      console.error("Error updating charges:", error);
    }
  };

  return (
    <>
      <TableRow
        className={`${row?.coa ? " bg-orange-500 hover:bg-orange-400" : "bg-white dark:bg-[#14151A] hover:bg-gray-100"} `}
      >
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? (
              <KeyboardArrowUp
                className={`${row?.coa ? "text-gray-800 dark:text-white" : "text-gray-800 dark:text-gray-700"}`}
              />
            ) : (
              <KeyboardArrowDown
                className={`${row?.coa ? "text-gray-800 dark:text-white" : "text-gray-800 dark:text-gray-700"}`}
              />
            )}
          </IconButton>
        </TableCell>
        <TableCell
          className={`${row?.coa ? "text-blue-600 dark:text-white" : "text-blue-500 dark:text-cyan-400"}  font-medium`}
        >
          {row.id}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.date}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.accNumber}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.driver}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.pickup}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.destination}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.passenger}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.passengers}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.hasVias ? "True" : "False"}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          <input
            type="number"
            className="w-20 text-center border rounded p-1 bg-inherit ring-inherit dark:bg-inherit dark:ring-inherit"
            value={waiting}
            name={`waiting-${row.id}`}
            onChange={(e) => handleInputChange("waiting", +e.target.value)}
            onBlur={(e) =>
              setDebouncedValue({ field: "waiting", value: +e.target.value })
            }
            onKeyDown={(e) => handleKeyPress(e, `driverFare-${row.id}`)}
            onFocus={(e) => e.target.select()}
          />
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          £{row.waitingCharge.toFixed(2)}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.actualMiles}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          <input
            type="number"
            step="0.01"
            className="w-20 text-center border rounded p-1 bg-inherit ring-inherit dark:bg-inherit dark:ring-inherit"
            value={driverFare}
            name={`driverFare-${row.id}`}
            onChange={(e) => handleInputChange("driverFare", +e.target.value)}
            onBlur={(e) =>
              setDebouncedValue({ field: "driverFare", value: +e.target.value })
            }
            onKeyDown={(e) => handleKeyPress(e, `journeyCharge-${row.id}`)}
          />
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          <input
            type="number"
            step="0.01"
            className="w-20 text-center border rounded p-1 bg-inherit ring-inherit dark:bg-inherit dark:ring-inherit"
            value={journeyCharge}
            name={`journeyCharge-${row.id}`}
            onChange={(e) =>
              handleInputChange("journeyCharge", +e.target.value)
            }
            onBlur={(e) =>
              setDebouncedValue({
                field: "journeyCharge",
                value: +e.target.value,
              })
            }
            onKeyDown={(e) => handleKeyPress(e, `parking-${row.id}`)}
          />
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          <input
            type="number"
            step="0.01"
            className="w-20 text-center border rounded p-1 bg-inherit ring-inherit dark:bg-inherit dark:ring-inherit"
            value={parking}
            name={`parking-${row.id}`}
            onChange={(e) => handleInputChange("parking", +e.target.value)}
            onBlur={(e) =>
              setDebouncedValue({ field: "parking", value: +e.target.value })
            }
            onKeyDown={(e) => handleKeyPress(e, null)}
          />
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900 font-semibold`}
        >
          £{calculatedTotal.toFixed(2)}
        </TableCell>
        <TableCell>
          <IconButton
            size="small"
            onClick={() => {
              setSelectedBooking(row);
              // setPriceBaseModal(true);
              handlePriceFromBaseButton();
            }}
          >
            <MoneyIcon
              className={`${row?.coa ? "text-green-600 dark:text-green-600" : "text-green-500 dark:text-green-400"}  `}
            />
          </IconButton>
        </TableCell>

        <TableCell>
          <IconButton
            size="small"
            onClick={() => {
              if (journeyCharge === 0) {
                toast.error("Journey Charge Should not be 0"); // Show error if price is 0
              } else {
                handlePostButton(row); // Post the job if valid
              }
            }}
          >
            <EmailOutlined
              className={`${row?.coa ? `${row.postedForInvoicing ? "text-red-500 dark:text-red-900" : "text-blue-500 dark:text-white"}` : `${row.postedForInvoicing ? "text-red-500 dark:text-red-600" : "text-blue-500 dark:text-cyan-400"}`}  `}
            />
          </IconButton>
        </TableCell>

        <TableCell>
          <IconButton size="small" onClick={handleCancel}>
            <DeleteOutlinedIcon className="text-red-500 dark:text-red-600" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={20} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              margin={1}
              className="border border-gray-300 dark:border-gray-600 rounded-md p-4 bg-gray-100 dark:bg-[#232427] text-gray-900 dark:text-gray-700"
            >
              <Typography
                variant="h6"
                className="text-blue-500 dark:text-cyan-400 font-semibold"
              >
                Booking #: {row.id}
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="body2">
                    <strong>Vias:</strong> {row.details?.vias ?? "N/A"}
                  </Typography>

                  <Typography variant="body2">
                    <strong>Details:</strong> {row.details?.details ?? "N/A"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2">
                    <strong>Scope:</strong> {row.details?.scope ?? "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function RowPriced({ row, handleRevert }) {
  const [open, setOpen] = useState(false);
  const calculatedTotal =
    Number(row?.parking) +
    Number(row?.waitingCharge) +
    Number(row.journeyCharge);
  return (
    <>
      <TableRow
        className={`${row?.coa ? " bg-orange-500 hover:bg-orange-400" : "bg-white dark:bg-[#14151A] hover:bg-gray-100"} `}
      >
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? (
              <KeyboardArrowUp
                className={`${row?.coa ? "text-gray-800 dark:text-white" : "text-gray-800 dark:text-gray-700"}`}
              />
            ) : (
              <KeyboardArrowDown
                className={`${row?.coa ? "text-gray-800 dark:text-white" : "text-gray-800 dark:text-gray-700"}`}
              />
            )}
          </IconButton>
        </TableCell>
        <TableCell
          className={`${row?.coa ? "text-blue-600 dark:text-white" : "text-blue-500 dark:text-cyan-400"}  font-medium`}
        >
          {row.id}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.date}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.accNumber}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.driver}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.pickup}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.destination}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.passenger}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.passengers}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.hasVias ? "True" : "False"}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.waiting}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          £{row.waitingCharge.toFixed(2)}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          {row.actualMiles}
        </TableCell>
        <TableCell
          className={`${row?.coa ? "dark:text-white" : "dark:text-gray-700"} text-gray-900`}
        >
          £{row.driverFare.toFixed(2)}
        </TableCell>
        <TableCell className="text-[#14151A] dark:text-gray-700">
          £{row.journeyCharge.toFixed(2)}
        </TableCell>
        <TableCell className="text-[#14151A] dark:text-gray-700">
          £{row.parking.toFixed(2)}
        </TableCell>
        <TableCell className="text-[#14151A] dark:text-gray-700 font-semibold">
          £{calculatedTotal.toFixed(2)}
        </TableCell>
        <TableCell>
          <IconButton
            size="small"
            className={`${row?.coa ? `${row.postedForInvoicing ? "text-red-700 dark:text-red-900" : "text-blue-500 dark:text-white"}` : `${row.postedForInvoicing ? "text-red-500 dark:text-red-600" : "text-blue-500 dark:text-cyan-400"}`}  `}
            onClick={() => handleRevert(row)}
          >
            <EmailOutlined
              className={`${row?.coa ? `${row.postedForInvoicing ? "text-red-500 dark:text-red-900" : "text-blue-500 dark:text-white"}` : `${row.postedForInvoicing ? "text-red-500 dark:text-red-600" : "text-blue-500 dark:text-cyan-400"}`}  `}
            />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={18} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              margin={1}
              className="border border-gray-300 dark:border-gray-600 rounded-md p-4 bg-gray-100 dark:bg-[#232427] text-gray-900 dark:text-gray-700"
            >
              <Typography
                variant="h6"
                className="text-blue-500 dark:text-cyan-400 font-semibold"
              >
                Booking #: {row.id}
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="body2">
                    <strong>Vias:</strong> {row.details?.vias ?? "N/A"}
                  </Typography>

                  <Typography variant="body2">
                    <strong>Details:</strong> {row.details?.details ?? "N/A"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2">
                    <strong>Scope:</strong> {row.details?.scope ?? "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

// Main Component
function InvoiceProcessor() {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.account);
  const { accountChargeableJobs, loading } = useSelector(
    (state) => state.billing
  );
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [priceBaseModal, setPriceBaseModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [autoEmailInvoices, setAutoEmailInvoices] = useState(true);
  // const [search, setSearch] = useState('');
  const [order, setOrder] = useState("asc"); // Sort order
  const [orderBy, setOrderBy] = useState(""); // Default sorted column
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30), // January 31, 2025
    to: new Date(), // Same default date
  });
  const [tempRange, setTempRange] = useState(dateRange);
  const [processLoading, setProcessLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageB, setPageB] = useState(0);
  const [rowsPerPageB, setRowsPerPageB] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);
  const [filters, setFilters] = useState([]);

  const [anchorE2, setAnchorE2] = useState(null);
  const [activeColumn2, setActiveColumn2] = useState(null);
  const [filters2, setFilters2] = useState([]);

  const scrollRef = useRef(null);
  useEffect(() => {
    if (open) {
      setTempRange({ from: null, to: null });
    }
  }, [open]);

  const handleDateSelect = (range) => {
    setTempRange(range);
    if (range?.from && range?.to) {
      setDateRange(range);
      setOpen(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page
  };

  const handleChangePageB = (event, newPage) => {
    setPageB(newPage);
  };

  const handleChangeRowsPerPageB = (event) => {
    setRowsPerPageB(parseInt(event.target.value, 10));
    setPageB(0); // reset to first page
  };

  const formattedNotPricedBookings = (
    accountChargeableJobs?.notPriced || []
  ).map((booking) => ({
    id: booking?.bookingId,
    date: booking?.date
      ? new Date(booking?.date).toLocaleDateString("en-GB") +
        " " +
        booking?.date?.split("T")[1]?.split(".")[0]?.slice(0, 5)
      : "-", // Ensure correct date format
    accNumber: booking?.accNo,
    driver: booking?.userId || "-",
    pickup: `${booking?.pickup}`,
    destination: `${booking?.destination}`,
    passengers: booking?.passengers || 0,
    passenger: booking?.passenger || "Unknown",
    hasVias: booking?.hasVias,
    coa: booking?.coa,
    waiting: booking?.waitingMinutes || 0,
    waitingCharge: booking?.waitingPriceAccount || 0,
    phoneNumber: booking?.phoneNumber || "",
    actualMiles: booking?.miles,
    driverFare: booking?.price || 0,
    journeyCharge: booking?.priceAccount || 0,
    parking: booking?.parkingCharge || 0,
    total: booking?.totalCharge || 0,
    postedForStatement: booking?.postedForStatement,
    postedForInvoicing: booking?.postedForInvoicing,
    details: {
      details: booking?.details || "",
      vias: booking?.vias?.length
        ? booking.vias
            .map((via) => `${via.address}, ${via.postCode}`)
            .join(" → ")
        : "",

      scope: booking?.scope === 4 ? "Card" : "Cash",
    },
  }));

  const handleFilterClick = (event, column) => {
    setAnchorEl(event.currentTarget);
    setActiveColumn(column);

    // Set initial filter row if column is newly selected
    setFilters((prevFilters) => {
      const existing = prevFilters.find((f) => f.column === column.value);
      // If this column already has a filter, don't reset it
      if (existing) return prevFilters;

      // Else, add a new default filter for this column
      return [
        ...prevFilters,
        {
          column: column.value,
          operator: "contains",
          value: "",
        },
      ];
    });
  };

  const handleFilterClick2 = (event, column) => {
    setAnchorE2(event.currentTarget);
    setActiveColumn2(column);

    // Set initial filter row if column is newly selected
    setFilters2((prevFilters) => {
      const existing = prevFilters.find((f) => f.column === column.value);
      // If this column already has a filter, don't reset it
      if (existing) return prevFilters;

      // Else, add a new default filter for this column
      return [
        ...prevFilters,
        {
          column: column.value,
          operator: "contains",
          value: "",
        },
      ];
    });
  };

  const isFilterApplied = (columnKey) => {
    return filters.some(
      (f) =>
        f.column === columnKey &&
        typeof f.value === "string" &&
        f.value.trim() !== ""
    );
  };

  const isFilterApplied2 = (columnKey) => {
    return filters2.some(
      (f) =>
        f.column === columnKey &&
        typeof f.value === "string" &&
        f.value.trim() !== ""
    );
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setActiveColumn(null);
  };

  const handleFilterClose2 = () => {
    setAnchorE2(null);
    setActiveColumn2(null);
  };

  // const filteredNotPricedBookings = formattedNotPricedBookings?.filter(
  // 	(booking) => {
  // 		// if (!search?.trim()) return true;

  // 		// const isMatch =
  // 		// 	booking?.pickup?.toLowerCase().includes(search?.toLowerCase()) ||
  // 		// 	booking?.destination?.toLowerCase().includes(search?.toLowerCase()) ||
  // 		// 	booking?.passenger?.toLowerCase().includes(search?.toLowerCase()) ||
  // 		// 	String(booking?.id)?.toLowerCase().includes(search?.toLowerCase());

  // 		// return isMatch;
  // 		}
  // );

  const columns = [
    { label: "#", value: "id" },
    { label: "Date", value: "date" },
    { label: "Pickup", value: "pickup" },
    { label: "Destination", value: "destination" },
    { label: "Passenger", value: "passenger" },
    { label: "Driver Price", value: "driverFare" },
  ];

  const operators = {
    contains: (cell, value) => cell.includes(value),
    equals: (cell, value) => cell === value,
    "starts with": (cell, value) => cell.startsWith(value),
    "ends with": (cell, value) => cell.endsWith(value),
  };

  const filterObject = filters.reduce((acc, curr) => {
    if (curr.column) {
      acc[curr.column] = { operator: curr.operator, value: curr.value };
    }
    return acc;
  }, {});

  const filterObject2 = filters2.reduce((acc, curr) => {
    if (curr.column) {
      acc[curr.column] = { operator: curr.operator, value: curr.value };
    }
    return acc;
  }, {});

  const filteredNotPricedBookings = formattedNotPricedBookings?.filter(
    (row) => {
      return Object.entries(filterObject).every(([colKey, filterObj]) => {
        if (
          !filterObj ||
          !filterObj.operator ||
          typeof filterObj.value !== "string"
        )
          return true;

        const cell = row[colKey]?.toString().toLowerCase() || "";
        const value = filterObj.value.toLowerCase();

        const operatorFn = operators[filterObj.operator];
        return operatorFn ? operatorFn(cell, value) : true;
      });
    }
  );

  const handleSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedBookings = [...filteredNotPricedBookings].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const formattedPricedBookings = (accountChargeableJobs?.priced || []).map(
    (booking) => ({
      id: booking?.bookingId,
      date: booking?.date
        ? new Date(booking?.date).toLocaleDateString("en-GB") +
          " " +
          booking?.date?.split("T")[1]?.split(".")[0]?.slice(0, 5)
        : "-", // Ensure correct date format
      accNumber: booking?.accNo,
      driver: booking?.userId || "-",
      pickup: `${booking?.pickup}`,
      destination: `${booking?.destination}`,
      passengers: booking?.passengers || 0,
      passenger: booking?.passenger || "Unknown",
      hasVias: booking?.hasVias,
      coa: booking?.coa,
      waiting: booking?.waitingMinutes || 0,
      waitingCharge: booking?.waitingPriceAccount || 0,
      phoneNumber: booking?.phoneNumber || "",
      actualMiles: booking?.miles,
      driverFare: booking?.price || 0,
      journeyCharge: booking?.priceAccount || 0,
      parking: booking?.parkingCharge || 0,
      total: booking?.totalCost || 0,
      postedForStatement: booking?.postedForStatement,
      postedForInvoicing: booking?.postedForInvoicing,
      details: {
        details: booking?.details || "",
        vias: booking?.vias?.length
          ? booking.vias
              .map((via) => `${via.address}, ${via.postCode}`)
              .join(" → ")
          : "",

        scope: booking?.scope === 4 ? "Card" : "Cash",
      },
    })
  );

  const filterPricedBookings = formattedPricedBookings?.filter((row) => {
    return Object.entries(filterObject2).every(([colKey, filterObj]) => {
      if (
        !filterObj ||
        !filterObj.operator ||
        typeof filterObj.value !== "string"
      )
        return true;

      const cell = row[colKey]?.toString().toLowerCase() || "";
      const value = filterObj.value.toLowerCase();

      const operatorFn = operators[filterObj.operator];
      return operatorFn ? operatorFn(cell, value) : true;
    });
  });

  const sortedPricedBookings = [...filterPricedBookings].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const handleClose = () => {
    if (priceBaseModal) setPriceBaseModal(false);
  };

  const handleShow = () => {
    dispatch(
      refreshAccountChargeableJobs(
        selectedAccount,
        format(new Date(dateRange?.from), "yyyy-MM-dd"),
        format(new Date(dateRange?.to), "yyyy-MM-dd")
      )
    );
  };

  const handlePostButton = async (row) => {
    try {
      const postJob = row?.journeyCharge > 0 && true;
      const response = await accountPostOrUnpostJobs(postJob, [row?.id]);
      if (response?.status === "success") {
        toast.success("Job posted successfully");
        handleShow();
      } else {
        toast.error("Failed to post job");
      }
    } catch (error) {
      console.error("Failed to post job:", error);
      toast.error("Failed to post job");
    }
  };

  const handleRevert = async (row) => {
    try {
      const response = await accountPostOrUnpostJobs(false, [row?.id]);
      if (response?.status === "success") {
        toast.success("Job reverted successfully");
        handleShow();
      } else {
        toast.error("Failed to revert job");
      }
    } catch (error) {
      console.error("Failed to revert job:", error);
      toast.error("Failed to revert job");
    }
  };

  const handlePostAllPriced = async () => {
    try {
      // Filter bookings with driverFare > 0
      const jobsToPost = formattedNotPricedBookings.filter(
        (job) => Number(job.driverFare) > 0
      );

      // console.log({ formattedNotPricedBookings, jobsToPost });

      if (jobsToPost.length === 0) {
        toast.error("No jobs available to post.");
        return;
      }

      const jobsIds = jobsToPost.map((job) => job.id);

      const response = await accountPostOrUnpostJobs(true, jobsIds);

      if (response.status === "success") {
        toast.success(`${jobsToPost.length} jobs posted successfully!`);
        handleShow();
      } else {
        toast.error("Some jobs failed to post.");
      }
    } catch (error) {
      console.error("Error posting all jobs:", error);
      toast.error("Failed to post all jobs.");
    }
  };

  const handleProcessDriver = async () => {
    try {
      setProcessLoading(true);
      if (
        !accountChargeableJobs?.priced ||
        accountChargeableJobs.priced.length === 0
      ) {
        toast.info("No jobs available to post.");
        return;
      }

      const payload = accountChargeableJobs.priced.map((job) => ({
        accNo: job.accNo || 0,
        bookingId: job.bookingId || 0,
        userId: job.userId || 0,
        date: job.date || new Date().toISOString(),
        passengers: job.passengers || 0,
        pickup: job.pickup || "",
        pickupPostcode: job.pickupPostcode || "",
        destination: job.destination || "",
        destinationPostcode: job.destinationPostcode || "",
        vias: job.vias || [],
        hasVias: job.hasVias || false,
        passenger: job.passenger || "string",
        price: job.price || 0,
        scope: job.scope || 0,
        cancelled: job.cancelled || false,
        coa: job.coa || false,
        vehicleType: job.vehicleType || 0,
        priceAccount: job.priceAccount || 0,
        details: job?.details || "",
        hasDetails: job?.hasDetails || false,
        waitingMinutes: job.waitingMinutes || 0,
        paymentStatus: job.paymentStatus || 0,
        waitingTime: job.waitingTime || "",
        waitingPriceDriver: job.waitingPriceDriver || 0,
        waitingPriceAccount: job.waitingPriceAccount || 0,
        parkingCharge: job.parkingCharge || 0,
        totalCharge: job.totalCharge || 0,
        totalCost: job.totalCost || 0,
        postedForInvoicing: job.postedForInvoicing || false,
        postedForStatement: job.postedForStatement || false,
        miles: job.miles || 0,
      }));

      // console.log('Sending Payload:', payload); // Debugging

      const response = await accountCreateInvoice(autoEmailInvoices, payload);

      if (response?.status === "success") {
        toast.success(`Invoice Account Processed!`);
        handleShow();
      } else {
        toast.error("Some jobs failed to process.");
      }
    } catch (error) {
      console.error("Error processing all jobs:", error);
      toast.error("Failed to process all jobs.");
    } finally {
      setProcessLoading(false);
    }
  };

  useEffect(() => {
    dispatch(refreshAllAccounts());
  }, [dispatch]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const mouseDownHandler = (e) => {
      isDown = true;
      scrollContainer.classList.add("cursor-grabbing");
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    };

    const mouseUpHandler = () => {
      isDown = false;
      scrollContainer.classList.remove("cursor-grabbing");
    };

    const mouseMoveHandler = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 1;
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    scrollContainer.addEventListener("mousedown", mouseDownHandler);
    scrollContainer.addEventListener("mouseup", mouseUpHandler);
    scrollContainer.addEventListener("mouseleave", mouseUpHandler);
    scrollContainer.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      scrollContainer.removeEventListener("mousedown", mouseDownHandler);
      scrollContainer.removeEventListener("mouseup", mouseUpHandler);
      scrollContainer.removeEventListener("mouseleave", mouseUpHandler);
      scrollContainer.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  const grandTotal = formattedPricedBookings
    .map(
      (booking) =>
        Number(booking?.parking?.toFixed(2)) +
        Number(booking?.waitingCharge?.toFixed(2)) +
        Number(booking.journeyCharge?.toFixed(2))
    )
    .reduce((acc, curr) => acc + curr, 0);
  console.log(grandTotal);

  return (
    <Fragment>
      <div className="pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1850px] w-full">
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle />
            <ToolbarDescription>Account Job Processor </ToolbarDescription>
          </ToolbarHeading>
        </Toolbar>

        <div className="ms-auto me-auto max-w-[1850px] w-full">
          <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
            <div className="flex flex-wrap items-center gap-5 justify-between">
              <div className="card card-grid min-w-full">
                <div className="card-header flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2 lg:gap-5">
                    {/* <div className='flex'>
											<label
												className='input input-sm hover:shadow-lg mt-4'
												style={{ height: '40px' }}
											>
												<KeenIcon icon='magnifier' />
												<input
													type='text'
													placeholder='Search'
													value={search}
													onChange={(e) => setSearch(e.target.value)}
												/>
											</label>
										</div> */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="flex flex-col">
                        <label className="form-label">Accounts</label>
                        <Select
                          value={selectedAccount}
                          onValueChange={(value) => setSelectedAccount(value)}
                        >
                          <SelectTrigger
                            className="w-40 hover:shadow-lg"
                            size="sm"
                            style={{ height: "40px" }}
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="w-40">
                            <SelectItem value={0}>All</SelectItem>
                            {accounts?.length > 0 &&
                              accounts?.map((acc) => (
                                <>
                                  <SelectItem value={acc?.accNo}>
                                    {acc?.accNo} - {acc?.businessName}
                                  </SelectItem>
                                </>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col">
                        <label className="form-label">Select Date Range</label>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <button
                              id="date"
                              className={cn(
                                "btn btn-sm btn-light data-[state=open]:bg-light-active",
                                !dateRange && "text-gray-400"
                              )}
                              style={{ height: "40px" }}
                            >
                              <KeenIcon icon="calendar" className="me-0.5" />
                              {dateRange?.from ? (
                                dateRange.to ? (
                                  <>
                                    {format(dateRange.from, "LLL dd, y")} -{" "}
                                    {format(dateRange.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(dateRange.from, "LLL dd, y")
                                )
                              ) : (
                                <span>Pick a date range</span>
                              )}
                            </button>
                          </PopoverTrigger>

                          <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                              mode="range"
                              selected={tempRange}
                              onSelect={handleDateSelect}
                              numberOfMonths={2}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="switch switch-sm flex-1 sm:flex-none mt-4">
                          <span className="switch-label">
                            Auto Email Invoices
                          </span>
                          <input
                            type="checkbox"
                            name="check"
                            checked={autoEmailInvoices} // Controlled value
                            onChange={(e) =>
                              setAutoEmailInvoices(e.target.checked)
                            } // Update state on change
                          />
                        </label>
                      </div>

                      <button
                        className="btn btn-primary flex justify-center mt-4"
                        onClick={handleShow}
                        disabled={loading}
                      >
                        {loading ? "Searching..." : "Show Jobs"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="flex justify-start items-center gap-4 ml-4 mt-2 mb-2">
                    Awaiting Pricing -{" "}
                    {accountChargeableJobs?.notPriced?.length}
                    <button
                      className="btn btn-primary flex justify-center"
                      onClick={handlePostAllPriced}
                    >
                      Post All Priced
                    </button>
                  </div>
                  {formattedNotPricedBookings?.length > 0 ? (
                    <TableContainer
                      component={Paper}
                      ref={scrollRef}
                      className="shadow-none bg-white dark:bg-[#14151A] overflow-x-auto"
                    >
                      <Table className="text-[#14151A] dark:text-gray-100">
                        <TableHead
                          className="bg-gray-100 dark:bg-[#14151A]"
                          sx={{
                            "& .MuiTableCell-root": {
                              // borderBottom: '1px solid #464852',
                            },
                          }}
                        >
                          <TableRow>
                            <TableCell />
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <TableSortLabel
                                active={orderBy === "id"}
                                direction={order}
                                onClick={() => handleSort("id")}
                                sx={{
                                  "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                  "&.Mui-active": { color: "#9A9CAE" },
                                  "&.Mui-active .MuiTableSortLabel-icon": {
                                    color: "#9A9CAE",
                                  }, // Change to blue when active
                                }}
                              >
                                #
                              </TableSortLabel>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <TableSortLabel
                                active={orderBy === "date"}
                                direction={order}
                                onClick={() => handleSort("date")}
                                sx={{
                                  "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                  "&.Mui-active": { color: "#9A9CAE" },
                                  "&.Mui-active .MuiTableSortLabel-icon": {
                                    color: "#9A9CAE",
                                  }, // Change to blue when active
                                }}
                              >
                                Date
                              </TableSortLabel>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Acc #
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Driver #
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <div className="flex gap-1">
                                <TableSortLabel
                                  active={orderBy === "pickup"}
                                  direction={order}
                                  onClick={() => handleSort("pickup")}
                                  sx={{
                                    "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                    "&.Mui-active": { color: "#9A9CAE" },
                                    "&.Mui-active .MuiTableSortLabel-icon": {
                                      color: "#9A9CAE",
                                    }, // Change to blue when active
                                  }}
                                >
                                  Pickup
                                </TableSortLabel>
                                <IconButton
                                  size="small"
                                  onClick={(e) =>
                                    handleFilterClick(e, {
                                      label: "Pickup",
                                      value: "pickup",
                                    })
                                  }
                                  className="text-[#14151A] dark:text-gray-700"
                                >
                                  {isFilterApplied("pickup") ? (
                                    <FilterAltIcon fontSize="small" />
                                  ) : (
                                    <FilterAltOutlinedIcon fontSize="small" />
                                  )}
                                </IconButton>
                              </div>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <div className="flex gap-1">
                                <TableSortLabel
                                  active={orderBy === "destination"}
                                  direction={order}
                                  onClick={() => handleSort("destination")}
                                  sx={{
                                    "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                    "&.Mui-active": { color: "#9A9CAE" },
                                    "&.Mui-active .MuiTableSortLabel-icon": {
                                      color: "#9A9CAE",
                                    }, // Change to blue when active
                                  }}
                                >
                                  Destination
                                </TableSortLabel>
                                <IconButton
                                  size="small"
                                  onClick={(e) =>
                                    handleFilterClick(e, {
                                      label: "Destination",
                                      value: "destination",
                                    })
                                  }
                                  className="text-[#14151A] dark:text-gray-700"
                                >
                                  {isFilterApplied("destination") ? (
                                    <FilterAltIcon fontSize="small" />
                                  ) : (
                                    <FilterAltOutlinedIcon fontSize="small" />
                                  )}
                                </IconButton>
                              </div>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <div className="flex gap-1">
                                <TableSortLabel
                                  active={orderBy === "passenger"}
                                  direction={order}
                                  onClick={() => handleSort("passenger")}
                                  sx={{
                                    "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                    "&.Mui-active": { color: "#9A9CAE" },
                                    "&.Mui-active .MuiTableSortLabel-icon": {
                                      color: "#9A9CAE",
                                    }, // Change to blue when active
                                  }}
                                >
                                  Passenger
                                </TableSortLabel>
                                <IconButton
                                  size="small"
                                  onClick={(e) =>
                                    handleFilterClick(e, {
                                      label: "Passenger",
                                      value: "passenger",
                                    })
                                  }
                                  className="text-[#14151A] dark:text-gray-700"
                                >
                                  {isFilterApplied("passenger") ? (
                                    <FilterAltIcon fontSize="small" />
                                  ) : (
                                    <FilterAltOutlinedIcon fontSize="small" />
                                  )}
                                </IconButton>
                              </div>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <TableSortLabel
                                active={orderBy === "passengers"}
                                direction={order}
                                onClick={() => handleSort("passengers")}
                                sx={{
                                  "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                  "&.Mui-active": { color: "#9A9CAE" },
                                  "&.Mui-active .MuiTableSortLabel-icon": {
                                    color: "#9A9CAE",
                                  }, // Change to blue when active
                                }}
                              >
                                Pax
                              </TableSortLabel>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Has Vias
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Waiting
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Waiting Charge
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Actual Miles
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <TableSortLabel
                                active={orderBy === "driverFare"}
                                direction={order}
                                onClick={() => handleSort("driverFare")}
                                sx={{
                                  "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                  "&.Mui-active": { color: "#9A9CAE" },
                                  "&.Mui-active .MuiTableSortLabel-icon": {
                                    color: "#9A9CAE",
                                  }, // Change to blue when active
                                }}
                              >
                                Driver £
                              </TableSortLabel>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <TableSortLabel
                                active={orderBy === "journeyCharge"}
                                direction={order}
                                onClick={() => handleSort("journeyCharge")}
                                sx={{
                                  "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                  "&.Mui-active": { color: "#9A9CAE" },
                                  "&.Mui-active .MuiTableSortLabel-icon": {
                                    color: "#9A9CAE",
                                  }, // Change to blue when active
                                }}
                              >
                                Journey Charge
                              </TableSortLabel>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Parking
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 font-semibold border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Total
                            </TableCell>
                            <TableCell
                              className="text-gray-900 dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Price
                            </TableCell>
                            <TableCell
                              className="text-gray-900 dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Post
                            </TableCell>
                            <TableCell
                              className="text-gray-900 dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Cancel
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody
                          sx={{
                            "& .MuiTableCell-root": {
                              // borderBottom: '1px solid #464852',
                            },
                          }}
                        >
                          {sortedBookings
                            ?.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => (
                              <>
                                <RowNotPriced
                                  key={row.id}
                                  row={row}
                                  // setPriceBaseModal={setPriceBaseModal}
                                  setSelectedBooking={setSelectedBooking}
                                  handlePostButton={handlePostButton}
                                  handleShow={handleShow}
                                />
                              </>
                            ))}
                        </TableBody>
                        {priceBaseModal && (
                          <PriceBase
                            open={priceBaseModal}
                            bookingId={selectedBooking?.id}
                            onOpenChange={handleClose}
                            handleShow={handleShow}
                          />
                        )}
                      </Table>
                      <TablePagination
                        component="div"
                        count={sortedBookings.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        className="text-sm text-gray-900 dark:text-gray-700 px-4"
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              sx: {
                                "& .MuiMenuItem-root": {
                                  fontSize: "0.875rem",
                                  "&:hover": {
                                    backgroundColor: "transparent", // Tailwind's gray-100
                                    color: "#071437", // Tailwind's blue-800
                                  },
                                  "&.Mui-selected": {
                                    backgroundColor: "#F1F1F4", // selected bg
                                    color: "#071437", // selected text (blue-800)
                                  },
                                },
                                // Dark mode styles (optional)
                                "@media (prefers-color-scheme: dark)": {
                                  backgroundColor: "transparent", // dark gray bg
                                  color: "#9A9CAE",
                                  "& .MuiMenuItem-root": {
                                    "&:hover": {
                                      backgroundColor: "#374151", // hover dark gray
                                      color: "#9A9CAE",
                                    },
                                    "&.Mui-selected": {
                                      backgroundColor: "#0D0E12",
                                      color: "#9A9CAE",
                                    },
                                  },
                                },
                              },
                            },
                          },
                        }}
                      />
                      <TableFilterPopover
                        anchorEl={anchorEl}
                        onClose={handleFilterClose}
                        column={activeColumn}
                        columns={columns}
                        filters={filters}
                        setFilters={setFilters}
                      />
                    </TableContainer>
                  ) : (
                    <div className="text-start ml-4  text-yellow-600 dark:border dark:border-yellow-400 dark:opacity-50 dark:bg-transparent rounded-md bg-yellow-100 p-2 mr-4">
                      ⚠️ No Data Available
                    </div>
                  )}
                </div>
                <div className="card-body mt-10">
                  <div className="flex justify-start items-center gap-4 ml-4 mt-2 mb-2">
                    Ready for Invoicing -{" "}
                    {accountChargeableJobs?.priced?.length}
                  </div>
                  {formattedPricedBookings.length > 0 ? (
                    <TableContainer
                      component={Paper}
                      className="shadow-none bg-white dark:bg-[#14151A] overflow-x-auto"
                    >
                      <Table className="text-[#14151A] dark:text-gray-100">
                        <TableHead
                          className="bg-gray-100 dark:bg-[#14151A]"
                          sx={{
                            "& .MuiTableCell-root": {
                              // borderBottom: '1px solid #464852',
                            },
                          }}
                        >
                          <TableRow>
                            <TableCell />
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <TableSortLabel
                                active={orderBy === "id"}
                                direction={order}
                                onClick={() => handleSort("id")}
                                sx={{
                                  "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                  "&.Mui-active": { color: "#9A9CAE" },
                                  "&.Mui-active .MuiTableSortLabel-icon": {
                                    color: "#9A9CAE",
                                  }, // Change to blue when active
                                }}
                              >
                                #
                              </TableSortLabel>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <TableSortLabel
                                active={orderBy === "date"}
                                direction={order}
                                onClick={() => handleSort("date")}
                                sx={{
                                  "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                  "&.Mui-active": { color: "#9A9CAE" },
                                  "&.Mui-active .MuiTableSortLabel-icon": {
                                    color: "#9A9CAE",
                                  }, // Change to blue when active
                                }}
                              >
                                Date
                              </TableSortLabel>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Acc #
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Driver #
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <div className="flex gap-1">
                                <TableSortLabel
                                  active={orderBy === "pickup"}
                                  direction={order}
                                  onClick={() => handleSort("pickup")}
                                  sx={{
                                    "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                    "&.Mui-active": { color: "#9A9CAE" },
                                    "&.Mui-active .MuiTableSortLabel-icon": {
                                      color: "#9A9CAE",
                                    }, // Change to blue when active
                                  }}
                                >
                                  Pickup
                                </TableSortLabel>
                                <IconButton
                                  size="small"
                                  onClick={(e) =>
                                    handleFilterClick2(e, {
                                      label: "Pickup",
                                      value: "pickup",
                                    })
                                  }
                                  className="text-[#14151A] dark:text-gray-700"
                                >
                                  {isFilterApplied2("pickup") ? (
                                    <FilterAltIcon fontSize="small" />
                                  ) : (
                                    <FilterAltOutlinedIcon fontSize="small" />
                                  )}
                                </IconButton>
                              </div>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <div className="flex gap-1">
                                <TableSortLabel
                                  active={orderBy === "destination"}
                                  direction={order}
                                  onClick={() => handleSort("destination")}
                                  sx={{
                                    "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                    "&.Mui-active": { color: "#9A9CAE" },
                                    "&.Mui-active .MuiTableSortLabel-icon": {
                                      color: "#9A9CAE",
                                    }, // Change to blue when active
                                  }}
                                >
                                  Destination
                                </TableSortLabel>
                                <IconButton
                                  size="small"
                                  onClick={(e) =>
                                    handleFilterClick2(e, {
                                      label: "Destination",
                                      value: "destination",
                                    })
                                  }
                                  className="text-[#14151A] dark:text-gray-700"
                                >
                                  {isFilterApplied2("destination") ? (
                                    <FilterAltIcon fontSize="small" />
                                  ) : (
                                    <FilterAltOutlinedIcon fontSize="small" />
                                  )}
                                </IconButton>
                              </div>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <div className="flex gap-1">
                                <TableSortLabel
                                  active={orderBy === "passenger"}
                                  direction={order}
                                  onClick={() => handleSort("passenger")}
                                  sx={{
                                    "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                    "&.Mui-active": { color: "#9A9CAE" },
                                    "&.Mui-active .MuiTableSortLabel-icon": {
                                      color: "#9A9CAE",
                                    }, // Change to blue when active
                                  }}
                                >
                                  Passenger
                                </TableSortLabel>
                                <IconButton
                                  size="small"
                                  onClick={(e) =>
                                    handleFilterClick2(e, {
                                      label: "Passenger",
                                      value: "passenger",
                                    })
                                  }
                                  className="text-[#14151A] dark:text-gray-700"
                                >
                                  {isFilterApplied2("passenger") ? (
                                    <FilterAltIcon fontSize="small" />
                                  ) : (
                                    <FilterAltOutlinedIcon fontSize="small" />
                                  )}
                                </IconButton>
                              </div>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <TableSortLabel
                                active={orderBy === "passengers"}
                                direction={order}
                                onClick={() => handleSort("passengers")}
                                sx={{
                                  "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                  "&.Mui-active": { color: "#9A9CAE" },
                                  "&.Mui-active .MuiTableSortLabel-icon": {
                                    color: "#9A9CAE",
                                  }, // Change to blue when active
                                }}
                              >
                                Pax
                              </TableSortLabel>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Has Vias
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Waiting
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Waiting Charge
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Actual Miles
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <TableSortLabel
                                active={orderBy === "driverFare"}
                                direction={order}
                                onClick={() => handleSort("driverFare")}
                                sx={{
                                  "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                  "&.Mui-active": { color: "#9A9CAE" },
                                  "&.Mui-active .MuiTableSortLabel-icon": {
                                    color: "#9A9CAE",
                                  }, // Change to blue when active
                                }}
                              >
                                Driver £
                              </TableSortLabel>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              <TableSortLabel
                                active={orderBy === "journeyCharge"}
                                direction={order}
                                onClick={() => handleSort("journeyCharge")}
                                sx={{
                                  "&:hover": { color: "#9A9CAE" }, // Change color on hover
                                  "&.Mui-active": { color: "#9A9CAE" },
                                  "&.Mui-active .MuiTableSortLabel-icon": {
                                    color: "#9A9CAE",
                                  }, // Change to blue when active
                                }}
                              >
                                Journey Charge
                              </TableSortLabel>
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Parking
                            </TableCell>
                            <TableCell
                              className="text-[#14151A] dark:text-gray-700 font-semibold border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Total
                            </TableCell>
                            <TableCell
                              className="text-gray-900 dark:text-gray-700 border-e"
                              sx={{ fontWeight: "bold" }}
                            >
                              Revert
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody
                          sx={{
                            "& .MuiTableCell-root": {
                              // borderBottom: '1px solid #464852',
                            },
                          }}
                        >
                          {sortedPricedBookings
                            ?.slice(
                              pageB * rowsPerPageB,
                              pageB * rowsPerPageB + rowsPerPageB
                            )
                            .map((row) => (
                              <>
                                <RowPriced
                                  key={row.id}
                                  row={row}
                                  handleRevert={handleRevert}
                                />
                              </>
                            ))}
                        </TableBody>
                      </Table>
                      <TablePagination
                        component="div"
                        count={sortedPricedBookings.length}
                        page={pageB}
                        onPageChange={handleChangePageB}
                        rowsPerPage={rowsPerPageB}
                        onRowsPerPageChange={handleChangeRowsPerPageB}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        className="text-sm text-gray-900 dark:text-gray-700 px-4"
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              sx: {
                                "& .MuiMenuItem-root": {
                                  fontSize: "0.875rem",
                                  "&:hover": {
                                    backgroundColor: "transparent", // Tailwind's gray-100
                                    color: "#071437", // Tailwind's blue-800
                                  },
                                  "&.Mui-selected": {
                                    backgroundColor: "#F1F1F4", // selected bg
                                    color: "#071437", // selected text (blue-800)
                                  },
                                },
                                // Dark mode styles (optional)
                                "@media (prefers-color-scheme: dark)": {
                                  backgroundColor: "transparent", // dark gray bg
                                  color: "#9A9CAE",
                                  "& .MuiMenuItem-root": {
                                    "&:hover": {
                                      backgroundColor: "#374151", // hover dark gray
                                      color: "#9A9CAE",
                                    },
                                    "&.Mui-selected": {
                                      backgroundColor: "#0D0E12",
                                      color: "#9A9CAE",
                                    },
                                  },
                                },
                              },
                            },
                          },
                        }}
                      />
                      <TableFilterPopover
                        anchorEl={anchorE2}
                        onClose={handleFilterClose2}
                        column={activeColumn2}
                        columns={columns}
                        filters={filters2}
                        setFilters={setFilters2}
                      />
                    </TableContainer>
                  ) : (
                    <div className="text-start ml-4  text-yellow-600 dark:border dark:border-yellow-400 dark:opacity-50 dark:bg-transparent rounded-md bg-yellow-100 p-2 mr-4 mb-2">
                      ⚠️ No Data Available
                    </div>
                  )}

                  {accountChargeableJobs?.priced?.length > 0 && (
                    <div className="flex justify-end items-center mt-4 p-4 bg-gray-100 rounded-lg">
                      <div className="font-bold text-lg text-gray-800 flex gap-4">
                        <span>Total :</span>
                        <div className="flex items-center gap-1">
                          <span>£{grandTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {accountChargeableJobs?.priced?.length > 0 && (
                    <button
                      className="btn btn-success flex justify-center mt-5 w-full"
                      onClick={handleProcessDriver}
                      disabled={processLoading}
                    >
                      Invoice {selectedAccount === 0 && "All"} Account{" "}
                      {selectedAccount !== 0 && selectedAccount}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export { InvoiceProcessor };

function PriceBase({ open, onOpenChange, bookingId, handleShow }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { accountChargeableJobs } = useSelector((state) => state.billing);
  const notPriced = accountChargeableJobs?.notPriced;
  const addLocalSchema = Yup.object().shape({
    priceFromBase: Yup.string().required("Contact Name is required"),
  });

  const booking = notPriced?.find((job) => job?.bookingId === bookingId);

  // console.log({ bookingId, booking, userData });
  const initialValues = {
    priceFromBase: booking?.priceFromBase || true,
  };

  // console.log('accNo---', booking);

  const formik = useFormik({
    initialValues,
    validationSchema: addLocalSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // console.log('Submitted Values:', values);
      try {
        const payload = {
          pickupPostcode: booking?.pickupPostcode || "",
          viaPostcodes: booking?.vias?.length
            ? booking.vias.map((via) => via.postCode)
            : [], // Map via postcodes
          destinationPostcode: booking?.destinationPostcode || "",
          pickupDateTime: booking?.date || new Date().toISOString(), // Use booking date if available
          passengers: booking?.passengers || 0,
          priceFromBase: values.priceFromBase, // Use form value
          bookingId: booking?.bookingId || 0,
          actionByUserId: userData?.userId || 0,
          updatedByName: userData?.fullName || "", // Change as needed
          price: booking?.price || 0,
          priceAccount: booking?.priceAccount || 0,
          mileage: booking?.miles || 0,
          mileageText: `${booking?.miles || 0} miles`, // Convert miles to string
          durationText: "", // No duration available in provided object
        };
        let response;
        if (booking?.accNo === 10026 || booking?.accNo === 9014) {
          response = await accountPriceJobHVS(payload);
        } else {
          response = await accountPriceJobByMileage(payload);
        }
        // console.log('Response:', response);
        if (response.status === "success") {
          toast.success("Price Updated");
          handleShow();
        } else {
          toast.error("Failed to Update Price");
        }
      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
      onOpenChange(); // Reset Formik's submitting state
    },
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[300px]">
        <DialogHeader className="border-0">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogBody className="flex flex-col items-center pt-0 pb-4">
          <h3 className="text-lg font-medium text-gray-900 text-center mb-3">
            Price
          </h3>

          <form onSubmit={formik.handleSubmit} className="w-full">
            <div className="w-full flex justify-center items-center gap-2">
              <div className="flex flex-col gap-1 pb-2 w-full">
                <div className="flex items-center gap-2">
                  <label className="switch">
                    <span className="switch-label">Charge from base?</span>
                    <input
                      type="checkbox"
                      name="priceFromBase"
                      checked={formik.values.priceFromBase}
                      onChange={(e) =>
                        formik.setFieldValue("priceFromBase", e.target.checked)
                      }
                    />
                  </label>
                  {formik.touched.priceFromBase &&
                    formik.errors.priceFromBase && (
                      <span role="alert" className="text-danger text-xs mt-1">
                        {formik.errors.priceFromBase}
                      </span>
                    )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mb-2 mt-2">
              <button className="btn btn-light" onClick={() => onOpenChange()}>
                Cancel
              </button>
              <button className="btn btn-primary ml-2" type="submit">
                Submit
              </button>
            </div>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
