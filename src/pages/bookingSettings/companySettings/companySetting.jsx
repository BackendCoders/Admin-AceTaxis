import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CompanySetting = () => {
  // ✅ State to manage form data
  const [companyData, setCompanyData] = useState({
    companyName: "Ace Taxis (Dorset) Ltd",
    addressLine1: "The Corner House",
    addressLine2: "1 Briar Close",
    addressLine3: "Gillingham",
    addressLine4: "Dorset",
    postcode: "SP8 4SS",
    email: "bookings@acetaxisdorset.co.uk",
    web: "www.acetaxisdorset.co.uk",
    phone: "01747821111",
    companyNo: "08920974",
    vatNo: "325 1273 31",
    cardRate: "1.6",
    revolutSecretKey: "",
  });

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Company Settings Updated Successfully!");
  };

  return (
    <div className="p-6">
      {/* ✅ Card Header */}
      <div className="card-header border-b pb-4">
        <h3 className="card-title text-lg font-semibold text-gray-700">Company Setup</h3>
      </div>

      {/* ✅ Card Body */}
      <div className="card card-body grid gap-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ✅ Left Section - Company Details */}
          <div className="space-y-4">
            <div>
              <label className="form-label font-medium">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={companyData.companyName}
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2  focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="form-label font-medium">Address</label>
              <input
                type="text"
                name="addressLine1"
                value={companyData.addressLine1}
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="form-label font-medium">Line 2</label>
              <input
                type="text"
                name="addressLine2"
                value={companyData.addressLine2}
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="form-label font-medium">Line 3</label>
              <input
                type="text"
                name="addressLine3"
                value={companyData.addressLine3}
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="form-label font-medium">Line 4</label>
              <input
                type="text"
                name="addressLine4"
                value={companyData.addressLine4}
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="form-label font-medium">Postcode</label>
              <input
                type="text"
                name="postcode"
                value={companyData.postcode}
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* ✅ Right Section - Contact Details */}
          <div className="space-y-4">
            <div>
              <label className="form-label font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={companyData.email}
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="form-label font-medium">Web</label>
              <input
                type="text"
                name="web"
                value={companyData.web}
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="form-label font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={companyData.phone}
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2  focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="form-label font-medium">Company No</label>
              <input
                type="text"
                name="companyNo"
                value={companyData.companyNo}
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2  focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="form-label font-medium">VAT No</label>
              <input
                type="text"
                name="vatNo"
                value={companyData.vatNo}
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2  focus:ring-blue-600"
              />
            </div>

            {/* ✅ Card Rate Dropdown */}
            <div>
              <label className="form-label font-medium">Card Rate %</label>
              <Select
                name="cardRate"
                value={companyData.cardRate}
                onValueChange={(value) => setCompanyData({ ...companyData, cardRate: value })}
              >
                <SelectTrigger className="input border border-gray-300 rounded-md p-2 focus:ring-blue-600">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.6">1.6%</SelectItem>
                  <SelectItem value="2.0">2.0%</SelectItem>
                  <SelectItem value="2.5">2.5%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ✅ Revolut Secret Key */}
            <div>
              <label className="form-label font-medium">Revolut Secret Key</label>
              <input
                type="text"
                name="revolutSecretKey"
                value={companyData.revolutSecretKey}
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2  focus:ring-blue-600"
              />
            </div>
          </div>
        </form>
      </div>

      {/* ✅ Submit Button (Sticky at Bottom) */}
      <div className="card-footer mt-6 flex justify-end">
        <button type="submit" className="btn btn-primary px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md">
          Submit
        </button>
      </div>
    </div>
  );
};

export { CompanySetting };
