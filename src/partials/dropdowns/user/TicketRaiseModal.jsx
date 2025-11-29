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

function TicketRaiseModal({ open, onClose }) {
  //   const { user } = useSelector((state) => state.auth);
  //   const fullName = user?.fullName || "Guest User";
  //   const email = user?.email || "";

  const addLocalSchema = Yup.object().shape({
    // Changed from email to username
    subject: Yup.string().required("Subject is required"),
    description: Yup.string().required("Description is required"),
  });

  const initialValues = {
    subject: "",
    description: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: addLocalSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Submitted Values:", values);
      try {
        // if (isDirectMsgModal) {
        //   if (selectedDrivers.length === 0) {
        //     toast.error("Please select at least one driver.");
        //     setSubmitting(false);
        //     return;
        //   }

        //   const promises = selectedDrivers.map((driverId) =>
        //     sendDirectMsgToDriver(driverId, values.message)
        //   );
        //   await Promise.all(promises);
        //   toast.success("Messages sent successfully!");
        // }
        // if (isGlobalMsgModal) {
        //   await sendGlobalMsgToDriver(values.message);
        //   toast.success("Global message sent successfully!");
        // }
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
                <label className="form-label text-gray-900">Description</label>
                <label className="">
                  <textarea
                    placeholder="Enter description"
                    rows={6}
                    autoComplete="off"
                    {...formik.getFieldProps("description")}
                    className={clsx(
                      "form-control textarea text-2sm text-gray-600 font-normal",
                      {
                        "is-invalid":
                          formik.touched.description &&
                          formik.errors.description,
                      }
                    )}
                  />
                </label>
                {formik.touched.description && formik.errors.description && (
                  <span role="alert" className="text-danger text-xs mt-1">
                    {formik.errors.description}
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
