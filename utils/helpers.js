/**
 * This enum handles the different statuses to be listened to while disabling certain campaign Features
 * @ param {array}
 */

export const statuses = ["active", "completed", "ongoing", "ended"];
export const campaignStatus = (status) => {
  switch (status) {
    case "active":
      return "progress";

    case "ongoing":
      return "ongoing";

    case "completed":
      return "completed";

    case "ended":
      return "ended";

    default:
      return "pending";
  }
};

export const categories = [
  "Clothing",
  "Medicine",
  "Cash",
  "Hygiene items",
  "Fresh food items",
  "Processed food",
  "Education",
  "Humanitarian overhead",
];

export function dataUrlToFile(dataUrl, filename) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: "image/png" || mime });
}
