/** @format */
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
import clsx from "clsx";
// import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { submitTicket } from "../../../service/operations/reportsApi";

function TicketRaiseModal({ open, onClose }) {
  //   const { user } = useSelector((state) => state.auth);
  //   const fullName = user?.fullName || "Guest User";
  //   const email = user?.email || "";

  const addLocalSchema = Yup.object().shape({
    // Changed from email to username
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const initialValues = {
    subject: "",
    message: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: addLocalSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Submitted Values:", values);
      try {
        await submitTicket(values.subject, values.message);
        toast.success("Ticket sent successfully!");

        onClose();
      } catch (error) {
        toast.error("Failed to send ticket.");
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader className="border-0">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogBody className="flex flex-col items-center pt-0 pb-4">
          <h3 className="text-lg font-medium text-gray-900 text-center mb-3">
            Submit Support or Feature Request
          </h3>

          <div className="flex justify-center items-start gap-4 w-full">
            <form onSubmit={formik.handleSubmit} className="w-full">
              <div className="flex flex-col gap-1 pb-2">
                <label className="form-label text-gray-900">Subject</label>
                <label className="input">
                  <input
                    placeholder="Enter subject"
                    autoComplete="off"
                    {...formik.getFieldProps("subject")}
                    className={clsx("form-control", {
                      "is-invalid":
                        formik.touched.subject && formik.errors.subject,
                    })}
                  />
                </label>
                {formik.touched.subject && formik.errors.subject && (
                  <span role="alert" className="text-danger text-xs mt-1">
                    {formik.errors.subject}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 pb-2">
                <label className="form-label text-gray-900">Message</label>
                <label className="">
                  <textarea
                    placeholder="Enter message"
                    rows={6}
                    autoComplete="off"
                    {...formik.getFieldProps("message")}
                    className={clsx(
                      "form-control textarea text-2sm text-gray-600 font-normal",
                      {
                        "is-invalid":
                          formik.touched.message && formik.errors.message,
                      }
                    )}
                  />
                </label>
                {formik.touched.message && formik.errors.message && (
                  <span role="alert" className="text-danger text-xs mt-1">
                    {formik.errors.message}
                  </span>
                )}
              </div>

              <div className="flex justify-end mb-2 mt-2">
                <button className="btn btn-light" onClick={() => onClose()}>
                  Cancel
                </button>
                <button className="btn btn-primary ml-2" type="submit">
                  Send Ticket
                </button>
              </div>
            </form>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

export default TicketRaiseModal;
