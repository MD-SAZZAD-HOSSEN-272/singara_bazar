import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const cigarettePrices = {
  Singara: 12,
};

export default function UpdateForm({ singleData, refetch, setModal }) {
  const [employeeName, setEmployeeName] = useState("");
  const [cigaretteName, setCigaretteName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (singleData) {
      setEmployeeName(singleData.employeeName || "");
      setCigaretteName(singleData.cigaretteName || "");
      setQuantity(singleData.quantity || "");
      setAmount(singleData.amount || 0);
    }
  }, [singleData]);

  const handleQuantityChange = (val) => {
    setQuantity(val);
    const price = cigarettePrices[cigaretteName] || 0;
    setAmount(price * Number(val || 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(singleData)
      if (quantity < 1 || quantity > 5) {
        return Swal.fire({
          title: "Quantity must be between 1 and 5",
          showClass: {
            popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
          },
          hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
          }
        });
      }
      const res = await fetch(`/api/updatedOrder/${singleData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeName,
          cigaretteName,
          quantity: Number(quantity),
          amount,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      const data = await res.json();
      if (data.modifiedCount === 1) {
        Swal.fire("Updated!", "Order updated successfully", "success");
        refetch();
        setModal(false)
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-3xl backdrop-blur-xl
      text-white overflow-hidden"

    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/30">
        <h2 className="text-2xl font-bold tracking-wide drop-shadow-lg">
          ✏️ Update Order
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Employee */}
        <div>
          <label className="text-sm font-semibold text-white/90">
            Employee Name
          </label>
          <input
            value={employeeName}
            className="w-full mt-1 px-4 py-2 rounded-xl
              bg-white/20 border border-white/30
              text-white placeholder-white/70
              focus:outline-none focus:ring-2 focus:ring-white/60"
            placeholder="Enter employee name"
            required
          />
        </div>

        {/* Cigarette */}
        <div>
          <label className="text-sm font-semibold text-white/90">
            Singara
          </label>
          <select
            value={cigaretteName}
            onChange={(e) => {
              setCigaretteName(e.target.value);
              setQuantity("");
              setAmount(0);
            }}
            className="w-full mt-1 px-4 py-2 rounded-xl
              bg-white/20 border border-white/30
              text-white focus:outline-none focus:ring-2 focus:ring-white/60"
            required
          >
            <option value="" className="text-black">Select Singara</option>
            {Object.keys(cigarettePrices).map((item) => (
              <option key={item} value={item} className="text-black">
                {item} (৳ {cigarettePrices[item]})
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="text-sm font-semibold text-white/90">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-xl
              bg-white/20 border border-white/30
              text-white placeholder-white/70
              focus:outline-none focus:ring-2 focus:ring-white/60"
            placeholder="Enter quantity"
            required
          />
        </div>

        {/* Amount */}
        <div className=" items-center
          bg-black/20 rounded-2xl gap-5 mt-2 px-5 py-3 border border-white/30">
          <span className="text-sm px-5 font-medium text-white/80">
            Total Amount:
          </span>
          <span className="text-xl font-bold text-white drop-shadow-md px-5">
            ৳ {amount}
          </span>
        </div>

        {/* Buttons */}

        <button
          type="submit"
          className="w-full py-3 mt-6 rounded-2xl
              bg-black/50 hover:bg-black/50
              font-semibold cursor-pointer"
        >
          Update
        </button>
      </form>
    </div>
  );
}
