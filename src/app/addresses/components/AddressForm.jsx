import { useEffect, useMemo, useState } from "react";
import { useAddAddress, useAllAddresses, useUpdateAddress } from "../../../hooks/address";

const INITIAL_VALUES = {
  name: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
};

export function AddressForm({ address, submitMode, afterSubmit }) {
  const { mutate: addAddress, isSuccess: addedSuccessfully, reset: resetAdd } = useAddAddress();
  const { mutate: updateAddress, isSuccess: editedSuccessfully, reset: resetEdit } = useUpdateAddress();
  const { refetch } = useAllAddresses();

  const [formData, setFormData] = useState(address || INITIAL_VALUES);
  useEffect(() => {
    setFormData(address || INITIAL_VALUES);
  }, [address]);

  const [mode, setMode] = useState("Freeform");
  const switchMode = (e) => {
    e.preventDefault();
    setMode((prevState) => (prevState === "Freeform" ? "Fields" : "Freeform"));
  };
  const otherMode = mode === "Freeform" ? "Fields" : "Freeform";

  const updateFormData = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitMode === 'add') {
      addAddress(formData);
    } else if (submitMode === 'edit') {
      updateAddress({ id: address.id, ...formData });
    }
  };

  useEffect(() => {
    if (addedSuccessfully || editedSuccessfully) {
      afterSubmit?.();
      resetAdd();
      resetEdit();
      refetch();
    }
  }, [addedSuccessfully, editedSuccessfully])

  const textAreaValue = useMemo(() => {
    return `${formData.name}\n${formData.address1}\n${formData.address2}\n${formData.city}, ${formData.state} ${formData.zip}`;
  }, [formData])
  return (
    <form
      className="flex flex-col items-start justify-center max-w-sm mx-auto mb-8"
      onSubmit={handleSubmit}
    >
      <button className="self-end link-btn" onClick={switchMode}>
        Switch to {otherMode}
      </button>

      {mode === "Freeform" && (
        <>
          <label className="flex flex-col items-start justify-start mb-2 w-full">
            <span className="mb-1 text-slate-700">Name</span>
            <input
              type="text"
              className="input w-full"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              autoFocus
              required
            />
          </label>

          <label className="flex flex-col items-start justify-start mb-2 w-full">
            <span className="mb-1 text-slate-700">Address</span>
            <input
              type="text"
              className="input w-full"
              name="address1"
              value={formData?.address1}
              onChange={handleChange}
              required
            />
          </label>

          <label className="flex flex-col items-start justify-start mb-2 w-full">
            <div className="mb-1 text-slate-700">
              <span>Address 2</span>
              <span className="text-sm text-slate-400"> (optional)</span>
            </div>
            <input
              type="text"
              className="input w-full"
              name="address2"
              value={formData?.address2}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col items-start justify-start mb-2 w-full">
            <span className="mb-1 text-slate-700">City</span>
            <input
              type="text"
              className="input w-full"
              name="city"
              value={formData?.city}
              onChange={handleChange}
              required
            />
          </label>

          <label className="flex flex-col items-start justify-start mb-2 w-full">
            <span className="mb-1 text-slate-700">State</span>
            <input
              type="text"
              className="input w-full"
              name="state"
              value={formData?.state}
              onChange={handleChange}
              required
            />
          </label>

          <label className="flex flex-col items-start justify-start mb-2 w-full">
            <span className="mb-1 text-slate-700">Zip</span>
            <input
              type="text"
              className="input w-full"
              name="zip"
              value={formData?.zip}
              onChange={handleChange}
              required
            />
          </label>
        </>
      )}
      {mode === "Fields" && (
        <label className="flex flex-col items-start justify-start w-full">
          <div className="mb-1 flex flex-col items-start justify-start">
            <span className="text-slate-700">Address (free-form)</span>
            <span className="italic text-slate-500">
              Copy & paste the full address
            </span>
          </div>
          <textarea
            className="input w-full"
            rows={5}
            readOnly
            value={textAreaValue}
          />
        </label>
      )}
      <button className="button mt-2 w-full" type="submit">
        Save Address
      </button>
    </form>
  );
}
